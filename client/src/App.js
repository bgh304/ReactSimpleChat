import React from 'react';
import './App.css';
import HeaderFooter from './components/HeaderFooter';
import ChatContainer from "./components/ChatContainer";

function App() {
  return (
    <div>
      <div>
        <HeaderFooter props='header' />
      </div>
      <div className='App-Body'>
        <div className='ChatContainer'>
          <ChatContainer />
        </div>
      </div>
      <div>
        <HeaderFooter props='footer' />
      </div>
    </div>
  )
}

export default App;