<template>
  <div>
    <header
      style="padding-top: 30px; padding-bottom: 30px; background-color: midnightblue; padding-right: 20px; padding-left: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div style="font-size: xx-large">{{ useUsuarioStore().getFirstName }}</div>
        <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
          <UButton color="white" label="Options" trailing-icon="i-heroicons-chevron-down-20-solid" />
        </UDropdown>
      </div>
    </header>

    <div>
      <div v-if="danger" style="background-color: red ;  padding: 10px">{{ danger }}</div>

      <div v-if="sucesso" style="background-color: lime; padding: 10px;">{{ sucesso }}</div>
    </div>

    <main style="margin-left: 20px; margin-right: 20px; margin-top: 20px;">
      <div style="display: flex; justify-content: end;">


        <!-- professor -->
        <div style="display: flex; align-items:center ;" v-if="useUsuarioStore().getRole == 'TEACHER'">
          <UButton color="blue" label="Meus Jogos" @click="openCrudCaca()"></UButton>
          <UButton color="blue" icon="i-heroicons-plus" label="Criar" @click="createCaca = true"
            style="margin-left: 10px;">
          </UButton>
        </div>



        <!-- aluno -->
        <div style="display: flex; justify-content: end;" v-if="useUsuarioStore().getRole == 'STUDENT'">
          <div style="display: flex;">
            <UInput v-model="idJogo" color="blue"></UInput>
            <UButton color="blue" label="Buscar" @click="buscarJogo(idJogo)"></UButton>
          </div>
        </div>


      </div>

      <!-- conteudo do aluno -->
      <div v-if="jogando" style="margin-top: 100px; display: flex; width: 70%; margin: auto; margin-top: 200px;">
        <div style="width: 50%; margin: auto;">
          Sao {{ useWordSearchStore().getGame.words.length }} palavras
          <div
            v-for="(item, index) in useWordSearchStore().getGame.grid.split('\\n').filter(line => line.trim() !== '')"
            :key="index"
            style="  font-family: 'Courier New', Courier, monospace; white-space: pre;line-height: 1.5; text-align: left;width: 12ch; letter-spacing: 0.5em; font-size: 2em;">
            {{ item }}
          </div>

        </div>
        <UDivider orientation="vertical"></UDivider>
        <div style="width: 50%;">

          <div style="display: flex; width: 100%; justify-content: center; align-items: center;">

            <UInput v-model="resposta" color="blue" style="width: 100%;">
            </UInput>
            <UButton color="blue" icon="i-heroicons-check" @click="conferir()"></UButton>

          </div>

          <div style="margin-left: 100px; margin-top: 100px;">
            Palavras encontradas:
            <div v-for="(item, index) in listaResposta" :key="index">
              {{ index + 1 }} - {{ item }}
            </div>
          </div>

        </div>


      </div>

    </main>


    <!-- professor -->
    <UModal fullscreen prevent-close v-model="crudCaca">
      <UCard style="width: 100%;">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Meus jogos
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
              @click="crudCaca = false" />
          </div>
        </template>

        <div style="width: 100%;">

          <div style="display: flex;">

            <div v-for="(item, index) in useWordSearchStore().getMyGames" :key="index" style="width: 33%;">
              <div>Nome: {{ item.name }}</div>
              <div>Id: {{ item.id }}</div>
              <UButton @click="deleteJogo(item.id)" icon="i-heroicons-trash" color="red"></UButton>
            </div>

          </div>

        </div>
      </UCard>
    </UModal>

    <!-- professor -->
    <UModal fullscreen prevent-close v-model="createCaca">
      <UCard style="width: 100%;">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Criar jogo
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
              @click="createCaca = false" />
          </div>
        </template>
        <div style="width: 100%;">
          <div>
            <div v-if="dangerCreate" style="background-color: red ;  padding: 10px; margin-bottom: 10px ;">{{
              dangerCreate
              }}</div>
          </div>
          <UFormGroup label="Nome:" style="margin-bottom: 20px;">
            <UInput v-model="wordSearch.name"></UInput>
          </UFormGroup>
          <UFormGroup label="Palavras" style="margin-bottom: 20px;">
            <div style="display: flex; width: 100%; ">
              <UInput v-model="wordCreate" style="width: 96vw;"></UInput>
              <UButton icon="i-heroicons-check" @click="addWord"></UButton>
            </div>
          </UFormGroup>

          <div style="height: 400px;">

            <div v-for="(item, index) in wordSearch.words" :key="index"
              style="display: flex; align-items: center; margin-top: 50px;">
              <span>{{ index + 1 }} - {{ item }} <UButton icon="i-heroicons-x-mark" color="red"
                  @click="removeList(index)">
                </UButton></span>
            </div>

          </div>
          <!-- private String name;
          private List<String> words;
            private Long teacherId; -->
          <UButton @click="createJogo" label="Criar Jogo">

          </UButton>
        </div>
      </UCard>
    </UModal>

  </div>
</template>

<script lang="ts" setup>
import { useUsuarioStore } from '~/stores/usuario';
import { useWordSearchStore, type myGames } from '~/stores/wordSearch';
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

