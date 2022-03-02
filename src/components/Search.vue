<script setup lang="ts">
import { computed, reactive, ref } from "vue";

import {
  getters as gettersGeral,
  actions as actionsGeral,
} from "./../modules/geral/storeGeral";
import {
  getters as gettersUsers,
  actions as actionsUsers,
} from "./../modules/users/storeUser";
import CardUser from "./CardUser.vue";
import SearchBar from "./SearchBar.vue";

const searchName = ref("");
const searchBy = ref(1);

const updateSearch = async () => {
  actionsUsers.setSearchInput(searchName.value);
};

const updateSearchBySelected = async (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  actionsUsers.setSearchBy(parseInt(value));
};

const updateSearchBy = async (value: number) => {
  actionsUsers.setSearchBy(value);
};

const clearSearch = async () => {
  searchName.value = "";
  await actionsGeral.clear();
  await actionsUsers.clear();
};

const typesSearchFilter = computed(() => gettersUsers.typesSearchFilter.value);
const total_count = computed(() => gettersUsers.total_count.value);
const loading = computed(() => gettersGeral.loading.value);
const error = computed(() => gettersGeral.errorMessage.value);
const runSearch = computed(() => gettersUsers.runSearch.value);
const items = computed(() => gettersUsers.items.value);
const filterBy = computed(() => gettersUsers.searchBy.value);

const buscar = async () => {
  try {
    await actionsGeral.setLoading(true);
    await actionsUsers.SearchUsers();
  } catch (error: any) {
    if (error.response.status == 422) {
      await actionsGeral.setErrorMessage("Nome inválido para pesquisa");
    } else if (error.response.status == 503) {
      await actionsGeral.setErrorMessage("Serviço fora do ar");
    } else {
      console.log(error);
      const msg =
        error?.response?.data?.message ||
        "Ocorreu um problema! Tente mais tarde.";
      await actionsGeral.setErrorMessage(msg);
    }
  } finally {
    await actionsGeral.setLoading(false);
  }
};

const placeHolderSearchBy = computed(() => {
  let text = "";
  switch (filterBy.value) {
    case 1:
      text = "Entre com nome ...";
      break;

    case 2:
      text = "Entre com nome completo...";
      break;

    case 3:
      text = "Entre com login ...";
      break;

    case 4:
      text = "Entre com email...";
      break;

    case 5:
      text = "Entre com organização ...";
      break;

    default:
      break;
  }
  return text;
});
</script>

