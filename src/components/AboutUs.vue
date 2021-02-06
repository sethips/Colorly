<template>
  <div id="aboutus-container">
    <main class="main-title">
      <img id="app-logo" src="../assets/icons/icon.png" />
    </main>
    <article class="description">
      Colorly App is a Library of Colors, Gradients & Palettes. The Idea is to
      create 'One Stop Destination' for Designers & Developers to discover the
      perfect color schemes for their next website or design.
    </article>
    <div class="footer">
      <v-icon @click="goBack">mdi-close-circle-outline</v-icon>
    </div>
  </div>
</template>

<script>
import router from "../router";
export default {
  created() {},
  methods: {
    goBack() {
      router.go(-1);
    },
  },
};
</script>

<style scoped>
#aboutus-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

#app-logo {
  width: 100px;
  height: 100px;
}

.main-title,
.description,
.footer {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.description {
  width: 60vw;
  text-align: center;
  font-size: 16px;
}
</style>