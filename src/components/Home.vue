<template>
  <div>
    <div v-if="loading" class="loader-container">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <loadFailComponent v-else-if="networkError"></loadFailComponent>
    <div v-else class="home-container">
      <div class="color-row-container">
        <div v-for="(item, index) in colorRow" :key="item.id">
          <div
            class="dot"
            @click="
              changePaletteColors(item.color), (highlightSelectedColor = index)
            "
            :style="[
              getRowColors(item.hex),
              highlightSelectedColor === index
                ? styleSelectedColor(index, item.hex)
                : '',
            ]"
          ></div>
        </div>
      </div>
      <div class="color-card-container">
        <v-card
          v-for="(item, index) in colors[selectedColor]"
          :key="item.hex"
          :style="getCardColors(item.hex)"
          class="color-card"
          @mouseover="showHexColorCode = index"
          @mouseleave="showHexColorCode = null"
        >
          <p
            id="hex-code"
            v-if="showHexColorCode === index"
            v-clipboard:copy="item.hex"
            @click="showCopyMessage(item.hex, $event)"
            class="hex-text"
          >
            {{ item.hex }}
          </p>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import loadFailComponent from "./LoadFailed";
export default {
  name: "Home",
  components: {
    loadFailComponent,
  },
  data() {
    return {
      colors: {},
      colorRow: [],
      selectedColor: "",
      snackBar: false,
      snackBarTimeout: 1000,
      showHexColorCode: null,
      highlightSelectedColor: 0,
      isHovered: false,
      loading: false,
      networkError: false,
    };
  },
  created() {
    this.loading = true;
    db.collection("colors")
      .doc("material")
      .get()
      .then((snapshot) => {
        this.colorRow = snapshot.data().colorRow;
        this.colors = snapshot.data();
        this.selectedColor = "red";
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
    getSelectedColor(index) {
      return { "background-color": hexValue };
    },
    getRowColors(hexValue) {
      return { "background-color": hexValue };
    },
    styleSelectedColor(index, hexValue) {
      return {
        border: "5px solid" + hexValue,
        "box-shadow": "0 0 0 7px #FFFFFF inset",
      };
    },
    changePaletteColors(color) {
      this.selectedColor = color;
    },
    showCopyMessage(hexValue, e) {
      e.target.innerText = "Copied 🤟";
      setTimeout(() => (e.target.innerText = hexValue), 1500);
    },
  },
};
</script>

<style scoped>
.home-container {
  height: 80vh;
  display: grid;
  grid-template-columns: 10% 90%;
}
.color-row-container {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  justify-content: flex-start;
  align-items: center;
}
.loader-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  flex-direction: column;
}
.color-row-container::-webkit-scrollbar,
.color-card-container::-webkit-scrollbar {
  width: 4px; /* width of the entire scrollbar */
}

.color-row-container::-webkit-scrollbar-track,
.color-card-container::-webkit-scrollbar-track {
  background: #f5f5f5; /* color of the tracking area */
}

.color-row-container::-webkit-scrollbar-thumb,
.color-card-container::-webkit-scrollbar-thumb {
  background-color: #e0e0e0; /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
}

.dot {
  width: 50px;
  height: 50px;
  margin: 10px;
  border-radius: 50%;
  cursor: pointer;
}

.color-card-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-row-gap: 40px;
  justify-items: center;
  overflow: auto;
  padding-top: 10px;
}
.color-card {
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px;
  transition: all 0.2s ease-in-out;
}
.color-card:hover {
  box-shadow: rgba(0, 0, 0, 0.22) 0px 20px 42px;
  transform: translate3d(0px, -2px, 0px);
  cursor: pointer;
}
.hex-text {
  color: white;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
#hex-code {
  border-radius: 16px 0px 16px 0px;
}
#hex-code:hover {
  background-color: rgba(0, 0, 0, 0.3);
}
.v-application p {
  margin-bottom: 0px;
}
.v-sheet.v-card {
  border-radius: 16px;
}
@media screen and (max-width: 1248px) {
  .color-card-container {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media screen and (max-width: 1024px) {
  .color-card-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 768px) {
  .color-card-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 600px) {
  .home-container {
    grid-template-columns: 20% 80%;
  }

  .color-card-container {
    grid-template-columns: repeat(1, 1fr);
    grid-row-gap: 20px;
  }

  .color-card {
    width: 250px;
    height: 125px;
  }
}

@media screen and (max-width: 350px) {
  .color-card-container {
    grid-template-columns: repeat(1, 1fr);
    grid-row-gap: 20px;
  }

  .color-card {
    width: 200px;
    height: 100px;
  }
}
</style>