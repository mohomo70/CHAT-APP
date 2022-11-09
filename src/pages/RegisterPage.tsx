import { Container, TextField, Box, Typography, Button} from '@mui/material'
import {Link} from 'react-router-dom'
import React from 'react'

const RegisterPage = () => {
  return (
    <Container sx={{height:'80vh'}}>
        <Box sx={{display: 'flex' ,flexDirection:'column', height:"80%", justifyContent:'center'}}>
            <Typography>Enter Your Name:</Typography>
            <TextField 
                label="userName"
                helperText="Enter your UserName"
            />
        
            <Typography>Enter Your Password:</Typography>
            <TextField 
                label="password"
                helperText="Enter your PassWord"
            />
        
            <Typography>Confirm Your PassWord:</Typography>
            <TextField 
                label="confrimPassword"
                helperText="Confirm your PassWord"
            />
            <Button variant="contained" >Register</Button>
            <Typography sx={{alignSelf:'center'}}><Link to='/login'> login</Link></Typography>
       
        </Box>
    </Container>
  )
}

export default RegisterPage