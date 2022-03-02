import {
  state as stateUser,
  getters as gettersUser,
  actions as actionsUser,
} from "../src/modules/users/storeUser";

import ServiceUser from "./../src/modules/users/serviceUser";

const SEARCH_BY_NOME = 1;
const SEARCH_BY_NOME_COMPLETO = 2;
const SEARCH_BY_LOGIN = 3;
const SEARCH_BY_EMAIL = 4;
const SEARCH_BY_ORGANIZACAO = 5;

describe("Buscar Usuário(s) no Github", () => {
  describe("Buscar usuário(s) com parametro de busca inválido", () => {
    const param = "###";
    actionsUser.setSearchInput(param);
    it("Deve retornar erro para busca por: nome", async () => {
      try {
        actionsUser.setSearchBy(SEARCH_BY_NOME);
        await actionsUser.SearchUsers();
      } catch (error) {
        expect(error.response.status).toBe(422);
      }
    });
    it("Deve retornar erro para busca por: nome completo", async () => {
      try {
        actionsUser.setSearchBy(SEARCH_BY_NOME_COMPLETO);
        await actionsUser.SearchUsers();
      } catch (error) {
        expect(error.response.status).toBe(422);
      }
    });
    it("Deve retornar erro para busca por: login", async () => {
      try {
        actionsUser.setSearchBy(SEARCH_BY_LOGIN);
        await actionsUser.SearchUsers();
      } catch (error) {
        expect(error.response.status).toBe(422);
      }
    });
    it("Deve retornar erro para busca por: email", async () => {
      try {
        actionsUser.setSearchBy(SEARCH_BY_EMAIL);
        await actionsUser.SearchUsers();
      } catch (error) {
        expect(error.response.status).toBe(422);
      }
    });
    it("Deve retornar erro para busca por: organização", async () => {
      try {
        actionsUser.setSearchBy(SEARCH_BY_ORGANIZACAO);
        await actionsUser.SearchUsers();
      } catch (error) {
        expect(error.response.status).toBe(422);
      }
    });
  });
  describe.only("Buscar usuário(s) com parametro válido", () => {
    const param = "fabio carvalho";
    actionsUser.setSearchInput(param);
    it("Deve retornar 0 ou mais usuários para busca por: nome", async () => {
      try {
        actionsUser.setSearchBy(SEARCH_BY_NOME);
        await actionsUser.SearchUsers();
        const total = gettersUser.total_count;
        expect(total.value).toBeGreaterThanOrEqual(0);
      } catch (error) {
        console.log("Error: ", error);
      }
    });
    it.skip("Deve retornar 0 ou mais usuários para busca por: nome completo", async () => {
      try {
        actionsUser.setSearchBy(SEARCH_BY_NOME_COMPLETO);
        await actionsUser.SearchUsers();
        const total = gettersUser.total_count;
        expect(total.value).toBeGreaterThanOrEqual(0);
      } catch (error) {
        console.log("Error: ", error);
      }
    });
    it.skip("Deve retornar 0 ou mais usuários para busca por: login", async () => {
      try {
        actionsUser.setSearchBy(SEARCH_BY_LOGIN);
        await actionsUser.SearchUsers();
        const total = gettersUser.total_count;
        expect(total.value).toBeGreaterThanOrEqual(0);
      } catch (error) {
        console.log("Error: ", error);
      }
    });
    it.skip("Deve retornar 0 ou mais usuários para busca por: email", async () => {
      try {
        actionsUser.setSearchBy(SEARCH_BY_EMAIL);
        await actionsUser.SearchUsers();
        const total = gettersUser.total_count;
        expect(total.value).toBeGreaterThanOrEqual(0);
      } catch (error) {
        console.log("Error: ", error);
      }
    });
    it.skip("Deve retornar 0 ou mais usuários para busca por: organização", async () => {
      try {
        actionsUser.setSearchBy(SEARCH_BY_ORGANIZACAO);
        await actionsUser.SearchUsers();
        const total = gettersUser.total_count;
        expect(total.value).toBeGreaterThanOrEqual(0);
      } catch (error) {
        console.log("Error: ", error);
      }
    });
  });
  describe("Deve encontrar apenas 1 usuário", () => {
    it("Encontrar um usuário por email", async () => {
      try {
        const param = "fabiopbcarvalho@gmail.com";
        actionsUser.setSearchInput(param);
        const input = {
          search: stateUser.searchInput,
          page: stateUser.page,
          per_page: stateUser.per_page,
        };
        const res = await ServiceUser.getUserByEmail(input);
        expect(res.total_count).toBe(1);
        expect(res.items.length).toBe(1);
      } catch (error) {
        expect(error.response.status).toBe(422);
      }
    });
    it("Nao encontrar o usuário por email", async () => {
      try {
        const param = "fabiopbcarvalho@gmail2.com";
        actionsUser.setSearchInput(param);
        const input = {
          search: stateUser.searchInput,
          page: stateUser.page,
          per_page: stateUser.per_page,
        };
        const res = await ServiceUser.getUserByEmail(input);
        expect(res.total_count).toBe(0);
        expect(res.items.length).toBe(0);
      } catch (error) {
        expect(error.response.status).toBe(422);
      }
    });
  });
  describe("Status Usuario", () => {
    it("Deve retornar ao Status inicial ao limpar", () => {
      const statusInicial = stateUser;
      actionsUser.clear();
      expect(stateUser.searchInput).toBe(statusInicial.searchInput);
      expect(stateUser.loading).toBe(statusInicial.loading);
      expect(stateUser.runSearch).toBe(statusInicial.runSearch);
      expect(stateUser.error).toBe(statusInicial.error);
      expect(stateUser.total_count).toBe(statusInicial.total_count);
      expect(stateUser.incomplete_results).toBe(
        statusInicial.incomplete_results
      );
      expect(stateUser.page).toBe(statusInicial.page);
      expect(stateUser.per_page).toBe(statusInicial.per_page);
      expect(stateUser.lastPage).toBe(statusInicial.lastPage);
      expect(stateUser.items).toBe(statusInicial.items);
    });
  });
  describe("Setar atributos da Busca", () => {
    it("Setar status de Error", async () => {
      const param = "Error teste";
      const statusRes = await actionsUser.setError(param);
      expect(stateUser.error).toBe(statusRes);
    });
    it("Setar status executou pesquisa", async () => {
      const param = true;
      const statusRes = await actionsUser.setRunSearch(param);
      expect(stateUser.runSearch).toBe(statusRes);
    });
    it("Setar status tipo de filtro", async () => {
      const param = SEARCH_BY_NOME;
      const statusRes = await actionsUser.setSearchBy(SEARCH_BY_NOME);
      expect(stateUser.searchBy).toBe(statusRes);
    });
    it("Setar status carregamento de dados", async () => {
      const param = true;
      const statusRes = await actionsUser.setLoading(param);
      expect(stateUser.loading).toBe(statusRes);
    });
  });
});
