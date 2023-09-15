import React, { useContext } from "react";
import VideoPlayer from "./VideoPlayer";
import Options from "./Options";
import Notificaitons from "./Notifications";
import {Typography, AppBar, makeStyles} from  '@material-ui/core'
import styles from "./styles.module.css"
import { Videocontext } from "../../store/VideoContext";
import { getAuth } from "firebase/auth";
import MarksModal from "./MarksModal";
import { SocketContextProvider } from "../../store/SocketContext";

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    border: '2px solid black',

    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  image: {
    marginLeft: '15px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}));
 const auth=getAuth()
 console.log(auth.currentUser)
 function InterviewApp(){
  const classes = useStyles();
  const ctx= useContext(Videocontext)
  console.log(ctx.vid)
  const isauth = JSON.parse(localStorage.getItem('user'))
  return(
    <>
    {isauth['uid']==='NGbv1gMH11NJQ8NNtjeQsyw51k53' && <MarksModal/>}
    <div className={styles.body} style={{height:"190vh",}}>
    <div className={classes.wrapper}>
      <AppBar className={classes.appBar} position="static" color="inherit">
      <Typography variant="h2" align="center">Video Chat</Typography>
      </AppBar>
      <VideoPlayer/>
      <div style={{"margin-top": "80px"}}>
      <Options>
        <Notificaitons />
      </Options>
      </div>
    </div>
    </div>
    </>
  );
 }

 export default InterviewApp