import React, {useState, useCallback} from 'react';
import useDecoder from './useDTMFDecoder';
import {decodeFromDTMF} from './binaryDTMFCodec'


type Props = {
    
}

const textDecoder = new TextDecoder();

function DTMFDecoder(props: Props) {
    const [dtmf, setDtmf] = useState('');
    const [decoded, setDecoded] = useState('');

    const onDTMFDecode = useCallback((c) => {
        setDtmf(`${dtmf}${c}`);
    }, [dtmf, setDtmf]);
    const onDTMFClear = useCallback(() => {
        setDtmf('');
    }, [setDtmf]);

    useDecoder(onDTMFDecode);

    const onDecode = useCallback((c) => {
        const binary = decodeFromDTMF(dtmf);
        if (binary) {
            setDecoded(textDecoder.decode(binary));
        } else {
            alert('Cannot interpret');
        }
    }, [dtmf, setDecoded]);
    const onClear = useCallback(() => {
        setDecoded('');
    }, [setDecoded]);

    return (<div className="Decoder">
        DTMF Decoded:
        <button onClick={onDTMFClear}>
            Clear
        </button>
        <div className="Decoder-dtmf">
            {dtmf.replaceAll('*', '\n*')}
        </div>
        Message Decoded:
        <button onClick={onDecode}>
            Decode
        </button>
        <button onClick={onClear}>
            Clear
        </button>
        <div className="Decoder-dtmf">
            {decoded}
        </div>
    </div>);
}

export default DTMFDecoder;
