// Based on https://gitlab.com/phonelift/telesignals/-/blob/master/src/index.js

import context from './audioContext'

const freqs = {
  // Low
  L_697: 697.0,
  L_770: 770.0,
  L_852: 852.0,
  L_941: 941.0,
  // High
  H_1209: 1209.0,
  H_1336: 1336.0,
  H_1477: 1477.0,
  H_1633: 1633.0
};

const dtmf: {[s: string]: [number, number]} = {
  1: [freqs.L_697, freqs.H_1209],
  2: [freqs.L_697, freqs.H_1336],
  3: [freqs.L_697, freqs.H_1477],
  A: [freqs.L_697, freqs.H_1633],

  4: [freqs.L_770, freqs.H_1209],
  5: [freqs.L_770, freqs.H_1336],
  6: [freqs.L_770, freqs.H_1477],
  B: [freqs.L_770, freqs.H_1633],

  7: [freqs.L_852, freqs.H_1209],
  8: [freqs.L_852, freqs.H_1336],
  9: [freqs.L_852, freqs.H_1477],
  C: [freqs.L_852, freqs.H_1633],

  '*': [freqs.L_941, freqs.H_1209],
  0: [freqs.L_941, freqs.H_1336],
  '#': [freqs.L_941, freqs.H_1477],
  D: [freqs.L_941, freqs.H_1633]
}

function createOscillatorAndGain(): [OscillatorNode, GainNode] {
    const oscillator = context.createOscillator();
    oscillator.type = 'sine';

    const gainNode = context.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    return [oscillator, gainNode];
};

type Options = {
    duration: number,
    interval: number,
    gain?: number,
    onFinish?: () => void
};

export function sendDTMF(message: string, options: Options) {
    const {duration, interval} = options
    const gain = options.gain || 0.5;
    const currentTime = context.currentTime;

    const [osc1, gain1] = createOscillatorAndGain();
    const [osc2, gain2] = createOscillatorAndGain();

    const freqList = message
        .split('')
        .filter((c) => dtmf[c] !== undefined);

    gain1.gain.value = gain;
    gain2.gain.value = gain;

    freqList
        .forEach((c, i) => {
            const startTime = currentTime + i * (duration + interval);
            osc1.frequency.setValueAtTime(dtmf[c][0], startTime);
            osc2.frequency.setValueAtTime(dtmf[c][1], startTime);

            gain1.gain.setValueAtTime(0, startTime);
            gain2.gain.setValueAtTime(0, startTime);
            gain1.gain.setValueAtTime(gain, startTime + interval);
            gain2.gain.setValueAtTime(gain, startTime + interval);
        })

    osc1.start();
    osc2.start();

    const endTime = currentTime + freqList.length * (duration + interval);
    osc1.stop(endTime);
    osc2.stop(endTime);
}
