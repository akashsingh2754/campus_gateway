import classes from './PaymentCard.module.css';

function PaymentCard(props){
return(    
<div className={classes.card}style={props.style}>{props.children}</div>
);
}

export default PaymentCard;