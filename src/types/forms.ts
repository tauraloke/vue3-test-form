export interface FormAData {
    name: string
    email: string
    inn: string
    phone: string
}

export interface FormBData {
    name: string
    surname: string
    patronymic: string
    birthDate: string
    login: string
    email: string
}

export interface ValidationRule {
    validate: (value: string) => boolean
    message: string
}