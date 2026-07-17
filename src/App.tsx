import { useState } from 'react';
import './App.css';
import Menu from './modules/app/menu';
import Home from './modules/home';
import Notes from './modules/notes/notes';

const modules = { home: Home, notes: Notes } as const;
type ModuleName = keyof typeof modules;

function App() {
  const [currentModule, setCurrentModule] = useState<ModuleName>('home');

  const ActiveModule = modules[currentModule];

  const onMenuSelect = (moduleName: string) => {
    if (moduleName in modules) {
      setCurrentModule(moduleName as ModuleName);
    }
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
          Copy right reserved.
      </div>

    </div>

    </>
  );
}

export default App;
