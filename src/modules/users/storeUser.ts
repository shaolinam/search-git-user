import { computed, reactive } from "vue";
import InputUser from "./inputUser";
import ServiceUser from "./serviceUser";

const inputUser: InputUser[] = [];

const initialState = {
  searchInput: "",
  loading: false,
  runSearch: false,
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
  lastPage: computed(() => {
    if (state.total_count == 0) return 0;
    const totalPage = Math.trunc(state.total_count / state.per_page);
    const modTotalPage = state.total_count % state.per_page;
    if (modTotalPage == 0) {
      return totalPage;
    } else {
      return totalPage + 1;
    }
  }),
  actual_page: computed(() => state.page),
  error: computed(() => state.error),
  runSearch: computed(() => state.runSearch),
};

const actions = {
  clear: () => {
    state.searchInput = "";
    state.loading = false;
    state.runSearch = false;
    state.error = "";
    state.total_count = 0;
    state.incomplete_results = false;
    state.page = 1;
    state.per_page = 20;
    state.items = [];
  },
  setError: async (msg: string): Promise<string> => {
    return new Promise((resolve) => {
      state.error = msg;
      resolve(state.error);
    });
  },
  setRunSearch: async (value: boolean): Promise<boolean> => {
    return new Promise((resolve) => {
      state.runSearch = value;
      resolve(state.runSearch);
    });
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
  getName: async (url: string): Promise<string> => {
    return await ServiceUser.getNameUser(url);
  },
  setSelectedPage: async (page: number): Promise<number> => {
    await actions.setError("");
    if (getters.total_count.value == 0)
      throw new Error("Não existe dados para paginar!");
    if (!page || page < 1) throw new Error("Página inválida!");
    if (page > getters.lastPage.value)
      throw new Error("Máximo de páginas excedido!");

    return new Promise((resolve) => {
      state.page = page;
      resolve(state.page);
    });
  },
  SearchUsers: async () => {
    await actions.setError("");
    await actions.setRunSearch(false);
    const input = {
      search: state.searchInput,
      page: state.page,
      per_page: state.per_page,
    };
    const res = await ServiceUser.getUser(input);
    state.total_count = res.total_count;
    state.incomplete_results = res.incomplete_results;
    state.items = res.items;
    state.items.forEach(async (u) => {
      const res = await ServiceUser.getNameUser(u.url);
      const name = res;
      u.name = name;
    });
    await actions.setRunSearch(true);
  },
};

export { state, getters, actions };
