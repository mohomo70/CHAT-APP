import { FormHelperText, Input, InputLabel,Box, TextField, Button, Typography } from '@mui/material'
import { Link } from "react-router-dom";
import Container from '@mui/material/Container';
import  FormControl  from '@mui/material/FormControl'
import { height } from '@mui/system';
import React,{useState} from 'react'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
 
const LoginPage = () => {
    const [userName, setUserName] = useState<string>('')
    const [password, setPassWord] = useState<string>('')
    const handleSubmit = () =>{
        console.log(userName)
        console.log(password)
        toast.success(userName)

    }
  return (
    <Container sx={{height: '80vh'}}>
        <Box sx={{display:'flex',flexDirection:'column', height:"80%", justifyContent:'center'}}>
            {/* <div style={{display:'flex'}}> */}
                <TextField 
                    label="Name"
                    id="userName"
                    name="name"
                    helperText="Enter Your Name"
                    value={userName}
                    onChange ={(e)=>setUserName(e.target.value)}
                />
                 <TextField 
                    label="Password"
                    id="password"
                    name="pass"
                    helperText="Enter Your Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassWord(e.target.value)} 
                />
                <Button onClick={handleSubmit} variant='contained' sx={{width:'50%', alignSelf: 'center'}}>Log In</Button>
                <Typography variant='body1' sx={{alignSelf: 'center'}}><Link to = '/register'>register</Link></Typography>
                <Link to = '/register'>register</Link>
                {/* </div> */}
                <ToastContainer />
        </Box>
    </Container>
  )
}

export default LoginPage