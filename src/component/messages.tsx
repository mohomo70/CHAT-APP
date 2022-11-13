import { Box, Button, Container, Grid, TextField } from '@mui/material'
import { display } from '@mui/system'
import React,{useContext, useState, useEffect} from 'react'
import { userContext} from '../context'
import axios from 'axios'
import { useQuery,useMutation,useQueryClient } from 'react-query'



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
    const queryClient = useQueryClient();

    const { mutate: fetchmessages,data:msg } = useMutation(
    (async () => {
        const {data} = await axios.post('api/messages/messages',{user,reciever})
        return data
    }))

    const { mutate: sentMessage,data:sent } = useMutation(
        (async () => {
            const config = {headers:{'Content-Type': 'application/json'}}
            const {data} = await axios.post('api/messages/submit',{content,receiver:reciever,sender:user},config)
            return data
    }))

    useEffect(() => {
      if(reciever){
      fetchmessages()
      }
    }, [reciever,sent])
   
    const handleSubmit =  () => {
        sentMessage()
        setContent('')
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
                    {msg && msg.messages.map((x:any) => 
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
