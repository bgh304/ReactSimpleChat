import React, { useEffect, useState, useRef } from 'react';
import socketIOClient from 'socket.io-client';
import UserLogin from './UserLogin';
import ChatBoxReceiver, { ChatBoxSender } from './ChatBox';
import InputText from './InputText';
import Axios from 'axios';
import LogoutIcon from '@mui/icons-material/Logout';
import '../App.css';
import { IconButton } from '@mui/material';

// Component rendering all chat messages.
export default function ChatContainer() {
  let socketio = socketIOClient('http://localhost:3001');

  const [chats, setChats] = useState([]);
  const [user, setUser] = useState(localStorage.getItem('user'));

  const messagesEndRef = useRef(null);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }
  
  // When 'chats'-variable is updated, chat container is scrolling down to the latest message.
  useEffect(() => {
    scrollToBottom();
  }, [chats])

  useEffect(() => {
    socketio.on('chat', senderChats => {
      setChats(senderChats);
    })
  })

  useEffect(() => {
    Axios.get('http://localhost:3001/messages').then((response) => {
      setChats(response.data);
    })
  }, [])

  // When logged in, chat container is scrolled down to the latest message.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [<UserLogin />])

  function addToDatabase(chat) {
    Axios.post('http://localhost:3001/send', {
        message: chat.message,
        user: user
    })
  }

  function sendChatToSocket(chat) {
    socketio.emit('chat', chat);
  }

  function addMessage(chat) {
    const newChat = {...chat, user};
    console.log('const user on: ' + user);
    addToDatabase(chat);
    setChats([...chats, newChat]);
    sendChatToSocket([...chats, newChat]);
  }

  function logout() {
    localStorage.removeItem('user');
    setUser('');
  }

  // Rendering all the messages from the user and other users.
  function ChatsList() {
    return chats.map((chat, index) => {
      if (chat.user === user) return <ChatBoxSender key={index} message={chat.message} user={chat.user} />
      return <ChatBoxReceiver key={index} message={chat.message} user={chat.user} />
    })
  }

  // If user is not logged in, login page will be rendered.
  return (
    <div>
      {
        user ?
        <div>
          <div className='ChatContentTopDiv'>
            <p style={{fontWeight: '600'}}>Nickname: {user}</p>
            <button onClick={() => logout()}>Leave the chat
              <IconButton size='medium'>
                <LogoutIcon />
              </IconButton>
            </button>
          </div>
          <div className='ChatContentRoundedCorners'>
            <div className='ChatContent'>
              <ChatsList />
              <div ref={messagesEndRef} /></div>
              <InputText addMessage={addMessage} />
            </div>
          </div>
        :
        <UserLogin setUser={setUser} />
      }
    </div>
  )
}