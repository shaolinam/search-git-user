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
  email: {
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
  <div class="min-w-full p-4 rounded flex flex-row items-center bg-black h-32">
    <div class="w-full flex flex-row space-x-2">
      <div class="flex-shrink flex justify-center items-center">
        <img
          class="w-14 h-14 border-2 border-gray-600 hover:scale-125 rounded-full"
          :src="props.avatar_url"
          alt=""
        />
      </div>
      <div class="flex-1 grid grid-cols-1 grid-rows-4">
        <div class="text-base text-orange-600 font-bold">
          <div class="inline-flex items-center space-x-2">
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
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p v-if="props.name" class="w-48 truncate">
              {{ fmtCapitalize(props.name) }}
            </p>
            <p v-else>....</p>
          </div>
        </div>
        <div class="text-base text-orange-400">
          <div class="inline-flex items-center space-x-2 text-yellow-600">
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
                d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
              />
            </svg>
            <p class="w-48 truncate">{{ fmtCapitalize(props.login || "") }}</p>
          </div>
        </div>
        <div class="text-base text-orange-200">
          <div class="inline-flex items-center space-x-2">
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <p v-if="props.email" class="w-48 truncate">{{ props.email }}</p>
            <p v-else>...</p>
          </div>
        </div>
        <div class="mt-2 inline-flex items-center space-x-2 text-sm underline">
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
              d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
            />
          </svg>
          <a :href="props.html_url" target="_blank">Perfil no Github</a>
        </div>
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
