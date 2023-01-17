import React from 'react'
import { useAppSelector } from './hooks';
import LoginForm from './components/LoginForm'

function App() {
  const account = useAppSelector(state => state.account);

  return (
    <div style={{
      width: "500px",
      height: "520px",
      margin: "0 auto",
    }}>
      {account.uid ? (
        <div>
          <p>Logged in as {account.uid}</p>
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}

export default App;