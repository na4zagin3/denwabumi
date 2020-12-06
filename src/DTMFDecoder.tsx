import React, {useState, useCallback} from 'react';
import useDecoder from './useDTMFDecoder';


type Props = {
    
}

function DTMFDecoder(props: Props) {
    const [decoded, setDecoded] = useState('');

    const onDecode = useCallback((c) => {
        setDecoded(decoded + c);
    }, [decoded, setDecoded]);
    const onClear = useCallback(() => {
        setDecoded('');
    }, [setDecoded]);

    useDecoder(onDecode);

    return (<div className="Decoder">
        DTMF Decoded:
        <button onClick={onClear}>
            Clear
        </button>
        <div className="Decoder-dtmf">
            {decoded.replaceAll('*', '\n*')}
        </div>
    </div>);
}

export default DTMFDecoder;
