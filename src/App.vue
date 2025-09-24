<template>
    <div id="app">
        <nav class="navbar">
            <router-link to="/form-a" class="nav-link">Форма A</router-link>
            <router-link to="/form-b" class="nav-link">Форма B</router-link>
            <router-link to="/result" class="nav-link">Результат</router-link>
        </nav>
        <main class="main-content">
            <router-view />
        </main>
    </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style scoped>
.navbar {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
}

.nav-link {
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: #333;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.nav-link:hover {
    background-color: #e0e0e0;
}

.nav-link.router-link-active {
    background-color: #007bff;
    color: white;
}

.main-content {
    padding: 2rem;
}
</style>