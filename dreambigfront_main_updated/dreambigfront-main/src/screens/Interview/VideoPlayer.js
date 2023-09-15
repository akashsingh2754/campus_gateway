import React from "react";
import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { useContext } from "react";
import { SocketContext } from '../../store/SocketContext';
import styles from "./VideoPlayer.module.css"
import Card from "../../ui/Card1"
import CARD from "../../ui/Card2";
const useStyles = makeStyles((theme) => ({

  gridContainer: {
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
    
  },
  paper: {
    padding: "10px",
    border: "2px solid black",
    margin: "10px",
    
  },
}));

const VideoPlayer = () => {
  const classes = useStyles();
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);
  return (
  <div className={styles.cont}>
    {callAccepted && !callEnded && (
        <CARD>
            <Typography variant="h5" gutterBottom>
              {call.name || "Name"}
            </Typography>
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className={styles.video}
            />
        </CARD>
      )}
      {stream && (
            <Card accepted={callAccepted} end={callEnded}>
            <Typography variant="h5" gutterBottom style={{"margin-left":"14vw"}}>
              {name || "Name"}
            </Typography>
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className={styles.video1}
            />
            </Card>
      )}
   
      
</div>
  );
};

export default VideoPlayer;