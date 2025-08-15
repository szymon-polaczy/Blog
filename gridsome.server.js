// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const slug = (title, fallback = '') => {
  const base = (title ? String(title) : String(fallback))
  return base.replace(/ /g, '-').replace(/(\?|\[|\])/g, '').toLowerCase();
};

const extractTitleFromContent = (html) => {
  if (!html) return ''
  const match = String(html).match(/<h1[^>]*>(.*?)<\/h1>/i)
  if (!match) return ''
  // Strip any nested tags inside the H1
  return match[1].replace(/<[^>]+>/g, '').trim()
}

const extractTagsFromContent = (html) => {
  if (!html) return []
  const firstPInner = (String(html).match(/<p>([\s\S]*?)<\/p>/i) || [,''])[1]
  const match = firstPInner.match(/Tags:\s*([\s\S]*?)(?:<br\s*\/?>|\n|\r|$|Modified\s+Date:)/i)
  if (!match) return []
  return match[1]
    .split(/[;,]/)
    .map(s => s.trim())
    .filter(Boolean)
}

module.exports = function (api) {
  api.loadSource(({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  })

  api.createPages(async ({ graphql, createPage }) => {
    const { data, errors } = await graphql(`
      query markdownPost {
        markdownages: allMarkdownPost {
          edges {
            node {
              id,
              excerpt,
              content
            }
          }
        }
      }`)

    if (errors && errors.length) {
      console.warn('GraphQL errors while creating pages:', errors)
    }

    const edges = data && data.markdownages ? data.markdownages.edges : []

    const tagSlugToContext = {}

    edges.forEach(({ node }) => {
      const titleFromH1 = extractTitleFromContent(node.content)
      createPage({
        path: `/post/${slug(titleFromH1, node.id)}`,
        component: './src/templates/post.vue',
        context: {
          id: node.id
        }
      })

      const tags = extractTagsFromContent(node.content)
      tags.forEach((tag) => {
        const tagSlug = slug(tag)
        if (!tagSlugToContext[tagSlug]) {
          tagSlugToContext[tagSlug] = { tag, ids: [] }
        }
        tagSlugToContext[tagSlug].ids.push(node.id)
      })
    })

    // Create tag listing pages
    Object.entries(tagSlugToContext).forEach(([tagSlug, { tag, ids }]) => {
      createPage({
        path: `/tag/${tagSlug}`,
        component: './src/templates/tag.vue',
        context: {
          tag,
          slug: tagSlug,
          ids
        }
      })
    })
  })
}
