import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import { RiMore2Line } from 'react-icons/ri';
import { BsMic, BsPaperclip } from 'react-icons/bs';
import { VscSearch } from 'react-icons/vsc';
import { GrEmoji } from 'react-icons/gr';
import { useParams } from 'react-router';
import db from '../firebase';
import firebase from 'firebase';
import { useStateValue } from '../StateProvider';

const Chat = () => {
  const [seed, setSeed] = useState('');
  const [input, setInput] = useState('');
  const { roomID } = useParams();
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomID]);

  useEffect(() => {
    if (roomID) {
      // set room name
      db.collection('rooms')
        .doc(roomID)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name);
        });
      // pull messages
      db.collection('rooms')
        .doc(roomID)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [roomID]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection('rooms').doc(roomID).collection('messages').add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput('');
  };

  return (
    <ChatWrapper>
      <div className='chat__header'>
        <Avatar
          src={`https://avatars.dicebear.com/4.5/api/gridy/${seed}.svg`}
        />
        <div className='chat__headerInfo'>
          <h3>{roomName}</h3>
          <p>
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className='chat__headerRight'>
          <VscSearch className='chat__headerIcon' />
          <BsPaperclip className='chat__headerIcon' />
          <RiMore2Line className='chat__headerIcon' />
        </div>
      </div>
      <div className='chat__body'>
        {/* render messages  */}
        {messages.map((message) => {
          return (
            <p
              className={`chat__message ${
                message.name === user.displayName && 'chat__receiver'
              }`}
            >
              <span className='chat__messageName'>{message.name}</span>
              {message.message}
              <span className='chat__timestamp'>
                {new Date(message.timestamp?.toDate()).toUTCString()}
              </span>
            </p>
          );
        })}
      </div>
      <div className='chat__footer'>
        <GrEmoji className='chat__footerIcon' />
        <form action='submit'>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type='text'
            placeholder='Type a message'
          />
          <button type='submit' onClick={sendMessage}>
            Send
          </button>
          <BsMic className='chat__footerIcon' />
        </form>
      </div>
    </ChatWrapper>
  );
};

const ChatWrapper = styled.div`
  flex: 0.65;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    overflow: hidden;
  }

  .chat__header {
    display: flex;
    padding: 21px;
    align-items: center;
    border-bottom: 1px solid #55442d;
    @media (max-width: 768px) {
      flex-direction: column;
    }

    h3 {
      font-size: 1rem;
      font-weight: 500;
      color: #222;
      margin-bottom: 3px;
    }
    p {
      font-size: 0.75rem;
      font-weight: 300;
      color: #f0eeea;
    }
  }
  .chat__headerIcon {
    font-size: 1.5rem;
    color: #55442d;
    cursor: pointer;
    &:hover {
      color: #221100;
    }
  }
  .chat__headerInfo {
    flex: 1;
    padding-left: 20px;
  }
  .chat__headerRight {
    display: flex;
    justify-content: space-between;
    min-width: 100px;
  }
  .chat__body {
    flex: 1;
    padding: 30px;
    overflow: scroll;
    background: #e3d8c5;
  }
  .chat__message {
    position: relative;
    font-size: 0.9rem;
    padding: 10px;
    background: #f0eeea;
    border-radius: 6px;
    font-weight: 300;
    margin-bottom: 1.8rem;
    width: fit-content;
  }
  .chat__messageName {
    position: absolute;
    top: -17px;
    font-weight: 500;
    font-size: 0.8rem;
  }
  .chat__timestamp {
    margin-left: 10px;
    font-size: 0.6rem;
  }
  .chat__receiver {
    margin-left: auto;
    background: #dcf8c6;
  }
  .chat__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-top: 1px solid #55442d;
    height: 50px;
    form {
      display: flex;
      align-items: center;
      flex: 1;
      input {
        flex: 1;
        border-radius: 10px;
        border: none;
        background: #f0eeea;
        padding: 10px;
        @media (max-width: 768px) {
          width: 100%;
        }
      }
      button {
        font-size: 1rem;
        padding: 10px;
        border-radius: 6px;
        border: none;
        background: #d4af37;
        color: #55442d;
        cursor: pointer;
        display: none;
        &:hover {
          background: #ffe26a;
        }
      }
    }
  }
  .chat__footerIcon {
    font-size: 1.5rem;
    color: #55442d;
    cursor: pointer;
    padding: 10px;
    &:hover {
      color: #221100;
    }
  }
`;

export default Chat;
