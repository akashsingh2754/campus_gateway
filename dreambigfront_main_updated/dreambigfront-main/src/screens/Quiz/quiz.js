import { useContext, useState, AuthContext } from "react";
import { db } from "../../Firebase";
import { QuizContext } from "../../store/QuizContext";
import { quiz } from "./questiondata";
import { doc, updateDoc } from "firebase/firestore";
import { Oval } from "react-loader-spinner";

import classes from "./quiz.module.css";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const Quiz = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [submit, setSubmit] = useState(false);
  const auth = getAuth();
  const ref = doc(db, "students", auth.currentUser.uid);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const ctx = useContext(QuizContext);
  const type = ctx.type;
  const { questions } = quiz[type];
  const { question, choices, correctAnswer } = questions[activeQuestion];
  const navigate = useNavigate();

  const quizfinished = async () => {
    setSubmit(true);
    await updateDoc(ref, {
      result: result.score >= 0.75 * questions.length ? 1 : 0,
      quiz: true,
      status:
        result.score >= 0.75 * questions.length
          ? "Congratulations You have Qualfied the Quiz and are eleigible for next round"
          : "You have been disqualified in the quiz round",
    });
    navigate("/");
  };
  const onClickNext = () => {
    // again reset the selectedAnwerIndex, so it won't effect next question
    setSelectedAnswerIndex(null);
    setActiveQuestion((prev) => prev + 1);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );
  };

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  return (
    <div className={classes.body}>
    <div className={classes.quizcontainer}>
      <div>
        <span className={classes.activequestionno}>
          {addLeadingZero(activeQuestion + 1)}
        </span>
        <span className={classes.totalquestion}>
          /{addLeadingZero(questions.length)}
        </span>
      </div>
      <h2>{question}</h2>
      <ul>
        {choices.map((answer, index) => (
          <li
            onClick={() => onAnswerSelected(answer, index)}
            key={answer}
            className={
              selectedAnswerIndex === index ? classes.selectedanswer : null
            }
          >
            {answer}
          </li>
        ))}
      </ul>
      <div className={`${!submit && classes.flexright} ${submit && classes.flexnormal}` }>
        <button
          onClick={
            activeQuestion === questions.length - 1 ? quizfinished : onClickNext
          }
          disabled={selectedAnswerIndex === null}
        >
          {activeQuestion === questions.length - 1 ? (
           ! submit ? (
              "Submit and Finish"
            ) : (
              <div className={classes.oval}>
              <Oval height={80} width={80} color="white" wrapperStyle={{}} wrapperClass="white" visible={true} ariaLabel="oval-loading" secondaryColor="white" strokeWidth={5} strokeWidthSecondary={6}/>
              </div>
            )
          ) : (
            "Next"
          )}
        </button>
      </div>
    </div>
    </div>
  );
};

export default Quiz;
