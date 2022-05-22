<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';

const store = useAuthStore();

const username = ref('');

async function onSubmit() {
  try{ 
    await store.registerUser(username.value);
  } catch (e) {
    console.log(e);
  }
}
</script>

<template>
  <main>
    <form @submit.prevent="onSubmit">
    <input type="text" v-model="username">
    <button type="submit">Submit</button>
    </form>
    <div v-if="store.user">
      {{ store.user.username }}
    </div>
  </main>
</template>
