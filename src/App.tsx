import React from 'react'
import { useAppSelector } from './hooks';

function App() {
  const account = useAppSelector(state => state.account);

  return (
    <>
      <h1>Account</h1>
      {account.uid ? (
        <div>
          <p>Logged in as {account.uid}</p>
        </div>
      ) : (
        <div>
          <p>Not logged in</p>
        </div>
      )}
    </>
  );
}

export default App;