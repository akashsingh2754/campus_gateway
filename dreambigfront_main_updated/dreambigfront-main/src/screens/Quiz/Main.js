import React, { useContext, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../store/AuthContext'
import styles from "./Main.module.css"

export default function Main() {

    const navigate=useNavigate();
    function startQuiz(){
        navigate('/quiz')
    }

  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Admission Quiz</h1>

        <ol className={styles.list}>
            <li>You will be asked 10 questions one after another.</li>
            <li>10 points is awarded for the correct answer.</li>
            <li>Each question has three options. You can choose only one options.</li>
            <li>You can review and change answers before the quiz finish.</li>
            <li>You can view your result after finishing the Quiz in your Portal.</li>
        </ol>


        <button className={styles.start} onClick={startQuiz}>Start</button>
        {/* <div className={classes.div1}>
            <Link className={styles.start} to={'quiz'} onClick={startQuiz}>Start Quiz</Link>
        </div> */}

    </div>
  )
}