import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import classes from "./MarksModal.module.css";
import { Videocontext } from "../../store/VideoContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase";

function MarksModal(props) {
  const { modal, setModal } = useContext(Videocontext);
  const navigate = useNavigate();
  const [marks,setMarks] = useState();
  const [qual, setQual] = useState("");
  if (!modal) {
    return <></>;
  }
  
  console.log("MarksModal Called");
   
  async function Allocater(){
    setModal(false);
    const id= localStorage.getItem("candidate")
    const ref = doc(db, "students", id);
    await updateDoc(ref,{
      interview:qual
    })
    navigate("/")
  }
  return (
    <div className={classes.overlay}>
      <div className={classes.message}>
        <div className={classes.heading}>Allocate Marks</div>
        <div className={classes.actions}>
          {/* <form> */}
            {/* <input
              type="text"
              placeholder="Marks"
              onChange={(e) => setMarks(e.target.value) }
              style={{
                padding: 0,
                margin: 0,
                position: "relative",
                top: "37px",
                outline: "none",
                width:"350px",
                fontSize: "1.5rem",
                "text-align":"center"
              }}
            /> */}
            {/* <div
              style={{
                backgroundColor: "black",
                width: "350px",
                height: "2px",
                display: "inline-block",
                position:"sticky",
                zIndex:"2"
              }}
            ></div>
            <span style={{ fontSize: "2rem", "margin-left": "10px" }}>/10</span> */}
            

          {/* </form> */}
          <div className={classes.actions}>
             <button className={classes.button1} onClick={() => setQual("Pass")}>Qualify</button>
             <button className={classes.button2} onClick={() => setQual("Fail")}>Disqualify</button>
            </div>
        </div>
        <div className={classes.settle}>
          <button onClick={Allocater} className={classes.button3}>
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}

export default MarksModal;
