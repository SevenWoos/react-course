import dayjs from 'dayjs';
import { useState } from 'react'
import { Chatbot } from 'supersimpledev';
import LoadingImage from '.././assets/loading-spinner.gif'
import './ChatInput.css';

// ChatInput Component
export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');

  function saveInputText(event) {
    setInputText(event.target.value);
  };

  async function sendMessage() {
    const newChatMessages = [
      ...chatMessages, 
      {
        message: inputText, 
        sender: 'user', 
        id: crypto.randomUUID(), 
        time: dayjs().valueOf()
      }
    ];

    setChatMessages([
      ...newChatMessages, 
      {
        message: <img src={LoadingImage} className="loading-spinner"/>, 
        sender: 'robot', 
        id: crypto.randomUUID(), 
        time: dayjs().valueOf()
      }
    ]);

    const response = await Chatbot.getResponseAsync(inputText);

    setChatMessages([
      ...newChatMessages, 
      {
        message: response, 
        sender: 'robot', 
        id: crypto.randomUUID(), 
        time: dayjs().valueOf()
      }
    ]);

    setInputText('');
  };

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat-input-container">
      <input 
        placeholder="Send a message to Chatbot."
        size="30"
        onChange={saveInputText}
        value={inputText}
        className="chat-input"
        onKeyDown={handleKeyDown}
        />

      <button 
        onClick={sendMessage}
        className="send-button">
        Send
      </button>
    </div>
  )
};