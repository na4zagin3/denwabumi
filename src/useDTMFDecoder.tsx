import {useEffect} from 'react';

type Energies = {
    high: number[];
    low: number[];
}

type FilterArg = {
    goertzel: any;
    energies: Energies;
}

class Decoder {
    context: AudioContext;
    onDecode: (decoded: string) => void;

    constructor(onDecode: (decoded: string) => void) {
        const audioContext = window.AudioContext || (window as any).webkitAudioContext;
        this.context = new audioContext();
        this.onDecode = onDecode;

        const success = (stream: MediaStream) => {
            const DTMF = require('goertzeljs/lib/dtmf');
            const Goertzel = require('goertzeljs');
            const volume = this.context.createGain();
            const audioInput = this.context.createMediaStreamSource(stream);
            audioInput.connect(volume);
            const bufferSize = 512;
            // TODO Rewrite this deprecated method
            const recorder = this.context.createScriptProcessor(bufferSize, 1, 1);
            const dtmf = new DTMF({
                sampleRate: this.context.sampleRate,
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
            recorder.onaudioprocess = function(e: AudioProcessingEvent){
                var buffer = e.inputBuffer.getChannelData(0);
                dtmf.processBuffer(buffer);
            };
            volume.connect (recorder);
            recorder.connect (this.context.destination) ;
        };

        const getUserMedia = navigator.getUserMedia ||
              (navigator as any).webkitGetUserMedia ||
              (navigator as any).mozGetUserMedia ||
              (navigator as any).msGetUserMedia;

        if (getUserMedia){
            console.log('setting up an audio context');
            getUserMedia.call(navigator, {audio:true}, success, function(e) {
                alert('Error capturing audio.');
            });
        } else alert('getUserMedia not supported in this browser.');
    }

    close() {
        console.log('closing the audio context');
        this.context.close();
    }
}


const decoder = new Decoder(() => {});

const useDecoder = (onDecode: (decoded: string) => void) => {

    useEffect(() => {
        decoder.onDecode = onDecode
    }, [onDecode]);

};

export default useDecoder;
