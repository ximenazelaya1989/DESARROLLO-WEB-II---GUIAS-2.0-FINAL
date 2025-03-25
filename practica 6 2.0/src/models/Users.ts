import mongoose, { Schema } from "mongoose";

//Define la interfaz para el usuario, asegurando el tipado de Typescript
interface IUser {
    name: string;
    email: string;
    password: string;
    username: string;
}

//Define el esquema del usuario en la base de datos
const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
});

// Crea el modelo de usuario basado en el esquema

const User = mongoose.model("User", userSchema);

export default User;