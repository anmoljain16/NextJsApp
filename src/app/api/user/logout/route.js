import {NextResponse} from "next/server";
import {cookies} from "next/headers";

export async function GET(){
    try {


        cookies().set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        const response = Response.json({
            message: "Logout successful",
            success: true,
        });

        return response;
    }catch (error) {
        return Response.json({error: error.message});
    }
}
