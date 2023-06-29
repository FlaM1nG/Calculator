import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import DOMPurify from "dompurify";

Vue.use(Vuex);

interface Calculator {
  displayValue: string;
  errorMessage: string;
  lastResult: string;
}

const store: StoreOptions<Calculator> = {
  state: {
    displayValue: "",
    errorMessage: "",
    lastResult: "",
  },
  mutations: {
    setDisplayValue(state, value: string) {
      state.displayValue = value;
    },
    setErrorMessage(state, message: string) {
      state.errorMessage = message;
    },
    setLastResult(state, result: string) {
      state.lastResult = result;
    },
  },
  actions: {
    clearValue({ commit }) {
      commit("setDisplayValue", "");
      commit("setErrorMessage", "");
    },
    evaluateExpression({ state, commit }) {
      try {
        const sanitizedExpression = DOMPurify.sanitize(state.displayValue);
        const result = eval(sanitizedExpression);
        const resultString = String(result);
        commit("setDisplayValue", resultString);
        commit("setErrorMessage", "");
        commit("setLastResult", resultString);
      } catch (error) {
        commit("setErrorMessage", "Error evaluating this expression");
      }
    },
    appendToDisplay({ commit, state }, value: string) {
      const newDisplayValue = state.displayValue + value;
      commit("setDisplayValue", newDisplayValue);
    },
    useLastResult({ commit, state }) {
      if (state.lastResult) {
        const newDisplayValue = state.displayValue + state.lastResult;
        commit("setDisplayValue", newDisplayValue);
      }
    },
  },
};

export default new Vuex.Store<Calculator>(store);
