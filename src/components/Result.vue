<template>
    <div class="result-container">
        <h2>Результат отправки</h2>

        <div v-if="isLoading" class="loading">
            <p>Загрузка...</p>
        </div>

        <div v-else-if="error" class="error">
            <h3>Ошибка</h3>
            <p>{{ error }}</p>
            <button @click="handleClearData" class="clear-btn">Очистить</button>
        </div>

        <div v-else-if="formResponse" class="success">
            <h3>Успешно отправлено</h3>
            <div class="response-data">
                <div class="data-item">
                    <strong>Request ID:</strong> {{ formResponse.requestId }}
                </div>
                <div class="data-item">
                    <strong>Classifier:</strong> {{ formResponse.classifier }}
                </div>
            </div>
            <button @click="handleClearData" class="clear-btn">Очистить данные</button>
        </div>

        <div v-else class="no-data">
            <p>Нет данных для отображения</p>
            <p>Заполните одну из форм, чтобы увидеть результат.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useFormStore } from '@/stores/formStore'

const store = useFormStore()
const { formResponse, isLoading, error } = storeToRefs(store)
const { clearData } = store

// Функция для принудительного обновления
const handleClearData = async () => {
    clearData()
    // Принудительно обновляем компонент
    await nextTick()
}
</script>

<style scoped>
.result-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
}

.loading,
.error,
.success,
.no-data {
    text-align: center;
    padding: 2rem;
}

.error {
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
    color: #721c24;
}

.success {
    background-color: #d4edda;
    border: 1px solid #c3e6cb;
    border-radius: 4px;
    color: #155724;
}

.response-data {
    margin: 1.5rem 0;
    text-align: left;
}

.data-item {
    margin-bottom: 1rem;
    padding: 0.5rem;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 4px;
}

.clear-btn {
    padding: 0.5rem 1rem;
    background-color: #6c757d;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.clear-btn:hover {
    background-color: #5a6268;
}
</style>