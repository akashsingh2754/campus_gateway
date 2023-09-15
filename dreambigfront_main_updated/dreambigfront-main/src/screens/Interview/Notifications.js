import React, { useContext } from 'react'
import { Button } from '@material-ui/core'
import { SocketContext } from '../../store/SocketContext';

const Notificaitons = () => {

  const {answerCall, call, callAccepted} = useContext(SocketContext);
  return (
    <>
    {call.isReceivingCall && !callAccepted && (
      <div style={{display: 'flex', justifyContent:'center'}}>
        <h4>{call.name} is calling </h4>
        <Button variant="contained" color='primary' onClick={answerCall} style={{"margin-left":"15px"}}>
          Answer
        </Button>
      </div>
    )}
    </>
  )
}

export default Notificaitons