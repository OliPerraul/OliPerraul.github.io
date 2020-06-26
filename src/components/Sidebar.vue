<template>
  <div>
    <!-- GLOBAL -->
    <div v-for="edge in $static.docs.edges" :key="edge.node.id">
      <div v-if="edge.node.tag == 'global'">
        <b-button :to="edge.node.path" block variant="outline-info" size="sm" class="sidebar-custom">{{ edge.node.title }}</b-button>
      </div>
    </div>

    <!-- INSTALLATION -->
    <b-button v-b-toggle.collapse-install block variant="outline-info" size="sm" class="sidebar-custom">Installation &gt;</b-button>
    <!-- Element to collapse -->
    <b-collapse id="collapse-install">
      <b-card no-body class="sidebar-content">
        <div v-for="edge in $static.docs.edges" :key="edge.node.id">
          <div v-if="edge.node.tag == 'install'">
            <b-button :to="edge.node.path" block variant="outline-info" size="sm" class="text-left sidebar-custom">
                <small>{{ edge.node.title }}</small>
            </b-button>
          </div>
        </div>
      </b-card>
    </b-collapse>

    <!-- JAVA -->
    <b-button v-b-toggle.collapse-java block variant="outline-info" size="sm" class="sidebar-custom">Java &gt;</b-button>
    <!-- Element to collapse -->
    <b-collapse id="collapse-java">
      <b-card no-body class="sidebar-content">
        <div v-for="edge in $static.docs.edges" :key="edge.node.id">
          <div v-if="edge.node.tag == 'java'">
            <b-button :to="edge.node.path" block variant="outline-info" size="sm" class="text-left sidebar-custom">
                <small>{{ edge.node.title }}</small>
            </b-button>
          </div>
        </div>
      </b-card>
    </b-collapse>

    <!-- TUTORIALQUEST -->
    <b-button v-b-toggle.collapse-tutoquest block variant="outline-info" size="sm" class="sidebar-custom">TutorialQuest &gt;</b-button>
    <!-- Element to collapse -->
    <b-collapse id="collapse-tutoquest">
      <b-card no-body class="sidebar-content">
        <div v-for="edge in $static.docs.edges" :key="edge.node.id">
          <div v-if="edge.node.tag == 'tutorialquest'">
            <b-button :to="edge.node.path" block variant="outline-info" size="sm" class="text-left sidebar-custom">
                <small>{{ edge.node.title }}</small>
            </b-button>
          </div>
        </div>
      </b-card>
    </b-collapse>
  </div>
</template>

<static-query>
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
</static-query>

<style>
.sidebar-custom {
    margin: 0.5rem;
}
.sidebar-content {
    border: 0;
    margin: 0.5rem;
}
</style>
