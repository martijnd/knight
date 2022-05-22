import { useAuthStore } from '@/stores/auth';
import axios from 'axios';

const BASE_URL = 'http://localhost/api/'

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

export async function createUser(username: string) {

}
