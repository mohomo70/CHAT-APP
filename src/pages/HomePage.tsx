import React,{useEffect, useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext} from '../context'
import {  Button } from '@mui/material'
import { useQuery } from 'react-query'
import axios from 'axios'
import {List, ListItemButton, Container ,Grid, Box} from '@mui/material'
import Messages from '../component/messages'

const HomePage = () => {
    const {user, setingUser} = useContext<any>(userContext)
    const [users, setUsers] = useState([])
    const [reciever, setReciever] = useState<userInterface | null>(null)

    type userInterface = {
      id:string,
      name:string,
      token: string
    }
    
    let navigate = useNavigate()
    const { isLoading, isFetching, data} = useQuery('users', async () =>
     {const response = await axios.get('api/users/home');
    return response.data
  },{
      onSuccess: (data)=>{
        setUsers(data)
        console.log(data[0].name)
      }
    })
    useEffect(() => {
        if(user === null){
            navigate('/login')
        }
    }, [user,navigate,users,reciever])

    const logOut = () => {
        setingUser(null)
        localStorage.removeItem('user')
    }
    
    const handleclick = (user:userInterface) => {
      setReciever(user)
    }
  return (
    <>  
    <div>welcome {user?.name}</div>
    <Button onClick={logOut}>logOut</Button>
    <Container>
      <Grid container>
        <Grid item xs={4}>
          <List>
            {users.map((user: any, index) => (
              <ListItemButton key = {index} onClick={()=>handleclick(user)}>
                {user.name}
              </ListItemButton>))}
          </List>
        </Grid>
        <Grid item xs={8}>
            <Messages reciever = {reciever}/>
        </Grid>
      </Grid>
    </Container>
    </>
  )
}

export default HomePage