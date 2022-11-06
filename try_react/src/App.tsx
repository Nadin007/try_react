import React, { useCallback, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Login } from './loginForm/loginForm';
import { LandPage } from './landingPage/landingPage';
import { ForgotRassword } from './forgotPassword/forgotPassword';
import { Comments } from './comments/comments';

function App() {
  let [isOpen, setIsOpen] = useState(false);
  let [isOpenForgotPassword, setIsOpenForgotPassword] = useState(false);
  let [comments, setComments] = useState([]);

  let onLoginShow = useCallback(() => {setIsOpen(!isOpen)}, [ isOpen ])
  let onForgotPassword = useCallback(() => {setIsOpenForgotPassword(!isOpenForgotPassword)}, [ isOpenForgotPassword ]);
  useEffect(() => {
    let abortToken = new AbortController();
    fetch("./comments.json", {signal: abortToken.signal})
        .then((response) => response.ok ? response.json() : Promise.reject(response.status))
        .then(comments => {
            setComments(comments);
        });
    return () => {
        abortToken.abort();
    };  
  }, []);
  return <>
      <LandPage onLoginShow={onLoginShow}/>
      {isOpen ? <Login onLoginClose={() => {setIsOpen(false)}} onForgotPassword={() => {
          setIsOpenForgotPassword(true); setIsOpen(false) }}/> : undefined}

      {isOpenForgotPassword ? <ForgotRassword onForgotPassword={onForgotPassword}/> : undefined}
      <Comments comments={comments}/>
    </>;
}

export default App;
