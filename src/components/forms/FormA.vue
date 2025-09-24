<template>
    <div class="form-container">
        <h2>Форма A</h2>
        <form @submit.prevent="submitForm" class="form">
            <div class="form-group">
                <label for="name">Имя *</label>
                <input id="name" v-model="formData.name" type="text" :class="{ 'error': errors.name }"
                    placeholder="Введите имя" />
                <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input id="email" v-model="formData.email" type="email" :class="{ 'error': errors.email }"
                    placeholder="Введите email" />
                <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
            </div>

            <div class="form-group">
                <label for="inn">ИНН *</label>
                <input id="inn" v-model="formData.inn" type="text" :class="{ 'error': errors.inn }"
                    placeholder="10 или 12 цифр" maxlength="12" />
                <span v-if="errors.inn" class="error-message">{{ errors.inn }}</span>
            </div>

            <div class="form-group">
                <label for="phone">Телефон *</label>
                <input id="phone" v-model="formData.phone" type="tel" :class="{ 'error': errors.phone }"
                    placeholder="+7 (XXX) XXX-XX-XX" />
                <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
            </div>

            <button type="submit" :disabled="!isFormValid" class="submit-btn" :class="{ 'disabled': !isFormValid }">
                {{ isLoading ? 'Отправка...' : 'Отправить' }}
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useFormStore } from '@/stores/formStore'
import { useValidation } from '@/composables/useValidation'
import type { FormAData } from '@/types/forms'

const store = useFormStore()
const router = useRouter()
const { validateINN, validatePhone, validateEmail, validateRequired } = useValidation()

const formData = ref<FormAData>({
    name: '',
    email: '',
    inn: '',
    phone: ''
})

const errors = ref<Record<string, string>>({})

const isLoading = computed(() => store.isLoading)

const validateField = (field: keyof FormAData, value: string) => {
    errors.value[field] = ''

    if (field === 'name' && !validateRequired(value)) {
        errors.value[field] = 'Поле обязательно для заполнения'
    } else if (field === 'email' && value && !validateEmail(value)) {
        errors.value[field] = 'Некорректный email'
    } else if (field === 'inn' && !validateINN(value)) {
        errors.value[field] = 'Некорректный ИНН (10 или 12 цифр)'
    } else if (field === 'phone' && !validatePhone(value)) {
        errors.value[field] = 'Формат: +7 (XXX) XXX-XX-XX'
    }
}

const isFormValid = computed(() => {
    return validateRequired(formData.value.name) &&
        validateINN(formData.value.inn) &&
        validatePhone(formData.value.phone) &&
        (!formData.value.email || validateEmail(formData.value.email))
})

// Валидация в реальном времени
watch(() => formData.value.name, (newValue) => validateField('name', newValue))
watch(() => formData.value.email, (newValue) => validateField('email', newValue))
watch(() => formData.value.inn, (newValue) => validateField('inn', newValue))
watch(() => formData.value.phone, (newValue) => validateField('phone', newValue))

const submitForm = async () => {
    // Валидация всех полей перед отправкой
    Object.keys(formData.value).forEach(key => {
        validateField(key as keyof FormAData, formData.value[key as keyof FormAData])
    })

    if (!isFormValid.value) return

    store.setLoading(true)

    try {
        // Имитация API запроса
        const response = await fetch('/form/a', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData.value),
        })

        const result = await response.json()

        if (result.requestId) {
            store.setResponse(result)
            // Перенаправление на страницу результата
            router.push('/result')
        } else if (result.error) {
            store.setError(result.error)
        }
    } catch (error) {
        store.setError('Ошибка при отправке формы')
    } finally {
        store.setLoading(false)
    }
}
</script>

<style scoped>
.form-container {
    max-width: 500px;
    margin: 0 auto;
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
}

.form-group {
    margin-bottom: 1.5rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
}

input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
}

input.error {
    border-color: #dc3545;
}

.error-message {
    color: #dc3545;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: block;
}

.submit-btn {
    width: 100%;
    padding: 0.75rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

.submit-btn:hover:not(.disabled) {
    background-color: #0056b3;
}

.submit-btn.disabled {
    background-color: #6c757d;
    cursor: not-allowed;
}
</style>