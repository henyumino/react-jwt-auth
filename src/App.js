import React from 'react';
import './App.css';
import { AuthContextProvider } from './context/AuthContext'
import Login from './components/Login'
import Profile from './components/Profile'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'


function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <h1>React Jwt Auth</h1>
              <Route path='/' exact component={Login} />
              <ProtectedRoute path='/profile' component={Profile} />
          </header>
        </div>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
