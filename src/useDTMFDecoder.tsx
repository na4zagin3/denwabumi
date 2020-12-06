import {useEffect} from 'react';
import context from './audioContext'

type Energies = {
    high: number[];
    low: number[];
}

type FilterArg = {
    goertzel: any;
    energies: Energies;
}

class Decoder {
    onDecode: (decoded: string) => void;

    constructor(onDecode: (decoded: string) => void) {
        this.onDecode = onDecode;

        const success = (stream: MediaStream) => {
            const DTMF = require('goertzeljs/lib/dtmf');
            const Goertzel = require('goertzeljs');
            const volume = context.createGain();
            const audioInput = context.createMediaStreamSource(stream);
            audioInput.connect(volume);
            const bufferSize = 512;
            const windowSkip = 128;
            // TODO Rewrite this deprecated method
            const recorder = context.createScriptProcessor(bufferSize, 1, 1);
            const dtmf = new DTMF({
                sampleRate: context.sampleRate,
                repeatMin: 6,
                downsampleRate: 1,
                energyThreshold: 0.005,
                filter: function(e: FilterArg){
                    return !Goertzel.Utilities.doublePeakFilter(e.energies['high'], e.energies['low'], 1.4);
                }
            });
            dtmf.on("decode", (value: string) => {
                if (value != null){
                    this.onDecode(value);
                }
            });
            const previousBuffer = new Float32Array(bufferSize);
            previousBuffer.fill(0);
            const windowBuffer = new Float32Array(bufferSize);
            recorder.onaudioprocess = function(e: AudioProcessingEvent){
                var buffer = e.inputBuffer.getChannelData(0);

                const count = Math.floor(bufferSize / windowSkip);
                [...Array(count)].forEach((_, i) => {
                    const offset = i * windowSkip;
                    if (offset < bufferSize) {
                        windowBuffer.set(previousBuffer.slice(offset));
                    }
                    if (offset > 0) {
                        windowBuffer.set(previousBuffer.slice(0, offset), bufferSize - offset);
                    }
                    dtmf.processBuffer(windowBuffer);
                })

                previousBuffer.set(buffer);
            };
            volume.connect (recorder);
            recorder.connect (context.destination) ;
        };

        const getUserMedia = navigator.getUserMedia ||
              (navigator as any).webkitGetUserMedia ||
              (navigator as any).mozGetUserMedia ||
              (navigator as any).msGetUserMedia;

        if (getUserMedia){
            getUserMedia.call(navigator, {audio:true}, success, function(e) {
                alert('Error capturing audio.');
            });
        } else alert('getUserMedia not supported in this browser.');
    }
}


const decoder = new Decoder(() => {});

const useDecoder = (onDecode: (decoded: string) => void) => {

    decoder.onDecode = onDecode

};

export default useDecoder;
