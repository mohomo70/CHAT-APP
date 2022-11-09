import { Container, TextField, Box, Typography, Button} from '@mui/material'
import {Link} from 'react-router-dom'
import React,{useState} from 'react'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'

type fullUser = {
    name:string,
    password:string,
}

const RegisterPage = () => {
    const [name, setName] = useState<string>('')
    const [password, setPassWord] = useState<string>('')
    const [confrimPassword, setConfirmPassword] = useState<string>('')

    const handleSubmit = async () => {
        if(password !==confrimPassword){
            toast('passwords are not same')
            console.log('wrong')
        }
        else{
        const newUser:fullUser = {name, password}
        const config = {headers:{'Content-Type': 'application/json'}}
        const {data} = await axios.post('/api/users/register',newUser,config)
        console.log(data)
        }
    }
  return (
    <Container sx={{height:'80vh'}}>
        <Box sx={{display: 'flex' ,flexDirection:'column', height:"80%", justifyContent:'center'}}>
            <Typography>Enter Your Name:</Typography>
            <TextField 
                label="userName"
                helperText="Enter your UserName"
                name='userName'
                value={name}
                onChange={e=>setName(e.target.value)}
            />
        
            <Typography>Enter Your Password:</Typography>
            <TextField 
                label="password"
                helperText="Enter your PassWord"
                name="password"
                value={password}
                onChange={e => setPassWord(e.target.value)}
            />
        
            <Typography>Confirm Your PassWord:</Typography>
            <TextField 
                label="confrimPassword"
                helperText="Confirm your PassWord"
                name="password"
                value={confrimPassword}
                onChange={e => setConfirmPassword(e.target.value)}
            />
            <Button variant="contained" onClick={handleSubmit}>Register</Button>
            <Typography sx={{alignSelf:'center'}}><Link to='/login'> login</Link></Typography>
       
        </Box>
    </Container>
  )
}

export default RegisterPage