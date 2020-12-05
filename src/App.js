import React, {useState, useCallback} from 'react';
import logo from './logo.svg';
import './App.css';
import useDecoder from './useDTMFDecoder';

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
          <div className="Decoder">
            DTMF Decoded: {decoded}
          </div>
        </div>
    );
}

export default App;
