<script setup lang="ts">
import { computed } from "vue";
import {
  getters as gettersUser,
  actions as actionsUser,
} from "../modules/users/storeUser";
const errorPage = computed(() => gettersUser.error.value);
const lastPage = computed(() => gettersUser.lastPage.value);
const actualPage = computed(() => gettersUser.actual_page.value);
const setPage = async (value: number) => {
  try {
    await actionsUser.setLoading(true);
    await actionsUser.setSelectedPage(value);
    await actionsUser.SearchUsers();
  } catch (error: any) {
    console.log(error);
    await actionsUser.setError(error.message);
  } finally {
    await actionsUser.setLoading(false);
  }
};
</script>

<template>
  <div class="my-5 p-2 w-full flex flex-col text-white">
    <div class="w-full flex flex-row text-white space-x-1 items-center">
      <div class="mr-5">
        Página
        <span class="p-2 bg-gray-500 rounded">{{ actualPage }}</span> de
        <span class="p-2 bg-gray-500 rounded">{{ lastPage }}</span>
      </div>
      <div @click="setPage(1)" class="btn">
        <svg
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
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
          />
        </svg>
      </div>
      <div @click="setPage(actualPage - 1)" class="btn">
        <svg
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </div>
      <div @click="setPage(actualPage + 1)" class="btn">
        <svg
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
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
      <div @click="setPage(lastPage)" class="btn">
        <svg
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
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
    <div class="w-full my-2" v-if="errorPage">
      <p class="text-red-600">{{ errorPage }}</p>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.btn {
  @apply p-1 rounded;
}
.btn:hover {
  @apply bg-gray-500;
}
</style>
