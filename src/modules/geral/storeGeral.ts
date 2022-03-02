import { computed, reactive } from "vue";

const initialState = {
  errorMessage: "",
  loading: false,
};

const state = reactive(initialState);

const getters = {
  errorMessage: computed(() => state.errorMessage),
  loading: computed(() => state.loading),
};

const actions = {
  setErrorMessage: async (msg: string): Promise<string> => {
    return new Promise((resolve) => {
      state.errorMessage = msg;
      resolve(state.errorMessage);
    });
  },
  setLoading: async (value: boolean): Promise<boolean> => {
    return new Promise((resolve) => {
      state.loading = value;
      resolve(state.loading);
    });
  },
  clear: async (): Promise<void> => {
    await new Promise((resolve) => {
      state.errorMessage = initialState.errorMessage;
      state.loading = initialState.loading;
      resolve(true);
    });
  },
};

export { state, getters, actions };
