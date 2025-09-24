import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface FormResponse {
    requestId: string
    classifier: string
}

export interface FormError {
    error: string
}

export const useFormStore = defineStore('form', () => {
    const formResponse = ref<FormResponse | null>(null)
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const setResponse = (response: FormResponse) => {
        formResponse.value = response
        error.value = null
    }

    const setError = (errorMessage: string) => {
        error.value = errorMessage
        formResponse.value = null
    }

    const setLoading = (loading: boolean) => {
        isLoading.value = loading
    }

    const clearData = () => {
        formResponse.value = null
        error.value = null
        isLoading.value = false
    }

    return {
        formResponse,
        isLoading,
        error,
        setResponse,
        setError,
        setLoading,
        clearData
    }
})