import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import { BsChatSquareDots } from 'react-icons/bs';
import { RiMore2Line } from 'react-icons/ri';
import { VscHistory, VscSearch } from 'react-icons/vsc';
import SidebarChat from './SidebarChat';
import db from '../firebase';
import { useStateValue } from '../StateProvider';

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = db.collection('rooms').onSnapshot((snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    // cleanup
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SidebarWrapper>
      <div className='sidebar__header'>
        <Avatar
          className='sidebar__headerIcon'
          src={user?.photoURL}
        />
        <div className='sidebar__headerRight'>
          <VscHistory className='sidebar__headerRightIcon' />
          <BsChatSquareDots className='sidebar__headerRightIcon' />
          <RiMore2Line className='sidebar__headerRightIcon' />
        </div>
      </div>
      <div className='sidebar__search'>
        <div className='sidebar__searchContainer'>
          <VscSearch className='sidebar__searchIcon' />
          <input type='text' placeholder='Search or start a new chat' />
        </div>
      </div>
      <div className='sidebar__chats'>
        <SidebarChat addNewChat />
        {rooms.map((room) => {
          return (
            <SidebarChat
              key={room.id}
              id={room.id}
              name={room.data.name}
            />
          );
        })}
      </div>
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.35;

  .sidebar__header {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-right: 1px solid #55442d;
  }
  .sidebar__headerIcon {
    border: 1px solid gray;
  }
  .sidebar__searchContainer {
    display: flex;
    align-items: center;
    background: white;
    width: 100%;
    border-radius: 20px;
    border: 1px solid #b0a592;
  }
  .sidebar__search {
    display: flex;
    align-items: center;
    background: #f0eeea;
    height: 39px;
    padding: 10px;
    border-right: 1px solid #55442d;
    border-top: 1px solid #55442d;

    input {
      padding: 1rem;
      outline: none;
      border: none;
      margin-left: 10px;
      color: gray;
    }
  }
  .sidebar__chats {
    flex: 1;
    overflow: scroll;
    border-top: 1px solid #55442d;
    border-right: 1px solid #55442d;
    cursor: pointer;
  }
  .sidebar__headerRight {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    justify-content: space-between;
    min-width: 10vw;
    color: #55442d;
    cursor: pointer;
  }
  .sidebar__headerRightIcon {
    margin-right: 2vw;
    &:hover {
      color: #221100;
    }
  }
  .sidebar__searchIcon {
    font-size: 1.5rem;
    color: #55442d;
    margin-left: 6px;
  }
`;

export default Sidebar;
