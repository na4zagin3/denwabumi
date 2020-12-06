import React, {useState, useCallback} from 'react';
import {sendDTMF} from './useDTMFEncoder';
import {generateAnnouncement, encodeToDTMF} from './binaryDTMFCodec'

type Props = {
    
}

const textEncoder = new TextEncoder();

function DTMFEncoder(props: Props) {
    const [origString, setOrigString] = useState('');
    const [dtmfString, setDtmfString] = useState('');
    const [dtmfDuration, setDtmfDuration] = useState('0.04');
    const [dtmfInterval, setDtmfInterval] = useState('0.02');

    const onChangeOrigString = useCallback((event) => {
        setOrigString(event.target.value);
    }, [setOrigString]);

    const onChangeDtmfString = useCallback((event) => {
        setDtmfString(event.target.value);
    }, [setDtmfString]);

    const onChangeDtmfDuration = useCallback((event) => {
        setDtmfDuration(event.target.value);
    }, [setDtmfDuration]);

    const onChangeDtmfInterval = useCallback((event) => {
        setDtmfInterval(event.target.value);
    }, [setDtmfInterval]);

    const onEncodeMessage = useCallback(() => {
        console.log('encode message');
        const encoded = encodeToDTMF(textEncoder.encode(origString));
        const announcement = generateAnnouncement(10);
        setDtmfString(announcement + encoded);
    }, [origString, setDtmfString]);

    const duration = parseFloat(dtmfDuration);
    const interval = parseFloat(dtmfInterval);
    const onStart = useCallback(() => {
        console.log(dtmfString);
        sendDTMF(dtmfString, {
            duration,
            interval,
            gain: 0.9,
            onFinish: () => {
                console.log('transmission completed');
            }
        });
    }, [duration, interval, dtmfString]);

    return <div>

        <div>
            <label htmlFor="origMessage">Original Message</label>
            <div>
                <textarea name="origMessage" value={origString} onChange={onChangeOrigString} />
                <button onClick={onEncodeMessage}>
                    Encode message
                </button>
            </div>
        </div>

        <div>
            <label htmlFor="dtmfMessage">DTMF Message</label>
            <div>
                <textarea name="dtmfMessage" value={dtmfString} onChange={onChangeDtmfString} />
            </div>
        </div>

        <div>
            <label htmlFor="dtmfDuration">Duration [s]</label>
            <input type="text" value={dtmfDuration} onChange={onChangeDtmfDuration} />

            <label htmlFor="dtmfInterval">Interval [s]</label>
            <input type="text" value={dtmfInterval} onChange={onChangeDtmfInterval} />
            <button onClick={onStart}>
                Send DTMF
            </button>
        </div>

    </div>;
}

export default DTMFEncoder;
