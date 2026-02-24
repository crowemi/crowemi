import { Client } from '@notionhq/client'
import type {
  BlockObjectResponse,
  DatabaseObjectResponse,
  QueryDataSourceParameters,
} from '@notionhq/client/build/src/api-endpoints'

import { getConfig } from './config'

let notionInstance: Client | null = null

function getNotion(): Client {
  if (!notionInstance) {
    const { notion } = getConfig()
    notionInstance = new Client({ auth: notion.apiKey })
  }

  return notionInstance
}

let cachedDataSourceId: string | null = null

async function getDataSourceId(databaseId: string): Promise<string> {
  if (cachedDataSourceId) return cachedDataSourceId

  const db = await getNotion().databases.retrieve({ database_id: databaseId })
  const fullDb = db as DatabaseObjectResponse
  if (!fullDb.data_sources?.length) {
    throw new Error(`No data sources found for database ${databaseId}`)
  }

  cachedDataSourceId = fullDb.data_sources[0].id
  return cachedDataSourceId
}

export async function queryDatabase(
  databaseId: string,
  options?: {
    filter?: QueryDataSourceParameters['filter']
    sorts?: QueryDataSourceParameters['sorts']
    pageSize?: QueryDataSourceParameters['page_size']
  }
) {
  const dataSourceId = await getDataSourceId(databaseId)

  const response = await getNotion().dataSources.query({
    data_source_id: dataSourceId,
    ...(options?.filter && { filter: options.filter }),
    ...(options?.sorts && { sorts: options.sorts }),
    ...(options?.pageSize && { page_size: options.pageSize }),
  })

  return response.results
}

export async function getPage(pageId: string) {
  return getNotion().pages.retrieve({ page_id: pageId })
}

export async function getPageBlocks(
  blockId: string
): Promise<BlockObjectResponse[]> {
  const blocks: BlockObjectResponse[] = []
  let cursor: string | undefined

  do {
    const response = await getNotion().blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
    })

    for (const block of response.results) {
      if ('type' in block) {
        const b = block as BlockObjectResponse
        if (b.has_children) {
          ;(b as any).children = await getPageBlocks(b.id)
        }
        blocks.push(b)
      }
    }

    cursor = response.has_more ? response.next_cursor ?? undefined : undefined
  } while (cursor)

  return blocks
}
