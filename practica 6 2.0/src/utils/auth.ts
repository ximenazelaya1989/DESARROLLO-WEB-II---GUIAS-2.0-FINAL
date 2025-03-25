import argon2 from "argon2";

//Genera un hash seguro para una contrasena en texto plano
export async function hashPassword(plainPassword: string): Promise<string> {
    return await argon2.hash(plainPassword);
}

//Valida si una contrasena en texto plano coincide con su version encriptada.
export async function validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await argon2.verify(hashedPassword, plainPassword);
}