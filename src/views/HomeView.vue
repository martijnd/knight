<script setup lang="ts">
import axios from '@/composables/axios';
import { useAuthStore } from '@/stores/auth';
import { onMounted, ref } from 'vue';

const store = useAuthStore();

const username = ref('');
const errorMessage = ref('');

const enemies = ref<{ id: number, name: string }[]>([]);

onMounted(async () => {
  if (localStorage.token) {
    await store.fetchUser();
    enemies.value = await store.fetchEnemies();
  }
});

async function onClickFightEnemy(id: number) {
  try {
    errorMessage.value = '';
    const res = await axios.post(`enemies/${id}/fight`, {},
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${store.token}`
        }
      }
    );
    console.log(res);
  } catch (e) {
    errorMessage.value = e.response.data.message;
  }
}

async function onSubmit() {
  errorMessage.value = '';
  try {
    await store.registerUser(username.value);
    await store.fetchEnemies();
  } catch (e) {
    errorMessage.value = e.response.data.message;
  }
}
</script>

<template>
  <main>
    <form @submit.prevent="onSubmit">
      <input type="text" v-model="username">
      <button type="submit">Submit</button>
      <div>{{ errorMessage }}</div>
    </form>

    <div v-if="store.user">
      {{ store.user.username }}
    </div>
    <div v-if="enemies.length">
      <h3>Enemies</h3>
      <div v-for="enemy of enemies" :key="enemy.id">
        {{ enemy.name }}
        <button @click="() => onClickFightEnemy(enemy.id)">
          Fight
        </button>
      </div>
    </div>
  </main>
</template>
