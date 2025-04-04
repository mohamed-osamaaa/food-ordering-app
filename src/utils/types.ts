export interface JWTPayload {
    id: number;
    role: "ADMIN" | "USER";
}
