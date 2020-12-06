import React, {useState, useCallback} from 'react';
import logo from './logo.svg';
import './App.css';
import useDecoder from './useDTMFDecoder';
import DTMFEncoder from './DTMFEncoder';
import DTMFDecoder from './DTMFDecoder';

function App() {
    const [decoded, setDecoded] = useState('');

    const onDecode = useCallback((c) => {
        setDecoded(decoded + c);
    }, [decoded, setDecoded]);

    useDecoder(onDecode);

    return (
        <div className="App">
          <header className="App-header">
            Data transmitter via audio (under construction)
          </header>
          <h2>Encoder</h2>
          <DTMFEncoder/>
          <h2>Decoder</h2>
          <DTMFDecoder/>
        </div>
    );
}

export default App;
