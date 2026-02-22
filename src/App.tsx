import React, { useState, useEffect } from 'react';
import './App.css';
import Menu from './modules/app/menu';
import Home from './modules/home';
import Notes from './modules/notes';

const modules = {'home': Home, 'notes': Notes};

function App() {
  const [currentModule, setCurrentModule] = useState('home');
  
  const ActiveModule = modules[currentModule];

  const onMenuSelect = (moduleName) => {
    setCurrentModule(moduleName);
  };

  return (
    <>
    <div className="app">
      <div className="header">
          <Menu onMenuSelect={onMenuSelect} />
      </div>
      <div className="main"> 
          <ActiveModule />
      </div>
      <div className="footer">

      </div>

    </div>

    </>
  );
}

export default App;
