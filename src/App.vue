<template>
  <v-app id="app">
    <Navbar></Navbar>
  </v-app>
</template>

<script>
import Navbar from "../src/components/Navbar";
export default {
  name: "App",
  data() {
    return {
      showAbout: false,
    };
  },
  components: {
    Navbar,
  },
  created() {
    const themeValue = localStorage.getItem("storedTheme");
    if (themeValue) {
      if (themeValue === "true") {
        this.$vuetify.theme.dark = true;
      } else {
        this.$vuetify.theme.dark = false;
      }
    }
  },
};
</script>
 
<style>
</style>
