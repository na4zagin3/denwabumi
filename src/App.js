import React, {useState, useCallback} from 'react';
import logo from './logo.svg';
import './App.css';
import useDecoder from './useDTMFDecoder';
import DTMFEncoder from './DTMFEncoder';

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
          <DTMFEncoder/>
          <div className="Decoder">
            DTMF Decoded: {decoded}
          </div>
        </div>
    );
}

export default App;