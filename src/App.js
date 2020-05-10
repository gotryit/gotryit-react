import React, { useState } from 'react';
import './App.css';

const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [jwtToken, setJwtToken] = useState('')

  const authenticateUser = async () => {
    var requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*'
      },
      body: JSON.stringify({ username: username, password: password })
    };
    
    let response = await fetch("https://gotryit-api.herokuapp.com/api/weather/authenticate", requestOptions)

    let { token, expireDate } = await response.json()

    setJwtToken(token)

    console.log(token)
    console.log(expireDate)
  }

  return (
    <div className="App">
      {jwtToken.length === 0 ?
      <React.Fragment>
        <div className="user-input">
          Username: <input onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="user-input">
          Password: <input type="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={() => authenticateUser()}>Authenticate</button>
      </React.Fragment> :
      <React.Fragment>
          <button onClick={() => setJwtToken('')}>Sign Out</button>
      </React.Fragment>}
    </div>
  );
}

export default App;
