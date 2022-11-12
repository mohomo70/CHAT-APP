import React,{useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext} from '../context'
import {  Button } from '@mui/material'

const HomePage = () => {
    const {user, setingUser} = useContext<any>(userContext)
    
    let navigate = useNavigate()
    useEffect(() => {
        if(user === null){
            navigate('/login')
        }
    }, [user,navigate])

    const logOut = () => {
        setingUser(null)
        localStorage.removeItem('user')
    }
    
  return (
    <>  
    <div>welcome {user?.name}</div>
    <Button onClick={logOut}>logOut</Button>
    </>
  )
}

export default HomePage