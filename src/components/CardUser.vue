<script setup lang="ts">
const props = defineProps({
  avatar_url: {
    type: String,
  },
  login: {
    type: String,
  },
  name: {
    type: String,
  },
  html_url: {
    type: String,
  },
});
const fmtCapitalize = (nome: string) => {
  let words = nome.toLowerCase();
  return words.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );
};
</script>

<template>
  <div class="min-w-full p-2 rounded flex flex-row space-x-2 bg-black h-28">
    <div>
      <img class="w-14 h-14 rounded-full" :src="props.avatar_url" alt="" />
    </div>
    <div class="grid grid-cols-1 grid-rows-2">
      <div class="text-xl text-orange-600 font-bold">
        <div v-if="props.name">
          <p>{{ fmtCapitalize(props.name) }}</p>
        </div>
        <div v-else class="inline-flex items-center space-x-2 text-yellow-600">
          <p>{{ fmtCapitalize(props.login || "") }}</p>
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span class="text-xs">(login)</span>
        </div>
      </div>
      <div class="mt-2 text-sm underline">
        <a :href="props.html_url" target="_blank">Perfil no Github</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: grid;
  grid-template-columns: 30% 70%;
  background-color: black;
  padding: 1rem;
  color: white;
  margin-bottom: 1rem;
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
