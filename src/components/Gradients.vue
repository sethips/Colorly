<template>
  <div>
    <div v-if="loading" class="loader-container">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <loadFailComponent v-else-if="networkError"></loadFailComponent>
    <div v-else class="gradient-container">
      <v-card
        v-for="(item, index) in gradients"
        :key="item.hexLeft"
        :style="{
          backgroundImage: `linear-gradient(${gradientAngle}deg ,${item.hexLeft}, ${item.hexRight})`,
        }"
        class="gradient-card"
        @mouseover="showHexColorCode = index"
        @mouseleave="showHexColorCode = null"
      >
        <p
          id="hex-code-left"
          :ref="item.hexLeft"
          v-clipboard:copy="item.hexLeft"
          @click="showCopyMessage(item.hexLeft, $event)"
          v-if="showHexColorCode === index"
          class="hex-text"
        >
          {{ item.hexLeft }}
        </p>
        <p
          id="hex-code-right"
          :ref="item.hexRight"
          v-clipboard:copy="item.hexRight"
          @click="showCopyMessage(item.hexRight, $event)"
          v-if="showHexColorCode === index"
          class="hex-text"
        >
          {{ item.hexRight }}
        </p>
      </v-card>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import loadFailComponent from "./LoadFailed";

export default {
  name: "Gradients",
  components: {
    loadFailComponent,
  },
  data() {
    return {
      gradients: [],
      gradientAngle: 90,
      showHexColorCode: null,
      loading: false,
      networkError: false,
    };
  },
  created() {
    this.loading = true;
    db.collection("colors")
      .doc("gradients")
      .get()
      .then((snapshot) => {
        this.gradients = snapshot.data().gradientColors;
      })
      .catch((error) => {
        this.networkError = true;
      })
      .finally(() => (this.loading = false));
  },
  methods: {
    showCopyMessage(hexValue, e) {
      e.target.innerText = "Copied 🤟";
      setTimeout(() => (e.target.innerText = hexValue), 1500);
    },
  },
  computed: {},
};
</script>

<style scoped>
.gradient-container {
  overflow-y: auto;
  height: 80vh;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-row-gap: 40px;
  justify-items: center;
  padding-top: 10px;
}

.loader-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  flex-direction: column;
}

.gradient-container::-webkit-scrollbar {
  width: 4px; /* width of the entire scrollbar */
}

.gradient-container::-webkit-scrollbar-track {
  background: #f5f5f5; /* color of the tracking area */
}

.gradient-container::-webkit-scrollbar-thumb {
  background-color: #e0e0e0; /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
}

.gradient-card {
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px;
  transition: all 0.2s ease-in-out;
}

.gradient-card:hover {
  box-shadow: rgba(0, 0, 0, 0.22) 0px 20px 42px;
  transform: translate3d(0px, -2px, 0px);
  cursor: pointer;
}

#hex-code-left {
  align-self: flex-start;
  border-radius: 16px 0px 16px 0px;
}
#hex-code-right {
  align-self: flex-end;
  border-radius: 16px 0px 16px 0px;
}
#hex-code-left:hover {
  background-color: rgba(0, 0, 0, 0.3);
}
#hex-code-right:hover {
  background-color: rgba(0, 0, 0, 0.3);
}
.hex-text {
  color: white;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
.v-application p {
  margin-bottom: 0px;
}
.v-sheet.v-card {
  border-radius: 16px;
}
@media screen and (max-width: 1248px) {
  .gradient-container {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media screen and (max-width: 1024px) {
  .gradient-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 768px) {
  .gradient-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 600px) {
  .gradient-container {
    grid-template-columns: repeat(1, 1fr);
    grid-row-gap: 20px;
  }
  .gradient-card {
    width: 300px;
    height: 150px;
  }
}

@media screen and (max-width: 350px) {
  .gradient-card {
    width: 250px;
    height: 125px;
  }
}
</style>