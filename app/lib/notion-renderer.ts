import type {
  BlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function renderRichText(items: RichTextItemResponse[]): string {
  return items
    .map((item) => {
      let text = escapeHtml(item.plain_text)

      if (item.annotations.bold) text = `<strong>${text}</strong>`
      if (item.annotations.italic) text = `<em>${text}</em>`
      if (item.annotations.strikethrough) text = `<s>${text}</s>`
      if (item.annotations.underline) text = `<u>${text}</u>`
      if (item.annotations.code)
        text = `<code>${text}</code>`

      if (item.href) {
        text = `<a href="${escapeHtml(item.href)}" target="_blank" rel="noopener noreferrer">${text}</a>`
      }

      return text
    })
    .join('')
}

function renderChildren(children: BlockObjectResponse[] | undefined): string {
  return children?.length ? renderBlocks(children) : ''
}

function renderBlock(block: BlockObjectResponse): string {
  const children = (block as any).children as BlockObjectResponse[] | undefined

  switch (block.type) {
    case 'paragraph': {
      const text = renderRichText(block.paragraph.rich_text)
      const nested = renderChildren(children)
      return nested ? `<p>${text}</p>${nested}` : `<p>${text}</p>`
    }

    case 'heading_1':
      return `<h1>${renderRichText(block.heading_1.rich_text)}</h1>`

    case 'heading_2':
      return `<h2>${renderRichText(block.heading_2.rich_text)}</h2>`

    case 'heading_3':
      return `<h3>${renderRichText(block.heading_3.rich_text)}</h3>`

    case 'bulleted_list_item': {
      const content = renderRichText(block.bulleted_list_item.rich_text)
      const nested = children ? `<ul>${renderBlocks(children)}</ul>` : ''
      return `<li>${content}${nested}</li>`
    }

    case 'numbered_list_item': {
      const content = renderRichText(block.numbered_list_item.rich_text)
      const nested = children ? `<ol>${renderBlocks(children)}</ol>` : ''
      return `<li>${content}${nested}</li>`
    }

    case 'to_do': {
      const checked = block.to_do.checked
      const content = renderRichText(block.to_do.rich_text)
      const checkbox = `<input type="checkbox" disabled${checked ? ' checked' : ''} />`
      const nested = renderChildren(children)
      return `<li>${checkbox} ${content}${nested}</li>`
    }

    case 'code': {
      const lang = block.code.language || ''
      const code = renderRichText(block.code.rich_text)
      return `<pre><code class="language-${escapeHtml(lang)}">${code}</code></pre>`
    }

    case 'quote': {
      const text = renderRichText(block.quote.rich_text)
      const nested = renderChildren(children)
      return `<blockquote>${text}${nested}</blockquote>`
    }

    case 'divider':
      return '<hr />'

    case 'image': {
      const url =
        block.image.type === 'external'
          ? block.image.external.url
          : block.image.file.url
      const caption = block.image.caption?.length
        ? renderRichText(block.image.caption)
        : ''
      return caption
        ? `<figure><img src="${escapeHtml(url)}" alt="${escapeHtml(block.image.caption.map((c) => c.plain_text).join(''))}" /><figcaption>${caption}</figcaption></figure>`
        : `<img src="${escapeHtml(url)}" alt="" />`
    }

    case 'video': {
      const url =
        block.video.type === 'external'
          ? block.video.external.url
          : block.video.file.url
      const caption = block.video.caption?.length
        ? renderRichText(block.video.caption)
        : ''
      return `<figure><video src="${escapeHtml(url)}" controls></video>${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`
    }

    case 'callout': {
      const icon =
        block.callout.icon?.type === 'emoji' ? block.callout.icon.emoji : ''
      const nested = renderChildren(children)
      return `<div class="callout"><span class="callout-icon">${icon}</span><div>${renderRichText(block.callout.rich_text)}${nested}</div></div>`
    }

    case 'toggle': {
      const summary = renderRichText(block.toggle.rich_text)
      const details = renderChildren(children)
      console.log('[DEBUG toggle]', JSON.stringify({
        id: block.id,
        has_children: block.has_children,
        childrenCount: children?.length ?? 0,
        childTypes: children?.map(c => c.type),
        renderedDetails: details.substring(0, 200),
      }))
      return `<details open><summary>${summary}</summary>${details}</details>`
    }

    case 'column_list':
    case 'column':
    case 'synced_block':
      return renderChildren(children)

    case 'table': {
      const rows = renderChildren(children)
      return `<table>${rows}</table>`
    }

    case 'table_row': {
      const cells = block.table_row.cells
        .map((cell) => `<td>${renderRichText(cell)}</td>`)
        .join('')
      return `<tr>${cells}</tr>`
    }

    case 'bookmark': {
      const url = block.bookmark.url
      const caption = block.bookmark.caption?.length
        ? renderRichText(block.bookmark.caption)
        : escapeHtml(url)
      return `<p><a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${caption}</a></p>`
    }

    case 'embed': {
      const url = block.embed.url
      const caption = block.embed.caption?.length
        ? renderRichText(block.embed.caption)
        : escapeHtml(url)
      return `<p><a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${caption}</a></p>`
    }

    case 'equation':
      return `<div class="equation">${escapeHtml(block.equation.expression)}</div>`

    default:
      return ''
  }
}

/**
 * Groups consecutive list items into <ul>/<ol> wrappers so the
 * rendered HTML is valid (list items must be inside a list element).
 */
export function renderBlocks(blocks: BlockObjectResponse[]): string {
  const parts: string[] = []
  let i = 0

  while (i < blocks.length) {
    const block = blocks[i]

    if (block.type === 'bulleted_list_item') {
      const items: string[] = []
      while (i < blocks.length && blocks[i].type === 'bulleted_list_item') {
        items.push(renderBlock(blocks[i]))
        i++
      }
      parts.push(`<ul>${items.join('')}</ul>`)
    } else if (block.type === 'numbered_list_item') {
      const items: string[] = []
      while (i < blocks.length && blocks[i].type === 'numbered_list_item') {
        items.push(renderBlock(blocks[i]))
        i++
      }
      parts.push(`<ol>${items.join('')}</ol>`)
    } else if (block.type === 'to_do') {
      const items: string[] = []
      while (i < blocks.length && blocks[i].type === 'to_do') {
        items.push(renderBlock(blocks[i]))
        i++
      }
      parts.push(`<ul class="to-do-list">${items.join('')}</ul>`)
    } else {
      parts.push(renderBlock(block))
      i++
    }
  }

  return parts.join('')
}
