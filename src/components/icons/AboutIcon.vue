<template>
  <svg
    :class="getTheme"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="96"
    height="96"
  >
    <path
      d="M12 2C6.489 2 2 6.489 2 12s4.489 10 10 10 10-4.489 10-10S17.511 2 12 2zm0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8zm-1 3v2h2V7h-2zm0 4v6h2v-6h-2z"
    />
  </svg>
</template>

<script>
export default {
  methods: {
    getTheme() {
      return $vuetify.theme.dark ? "dark-svg" : "";
    },
  },
};
</script>

<style scoped>
.dark-svg {
  fill: #fff;
  stroke: #fff;
}
.light-svg {
  fill: #000;
  stroke: #000;
}
</style>