<template>
  <div class="w-96 bg-white rounded-lg p-8 shadow-md">
    <div class="text-right mb-10">
      <input
        type="text"
        readonly
        class="w-full h-full text-white text-lg p-2 border-none bg-opacity-50 bg-black py-2 px-4"
        :value="displayValue"
      />
      <div class="text-red-500 text-sm mt-2" v-if="errorMessage">
        {{ errorMessage }}
      </div>
    </div>
    <div class="grid grid-cols-4 gap-2">
      <button
        v-for="button in buttons"
        :key="button"
        class="w-full h-full bg-opacity-40 border-none cursor-pointer bg-gray-800 text-white font-bold py-2 px-4 rounded hover:bg-black hover:bg-opacity-50"
        :class="{ operation: isOperationButton(button) }"
        @click="appendToDisplay(button)"
      >
        {{ button }}
      </button>
    </div>
    <div class="mt-4 flex justify-between">
      <button
        class="bg-green-800 text-white font-bold py-2 px-4 rounded"
        @click="clearValue"
      >
        Clear
      </button>
      <button
        class="bg-red-700 text-white font-bold py-2 px-4 rounded"
        @click="evaluateExpression"
      >
        Evaluate
      </button>
      <button
        class="bg-red-700 text-white font-bold py-2 px-4 rounded"
        @click="useLastResult"
      >
        Last Result
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Mutation, Action } from "vuex-class";

@Component
export default class Calculator extends Vue {
  @State("displayValue") displayValue!: string;
  @State("errorMessage") errorMessage!: string;
  @Mutation("setDisplayValue") setDisplayValue!: (value: string) => void;
  @Mutation("setErrorMessage") setErrorMessage!: (message: string) => void;
  @Mutation("setLastResult") setLastResult!: (result: string) => void;
  @Action("clearValue") clearValue!: () => void;
  @Action("evaluateExpression") evaluateExpression!: () => void;
  @Action("appendToDisplay") appendToDisplay!: (value: string) => void;
  @Action("useLastResult") useLastResult!: () => void;

  buttons: string[] = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "(",
    ")",
    "+",
  ];

  isOperationButton(button: string): boolean {
    return ["+", "-", "*", "/"].includes(button);
  }
}
</script>

<style scoped>
.operation {
  background-color: crimson;
}
</style>
