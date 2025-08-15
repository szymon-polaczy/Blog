<template>
  <Layout>
    <section>
      <header>
        <h2>Here are my blogposts</h2>
        <img src="../images.png" alt="" width="65">
      </header>

      <hr>

      <div class="container">
        <article v-for="edge in $page.markdownages.edges" :key="edge.node.id">
          <router-link :to="{path: 'post/' + slugFromContent(edge.node.content, edge.node.id) + '/'}">
            <h3>{{ titleFromContent(edge.node.content) }}</h3>
            <p>{{edge.node.excerpt}}</p>
            <div class="list-meta grey-text">
              <span class="tags" v-if="parseTags(edge.node.content).length">{{ parseTags(edge.node.content).join(', ') }}</span>
              <span class="modified" v-if="parseModified(edge.node.content)">{{ parseModified(edge.node.content) }}</span>
            </div>
          </router-link>
        </article>
      </div>
    </section>

  </Layout>
</template>

<page-query>
  query {
    markdownages: allMarkdownPost {
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
.home-links a {
  margin-right: 1rem;
}

.container a {
  color: #000;
  text-decoration: none;
}

.container a:focus,
.container a:hover {
  text-decoration: underline;
}

ol, ul {
  padding-inline-start: 17px;
}


header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-flow: row;
  gap: 20px;
}

.list-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.grey-text {
  color: #777;
}

/* ensure grey color within clickable article link */
.container a .list-meta {
  color: #777;
}
</style>
