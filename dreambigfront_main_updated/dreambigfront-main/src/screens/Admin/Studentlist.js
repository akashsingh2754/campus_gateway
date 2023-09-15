import Studentitem from "./Studentitem"
import classes from "./Studentlist.module.css"
function Studentlist(props){
    return(
        <ul className={classes.list}>
         {props.list.map((student) => (
        <Studentitem
          id={student.uid}
          image={student.image}
          name={student.studentname}
          highschool={student.highschool}
          PUC={student.twelth}
          email={student.email}
          password={student.password}
          status={student.status}
          time={student.timestamp}
          quiz={student.quiz}
          result={student.result}
          course={student.course}
        />
      ))}
        </ul>
    )
}

export default Studentlist