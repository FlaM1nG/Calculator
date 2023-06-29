<template>
  <div id="app">
    <Calculator />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Calculator from "./components/Calculator.vue";

@Component({
  components: {
    Calculator,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}
</style>
