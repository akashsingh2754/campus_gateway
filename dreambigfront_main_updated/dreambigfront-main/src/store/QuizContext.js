import React, {useState} from "react";

export const QuizContext= React.createContext({
    type:null,
    Change: () => {}
})

export const QuizContextProvider = ({children}) => {
    var type= null;
    function Change(data){
        type=data;
    }
  return(
    <QuizContext.Provider value={{type,Change}}>{children}</QuizContext.Provider>
  )
}