import React from 'react';
import styled from 'styled-components';
import bcgImg from '../images/meeting.png';
import { auth, provider } from '../firebase';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';

const Login = () => {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <LoginWrapper>
      <div className='login__container'>
        <img className='login__img' src={bcgImg} alt='login image' />
        <div className='login__text'>
          <h1>Sign in to start chatting</h1>
        </div>
        <button onClick={signIn}>Sign in with Google</button>
      </div>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
  background: #f0eeea;

  .login__container {
    padding: 100px;
    text-align: center;
    background: white;
    border-radius: 6px;
    -webkit-box-shadow: 5px 5px 13px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 5px 5px 13px 2px rgba(0, 0, 0, 0.3);
    h1 {
      margin-bottom: 1rem;
    }
    button {
      font-size: 1.5rem;
      font-weight: 500;
      padding: 10px;
      border-radius: 6px;
      border: none;
      background: #f0eeea;
      color: #55442d;
      cursor: pointer;
      -webkit-box-shadow: 5px 5px 13px 2px rgba(0, 0, 0, 0.2);
      box-shadow: 5px 5px 13px 2px rgba(0, 0, 0, 0.3);
      &:hover {
        background: #55442d;
        color: #f0eeea;
      }
    }
  }
  .login__img {
    object-fit: contain;
    height: 180px;
    margin-bottom: 40px;
    width: 100%;
  }
`;

export default Login;
