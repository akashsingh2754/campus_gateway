import { useState,useEffect } from "react";
import {db} from "../../Firebase"
import { query, collection, onSnapshot } from "firebase/firestore";
import classes from "./Admin.module.css"
import Studentlist from "./Studentlist"
import { useNavigate } from "react-router-dom";

function Admin(){
  const [loadedstuds, setloadedstuds] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    const q = query(collection(db, "students"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let list = [];
      querySnapshot.forEach((doc) => {
        list.push({ ...doc.data() });
      });
      setloadedstuds(list);
    });
    return () => unsubscribe();
  }, []);
  console.log(loadedstuds);
  
  function Interview(){
    navigate("/video")
  }
  // console.log(loadedstuds.length)

return (
    <>
    <h1 className={classes.heading}>Students List</h1>
    <Studentlist list={loadedstuds}/>
    </>
)
}

export default Admin