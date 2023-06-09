export type AuthUser = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'Admin' | 'User';
}

export type LoginRequestDto = {
    email: string;
    password: string;
};

export type RegistrationRequestDto = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
}