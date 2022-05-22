const BASE_URL = 'http://localhost/api/'

export async function createUser(username: string) {
  const response = await fetch(BASE_URL + 'tokens/create', {
    method: 'POST',
    body: JSON.stringify({
      username,
    }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
  const user = await response.json();
  console.log(user)
  return user;
}
