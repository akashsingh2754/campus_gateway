import React from "react";
import classes from "./Portal.module.css";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Portal(){

   async function Onpay(){
    const auth=getAuth();
    const ref = doc(db, "students", auth.currentUser.uid);
    await updateDoc(ref,{
      paid:"paid"
    })
    navigate("/")
   }

   const navigate = useNavigate();

    const options = [
        {
          label: "-------------Select your Course-------------",
          value: "null",
        },
        {
          label: "B-Tech",
          value: "be",
        },
        {
          label: "MBA",
          value: "mba",
        },
        {
          label: "MCA",
          value: "mca",
        },
        {
          label: "BBA",
          value: "bba",
        },
      ];
return(
    <div className={classes.container}>
        <div className={classes.cont}>
            <div className={classes.form}>
                <div className={classes.heading}>
                    Payment Form
                </div>
                <form>
                    <div className={classes.id}>
                    <input type="text" placeholder="Name"></input>
                    </div>
                    <div className={classes.id}>
                    <input type="text" placeholder="Enter UPI ID"></input>
                    </div>
                    <div className={classes.id}>
                    <select
                    style={{ width: "inherit", color: "black",  "font-family":"sans-serif"}}
                  >
                    {options.map((option) => (
                      <option value={option.value} style={{color: "black"}}>{option.label}</option>
                    ))}
                  </select>
                  </div>
                </form>
                <button className={classes.actions} onClick={Onpay}>Proceed To Pay</button>
            </div>
            <div className={classes.qr}>
                <div className={classes.img}>
                <img src="https://www.investopedia.com/thmb/hJrIBjjMBGfx0oa_bHAgZ9AWyn0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/qr-code-bc94057f452f4806af70fd34540f72ad.png"></img>
                </div>
                <div className={classes.text}>You can also scan this Scanner</div>
            </div>
        </div>
    </div>
)
}

export default Portal;