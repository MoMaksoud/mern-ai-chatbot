import { NextFunction, Request, Response } from "express";
import Users from "../models/Users.js"
import { hash, compare } from "bcrypt";


export const getAllUsers = async(
     req: Request,
     res: Response,
     next: NextFunction
) => {
    //get all users 
    try {
        const users = await Users.find();
        return res.status(200).json({ message: "OK", users });

        
    } catch (error: any){
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error?.message ?? "Unknown error" });

    }
};

export const userSignup = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
   //user signup

   try {
    const { name, email, password } = req.body;
    const existingUser = await Users.findOne({email})
    if(existingUser) return res.status(401).send("User already registered");
    const hashedPassword = await hash(password, 10)
       const users = new Users({ name, email, password: hashedPassword });
       await users.save();
       return res.status(201).json({ message: "OK", id: users._id.toString() });

       
   } catch (error: any){
       console.log(error);
       return res.status(200).json({ message: "ERROR", cause: error?.message ?? "Unknown error" });

   }
};

export const userLogin = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
   //user Login

   try {
    const {email, password } = req.body;
    const user = await Users.findOne({email });
    if(!user) return res.status(401).send("User not found");

    const isPasswordCorrect = await compare(password, user.password);
    if(!isPasswordCorrect) return res.status(403).send("Incorrect password");

    return res.status(200).json({ message: "OK", id: user._id.toString() });

        
   } catch (error: any){
       console.log(error);
       return res.status(200).json({ message: "ERROR", cause: error?.message ?? "Unknown error" });

   }
};