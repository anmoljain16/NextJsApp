

import {connect} from "@/dbConnection/dbConnection";
import User from "@/models/userModel";
import {NextResponse } from "next/server";
import bcrypyt from "bcryptjs";

connect();

export async function POST(request) {
    try {
        const {username, email, password} = await request.json();
        // console.log(username, email, password);

        const user = await User.findOne({email})
        if (user) {
            return Response.json({error: "User already exists"});
        }

        const salt = await bcrypyt.genSalt(10);
        const hashedPassword = await bcrypyt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();
        console.log(savedUser);


        return Response.json({
            message: "User created successfully",
            user: savedUser,
            success: true
        });
    }catch (e){
        return Response.json({message: "Error creating user",
        error: e.message
        });
    }
}
