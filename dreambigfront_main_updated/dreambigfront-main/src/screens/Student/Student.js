import { useState, useEffect, useContext } from "react";
import { db } from "../../Firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  query,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import classes from "./Student.module.css";
import { serverTimestamp } from "firebase/firestore";
import { auth } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../../store/ChatContext";
import { QuizContext } from "../../store/QuizContext";
import Modal from "./Modal";
import StudentCard from "../../ui/PaymentCard";

function Student() {
  const [status, setStatus] = useState([]);
  const [name, setName] = useState([]);
  const [img, setImg] = useState([]);
  const [bl, setbl] = useState([]);
  const [interview, setInterview] =useState();
  const [fee, setFee] =useState();
  const [quiz, setQuiz] = useState(null);
  const [result, setResult] = useState();
  const ctx=useContext(QuizContext);
  const { dispatch } = useContext(ChatContext);
  const navigate = useNavigate();
  const auth = getAuth();
  const currentuser = auth.currentUser;
  const obj = { id: "NGbv1gMH11NJQ8NNtjeQsyw51k53" };
  const [modal, setModal] =useState(false);
  
  function Interview(){
    // navigate("/studentvideo");
    setModal(true);
  }

  async function chathandler() {
    const combinedId =
      currentuser.uid > obj.id
        ? currentuser.uid + obj.id
        : obj.id + currentuser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentuser.uid), {
          [combinedId + ".userInfo"]: {
            uid: obj.id,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", obj.id), {
          [combinedId + ".userInfo"]: {
            uid: currentuser.uid,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: "CHANGE_USER", payload: obj });
    console.log(combinedId);
    navigate("/chat");
  }
  function Pay(){
    navigate("./payment")
  }
  useEffect(() => {
    const q = query(collection(db, "students"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let list = [];
      querySnapshot.forEach((doc) => {
        list.push(doc.data());
      });
      // console.log(list);
      const auth = getAuth();
      const user = auth.currentUser;
      const Status = list.filter(function (el) {
        return el.uid == user.uid;
      });
      console.log(Status[0]);
      setStatus(Status[0].status);
      setName(Status[0].studentname);
      setImg(Status[0].image);
      setbl(Status[0].bool);
      setQuiz(Status[0].quiz);
      setResult(Status[0].result);
      setInterview(Status[0].interview);
      setFee(Status[0].paid)
      console.log(Status[0].course);
      ctx.type=Status[0].course;
      console.log(ctx.type)
      console.log(result);
    });
    return () => unsubscribe();
  }, []);
  if(fee==="paid"){
    return(
      <div className={classes.cont}>
      <div className={classes.box}>
      <div className={classes.heading}>
        <p className={classes.name}>Welcome {name}</p>
      </div>
     <div className={classes.description}>
      Dear Student.Congratulations You have blocked your Seat in the College 
      </div>
      <div className={classes.description}>
      You can clear your doubts and queries by contacting the Admin
      </div>
      <button className={classes.button} onClick={chathandler}>
          Contact Admin
      </button>
     </div>
     </div>
    )
  }

  if(interview!==-1){
    return(
      <div className={classes.cont}>
      <div className={classes.box}>
      <div className={classes.heading}>
        <p className={classes.name}>Welcome {name}</p>
      </div>
      
     {interview === "Pass" ? 
     <>
     <div className={classes.description}>
      Congratulations for clearing the Interview and the Entrance Exam.
      </div>
      <div className={classes.description}>
      Kindly click the button provided to Explore the fees Structure and Payment Details
      </div>
      
      <button className={classes.button1} onClick={() => {navigate("/payment")}}>Fee Details</button>
      <button className={classes.button} onClick={chathandler}>
          Contact Admin
      </button>
     </>
     :
     <>
      <div className={classes.description}>
      Dear Student You were not able to clear the cutoff of the Interview and have been disqualified from the Entrance Exam
      </div>
      <div className={classes.description}>
      Best Wishes for your Future ahead
      </div>
      <div clasname={classes.actions}>
      <button className={classes.button} onClick={chathandler}>
          Contact Admin
      </button>
      </div>
     </>
    }
    
     </div>
     </div>
      
    )
  }

  return (
   <div className={classes.cont}>
    <div className={classes.box}>
      <div className={classes.heading}>
        <p className={classes.name}>Welcome {name}</p>
      </div>
      <div className={classes.description}>
        <div style={{"font-family":"'Times New Roman', Times, serif", "margin-bottom":"5vh"}}>Your status is</div>
        {status}
        <div style={{"font-family":"'Times New Roman', Times, serif"}}>
        Kindly Contact the Admin regarding your Interview Schedule
        </div>
      </div>
      {quiz === 1 ? (
        "Loading"
      ) : quiz === true && result === -1 ? (
        <button
          className={classes.button}
          onClick={() => {
            navigate("/main");
          }}
        >
          Attend Quiz
        </button>
      ) : (
        ""
      )}
      {result === 1 ? (
        <div className={classes.container}>
        <button className={classes.button} onClick={chathandler}>
          Contact Admin
        </button>
        <div className={classes.text} style={{"font-size":"1.8rem", "font-wieght":"bolder", "color":"white"}}>Start your Interview at the alloted time by pressing the Button Below</div>
        <Modal modal={modal} closemodal={() => {setModal(false)}}/>
        <button className={classes.button1} onClick={Interview}>Start Interview</button>
        </div>
      ) : (
        ""
      )}
      </div>
      </div>
  );
}

export default Student;