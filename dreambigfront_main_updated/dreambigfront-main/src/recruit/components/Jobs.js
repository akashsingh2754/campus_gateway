import React, { useEffect, useState } from "react";
import Job from "./Job";
import data from "../data";





import './card.css'
const Jobs=()=>{
 return(
    <>
    <div className="alignbooks">
    {data.map((books,int)=> <div className="cards"><Job data={books}></Job></div>)}
    </div>
    </>
 )
}


export default Jobs