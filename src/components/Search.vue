<script setup lang="ts">
import { computed, ref } from "vue";

import {
  getters as gettersUser,
  actions as actionsUsers,
} from "./../modules/users/storeUser";
import CardUser from "./CardUser.vue";
import SearchBar from "./SearchBar.vue";

const searchName = ref("");

const updateSearch = async () => {
  actionsUsers.setSearchInput(searchName.value);
};

const clearSearch = () => {
  searchName.value = "";
  actionsUsers.clear();
};

const total_count = computed(() => gettersUser.total_count.value);
const loading = computed(() => gettersUser.loading.value);
const error = computed(() => gettersUser.error.value);
const runSearch = computed(() => gettersUser.runSearch.value);
const items = computed(() => gettersUser.items.value);

const buscar = async () => {
  try {
    await actionsUsers.setLoading(true);
    await actionsUsers.SearchUsers();
  } catch (error: any) {
    if (error.response.status == 422) {
      await actionsUsers.setError("Nome inválido para pesquisa");
    } else if (error.response.status == 503) {
      await actionsUsers.setError("Serviço fora do ar");
    } else {
      console.log(error);
      const msg =
        error?.response?.data?.message ||
        "Ocorreu um problema! Tente mais tarde.";
      await actionsUsers.setError(msg);
    }
  } finally {
    await actionsUsers.setLoading(false);
  }
};
</script>

<template>
  <div
    class="min-w-full max-w-2xl bg-slate-800 p-4 flex flex-col text-white rounded"
  >
    <div class="w-full mb-5 text-white font-bold text-2xl">
      Busca por usuários Github
    </div>
    <div class="w-full flex flex-row space-x-2 items-center">
      <div class="flex-1 relative">
        <div
          class="absolute flex border border-transparent z-10 left-0 top-0 h-full w-10"
        >
          <div
            class="flex items-center justify-center rounded-tl rounded-bl bg-gray-100 text-gray-600 text-lg h-full w-full"
          >
            <svg
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
          </div>
        </div>
        <input
          id="nome"
          name="nome"
          v-model="searchName"
          maxlength="80"
          type="text"
          @input="updateSearch()"
          placeholder="Entre com nome ..."
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
    <div v-if="loading" class="w-full my-5">
      <div class="w-full my-10">
        <p>Carregando....</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
        <div>
          Total encontrado
          <span class="p-2 bg-gray-500 rounded">{{ total_count }}</span>
        </div>
        <div class="flex justify-end">
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
        <!-- <div> -->
        <SearchBar />
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="(item, i) in items" :key="i">
            <CardUser
              :avatar_url="item.avatar_url"
              :login="item.login"
              :name="item.name"
              :html_url="item.html_url"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
