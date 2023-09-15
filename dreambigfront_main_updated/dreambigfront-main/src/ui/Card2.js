import classes from './Card2.module.css';

function CARD(props){
return(    
<div className={classes.card1}style={props.style}>{props.children}</div>
);
}

export default CARD;