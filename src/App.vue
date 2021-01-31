<template>
  <v-app id="app">
    <Navbar></Navbar>
  </v-app>
</template>

<script>
import Navbar from "../src/components/Navbar";
import { eventBus } from "./main";

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
    const theme = localStorage.getItem("storedTheme");
    if (theme) {
      if (theme === "true") {
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
