import { getAuth } from "firebase/auth";
import { addDoc, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { useContext } from "react";
import { db } from "../../Firebase";
import Card from "../../ui/Card";
import { ChatContext } from "../../store/ChatContext";
import classes from "./Studentitem.module.css";
import { useNavigate } from "react-router-dom";
import { Videocontext } from "../../store/VideoContext";

function Studentitem(props) {
  const auth = getAuth();
  const navigate = useNavigate();
  const currentuser = auth.currentUser;
  const { dispatch } = useContext(ChatContext);

  async function chathandler() {
    const combinedId =
      currentuser.uid > props.id
        ? currentuser.uid + props.id
        : props.id + currentuser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentuser.uid), {
          [combinedId + ".userInfo"]: {
            uid: props.id,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", props.id), {
          [combinedId + ".userInfo"]: {
            uid: currentuser.uid,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: "CHANGE_USER", payload: props });
    console.log(props.userInfo);
    navigate("/chat");
  }

  async function Accepted() {
    const docRef = doc(db, "students", props.id);
    const payload = {
      uid: props.id,
      highschool: props.highschool,
      image: props.image,
      password: props.password,
      status: "Congratulations You are eligible to take on the quiz!!!",
      studentname: props.name,
      timestamp: props.time,
      twelth: props.PUC,
      email: props.email,
      course: props.course,
      bool: 1,
      result: -1,
      interview: -1,
      paid: "unpaid",
      quiz: true,
    };
    setDoc(docRef, payload);
  }

  function Rejected() {
    const docRef = doc(db, "students", props.id);
    const payload = {
      uid: props.id,
      highschool: props.highschool,
      image: props.image,
      password: props.password,
      status: "You are not eligible to attend the Quiz...",
      studentname: props.name,
      timestamp: props.time,
      course: props.course,
      twelth: props.PUC,
      email: props.email,
      interview:-1,
      bool: 0,
      result: -1,
      quiz: false,
      paid:"unpaid"
    };
    setDoc(docRef, payload);
  }
  const ctx = useContext(Videocontext);
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.space}>
          {props.result === 1 && (
            <img
              src="http://cdn.onlinewebfonts.com/svg/img_503190.png"
              className={classes.vid}
              onClick={() => {
                ctx.vididhandler(props.id);
                localStorage.setItem("candidate", props.id);
                window.open("/interview", "_blank");
              }}
            ></img>
          )}
          {props.result !== 1 && <div style={{ height: "50px" }}></div>}
        </div>
        <div className={classes.complete}>
          <div className={classes.image}>
            <img src={props.image} alt={props.title}></img>
          </div>
          <div className={classes.content}>
            <h3>{props.name}</h3>
            <h3>PUC: {props.PUC}%</h3>
            <h3>High School: {props.highschool}%</h3>
            <h3>Applied For: {props.course}</h3>
          </div>
          <div className={classes.actions}>
            {props.quiz === true && props.result === -1 && (
              <div className={classes.pending}>Result Pending...</div>
            )}
            {props.quiz === 0 && props.result === -1 && (
              <>
                <div className={classes.initial}>
                  <button onClick={Accepted} className={classes.button1}>
                    Accept
                  </button>
                  <button onClick={Rejected} className={classes.button2}>
                    Reject
                  </button>
                </div>
              </>
            )}
            {props.quiz === true && props.result === 1 && (
              <div className={classes.status1}>Qualified Quiz</div>
            )}
            {props.quiz === true && props.result === 0 && (
              <div className={classes.status2}>Failed Quiz</div>
            )}
            {props.result === 1 && (
              <button onClick={chathandler} className={classes.button1}>
                Chat
              </button>
            )}
            {/* <button onClick={Approve} className={classes.button1}>Quiz</button> */}
          </div>
        </div>
      </Card>
    </li>
  );
}
export default Studentitem;