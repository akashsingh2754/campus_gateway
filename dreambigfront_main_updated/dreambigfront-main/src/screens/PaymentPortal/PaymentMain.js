import React from "react";
import { useNavigate } from "react-router-dom";
import PaymentCard from "../../ui/PaymentCard";
import classes from "./PaymentMain.module.css"

function Payment(){
    const navigate=useNavigate();

    return(
        <PaymentCard>
            <h1 style={{"font-family":"sans-serif"}}>Rules for Payment</h1>
            <ol>
            <li>This payment is made to reserve the seat of Selected Payment</li>
            <li>The Payment made is not regarding fee Payment</li>
            <li>After the Payment is done the candidate will be Notified in the Student Portal itself</li>
            <li>After clicking Proceed to Page. You will be directed to a Payment Portal Upi</li>
            <li>Ensure you have a registered bank account with any of the UPI'S</li>
            </ol>
            <button onClick={() => navigate("/portal")}>Procced to Pay</button>
        </PaymentCard>
    )
}

export default Payment;