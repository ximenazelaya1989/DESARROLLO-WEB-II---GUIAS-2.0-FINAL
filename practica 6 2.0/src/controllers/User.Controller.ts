import User from "../models/Users";
import { Request, Response } from "express";
import { hashPassword, validatePassword } from "../utils/auth";
import { validationResult } from "express-validator";

export const createAccount = async (req: Request, res: Response) => {
    let errors = validationResult(req)
    console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, password, email, username } = req.body;

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
        res.status(409).json({ message: "Username already exists" });
        return;
    }

    const user = new User(req.body);
    user.password = await hashPassword(password);
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
}

export const login = async (req: Request, res: Response) => {
    //Validar los errores en la solicitud
    let errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    //Extraer email y password del cuerpo de la solicitud
    const { email, password } = req.body
    //Buscar al usuario en la base de datos
    const user = await User.findOne({ email })
    if (!user) {
        const error = new Error('Invalid credencials')
        return res.status(401).json({ error: error.message })
    }

    //Comprobar si el password es correcto
    const isPasswordCorrect = await validatePassword(password, user.password)
    if (!isPasswordCorrect) {
        const error = new Error('Invalid credencials')
        return res.status(401).json({ error: error.message })
    }

    //Si todo es correcto, eviar respuesta de autenticacion exitosa
    res.status(200).send('Authenticated')
}