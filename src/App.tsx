import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {useRoutes} from 'react-router-dom'
import routes from './routes/routes';
import UserProvider,{userContext} from './context';

function App() {
  const [user,setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')||'{}'):null)
  const setingUser = (user: string | null) => {
    setUser(user)
  }
  const value = {user,setingUser}
  const content = useRoutes([routes])
  return (
    <>
    <UserProvider value={value}>
    {content}
    </UserProvider>
    </>
  )
}

export default App;
