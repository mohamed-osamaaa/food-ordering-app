export interface RegisterUserDto {
    username: string;
    email: string;
    password: string;
}
export interface UpdateUserDto {
    username?: string;
    email?: string;
    password?: string;
    photo?: string;
}
