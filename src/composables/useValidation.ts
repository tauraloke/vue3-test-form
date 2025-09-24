export function useValidation() {
    const validateINN = (inn: string): boolean => {
        // Очищаем от нецифровых символов
        const cleanINN = inn.replace(/\D/g, '')

        // Проверка длины ИНН
        if (cleanINN.length !== 10 && cleanINN.length !== 12) {
            return false
        }

        // Проверка на то, что это только цифры
        return /^\d{10}(\d{2})?$/.test(cleanINN)
    }

    const validatePhone = (phone: string): boolean => {
        // Проверка формата +7 (XXX) XXX-XX-XX
        const phoneRegex = /^\+7\s*\(\d{3}\)\s*\d{3}-\d{2}-\d{2}$/
        return phoneRegex.test(phone)
    }

    const validateDate = (date: string): boolean => {
        // Проверка формата DD.MM.YYYY
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/
        if (!dateRegex.test(date)) return false

        const [day, month, year] = date.split('.').map(Number)
        const dateObj = new Date(year, month - 1, day)
        return dateObj.getDate() === day && dateObj.getMonth() === month - 1 && dateObj.getFullYear() === year
    }

    const validateLogin = (login: string): boolean => {
        // Минимум 6 символов, только латиница
        return /^[a-zA-Z]{6,}$/.test(login)
    }

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const validateRequired = (value: string): boolean => {
        return value.trim().length > 0
    }

    return {
        validateINN,
        validatePhone,
        validateDate,
        validateLogin,
        validateEmail,
        validateRequired
    }
}