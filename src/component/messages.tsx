import { Box, Button, Container, Grid, TextField } from '@mui/material'
import { display } from '@mui/system'
import React,{useContext, useState, useEffect} from 'react'
import { userContext} from '../context'
import axios from 'axios'
import { useQuery } from 'react-query'



type userInterface = {
    name:string,
    id:string,
    token:string
}
interface Props {
    reciever: userInterface | null
}


const Messages: React.FC<Props> = ({reciever}) => {
    const {user, setingUser} = useContext<any>(userContext)
    const [allmessages, setallMessages] = useState<[]>([])
    const [content, setContent] = useState('')

    // useEffect(() => {
    //   console.log(reciever),
    //   console.log(user)
    // }, [reciever, user])

    useEffect(() => {
      console.log(user)
      console.log(reciever)
      const config = {headers:{'Content-Type': 'application/json'}}
      if(reciever){
      const getdata = async (user:any) => {
          const {data} = await axios.post('api/messages/messages',{user,reciever},config)
          const {messages} = data
          setallMessages(messages)
      }
    getdata(user)
      }
      console.log(`messages: ${allmessages}`)
      console.log(typeof allmessages)
    }, [reciever,user])

//     const config = {headers:{'Content-Type': 'application/json'}}
//     const { isLoading, isFetching, data} = useQuery('messages', async () =>
//     {console.log(`users: ${user.name}`)
//      const response = await axios.post('api/messages/messages',user);
//     return response.data
//   })


    

    const handleSubmit = async () => {
        const res = reciever
        const us = user
        const config = {headers:{'Content-Type': 'application/json'}}
        const {data} = await axios.post('api/messages/submit',{content,receiver:reciever,sender:user},config)
        setContent('')
        console.log(`messages:${data}`)
    }
  return (
    <>
        {user && <div>sender: {user.name}</div>}
        {reciever && 
        <> 
        <div>receiver: {reciever.name}</div>
        <Container>
            <Box>
                <Box>
                    {allmessages && allmessages.map((x:any) => 
                    <>
                        <div>{x.content}</div>
                        <div>{x.receiver.name}</div>
                        <div>{x.sender.name}</div>
                    </>
                    ) }
                    {/* {data&& data.map((x:any)=>(<div>{x}</div>))} */}
                </Box>
                <Box sx={{position:'absolute', bottom:'24px' ,right:'8px',display:'flex'}}>
                    <Button variant='contained' onClick={handleSubmit}>submit</Button>
                    <TextField 
                        multiline
                        value={content}
                        onChange={e=>setContent(e.target.value)}
                    />
                </Box>
            </Box>
        </Container> 
    </>
    }
    </>
  )
}

export default Messages
