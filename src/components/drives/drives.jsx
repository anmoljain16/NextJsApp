"use client";
import { useState } from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import Link from "next/link";
export default function drives(){
    const router = useRouter();
    const [user, setUser] = useState({
        registrationNo: "",
        password: ""
    })
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)



    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        if(user.registrationNo.length < 8){
           setError("Registration No!")
           setLoading(false)
           return
        }
        if(user.password.length === 0){
            setError("Password!")
            setLoading(false)
            return
        }

        try{
            const response = await axios.post("/api/drives/login", user)
            console.log(response.data)

            if(response.data.error){
                setError(response.data.error)
                setLoading(false)
                return
            }

            localStorage.setItem("userData", JSON.stringify(response.data))
            router.push("/drives")


        } catch (error){
            setError("Something went wrong!")
            setLoading(false)
        }
    }




    return(
        <>
            <div className="container content-center center">
                <form className="max-w-sm mx-auto">
                    <div className="mb-5">
                        <label htmlFor="registrationNo"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            UMS Registration No.</label>
                        <input type="text" id="registrationNo" onChange={
                            (e) => setUser({...user, registrationNo: e.target.value})
                        } name="registrationNo"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="********" required/>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">UMS
                            Password</label>
                        <input type="password" id="password" onChange={
                            (e) => setUser({...user, password: e.target.value})
                        } name="password"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               required/>
                    </div>

                    <button type="submit" onClick={handleSubmit}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
                    </button>


                </form>

            </div>

        </>
    )
}
