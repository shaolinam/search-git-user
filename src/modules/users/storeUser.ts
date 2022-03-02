import { computed, reactive } from "vue";
import InputUser from "./inputUser";
import ResponseSearch from "./responseSearch";
import ServiceUser from "./serviceUser";

const inputUser: InputUser[] = [];

interface TypeSearchFilter {
  id: number;
  description: string;
}

const initialTypeSearchFilter: TypeSearchFilter[] = [
  { id: 1, description: "Nome" },
  { id: 2, description: "Nome completo" },
  { id: 3, description: "Login" },
  { id: 4, description: "Email" },
  { id: 5, description: "Organização" },
];

const initialState = {
  typesSearchFilter: initialTypeSearchFilter,
  searchInput: "",
  searchBy: 1,
  loading: false,
  runSearch: false,
  error: "",
  total_count: 0,
  incomplete_results: false,
  page: 1,
  per_page: 20,
  lastPage: 0,
  items: inputUser,
};

const state = reactive(initialState);

const getters = {
  typesSearchFilter: computed(() => state.typesSearchFilter),
  total_count: computed(() => state.total_count),
  items: computed(() => state.items),
  loading: computed(() => state.loading),
  lastPage: computed(() => state.lastPage),
  actual_page: computed(() => state.page),
  error: computed(() => state.error),
  runSearch: computed(() => state.runSearch),
  searchBy: computed(() => state.searchBy),
};

const actions = {
  clear: async (): Promise<void> => {
    await new Promise((resolve) => {
      state.searchInput = "";
      state.loading = false;
      state.runSearch = false;
      state.error = "";
      state.total_count = 0;
      state.incomplete_results = false;
      state.page = 1;
      state.per_page = 20;
      state.lastPage = 0;
      state.items = [];
      resolve(true);
    });
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
  setSearchBy: (value: number): void => {
    state.searchBy = value;
  },
  setLoading: async (value: boolean): Promise<void> => {
    new Promise((resolve) => {
      state.loading = value;
      resolve(true);
    });
  },
  getPerfil: async (url: string): Promise<{ name: string; email: string }> => {
    return await ServiceUser.getPerfil(url);
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
    let res: ResponseSearch;
    switch (state.searchBy) {
      case 1:
        res = await ServiceUser.getUserByname(input);
        break;

      case 2:
        res = await ServiceUser.getUserByFullname(input);
        break;

      case 3:
        res = await ServiceUser.getUserByLogin(input);
        break;

      case 4:
        res = await ServiceUser.getUserByEmail(input);
        break;

      case 5:
        res = await ServiceUser.getUserByOrganization(input);
        break;

      default:
        res = await ServiceUser.getUserByname(input);
        break;
    }
    state.total_count = res.total_count;
    state.incomplete_results = res.incomplete_results;

    if (state.total_count == 0) {
      state.lastPage = 0;
    } else {
      const totalPage = Math.trunc(state.total_count / state.per_page);
      const modTotalPage = state.total_count % state.per_page;
      if (modTotalPage == 0) {
        state.lastPage = totalPage;
      } else {
        state.lastPage = totalPage + 1;
      }
    }

    state.items = res.items;
    state.items.forEach(async (u) => {
      const { name, email } = await ServiceUser.getPerfil(u.url);
      u.name = name;
      u.email = email;
    });
    await actions.setRunSearch(true);
  },
};

export { state, getters, actions };
