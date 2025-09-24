import { createRouter, createWebHistory } from 'vue-router'
import FormA from '@/components/forms/FormA.vue'
import FormB from '@/components/forms/FormB.vue'
import Result from '@/components/Result.vue'

const routes = [
    { path: '/', redirect: '/form-a' },
    { path: '/form-a', component: FormA },
    { path: '/form-b', component: FormB },
    { path: '/result', component: Result }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router