import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { getConfig } from './config'
import { queryDatabase, getPage, getPageBlocks } from './notion'
import { renderBlocks } from './notion-renderer'

export interface BlogPost {
  id: string
  title: string
  author: string
  date: string
  readTime: string
  blurb: string
  image: string
  tags: string[]
  content: string
}

function getPlainText(
  property: PageObjectResponse['properties'][string] | undefined
): string {
  if (!property) return ''
  switch (property.type) {
    case 'title':
      return property.title.map((t) => t.plain_text).join('')
    case 'rich_text':
      return property.rich_text.map((t) => t.plain_text).join('')
    default:
      return ''
  }
}

function formatDate(isoDate: string | undefined | null): string {
  if (!isoDate) return ''
  const d = new Date(isoDate)
  if (isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function getFileUrl(
  property: PageObjectResponse['properties'][string] | undefined
): string {
  if (property?.type !== 'files') return ''
  const file = property.files[0]
  if (!file) return ''
  return file.type === 'external' ? file.external.url : file.file.url
}

function mapPageToPost(page: PageObjectResponse): Omit<BlogPost, 'content'> {
  const props = page.properties

  const tagsProperty = props['Tags']
  const tags =
    tagsProperty?.type === 'multi_select'
      ? tagsProperty.multi_select.map((t) => t.name)
      : []

  const dateProperty = props['Date']
  let date = ''
  if (dateProperty?.type === 'date' && dateProperty.date?.start) {
    date = formatDate(dateProperty.date.start)
  }
  if (!date && props['Created time']?.type === 'created_time') {
    date = formatDate(props['Created time'].created_time)
  }
  if (!date) {
    date = formatDate(page.created_time)
  }

  const personProperty = props['Person']
  let author = ''
  if (personProperty?.type === 'people' && personProperty.people.length > 0) {
    const person = personProperty.people[0]
    author = 'name' in person ? (person.name ?? '') : ''
  }
  if (!author) author = getPlainText(props['Author'])

  return {
    id: page.id,
    title: getPlainText(props['Title']),
    author,
    date,
    readTime: getPlainText(props['Read Time']),
    blurb: getPlainText(props['Blurb']),
    image: getFileUrl(props['Image']),
    tags,
  }
}

export async function getBlogPosts(): Promise<Omit<BlogPost, 'content'>[]> {
  const { notion } = await getConfig()

  const pages = await queryDatabase(notion.databaseId, {
    filter: {
      property: 'Status',
      status: { equals: 'Published' },
    },
    sorts: [{ timestamp: 'created_time', direction: 'descending' }],
    pageSize: 3,
  })

  return pages
    .filter((p): p is PageObjectResponse => 'properties' in p)
    .map(mapPageToPost)
}

export async function getBlogPost(
  pageId: string
): Promise<BlogPost | null> {
  try {
    const [page, blocks] = await Promise.all([
      getPage(pageId),
      getPageBlocks(pageId),
    ])

    if (!('properties' in page)) return null

    const post = mapPageToPost(page as PageObjectResponse)
    const content = renderBlocks(blocks)

    return { ...post, content }
  } catch {
    return null
  }
}
