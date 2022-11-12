import { FormHelperText, Input, InputLabel,Box, TextField, Button, Typography } from '@mui/material'
import { Link, useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import  FormControl  from '@mui/material/FormControl'
import { height } from '@mui/system';
import React,{useState,useEffect} from 'react'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { useContext } from 'react';
import { userContext } from '../context';
import { useMutation, useQueryClient } from 'react-query';

 
const LoginPage = () => {
    const [userName, setUserName] = useState<string>('')
    const [password, setPassWord] = useState<string>('')
    const [error , setError] = useState<string>('')
    const navigate = useNavigate()
    const queryClient = useQueryClient();

    type userID = {
        name:string,
        password:string
    }

    const {user,setingUser} = useContext(userContext)
    useEffect(() => {
        !user? navigate('/login'): navigate('/home')
    }, [user])
    
    const {mutate: loginUser} = useMutation(
        (async (user:userID) =>{
            const config = {headers:{'Content-Type': 'application/json'}}
            const {data} = await axios.post('api/users/login',user,config)
            return data
        }),
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries('user');
                console.log(data)
                setingUser(data)
                localStorage.setItem('user',JSON.stringify(data))
            },
            onError: (error: any) => {
                console.log(error)
                setError(error.response.data.message)

            }
        }
    )

    const handleSubmit = async () =>{
        const user = {name:userName,password}
        loginUser(user)
    }
   
  return (
    <Container sx={{height: '80vh'}}>
        <Box sx={{display:'flex',flexDirection:'column', height:"80%", justifyContent:'center'}}>
                {error && <div>{ error} </div>}
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
        </Box>
    </Container>
  )
}

export default LoginPage