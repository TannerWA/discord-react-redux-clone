import React, { useState, useEffect, useRef } from 'react'
import './chat.css';
import ChatHeader from './ChatHeader/ChatHeader';
import Message from './Message/Message';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GifIcon from '@mui/icons-material/Gif';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useSelector } from 'react-redux';
import { selectChannelId, selectChannelName } from '../../features/appSlice';
import { selectUser } from '../../features/userSlice';
import db from '../../firebase';
import firebase from 'firebase/compat/app';

const Chat = () => {

  const user = useSelector(selectUser);
  const channelID = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
      if(channelID){
        db.collection('channels')
        .doc(channelID)
        .collection('messages')
        .orderBy('timestamp')
        .onSnapshot((snapshot) =>
            setMessages(snapshot.docs.map((doc) => doc.data()))
        );
      }
    
  }, [channelID]);

  const sendMessage = (e) => {
      e.preventDefault();

      db.collection('channels').doc(channelID).collection('messages')
      .add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          message: input,
          user: user

      })

      setInput("")
  };

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages]);
  return (
    <div className='chat'>
        {/* chat header */}
        <ChatHeader channelName={channelName}/>
        {/* message box */}
        <div className='chat_messages' ref={messagesEndRef}>
            {messages.map((message) => (
                <Message 
                    timestamp={message.timestamp}
                    message={message.message}
                    user={message.user}
                />
            ))}
        </div>
        {/* input */}
        <div className='chat_input_wrapper'>
            <div className='chat_input' >
                <AddCircleIcon fontSize="large"/>
                <form>
                    <input placeholder={`Message ${channelName}`}
                    disabled={!channelID} 
                    value={input} 
                    onChange={e => setInput(e.target.value)}></input>

                    <button className="chat_input_button"
                    type="submit"
                    disabled={!channelID}
                    onClick={sendMessage}
                    >Send Message</button>
                </form>
                
                <div className='chat_input_icons'>
                    <CardGiftcardIcon fontSize="large"/>
                    <GifIcon fontSize="large"/>
                    <EmojiEmotionsIcon fontSize="large"/>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Chat