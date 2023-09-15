import { Card, Container, Grid, Typography } from "@mui/material"
import axios from "axios"
import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components"
import { UserContext } from "../../App"

import { BiAddToQueue, BiRefresh } from "react-icons/bi"

import "./style.css";


const Disease= () => {
  const [search,setSearch] = useState();

  const func = (e)=>{
    setSearch(e.target.value);
  }

  return (
    <div className="beach">
  <div className="pare">
   <a 
   href="https://kryptonanshu.github.io/ieee-hack-subpart/"
   >
   Check it here on this link</a>
  </div>

    </div>
  )
}

export default Disease