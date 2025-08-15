<template>
    <Layout>  
    <div class="post-header">
      <g-link to="/" class="logo">
        <img src="../images.png" alt="" width="65">
      </g-link>
      <div class="post-meta" v-if="hasMeta">
        <div class="meta-row grey-text">
          <span class="tags" v-if="tags && tags.length">
            <template v-for="(tag, i) in tags">
              <router-link :key="tag" class="tag-link" :to="'/tag/' + slug(tag)">{{ tag }}</router-link><span v-if="i < tags.length - 1">, </span>
            </template>
          </span>
          <span class="modified" v-if="modifiedDate">{{ modifiedDate }}</span>
        </div>
      </div>
    </div>

    <main v-html="displayContentHtml"/>

    <g-link to="/" class="go-back-link">Go back</g-link>

    </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Get Over Life'
  },
  methods: {
    slug (text) {
      return String(text || '').replace(/ /g, '-').replace(/(\?|\[|\])/g, '').toLowerCase()
    }
  },
  computed: {
    contentHtml () {
      return this.$page?.markdownPost?.content || ''
    },
    displayContentHtml () {
      let html = this.contentHtml
      const firstPMatch = html.match(/<p>([\s\S]*?)<\/p>/i)
      if (!firstPMatch) return html
      const fullMatch = firstPMatch[0]
      const inner = firstPMatch[1]
      let newInner = inner
        .replace(/\s*Tags:\s*[\s\S]*?(?:<br\s*\/?>|\n|\r|$|Modified\s+Date:)/i, (m) => {
          return m.includes('Modified') ? 'Modified Date:' : ''
        })
        .replace(/\s*Modified\s+Date:\s*[\s\S]*?(?:<br\s*\/?>|\n|\r|$)/i, '')
        .trim()

      if (!newInner) {
        // Remove the entire first paragraph
        return html.replace(fullMatch, '')
      }
      // Replace the first paragraph content with cleaned inner
      const cleanedFirstP = fullMatch.replace(inner, newInner)
      return html.replace(fullMatch, cleanedFirstP)
    },
    tags () {
      const firstPInner = (this.contentHtml.match(/<p>([\s\S]*?)<\/p>/i) || [,''])[1]
      const match = firstPInner.match(/Tags:\s*([\s\S]*?)(?:<br\s*\/?>|\n|\r|$|Modified\s+Date:)/i)
      if (!match) return []
      return match[1]
        .split(/[;,]/)
        .map(s => s.trim())
        .filter(Boolean)
    },
    modifiedDate () {
      const firstPInner = (this.contentHtml.match(/<p>([\s\S]*?)<\/p>/i) || [,''])[1]
      const match = firstPInner.match(/Modified\s+Date:\s*([\s\S]*?)(?:<br\s*\/?>|\n|\r|$)/i)
      return match ? match[1].trim() : ''
    },
    hasMeta () {
      return (this.tags && this.tags.length) || this.modifiedDate
    }
  }
}
</script>

<style>
body {
  padding-top: 25px;
}

.post-header {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.logo {
  padding-bottom: 15px;
  margin-right: auto;
}

.post-meta {
  flex: 1;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  flex-flow: column;
  align-items: flex-end;  
}

.grey-text {
  color: #777;
}

pre {
  overflow-x: auto;
  padding: 10px 0;
}

a {
  color: #0078d4;
}

main {
  max-width: 100%;
}

h1 {
  font-size: clamp(2em, 3vw, 3em);
}

h2 {
  font-size: clamp(1.6em, 2.5vw, 2.5em);
}

h3 {
  font-size: clamp(1.45em, 2.2vw, 2.17em);
}

.tag-link {
  color: #4da3ff;
}
</style>

<page-query>
  query ($id: ID) {
    markdownPost(id: $id ) {
        content
    }
}
</page-query>
