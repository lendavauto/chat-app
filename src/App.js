import React,{useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import Chat from './components/Chat';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import { useStateValue } from './StateProvider';


function App() {
  const [{user}, dispatch] = useStateValue();

  return (
    <AppWrapper>
      {!user ? (
        <Login />
      ) : (
        <div className='app__body'>
          <Router>
            <Sidebar />

            <Switch>
              <Route path='/rooms/:roomID'>
                <Chat />
              </Route>

              <Route path='/'>
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  display: grid;
  place-items: center;
  background: #f0eeea;
  height: 100vh;
  
  .app__body {
    display: flex;
    height: 90vh;
    width: 90vw;
    background: #b0a592;
    -webkit-box-shadow: 5px 5px 13px -1px rgba(0, 0, 0, 0.7);
    box-shadow: 5px 5px 13px -1px rgba(0, 0, 0, 0.7);
    margin-top: -50px;
    border: 1px solid #55442d;
  }
`;
