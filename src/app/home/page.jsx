"use client";
// import navigation from "@/components/navigation/navigation";
import navbar from "@/components/navbar/navbar";
import drives from "@/components/drives/drives";

export default function home(){
    return(
        <>

            {/*{navigation()}*/}
            {navbar()}
            <div className="container mx-auto mt-5" >
                {drives()}
            </div>
        </>
    )
}
