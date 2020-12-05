import React, {useState, useCallback} from 'react';
import {sendDTMF} from './useDTMFEncoder';

type Props = {
    
}

function DTMFEncoder(props: Props) {
    const [dtmfString, setDtmfString] = useState('');
    const [dtmfDuration, setDtmfDuration] = useState('0.1');
    const [dtmfInterval, setDtmfInterval] = useState('0.05');

    const onChangeDtmfString = useCallback((event) => {
        setDtmfString(event.target.value);
    }, [setDtmfString]);

    const onChangeDtmfDuration = useCallback((event) => {
        setDtmfDuration(event.target.value);
    }, [setDtmfDuration]);

    const onChangeDtmfInterval = useCallback((event) => {
        setDtmfInterval(event.target.value);
    }, [setDtmfInterval]);

    const duration = parseFloat(dtmfDuration);
    const interval = parseFloat(dtmfInterval);
    const onStart = useCallback(() => {
        console.log(dtmfString);
        sendDTMF(dtmfString, {
            duration,
            interval,
            onFinish: () => {
                console.log('transmission completed');
            }
        });
    }, [duration, interval, dtmfString]);

    return <div>
               <label htmlFor="dtmfDuration">Duration [s]</label>
               <input type="text" value={dtmfDuration} onChange={onChangeDtmfDuration} />

               <label htmlFor="dtmfInterval">Interval [s]</label>
               <input type="text" value={dtmfInterval} onChange={onChangeDtmfInterval} />

               <label htmlFor="dtmfMessage">DTMF Message</label>
               <input name="dtmfMessage" type="text" value={dtmfString} onChange={onChangeDtmfString} />

               <button onClick={onStart}>
                   Send DTMF
               </button>
           </div>;
}

export default DTMFEncoder;
