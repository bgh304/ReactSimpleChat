import React, { useState } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Axios from 'axios';
import './../App.css';

// Login page
export default function UserLogin({setUser}) {
  const [user, setAUser] = useState('');

  function handleSetUser() {
    if (!user) return
    localStorage.setItem(user.toString(), user);
    setUser(user);

    Axios.post('http://localhost:3001/login', {
      user: user.toString()
    })
  }

  const sendMessageKeyboard = (event) => {
    if (event.key === 'Enter' && user !== '') {
      handleSetUser();
    }
  }

  return (
    <Container maxWidth='sm' sx={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
        <TextField
          id='username'
          label='Nickname'
          variant='outlined'
          placeholder='Write your nickname...'
          value={user}
          onChange={e => setAUser(e.target.value)}
          onKeyDown={sendMessageKeyboard}
        />
        <Button
          variant='contained'
          size='large'
          fullWidth sx={{height: '55px', fontSize: '25px'}}
          onClick={() => handleSetUser()}
        >ENTER</Button>
    </Container>
  )
}