import React, { useState } from 'react';
import './App.css';

const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [jwtToken, setJwtToken] = useState('')

  const [weatherData, setWeatherData] = useState([])

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
  }

  const getData = async () => {
    var requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*',
        'Authorization': `Bearer ${jwtToken}`
      }
    };
    
    let response = await fetch("https://gotryit-api.herokuapp.com/api/weather", requestOptions)

    let weatherResult = await response.json()

    setWeatherData(weatherResult)
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
            <button onClick={() => getData()}>Get data</button>
            <div>
              {weatherData.map(w => <div>{w.temperatureC}_{w.summary}</div>)}
            </div>
            <button onClick={() => setJwtToken('')}>Sign Out</button>
        </React.Fragment>
      }
      
    </div>
  );
}

export default App;
