import {connect} from "@/dbConnection/dbConnection";
import User from "@/models/userModel";
import bcrypyt from "bcryptjs";
import jwt from "jsonwebtoken";
import {cookies} from "next/headers";

connect();

export async function POST(request) {
    try {
        const {email, password} = await request.json();
        // console.log(username, email, password);

        // Check if user exists
        const user = await User.findOne({email})
        if (!user) {
            return Response.json({error: "No User Found"});
        }

        // Check if password is correct
        const validPassword = await bcrypyt.compare(password, user.password);
        if (!validPassword) {
            return Response.json({error: "Invalid Password"});
        }


        // Create and assign a token
        const token_data = {
            id : user._id,
            username: user.username,
            email : user.email,
        }

        const token = await jwt.sign(token_data, process.env.JWT_SECRET ,{expiresIn: "1h"});

        const response = Response.json({
            message: "Logged in successfully",
            cookies: {
                token: token
            },
            user: user,
            success: true
        });

        cookies().set("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7
        });

        return response;


    }catch (e){
        return Response.json({message: "Error creating user",
            error: e.message
        });
    }
}
