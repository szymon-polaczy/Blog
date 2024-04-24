<template>
    <Layout>  
        <main v-html="$page.markdownPost.content"/>

        <g-link to="/" class="go-back-link">Go back</g-link>

    </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Get Over Life'
  }
}
</script>

<style>

code {
  overflow-x: auto;
  padding: 10px 0;
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
</style>

<page-query>
  query ($id: ID) {
    markdownPost(id: $id ) {
        title,
        content
    }
}
</page-query>
