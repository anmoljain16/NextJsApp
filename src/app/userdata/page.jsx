"use client";
import {useEffect, useState} from "react";

export default function userData(){
    const [data, setData] = useState([]);
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("data"));
        if (data) {
            setData(data.data);
        }else {
            console.log("No data found");
        }

    }, []);
    console.log(data)
    return(
        <>
        <h1>User Data</h1>
        </>
    )
}
