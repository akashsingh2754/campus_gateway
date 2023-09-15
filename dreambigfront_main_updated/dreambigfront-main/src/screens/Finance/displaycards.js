import React from "react";
import tips from "./financepagedata";
import FinancePage from "./FinancePage";
import './card.css'
const Displaycards=()=>{
 return(
    <>
    <div className="alignbooks">
    {tips.map((books,int)=> <div className="cards"><FinancePage title={books.title} description={books.description} image={books.image} key={int}></FinancePage></div>)}
    </div>
    </>
 )
}


export default Displaycards