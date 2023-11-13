import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import IconButton from "@mui/material/IconButton";
import './../App.css';

// Text field for user's chat messages
export default function InputText({addMessage}) {
  const [message, setMessage] = useState('');

  function addAMessage() {
    addMessage({
      message
    });
    setMessage('');
  }

  const sendMessageKeyboard = (event) => {
    if (event.key === 'Enter' && message !== '') {
      addAMessage();
      console.log(message);
    }
  }

  return (
    <div className='MessageInputField'>
      <textarea
        placeholder='Write a message...'
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyDown={sendMessageKeyboard}
      ></textarea>
      <button onClick={() => addAMessage()}>
        SEND
        <IconButton size='medium'>
          <SendIcon />
        </IconButton>
      </button>
    </div>
  )
}