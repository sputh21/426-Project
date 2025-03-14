// src/App.tsx
import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">

        <Navbar />

        <Routes>
          <Route path='/' element={

            <header className="App-header">
              <h1>Welcome to Stratos</h1>
              <p>Your go-to app for your daily financial needs</p>
            </header>

          }/>

          <Route path = '/login' element={

            <h1>login page</h1>

          }/>

          <Route path = '/login' element={

            <h1>login page</h1>
            
          }/>
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
