import React,{useContext, useState, useEffect} from 'react'
import { userContext} from '../context'
import {Paper} from '@mui/material';

interface Props {
    message: any | null
}

const Message:React.FC<Props> = ({message}) => {
    const {user, setingUser} = useContext<any>(userContext)

  return (
    <>
    {user && <Paper elevation={3} 
    sx={
        {backgroundColor:(user.name===message.sender.name)?'green':'red' ,
         direction:(user.name===message.sender.name)?'ltr':'rtl'}
         }>
            {message.content}
            </Paper>}
    </>
  )
}

export default Message