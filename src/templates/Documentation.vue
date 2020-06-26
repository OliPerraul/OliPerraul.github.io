<template>
  <Layout>
    <div class="content">
      <VueRemarkContent/>
    </div>
    <div class="sidebar">
      <Sidebar />
    </div>
  </Layout>
</template>

<script>
import Sidebar from '../components/Sidebar'
export default {
  components: {
    Sidebar
  }
}
</script>

<style>
h1 {
  margin-bottom: 2rem;
}

h2 {
  margin-bottom: 1rem;
}

h3, h4 {
  margin-bottom: 0.5rem;
}

p {
  text-align: justify;
  text-justify: inter-word;
  margin: 1.5rem 0;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  text-align: justify;
  text-justify: inter-word;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.center {
  display: block;
  margin: 1.5rem auto;
}

blockquote {
  background-color: whitesmoke;
  border: 1px;
  border-radius: 0.3rem;
  margin: 1.5rem 0;
  padding: 1rem;
}

code {
  font-family: monospace;
  font-size: 110%;
  font-weight: bold;
  color: lightcoral;
}

.content {
  float: left;
  width: 80%;
}

.sidebar {
  float: right;
  width: 20%;
  padding-left: 1rem;
}
</style>
