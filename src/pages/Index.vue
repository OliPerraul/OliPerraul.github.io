<template>
  <Layout>
    <b-col>
      <img class="img-home" src="../../assets/TutorialQuest_home.png"/>
    </b-col>
    <b-col>
      <h3>Global</h3>
      <div class="mb-4">
        <div v-for="edge in $page.docs.edges" :key="edge.node.id">
          <div v-if="edge.node.tag == 'global'">
            <g-link :to="edge.node.path">{{ edge.node.title }}</g-link>
          </div>
        </div>
      </div>
      <h3>Installation</h3>
      <div class="mb-4">
        <div v-for="edge in $page.docs.edges" :key="edge.node.id">
          <div v-if="edge.node.tag == 'install'">
            <g-link :to="edge.node.path">{{ edge.node.title }}</g-link>
          </div>
        </div>
      </div>
      <h3>Java</h3>
      <div class="mb-4">
        <div v-for="edge in $page.docs.edges" :key="edge.node.id">
          <div v-if="edge.node.tag == 'java'">
            <g-link :to="edge.node.path">{{ edge.node.title }}</g-link>
          </div>
        </div>
      </div>
    </b-col>
    <b-col>
      <h3>TutorialQuest</h3>
      <div class="mb-4">
        <div v-for="edge in $page.docs.edges" :key="edge.node.id">
          <div v-if="edge.node.tag == 'tutorialquest'">
            <g-link :to="edge.node.path">{{ edge.node.title }}</g-link>
          </div>
        </div>
      </div>
    </b-col>
  </Layout>
</template>

<page-query>
  query Documentation {
    docs: allDocumentation(sortBy: "order", order: ASC) {
      edges {
        node {
          order
          title
          tag
          path
        }
      }
    }
  }
</page-query>

<script>
export default {
  metaInfo: {
    title: "Accueil",
  },
};
</script>

<style>
.img-home {
  width: 100%;
}
</style>
