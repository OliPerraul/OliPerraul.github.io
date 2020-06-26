<template>
  <div>
    <header class="mb-5">
      <b-navbar type="light" variant="light">
        <b-navbar-brand href="/">
          <img class="logo" src="../../assets/TutorialQuest_logo.png">
          Tutorial Quest
        </b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="/">
            Accueil
          </b-nav-item>
          <b-nav-item href="/about/">
            A propos
          </b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </header>
    <b-container>
      <b-row class="mb-5">
        <slot />
      </b-row>
    </b-container>
  </div>
</template>

<style>
.logo {
  width: 50px;
}
</style>
