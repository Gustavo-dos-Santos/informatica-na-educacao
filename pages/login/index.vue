<template>
  <div
    style="display: flex; flex-direction: column; align-items:center; justify-content: center; margin-top: 10px; height: 100vh;">
    <h1 style=" font-size: 5rem; font-weight: bold; font-family: 'Franklin Gothic Medium' , 'Arial Narrow' , Arial,
    sans-serif; ">
      Login</h1>
    <div style=" width: 100%; display: flex; flex-direction: column; align-items:center; ">
      <UForm :state="state" style="width: 70%; max-width: 800px;">
        <UFormGroup label="Usuario" style="margin-top: 20px; ">
          <UInput v-model="state.email" color="blue" placeholder="Usuario" style="padding: 10px;"></UInput>
        </UFormGroup>
        <UFormGroup label="Senha" style="margin-top: 30px;">
          <UInput type="password" v-model="state.password" color="blue" placeholder="Senha" style="padding: 10px;">
          </UInput>
        </UFormGroup>
        <div style="margin-top: 20px;">
          <UButton color="blue" type="submit"
            style="justify-content: center; font-size: larger; width: 100%; padding: 15px; text-align: center; font-weight: bold;"
            label="Login" @click="submit()"></UButton>
        </div>
      </UForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUsuarioStore } from '~/stores/usuario';

const state = ref({
  email: "",
  password: "",
})

const error = ref("");

const submit = async () => {
  const url = 'http://localhost:8080/users/login'
  const params = { email: state.value.email, password: state.value.password }
  // navigateTo("/home");

  try {
    const response = await fetch(url, {
      method: 'POST', // Método HTTP
      headers: {
        'Content-Type': 'application/json' // Cabeçalhos opcionais
      },
      body: JSON.stringify(params)
    });

    if (!response.ok) {
      console.log(response)
    }

    const userData = await response.json();
    console.log('Dados do usuário:', userData);
    useUsuarioStore().setUser(userData);
    navigateTo("/home");
  } catch (error) {
    console.error('Erro na requisição GET:', error);
  }
}
// const schema = Yup.

</script>

<style></style>
