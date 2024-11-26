<template>
  <div>
    <h1>Login</h1>
    <UForm :state="state">
      <UFormgroup label="User">
        <UInput v-model="state.user"></UInput>
      </UFormgroup>
      <UFormgroup label="Password">
        <UInput v-model="state.password"></UInput>
      </UFormgroup>
      <UButton type="submit" label="Login"></UButton>
    </UForm>

    {{ state.user }}
    {{ state.password}}
  </div>
</template>

<script lang="ts" setup>

const state = ref({
  user: "",
  password: "",
})

const schema = Yup.

</script>

<style>

</style>