import React, { useCallback, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Login } from './loginForm/loginForm';
import { LandPage } from './landingPage/landingPage';

function App() {
  let [isOpen, setIsOpen] = useState(false);

  let onLoginShow = useCallback(() => {setIsOpen(!isOpen)}, [ isOpen ])
  return <>
    <LandPage onLoginShow={onLoginShow}/>
    {isOpen ? <Login onLoginClose={() => {setIsOpen(false)}}/> : undefined}
    </>;
}

export default App;
