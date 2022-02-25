import { computed, reactive } from "vue";
import InputUser from "./inputUser";
import ServiceUser from "./serviceUser";

const inputUser: InputUser[] = [];

const initialState = {
  searchInput: "",
  loading: false,
  error: "",
  total_count: 0,
  incomplete_results: false,
  page: 1,
  per_page: 20,
  items: inputUser,
};

const state = reactive(initialState);

const getters = {
  total_count: computed(() => state.total_count),
  items: computed(() => state.items),
  loading: computed(() => state.loading),
};

const actions = {
  clear: () => {
    state.searchInput = "";
    state.loading = false;
    state.error = "";
    state.total_count = 0;
    state.incomplete_results = false;
    state.page = 1;
    state.per_page = 20;
    state.items = [];
  },
  setSearchInput: (value: string): void => {
    state.searchInput = value;
  },
  setLoading: async (value: boolean): Promise<void> => {
    new Promise((resolve) => {
      state.loading = value;
      resolve(true);
    });
  },
  SearchUsers: async () => {
    const input = {
      search: state.searchInput,
      page: state.page,
      per_page: state.per_page,
    };
    const res = await ServiceUser.getUser(input);
    state.total_count = res.total_count;
    state.incomplete_results = res.incomplete_results;
    state.items = res.items;
  },
};

export { state, getters, actions };
