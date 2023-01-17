import React from 'react'
import { useAppSelector } from './hooks';
import LoginForm from './components/LoginForm'
import MainPage from "./components/MainPage"

function App() {
  const account = useAppSelector(state => state.account);

  return (
    <div style={{
      width: "500px",
      height: "520px",
      margin: "0 auto",
    }}>
      {account.uid ? (
        <MainPage/>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}

export default App;