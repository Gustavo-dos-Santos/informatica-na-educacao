// utils/api.ts
import axios from 'axios'

// Função para requisição GET
export const makeGetRequest = async (url: string, params?: Record<string, any>) => {
  try {
    const response = await axios.get(url, { params })
    return response.data
  } catch (error) {
    throw error
  }
}

// Função para requisição POST
export const makePostRequest = async (url: string, data: Record<string, any>) => {
  try {
    const response = await axios.post(url, data)
    return response.data
  } catch (error) {
    throw error
  }
}
// Função para requisição GET
export const makePutRequest = async (url: string, params?: Record<string, any>) => {
  try {
    const response = await axios.put(url, { params })
    return response.data
  } catch (error) {
    throw error
  }
}

// Função para requisição POST
export const makeDeleteRequest = async (url: string, data: Record<string, any>) => {
  try {
    const response = await axios.delete(url, data)
    return response.data
  } catch (error) {
    throw error
  }
}