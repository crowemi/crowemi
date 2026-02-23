import { Client } from '@notionhq/client'

import { getConfig } from './config'

let notionInstance: Client | null = null

function getNotion(): Client {
  if (!notionInstance) {
    const { notion } = getConfig()
    notionInstance = new Client({ auth: notion.apiKey })
  }

  return notionInstance
}

export async function queryDatabase(
  databaseId: string,
  filter?: Record<string, unknown>
) {
  const response = await getNotion().dataSources.query({
    data_source_id: databaseId,
    ...(filter && { filter: filter as any }),
  })

  return response.results
}

export async function getPage(pageId: string) {
  return getNotion().pages.retrieve({ page_id: pageId })
}

export async function getPageBlocks(pageId: string) {
  const response = await getNotion().blocks.children.list({
    block_id: pageId,
  })

  return response.results
}
