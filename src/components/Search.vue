<script setup lang="ts">
import { computed, ref } from "vue";

import {
  getters as gettersUser,
  actions as actionsUsers,
} from "./../modules/users/storeUser";

const search = ref("");

const updateSearch = async () => {
  actionsUsers.setSearchInput(search.value);
};

const clearSearch = () => {
  actionsUsers.clear();
};

const total_count = computed(() => gettersUser.total_count.value);
const loading = computed(() => gettersUser.loading.value);
const items = computed(() => gettersUser.items.value);

const buscar = async () => {
  try {
    await actionsUsers.setLoading(true);
    await actionsUsers.SearchUsers();
  } catch (error) {
    console.log(error);
  } finally {
    await actionsUsers.setLoading(false);
  }
};
</script>

<template>
  <div>
    <div>
      <label for="search"></label>
      <input id="search" type="text" v-model="search" @input="updateSearch()" />
    </div>
    <div>
      <button @click="buscar()">Procurar</button>
      <button @click="clearSearch()">Limpar</button>
    </div>
    <div v-if="loading">
      <p>Loading...</p>
    </div>
    <div>
      <p>total_count: {{ total_count }}</p>
      <br />
      <div v-for="(item, i) in items" :key="i">
        <div class="card">
          <div>
            <img class="" :src="item.avatar_url" alt="" />
          </div>
          <div>
            <div class="name">{{ item.login }}</div>
            <div class="profile">{{ item.html_url }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.card {
  display: grid;
  grid-template-columns: 30% 70%;
  background-color: black;
  padding: 1rem;
  color: white;
  margin-bottom: 1rem;
}
img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.name {
  font-size: medium;
  color: chocolate;
}
.profile {
  font-size: small;
  color: burlywood;
}
</style>
