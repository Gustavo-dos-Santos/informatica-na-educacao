<template>
  <div>
    <header
      style="padding-top: 30px; padding-bottom: 30px; background-color: midnightblue; padding-right: 20px; padding-left: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>Nome</div>
        <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
          <UButton color="white" label="Options" trailing-icon="i-heroicons-chevron-down-20-solid" />
        </UDropdown>
      </div>
    </header>


    <main style="margin-left: 20px; margin-right: 20px; margin-top: 20px;">
      <div style="display: flex; justify-content: end;">
        <!-- professor -->
        <!-- <div style="display: flex; align-items:center ;">
          <UButton color="blue" label="Meus Jogos" @click="crudCaca = true"></UButton>
          <UButton color="blue" icon="i-heroicons-plus" label="Criar" @click="createCaca = true"
            style="margin-left: 10px;">
          </UButton>
        </div> -->

        <!-- aluno -->
        <!-- <div style="display: flex; justify-content: end;">
          <div style="display: flex;">
            <UInput v-model="idJogo"></UInput>
            <UButton color="blue" label="Buscar" @click="buscarJogo(id)"></UButton>
          </div>
          <UButton color="blue" label="Jogar" @click="jogar()" style="margin-left: 10px;"></UButton>
        </div> -->
      </div>
      <div>

      </div>

    </main>


    <!-- professor -->
    <UModal fullscreen prevent-close v-model="crudCaca">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Meus jogos
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
              @click="crudCaca = false" />
          </div>
        </template>

        <Placeholder class="h-32" />
      </UCard>
    </UModal>

    <!-- professor -->
    <UModal fullscreen prevent-close v-model="createCaca">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Criar jogo
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
              @click="createCaca = false" />
          </div>
        </template>

        <Placeholder class="h-32" />
      </UCard>
    </UModal>

  </div>
</template>

<script lang="ts" setup>
import { makeGetRequest, makePostRequest, makePutRequest } from '~/utils/api'

const items = [
  [{
    label: 'Perfil',
    icon: 'i-heroicons-user-circle'
  }], [{
    label: 'Sair',
    icon: 'i-heroicons-arrow-right-start-on-rectangle',
    click: () => {
      navigateTo("/login");
    }
  }]
]

const crudCaca = ref(false);
const createCaca = ref(false);

const openCrudCaca = () => {
  crudCaca.value = true;
}

async function buscarMeujogo() {
  const url = 'https://api.exemplo.com/get-endpoint' // Coloque a URL aqui

  try {
    const dataResponse = await makeGetRequest(url)
    const responseData = ref(dataResponse)
  } catch (error) {
    console.error(error)
  }
}

async function deleteJogo(params: string) {
  const url = 'https://api.exemplo.com/delete-endpoint' // Coloque a URL aqui

  try {
    const dataResponse = await makeDeleteRequest(url, params)
    const responseData = ref(dataResponse)
  } catch (error) {
    console.error(error)
  }
}

async function createJogo(params: string) {
  const url = 'https://api.exemplo.com/post-endpoint' // Coloque a URL aqui
  const data = { campo: 'valor' } // Adicione dados aqui

  try {
    const dataResponse = await makePostRequest(url, data)
    const responseData = ref(dataResponse)
  } catch (error) {
    console.error(error)
  }
}


async function buscarJogo(id: string) {
  const url = 'https://api.exemplo.com/get-endpoint' // Coloque a URL aqui
  const params = { chave: 'valor' } // Adicione parâmetros aqui

  try {
    const dataResponse = await makeGetRequest(url, params)
    const responseData = ref(dataResponse)
  } catch (error) {
    console.error(error)
  }

}

async function jogar() {
  const url = 'https://api.exemplo.com/get-endpoint' // Coloque a URL aqui
  const params = { chave: 'valor' } // Adicione parâmetros aqui

  try {
    const dataResponse = await makeGetRequest(url, params)
    const responseData = ref(dataResponse)
  } catch (error) {
    console.error(error)
  }
}

onMounted({
})

</script>

<style></style>

<!-- 

configuracoes - sair 
nome da pessoa

professor
crud dos ja feitos pelo professor
criar jogo

aluno
jogar
buscar jogo





-->
