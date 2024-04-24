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

</style>

<page-query>
  query ($id: ID) {
    markdownPost(id: $id ) {
        title,
        content
    }
}
</page-query>
