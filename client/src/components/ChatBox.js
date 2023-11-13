import React from 'react';

// Message-component showing message from other users
export default function ChatBoxReceiver({user, message}) {
  return (
    <div style={{display: 'flex', justifyContent: 'flex-start', flexDirection: 'row', margin: '-10px'}}>
      <p style={{paddingLeft: '20px'}}>
        <strong style={{paddingRight: '10px'}}>
          {user}
        </strong>
          {message}
      </p>
    </div>
  )
}

// Message-component showing message from the user
export function ChatBoxSender({user, message}) {
  return (
    <div style={{display: 'flex', justifyContent: 'flex-start', flexDirection: 'row', margin: '-10px'}}>
      <p style={{paddingLeft: '20px'}}>
        <strong style={{paddingRight: '10px'}}>
          {user}
        </strong>
          {message}
      </p>
    </div>
  )
}