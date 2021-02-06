<template>
  <div>
    <div v-if="loading" class="loader-container">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <loadFailComponent v-else-if="networkError"></loadFailComponent>
    <div v-else class="palette-container">
      <v-card
        class="palette-card"
        v-for="(item, index) in palettes"
        :key="item.id"
        @mouseover="showHexColorCode = index"
        @mouseleave="showHexColorCode = null"
      >
        <div class="palette-child" :style="getCardColors(item.hexOne)">
          <p
            id="hex-code-one"
            v-if="showHexColorCode === index"
            v-clipboard:copy="item.hexOne"
            @click="showCopyMessage(item.hexOne, $event)"
            class="hex-text"
          >
            {{ item.hexOne }}
          </p>
        </div>
        <div class="palette-child" :style="getCardColors(item.hexTwo)">
          <p
            id="hex-code-two"
            v-if="showHexColorCode === index"
            v-clipboard:copy="item.hexTwo"
            @click="showCopyMessage(item.hexTwo, $event)"
            class="hex-text"
          >
            {{ item.hexTwo }}
          </p>
        </div>
        <div class="palette-child" :style="getCardColors(item.hexThree)">
          <p
            id="hex-code-three"
            v-if="showHexColorCode === index"
            v-clipboard:copy="item.hexThree"
            @click="showCopyMessage(item.hexThree, $event)"
            class="hex-text"
          >
            {{ item.hexThree }}
          </p>
        </div>
        <div class="palette-child" :style="getCardColors(item.hexFour)">
          <p
            id="hex-code-four"
            v-if="showHexColorCode === index"
            v-clipboard:copy="item.hexFour"
            @click="showCopyMessage(item.hexFour, $event)"
            class="hex-text"
          >
            {{ item.hexFour }}
          </p>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import loadFailComponent from "./LoadFailed";

export default {
  name: "Palettes",
  components: {
    loadFailComponent,
  },
  data() {
    return {
      palettes: [],
      showHexColorCode: null,
      loading: false,
      networkError: false,
    };
  },
  created() {
    this.loading = true;
    db.collection("colors")
      .doc("palletes")
      .get()
      .then((snapshot) => {
        this.palettes = snapshot.data().palleteColors;
      })
      .catch((error) => {
        this.networkError = true;
      })
      .finally(() => (this.loading = false));
  },
  methods: {
    getCardColors(hexValue) {
      return { "background-color": hexValue };
    },
    showCopyMessage(hexValue, e) {
      e.target.innerText = "Copied 🤟";
      setTimeout(() => (e.target.innerText = hexValue), 1500);
    },
  },
  computed: {},
};
</script>

<style scoped>
.palette-container {
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

.palette-container::-webkit-scrollbar {
  width: 4px; /* width of the entire scrollbar */
}

.palette-container::-webkit-scrollbar-track {
  background: #f5f5f5; /* color of the tracking area */
}

.palette-container::-webkit-scrollbar-thumb {
  background-color: #e0e0e0; /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
}

.palette-card {
  width: 200px;
  height: 200px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px;
  transition: all 0.2s ease-in-out;
}

.palette-child {
  width: 100%;
  height: 25%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

.palette-card:hover {
  box-shadow: rgba(0, 0, 0, 0.22) 0px 20px 42px;
  transform: translate3d(0px, -2px, 0px);
  cursor: pointer;
}

#hex-code-one,
#hex-code-two,
#hex-code-three {
  align-self: flex-end;
  border-radius: 16px 0px 0px 0px;
}
#hex-code-four {
  align-self: flex-end;
  border-radius: 16px 0px 16px 0px;
}
.hex-text:hover {
  background-color: rgba(0, 0, 0, 0.3);
}

.hex-text {
  color: white;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 14px;
}

.v-application p {
  margin-bottom: 0px;
}
.v-sheet.v-card {
  border-radius: 16px;
}
@media screen and (max-width: 1248px) {
  .palette-container {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media screen and (max-width: 1024px) {
  .palette-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 768px) {
  .palette-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 600px) {
  .palette-container {
    grid-template-columns: repeat(1, 1fr);
    grid-row-gap: 20px;
  }
  .palette-card {
    width: 250px;
    height: 250px;
  }
}

@media screen and (max-width: 350px) {
  .palette-card {
    width: 250px;
    height: 250px;
  }
}
</style>