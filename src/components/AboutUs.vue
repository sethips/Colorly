<template>
  <div id="aboutus-container">
    <main class="main-title">
      <img id="app-logo" src="../assets/icons/icon.png" />
    </main>
    <article class="description">
      "Colorly" is a Library of Colors, Gradients & Palettes. The Idea is to
      create 'One Stop Destination' for Designers & Developers to discover the
      perfect color schemes for their next website or design.
    </article>
    <div>
      <span>Project By - </span
      ><span class="twitter-name">
        <v-icon class="twitter-logo">mdi-twitter</v-icon>
        <a :href="twitterLink" target="_blank">12sanketkumbhar</a>
      </span>
    </div>
    <div class="footer">
      <v-icon class="go-back-button" @click="goBack"
        >mdi-close-circle-outline</v-icon
      >
    </div>
  </div>
</template>

<script>
import router from "../router";
export default {
  data() {
    return {
      twitterLink: "https://twitter.com/12sanketkumbhar",
    };
  },
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
  font-weight: bold;
  text-align: center;
  font-size: 16px;
}

.go-back-button {
  font-size: 36px;
}
.twitter-logo,
.twitter-name {
  color: #1da1f2;
  font-weight: bold;
}
</style>