"use client";
import "./drives.css";
import navbar from "@/components/navbar/navbar";
import {useEffect} from "react";

export default function drives() {
useEffect(() => {
        document.title = "Drives";
    }, []);
    return (
        <>
            {navbar()}
        <div className = "box">
            <div className="app">
                <div className="drive">
                    <div className="drive-name">
                        <h2 className="#f8fafc">Drive name</h2>
                    </div>
                    <div className="drive__name">
                        <h3>Local Disk (C:)</h3>
                    </div>
                    <div className="drive__size">
                        <h3>100 GB</h3>
                    </div>
                </div>
                <div className="drive"></div>
                <div className="drive"></div>
                <div className="drive"></div>
                <div className="drive"></div>
                <div className="drive"></div>
                <div className="drive"></div>
                <div className="drive"></div>
                <div className="drive"></div>
                <div className="drive"></div>
            </div>

            <div className="drivepage" id="table-container">
                <iframe src="https://ums.lpu.in/Placements/DriveDetails.aspx?id=wSumhA4faDR4eax74MpJ4w=="
                        title="Job Profile"></iframe>
            </div>

        </div>
        </>

    );
}
