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

function createOscillator(freq: number, duration: number, startTime?: number, gain = 0.1) {
    const oscillator = context.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = freq;

    const gainNode = context.createGain();
    gainNode.gain.value = gain;

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    const time = startTime === undefined ? context.currentTime : startTime;
    oscillator.start(time);
    oscillator.stop(time + duration);


    return oscillator;
};

function createOscillators(freqs: [number, number], duration: number, options: {startTime?: number, gain?: number, onEnd?: () => void}) {
    const osc1 = createOscillator(freqs[0], duration, options.startTime, options.gain);
    createOscillator(freqs[1], duration, options.startTime, options.gain);
    if (options.onEnd !== undefined) {
        osc1.onended = options.onEnd
    }
}

type Options = {
    duration: number,
    interval: number,
    gain?: number,
    onFinish?: () => void
};

export function sendDTMF(message: string, options: Options) {
    const {duration, interval, gain} = options
    const currentTime = context.currentTime;

    message.split('').forEach((c, i) => {
        const startTime = currentTime + i * (duration + interval);
        createOscillators(dtmf[c], duration, {
            startTime,
            gain,
            onEnd: () => {
                console.log('end sound');
            }});
    })
}
