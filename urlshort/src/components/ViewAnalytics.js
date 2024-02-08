import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ViewAnalytics() {
    const [data,setData] = useState([]);
    const [url, setURL] = useState("");
    const view = useParams();
    const token = localStorage.getItem("authToken");
    console.log(data.length,"data data data")
    const date = data.analytics!=0 ? data.analytics?.[data.totalClicks-1].time?.split('T') : "";
    console.log(date,"asfasdfasdfasf");
    useEffect(() => {
        fetchURL();
        fetchData();
    },[])

    function fetchURL() {
        fetch(`https://friendly-space-zebra-444g94vw9rfqxq9-3030.app.github.dev/app/v1/url/${view.id}`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json", Authorization: token },
        }).then((result)=>{
            result.json().then((res)=>{
                setURL(`https://friendly-space-zebra-444g94vw9rfqxq9-3030.app.github.dev/app/v1/${res[0].shortUrl}`);
            })
        })
    }

    function fetchData() {
        fetch(`https://friendly-space-zebra-444g94vw9rfqxq9-3030.app.github.dev/app/v1/anaytics/${view.id}`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json", Authorization: token },
        }).then((result)=>{
            result.json().then((res)=>{
                console.log(res,"Asfsdfsdafa")
                setData(res);
            })
        })
    }

    return (
        <div className="viewContainer">
            <p>{url}</p>
            <p>Total Number of Views : <span>{data.totalClicks}</span></p>
            {
                date ? <p>Last View : <span>{date?.[0]} {date?.[1].substring(0,8)}</span></p> : <p>Last View : NULL</p>
            }
        </div>
    )
}