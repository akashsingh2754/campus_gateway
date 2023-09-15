import { Card } from "@mui/material"
import axios from "axios"
import React, { useEffect, useContext } from "react"
import { UserContext } from "../../App"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"


function Select() {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)
  useEffect(() => {
    const token = localStorage.getItem("token")
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/user/info/", {
          headers: { Authorization: token },
        })
        setUser({
          username: response.data.username,
          id: response.data._id,
          email: response.data.email,
        })
      } catch (error) {}
    }
    getData()
  }, [])


  
  console.log(user)
  return (
    <Main>
      <Holder className='rounded-tr-2xl'>
        <Card
          sx={{
            maxWidth: 400,
            margin: "10px",
            borderRadius: "30px",
            border: "3px solid yellow",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <div
            style={{
              height: "100%",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              // background: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.3)), url(${card3})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <CardContent>
              <Typography
                gutterBottom
                variant='h5'
                component='div'
                sx={{ textAlign: "center" }}
              >
                Disease Search
              </Typography>
              <Typography
                variant='body2'
                color='text.primary'
                sx={{ textAlign: "center" }}
              >
               Search the Disease the patient is going through
               to get information regarding it!!
              </Typography>
            </CardContent>
            <CardActions
              sx={{ display: "flex", width: "100%", justifyContent: "center" }}
            >
              <Button
                sx={{
                  padding: "10px",
                  background: "linear-gradient(45deg,#e523ff,#4548ff)",
                  background: `#E5DB43`,
                  background: `-webkit-linear-gradient(top left, #E5DB43, #FCE11A)`,
                  background: `-moz-linear-gradient(top left, #E5DB43, #FCE11A)`,
                  background: `linear-gradient(to bottom right, #E5DB43, #FCE11A)`,
                  color: "white",
                  fontWeight: 900,
                  borderRadius: "30px",
                  "&:hover": { opacity: "0.8" },
                }}
                onClick={() => navigate("/disease")}
              >
                Search Symptoms
              </Button>
            </CardActions>
          </div>
        </Card>

        <Card
          sx={{
            maxWidth: 400,
            margin: "10px",
            border: "2px solid yellow",
            borderRadius: "30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <div
            style={{
              height: "100%",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <CardContent>
              <Typography
                variant='h5'
                component='div'
                sx={{ textAlign: "center" }}>
                Search Hospital Reviews 
              </Typography>

              <Typography
                variant='body2'
                color='text.primary'

                sx={{ textAlign: "center" }}
              >
                Not sure about a Certain Hospital in your Area??
                See all the location of Maps here
              </Typography>
            </CardContent>
            <CardActions
              sx={{ display: "flex", width: "100%", justifyContent: "center" }}
            >
              <Button
                sx={{
                  padding: "10px",
                  background: `#FC724D`,
                  background: `-webkit-linear-gradient(top left, #E5DB43, #FCE11A)`,
                  background: `-moz-linear-gradient(top left, #E5DB43, #FCE11A)`,
                  background: `linear-gradient(to bottom right, #E5DB43, #FCE11A)`,
                  color: "white",
                  fontWeight: 900,
                  borderRadius: "30px",
                  "&:hover": { opacity: "0.8" },
                }}
                onClick={() => navigate("/map")}
              >
                Open Map
              </Button>
            </CardActions>
          </div>
        </Card>
      </Holder>
    </Main>
  )
}

const Main = styled.div`
  width: 100%;
  height: calc(100vh - 75px);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`
const Holder = styled.div`

  display: flex;
`

export default Select