<template>
  <div class="w-full bg-slate-800 p-4 flex flex-col text-white rounded altura">
    <div
      class="w-full inline-flex items-center space-x-2 mb-5 text-white font-bold text-2xl"
    >
      <p>Busca por usuários Github</p>
      <img
        class="h-8 w-8 rounded-full border-2 border-gray-500 hover:scale-125"
        src="./../assets/img/Octocat.jpg"
        alt=""
      />
    </div>
    <div class="w-full flex flex-col">
      <div class="w-full flex flex-row space-x-2 items-center">
        <div class="flex-1 relative">
          <div
            class="absolute flex border border-transparent z-10 left-0 top-0 h-full w-10"
          >
            <div
              class="flex items-center justify-center rounded-tl rounded-bl bg-gray-100 text-gray-600 text-lg h-full w-full"
            >
              <svg
                v-if="filterBy === 1"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-5 w-5"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <svg
                v-if="filterBy == 2"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <svg
                v-if="filterBy == 3"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                />
              </svg>
              <svg
                v-if="filterBy == 4"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>

              <svg
                v-if="filterBy == 5"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
          </div>
          <input
            id="nome"
            name="nome"
            v-model="searchName"
            maxlength="80"
            type="text"
            @input="updateSearch()"
            :placeholder="placeHolderSearchBy"
            class="text-black text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:outline-none py-2 pr-2 pl-12"
          />
        </div>
        <div>
          <button
            class="py-1 px-4 w-32 bg-orange-800 text-white hover:bg-orange-600 focus:outline-none rounded"
            @click="buscar()"
          >
            <div class="inline-flex items-end space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <p>Procurar</p>
            </div>
          </button>
        </div>
      </div>
      <div
        class="w-full mt-2 p-2 flex flex-row lg:flex-col items-center bg-gray-700"
      >
        <div class="inline-flex space-x-2 lg:hidden">
          <p class="text-xl font-bold antialiased">Filtro:</p>
          <select
            class="rounded text-gray-800"
            name="searchBySelect"
            id="searchBySelect"
            v-model="searchBy"
            @change="updateSearchBySelected($event)"
          >
            <option
              v-for="typeFilter in typesSearchFilter"
              :key="typeFilter.id"
              :value="typeFilter.id"
            >
              {{ typeFilter.description }}
            </option>
          </select>
        </div>
        <div class="hidden lg:block">
          <div class="flex flex-row items-center space-x-2">
            <div><p class="text-xl font-bold antialiased">Filtro:</p></div>
            <div>
              <input
                type="radio"
                @click="updateSearchBy(1)"
                v-model="searchBy"
                value="1"
                id="byName"
              /><label class="ml-2" for="byName">Nome</label>
            </div>
            <div>
              <input
                type="radio"
                @click="updateSearchBy(2)"
                v-model="searchBy"
                value="2"
                id="byFullName"
              /><label class="ml-2" for="byFullName">Nome completo</label>
            </div>
            <div>
              <input
                type="radio"
                @click="updateSearchBy(3)"
                v-model="searchBy"
                value="3"
                id="byLogin"
              /><label class="ml-2" for="byLogin">Login</label>
            </div>
            <div>
              <input
                type="radio"
                @click="updateSearchBy(4)"
                v-model="searchBy"
                value="4"
                id="byEmail"
              /><label class="ml-2" for="byEmail">Email</label>
            </div>
            <div>
              <input
                type="radio"
                @click="updateSearchBy(5)"
                v-model="searchBy"
                value="5"
                id="byOrg"
              /><label class="ml-2" for="byOrg">Organização</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="loading" class="w-full my-5">
      <div class="w-full my-10">
        <p>Carregando....</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="i in 20" :key="i">
          <div
            class="p-2 mb-3 rounded flex flex-row space-x-2 bg-gray-900 animate-pulse"
          >
            <div>
              <div
                class="w-14 h-14 rounded-full bg-white animate-pulse"
                alt=""
              ></div>
            </div>
            <div class="space-y-1">
              <div class="text-xl bg-gray-700 w-40 h-5 animate-pulse"></div>
              <div class="text-sm bg-gray-700 w-40 h-5 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="my-10" v-if="error">
      <p class="text-xl font-bold text-yellow-600">
        {{ error }}
      </p>
    </div>
    <div v-else-if="!loading && runSearch">
      <div class="my-5 grid grid-cols-2 grid-rows-1 items-center">
        <div class="inline-flex items-center space-x-2">
          <p>Total encontrado</p>
          <p class="p-2 bg-gray-500 rounded">{{ total_count }}</p>
        </div>
        <div class="flex justify-end items-center">
          <button
            class="px-2 py-1 underline hover:cursor-pointer hover:bg-gray-600 rounded"
            @click="clearSearch()"
          >
            Limpar resultado
          </button>
        </div>
      </div>
      <div class="my-10" v-if="total_count == 0">
        <p class="text-xl font-bold text-yellow-600">
          Nenhum usuário encontrado.
        </p>
      </div>
      <div v-else>
        <SearchBar />
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="(item, i) in items" :key="i">
            <CardUser
              :avatar_url="item.avatar_url"
              :login="item.login"
              :name="item.name"
              :email="item.email"
              :html_url="item.html_url"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.altura {
  min-height: calc(100vh - 50px);
}
</style>
