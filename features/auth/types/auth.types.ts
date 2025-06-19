type AuthCredentials = {
    email: string;
    password: string;
};

export interface CreateUserRequest extends AuthCredentials {
    name: string;
}

export type LoginUserRequest = AuthCredentials;