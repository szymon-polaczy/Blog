<template>
  <Layout>
    <section>
      <header class="tag-header">
        <h2>Tag: {{ $context.tag }}</h2>
        <img src="../images.png" alt="" width="65">
      </header>

      <hr>

      <div class="container">
        <article v-for="edge in $page.posts.edges" :key="edge.node.id">
          <router-link :to="{path: '/post/' + slugFromContent(edge.node.content, edge.node.id) + '/'}">
            <h3>{{ titleFromContent(edge.node.content) }}</h3>
            <p>{{ edge.node.excerpt }}</p>
          </router-link>
          <div class="list-meta grey-text">
            <span class="tags" v-if="parseTags(edge.node.content).length">
              <router-link v-for="tag in parseTags(edge.node.content)" :key="tag" class="tag-link" :to="'/tag/' + slug(tag)">{{ tag }}</router-link>
            </span>
            <span class="modified" v-if="parseModified(edge.node.content)">{{ parseModified(edge.node.content) }}</span>
          </div>
        </article>
      </div>
    </section>
  </Layout>
</template>

<page-query>
query($ids: [ID]) {
  posts: allMarkdownPost(filter: { id: { in: $ids } }) {
    edges {
      node {
        id,
        excerpt,
        content
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: 'Get Over Life'
  },
  methods: {
    slug (text) {
      return String(text || '').replace(/ /g, '-').replace(/(\?|\[|\])/g, '').toLowerCase()
    },
    titleFromContent (html) {
      if (!html) return ''
      const match = String(html).match(/<h1[^>]*>(.*?)<\/h1>/i)
      return match ? match[1].replace(/<[^>]+>/g, '').trim() : ''
    },
    slugFromContent (html, fallback) {
      const title = this.titleFromContent(html) || String(fallback || '')
      return title.replace(/ /g, '-').replace(/(\?|\[|\])/g, '').toLowerCase()
    },
    parseTags (contentHtml) {
      if (!contentHtml) return []
      const firstPInner = (contentHtml.match(/<p>([\s\S]*?)<\/p>/i) || [,''])[1]
      const match = firstPInner.match(/Tags:\s*([\s\S]*?)(?:<br\s*\/?>|\n|\r|$|Modified\s+Date:)/i)
      if (!match) return []
      return match[1]
        .split(/[;,]/)
        .map(s => s.trim())
        .filter(Boolean)
    },
    parseModified (contentHtml) {
      if (!contentHtml) return ''
      const firstPInner = (contentHtml.match(/<p>([\s\S]*?)<\/p>/i) || [,''])[1]
      const match = firstPInner.match(/Modified\s+Date:\s*([\s\S]*?)(?:<br\s*\/?>|\n|\r|$)/i)
      return match ? match[1].trim() : ''
    }
  }
}
</script>

<style>
.tag-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.container a {
  color: #000;
  text-decoration: none;
}

.list-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.grey-text {
  color: #777;
}

.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag-link {
  color: #4da3ff;
}
</style>

