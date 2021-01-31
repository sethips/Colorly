<template>
  <div class="main-container">
    <v-toolbar class="tool-bar" flat dense v-show="$route.name !== 'About'">
      <v-icon id="app-icon">$app</v-icon>
      <v-toolbar-title>{{ appTitle }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn :ripple="false" icon @click="switchTheme">
        <v-icon v-if="!$vuetify.theme.dark">mdi-weather-night</v-icon>
        <v-icon v-if="$vuetify.theme.dark">mdi-weather-sunny</v-icon>
      </v-btn>

      <v-btn :ripple="false" icon to="/about">
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs v-model="activeTab" align-with-title>
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab v-for="tab of tabs" :key="tab.id" :to="tab.route" exact>
            {{ tab.name }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items class="tab-item" touchless v-model="activeTab">
      <v-tab-item v-for="tab of tabs" :key="tab.id" :value="tab.route">
        <div :class="setHeight">
          <transition>
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </transition>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { eventBus } from "../main";

export default {
  components: {},
  created() {},
  data() {
    return {
      activeTab: "/",
      appTitle: "Colorly",
      tabs: [
        { id: 1, name: "Solids", route: "/" },
        { id: 2, name: "Gradients", route: "/gradients" },
        { id: 3, name: "Palettes", route: "/palettes" },
      ],
    };
  },
  methods: {
    switchTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("storedTheme", this.$vuetify.theme.dark.toString());
    },
  },
  computed: {
    setHeight() {
      return this.$route.name !== "About"
        ? "tab-item-wrapper"
        : "about-us-wrapper";
    },
  },
};
</script>

<style>
.tab-item-wrapper {
  /* v-tabs container height is 96px */
  height: calc(100vh - 96px) !important;
  padding-top: 10px;
}
.about-us-wrapper {
  height: 100vh;
}
#app-icon {
  margin: 10px 10px 10px 10px;
}

@media screen and (max-width: 768px) {
  #app-icon {
    margin: 0px 10px 0px 0px;
  }
}
</style>