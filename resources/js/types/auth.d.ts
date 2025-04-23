export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    isSpeaker: boolean;
    email_verified_at?: string;
    created_at?: string;
    updated_at?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    status: string;
    message: string;
    user: User;
    token: string;
}

export interface AuthError {
    message: string;
    errors?: {
        email?: string[];
        password?: string[];
    };
}
