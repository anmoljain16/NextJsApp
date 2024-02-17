
import puppeteer from 'puppeteer';
import {NextResponse} from "next/server";

let browser;

browser = await puppeteer.launch(
    {
        headless: false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage'
        ]
    }
);

console.log("browser launched")


const page = await browser.newPage();

// export async function POST(request){
//     try{
//         const {registrationNo, password} = await request.json();
//         const response = await loginUser(registrationNo, password);
//         console.log("response", response.status);
//         if(response.status == "200"){
//             const data = await getData();
//             return Response.json({
//                 status: 200,
//                 data: data,
//                 body: response
//             })}
//         else{
//             return Response.json({
//                 status: 500,
//                 body: response
//             });
//         }
//     }catch(error){
//         console.log("error", error);
//     }
//
//
//
// }

export async function POST(request){
    const {registrationNo, password} = await request.json();
    console.log("registrationNO", registrationNo);
    console.log("password", password);

    try {
        console.log("trying to log in");



        await page.goto("https://ums.lpu.in/Placements/");
        console.log("page opened")

        await page.type("#txtUserName", registrationNo);
        await page.type("#txtPassword", password);

        console.log("credentials entered")

        const searchResultSelector = "#Button1";
        await page.waitForSelector(searchResultSelector);
        await page.click(searchResultSelector);
        console.log("clicked on login button")

        const userData= await getData();
        // console.log("userData", userData);
        // res.json("Logged in Successfully");
        // localStorage.setItem("userData", JSON.stringify(userData));
        return Response.json({
            status: "200",
            message: "Logged in Successfully",
            data: userData
        })
    } catch (error) {
        // res.json("error while login : ", error)
        // console.log("error", error);
        return Response.json({
            status: "error",
            message: "error while login",
            error: error.message
        })
    }
}

async function getData() {
    try {
        await page.goto("https://ums.lpu.in/Placements/frmPlacementDriveRegistration.aspx");

        let text = await page.evaluate(() => {
            return Array.from(document.querySelectorAll("#ctl00_ContentPlaceHolder1_gdvPlacement tr"), (e) => {
                const tds = e.querySelectorAll("td");
                let jobProfileLinks = "none";

                const anchors = e.querySelectorAll("a");
                anchors.forEach((anchor) => {
                    if (anchor.innerText === "See Job Profile") {
                        jobProfileLinks = anchor.href;
                    }
                });

                if (tds.length >= 8) {
                    return {
                        driveCode: tds[0].innerText,
                        driveDate: tds[1].innerText,
                        RegisterBy: tds[2].innerText,
                        Company: tds[3].innerText,
                        StreamEligible: tds[4].innerText,
                        Venue: tds[5].innerText,
                        JobProfile: jobProfileLinks,
                        Status: tds[7].innerText,
                    };
                } else {
                    // Return a default value or handle the case where there are not enough td elements.
                    return {
                        driveCode: "",
                        driveDate: "",
                        RegisterBy: "",
                        Company: "",
                        StreamEligible: "",
                        Venue: "",
                        JobProfile: "",
                        Status: "",
                    };
                }
            });
        });

        await browser.close();
        console.log("fetching completed");
        return text;

    } catch (error) {
        console.error("Error running Puppeteer:", error);
        return Response.json({error: "Error running Puppeteer"});
    }

}
