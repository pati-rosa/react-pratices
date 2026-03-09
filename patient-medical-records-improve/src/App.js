import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Records from './components/Records';
import Search from './components/Search';
import useMedicalRecords from './hooks/useMedicalRecords';

function App() {
const { records, handleSetRecords, handleSetNextRecords} = useMedicalRecords()
  return (
    <div className="App">
      <div className="content">
        <Search records={records} handleSetRecords={handleSetRecords}/>
        <Records records={records} handleSetNextRecords={handleSetNextRecords}/>
      </div>
    </div>
  );
}

export default App;
