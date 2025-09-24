<template>
    <div class="form-container">
        <h2>Форма B</h2>
        <form @submit.prevent="submitForm" class="form">
            <div class="form-group">
                <label for="name">Имя *</label>
                <input id="name" v-model="formData.name" type="text" :class="{ 'error': errors.name }"
                    placeholder="Введите имя" />
                <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
            </div>

            <div class="form-group">
                <label for="surname">Фамилия *</label>
                <input id="surname" v-model="formData.surname" type="text" :class="{ 'error': errors.surname }"
                    placeholder="Введите фамилию" />
                <span v-if="errors.surname" class="error-message">{{ errors.surname }}</span>
            </div>

            <div class="form-group">
                <label for="patronymic">Отчество *</label>
                <input id="patronymic" v-model="formData.patronymic" type="text" :class="{ 'error': errors.patronymic }"
                    placeholder="Введите отчество" />
                <span v-if="errors.patronymic" class="error-message">{{ errors.patronymic }}</span>
            </div>

            <div class="form-group">
                <label for="birthDate">Дата рождения *</label>
                <input id="birthDate" v-model="formData.birthDate" type="text" :class="{ 'error': errors.birthDate }"
                    placeholder="DD.MM.YYYY" />
                <span v-if="errors.birthDate" class="error-message">{{ errors.birthDate }}</span>
            </div>

            <div class="form-group">
                <label for="login">Логин *</label>
                <input id="login" v-model="formData.login" type="text" :class="{ 'error': errors.login }"
                    placeholder="Минимум 6 символов, латиница" />
                <span v-if="errors.login" class="error-message">{{ errors.login }}</span>
            </div>

            <div class="form-group">
                <label for="email">Email *</label>
                <input id="email" v-model="formData.email" type="email" :class="{ 'error': errors.email }"
                    placeholder="Введите email" />
                <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
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
import type { FormBData } from '@/types/forms'

const store = useFormStore()
const router = useRouter()
const { validateDate, validateLogin, validateEmail, validateRequired } = useValidation()

const formData = ref<FormBData>({
    name: '',
    surname: '',
    patronymic: '',
    birthDate: '',
    login: '',
    email: ''
})

const errors = ref<Record<string, string>>({})

const isLoading = computed(() => store.isLoading)

const validateField = (field: keyof FormBData, value: string) => {
    errors.value[field] = ''

    if ((field === 'name' || field === 'surname' || field === 'patronymic' || field === 'email') && !validateRequired(value)) {
        errors.value[field] = 'Поле обязательно для заполнения'
    } else if (field === 'birthDate' && !validateDate(value)) {
        errors.value[field] = 'Формат: DD.MM.YYYY'
    } else if (field === 'login' && !validateLogin(value)) {
        errors.value[field] = 'Минимум 6 символов, только латиница'
    } else if (field === 'email' && !validateEmail(value)) {
        errors.value[field] = 'Некорректный email'
    }
}

const isFormValid = computed(() => {
    return validateRequired(formData.value.name) &&
        validateRequired(formData.value.surname) &&
        validateRequired(formData.value.patronymic) &&
        validateDate(formData.value.birthDate) &&
        validateLogin(formData.value.login) &&
        validateEmail(formData.value.email)
})

// Валидация в реальном времени
watch(() => formData.value.name, (newValue) => validateField('name', newValue))
watch(() => formData.value.surname, (newValue) => validateField('surname', newValue))
watch(() => formData.value.patronymic, (newValue) => validateField('patronymic', newValue))
watch(() => formData.value.birthDate, (newValue) => validateField('birthDate', newValue))
watch(() => formData.value.login, (newValue) => validateField('login', newValue))
watch(() => formData.value.email, (newValue) => validateField('email', newValue))

const submitForm = async () => {
    // Валидация всех полей перед отправкой
    Object.keys(formData.value).forEach(key => {
        validateField(key as keyof FormBData, formData.value[key as keyof FormBData])
    })

    if (!isFormValid.value) return

    store.setLoading(true)

    try {
        // Имитация API запроса
        // Имитация API запроса
        const response = await fetch('/form/b', {
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