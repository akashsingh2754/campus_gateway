import classes from './Card1.module.css';

function Card(props){
// console.log(props.accepted)
// console.log(props.end)
return(    
/* <div className={`${classes.nocall && !props.accepted} ${classes.card && props.accepted}`} >{props.children}</div> */
<>
{props.accepted ? <div className={classes.card} >{props.children}</div>:
 <div className={classes.nocall} >{props.children}</div>}
</>
);
}

export default Card;