const listaResposta = ref([] as Array<string>)
const resposta = ref("");
const wordCreate = ref("");
const crudCaca = ref(false);
const createCaca = ref(false);
const idJogo = ref("");
const jogando = ref(false);
const danger = ref("");
const sucesso = ref("")
const dangerCreate = ref("")

const wordSearch = ref({
  name: "",
  words: [] as Array<string>,
  teacherId: "",
})


const removeList = (index: number) => {

  wordSearch.value.words.splice(index, 1);

}

const addWord = () => {
  if (wordCreate.value.length >= 8) {
    dangerCreate.value = "A palavra deve ter menos de 8 letras"
    return
  }
  const word = wordCreate.value.replace(/[^a-z]/g, '');
  if (word != wordCreate.value) {
    dangerCreate.value = "A palavra so pode conter letras"
    return
  }
  if (wordSearch.value.words.length == 5) {
    dangerCreate.value = "Apenas 5 palavras"
    return
  }

  wordSearch.value.words.push(wordCreate.value);
  wordCreate.value = ""
  dangerCreate.value = ""
}

const openCrudCaca = () => {
  crudCaca.value = true;
  buscarMeujogo();
}

async function buscarMeujogo() {
  const url = 'http://localhost:8080/wordsearches'

  try {
    const response = await fetch(url, {
      method: 'GET', // Método HTTP GET
      headers: {
        'Accept': 'application/json', // Aceita resposta em JSON
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar dados: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json(); // Converte a resposta em JSON
    useWordSearchStore().setMyGames(data);
    console.log('Dados recebidos:', data); // Log dos dados recebidos (opcional)
    return data; // Retorna os dados recebidos
  } catch (error) {
    console.error('Erro ao buscar o jogo:', error);
    throw error; // Relança o erro para tratamento externo
  }
}

async function deleteJogo(params: string) {
  const url = `http://localhost:8080/wordsearches/${params}`; // Substitua pela URL correta

  try {
    const response = await fetch(url, {
      method: 'DELETE', // Método HTTP DELETE
      headers: {
        'Accept': 'application/json', // Aceita resposta em JSON
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao deletar jogo: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json(); // Converte a resposta em JSON
    console.log('Jogo deletado com sucesso:', data); // Log dos dados recebidos (opcional)
    buscarMeujogo();
  } catch (error) {
    console.error('Erro ao deletar o jogo:', error);
    throw error; // Relança o erro para tratamento externo
  }
}

async function createJogo() {
  if (wordSearch.value.name == "" || wordSearch.value.words.length != 5) {
    dangerCreate.value = "Deve haver um nome para o jogo e 5 palavras"
    return
  }
  const url = 'http://localhost:8080/wordsearches'

  try {
    const response = await fetch(url, {
      method: 'POST', // Método HTTP
      headers: {
        'Content-Type': 'application/json', // Tipo de conteúdo enviado
      },
      body: JSON.stringify({
        name: wordSearch.value.name,
        words: wordSearch.value.words,
        teacherId: useUsuarioStore().getIdUser,
      }), // Corpo da requisição
    });

    if (!response.ok) {
      throw new Error(`Erro ao criar jogo: ${response.status} - ${response.statusText}`);
    }

    createCaca.value = false;
    wordSearch.value.words = [];
    wordSearch.value.name = "";

  } catch (error) {
    console.error('Erro na criação do jogo:', error);
    throw error; // Relança o erro para ser tratado externamente
  }
}


async function buscarJogo(id: string) {
  sucesso.value = "";
  danger.value = "";
  listaResposta.value = [];
  resposta.value = ""

  const url = `http://localhost:8080/wordsearches/${idJogo.value}`; // Substitua pela URL correta
  idJogo.value = "";
  try {
    const response = await fetch(url, {
      method: 'GET', // Método HTTP GET
      headers: {
        'Accept': 'application/json', // Aceita resposta em JSON
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar jogo: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json(); // Converte a resposta em JSON
    useWordSearchStore().setGames(data);
    console.log('Dados do jogo:', data); // Log dos dados recebidos (opcional)
    jogando.value = true;
    return data; // Retorna os dados do jogo
  } catch (error) {
    console.error('Erro ao buscar o jogo:', error);
    throw error; // Relança o erro para tratamento externo
  }

}

function conferir() {
  sucesso.value = "";

  if (resposta.value.length >= 10) {
    danger.value = "A palavra nao pode ultrapassar 10 letras"
  }
  const word = resposta.value.replace(/[^a-z]/g, '');
  if (word != resposta.value) {
    danger.value = "A palavra so pode conter letras"
  }

  if (listaResposta.value.includes(resposta.value)) {
    danger.value = "A palavra ja foi descoberta"
  }

  if (useWordSearchStore().getGame.words.includes(resposta.value)) {
    danger.value = ""
    listaResposta.value.push(resposta.value);
    resposta.value = "";
  }

  if (listaResposta.value.length == useWordSearchStore().getGame.words.length) {

    terminarJogo();

  }



}

function terminarJogo() {
  danger.value = "";
  sucesso.value = "Jogo finalizado";
}

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
