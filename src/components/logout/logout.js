"use client";
import axios from "axios";
import router from "next/router";
import {useRouter} from "next/navigation";
export default function logout(){
    const router = useRouter();
    const logout = async () => {
        try {
            const response = await axios.get("/api/user/logout");
            // console.log(response.data);
            router.push("/login");
        } catch (error) {
            console.error(error);
        }
    }
    return(

        <>
            <button type="button" onClick={logout}
                    className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mr-4 mt-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                Log out
            </button>

        </>
    )
}
