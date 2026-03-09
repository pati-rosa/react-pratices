import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Records from './components/Records';
import Search from './components/Search';

function App() {
    const [id, setId] = useState()
  const [records, setRecords] = useState()
  return (
    <div className="App">
      <div className="content">
        <Search setId={setId} id={id} setRecords={setRecords} />
        <Records records={records} setRecords= {setRecords} setId={setId} id={id}/>
      </div>
    </div>
  );
}

export default App;
