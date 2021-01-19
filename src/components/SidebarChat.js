import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { BsPlusSquare } from 'react-icons/bs';
import db from '../firebase';

const SidebarChat = ({ addNewChat, id, name }) => {
  const [seed, setSeed] = useState('');
  const [messages, setMessages] = useState([]);

  // render latest messages
  useEffect(() => {
    if (id) {
      db.collection('rooms')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => {
              return doc.data();
            })
          )
        );
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt('Enter chat room name');
    if (roomName) {
      // some nifty db stuff here
      db.collection('rooms').add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link style={{ textDecoration: 'none' }} to={`/rooms/${id}`}>
      <SidebarChatWrapper>
        <Avatar
          src={`https://avatars.dicebear.com/4.5/api/gridy/${seed}.svg`}
        />
        <div className='sidebarChat__info'>
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </SidebarChatWrapper>
    </Link>
  ) : (
    <SidebarChatWrapper onClick={createChat}>
      <h2>
        Add a new room <BsPlusSquare className='sidebarChat__infoIcon' />
      </h2>
    </SidebarChatWrapper>
  );
};

const SidebarChatWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.2rem;
  margin-top: 0.2rem;
  background: #f0eeea;
  padding: 10px;
  border-top: 1px solid #55442d;
  border-bottom: 1px solid #55442d;
  border-right: 1px solid #55442d;

  &:hover {
    background: white;
  }

  h2 {
    font-size: 1rem;
    font-weight: 500;
    color: #222;
    display: flex;
    align-items: center;
  }
  p {
    font-size: 0.75rem;
    font-weight: 300;
    color: gray;
  }
  .sidebarChat__info {
  }
  .sidebarChat__infoIcon {
    margin-left: 1rem;
    font-size: 1.2rem;
    color: #55442d;
  }
`;

export default SidebarChat;
