import React, { createContext, useState, useRef, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import MarksModal from '../screens/Interview/MarksModal';
import  ReactDOM  from 'react-dom';
import { Videocontext } from './VideoContext';

const SocketContext = createContext();

const socket = io('http://localhost:8080');


const SocketContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const {modal, setModal} = useContext(Videocontext)
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (myVideo.current) {
            myVideo.current.srcObject = currentStream;
          }
        
      });

    socket.on('me', (id) => {setMe(id); console.log("Got a Me request")});
    console.log(me);

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
        if (userVideo.current) {
            userVideo.current.srcObject = currentStream;
          }  
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
        if (userVideo.current) {
            userVideo.current.srcObject = currentStream;
          }  
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  function leaveCall (){
    const isauth = JSON.parse(localStorage.getItem('user'))
    // if(isauth['uid']==='NGbv1gMH11NJQ8NNtjeQsyw51k53'){
    //   setModal(true);
    // }
    setCallEnded(true);
    setModal(true);
    connectionRef.current.destroy();
    stream.getTracks().forEach(track => track.stop());
    stream.destroy();
    // if(isauth['uid']==='NGbv1gMH11NJQ8NNtjeQsyw51k53'){
      console.log("Get Lost");
    //}
  };

  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContextProvider, SocketContext };