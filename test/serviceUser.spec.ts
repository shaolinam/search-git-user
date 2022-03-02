import {
  state as stateUser,
  getters as gettersUser,
  actions as actionsUser,
} from "../src/modules/users/storeUser";

import ServiceUser from "./../src/modules/users/serviceUser";

describe("Deve encontrar 0 ou mais usuários", () => {
  it("Encontrar um usuário por nome", async () => {
    try {
      const param = "fabio carvalho";
      actionsUser.setSearchInput(param);
      const input = {
        search: stateUser.searchInput,
        page: stateUser.page,
        per_page: stateUser.per_page,
      };
      const res = await ServiceUser.getUserByName(input);
      expect(res.total_count).toBeGreaterThanOrEqual(0);
    } catch (error) {
      expect(error.response.status).toBe(422);
    }
  });
  it("Encontrar um usuário por nome completo", async () => {
    try {
      const param = "fabio carvalho";
      actionsUser.setSearchInput(param);
      const input = {
        search: stateUser.searchInput,
        page: stateUser.page,
        per_page: stateUser.per_page,
      };
      const res = await ServiceUser.getUserByFullname(input);
      expect(res.total_count).toBeGreaterThanOrEqual(0);
    } catch (error) {
      expect(error.response.status).toBe(422);
    }
  });
  it("Encontrar um usuário por login", async () => {
    try {
      const param = "fabio carvalho";
      actionsUser.setSearchInput(param);
      const input = {
        search: stateUser.searchInput,
        page: stateUser.page,
        per_page: stateUser.per_page,
      };
      const res = await ServiceUser.getUserByLogin(input);
      expect(res.total_count).toBeGreaterThanOrEqual(0);
    } catch (error) {
      expect(error.response.status).toBe(422);
    }
  });
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
  it("Encontrar um usuário por organização", async () => {
    try {
      const param = "fabio carvalho";
      actionsUser.setSearchInput(param);
      const input = {
        search: stateUser.searchInput,
        page: stateUser.page,
        per_page: stateUser.per_page,
      };
      const res = await ServiceUser.getUserByOrganization(input);
      expect(res.total_count).toBeGreaterThanOrEqual(0);
    } catch (error) {
      expect(error.response.status).toBe(422);
    }
  });
});

describe.only("Obter Perfil do Usuário", () => {
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

      const url = res.items[0].url;

      const res2 = await ServiceUser.getPerfil(url);

      expect(res2).toEqual({
        name: "Fábio Paes Barreto de Carvalho",
        email: null,
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  });
});
