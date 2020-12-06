type DTMFInstruction = {
    opcode: string;
    payload: string[];
};

const opAnnounce = "0";
const opSize = "888";
const opEnd = "999";
const opData = "1";

const currentVersion = "1";

function dupe(input: string) {
    return input
        .replace(/(.)\1/g, "$1A")
        .replace(/([*])\1/g, "$1$1");
}

function dedupe(input: string) {
    return input
        .replace(/(.)\1*/g, "$1")
        .replace(/(.)A/g, "$1$1");
}


export function generateAnnouncement(times: number) {
    const version = currentVersion;

    return [...Array(times)]
        .map(() => `*${opAnnounce}#${version}#${version}#${version}\n`)
        .join('');
}

export function encodeToDTMF(input: Uint8Array) {
    const size = input.byteLength;
    const iSize = `*${opSize}#${size}#${size}#${size}\n`;
    const strings = [iSize, iSize];

    strings.push(`*${opData}#0`)
    input.forEach((b) => {
        strings.push(`#${b}`)
    });

    strings.push(`\n*${opEnd}#0`)

    return dupe(strings.join(''));
}

function mode<T>(arr: T[]){
    return arr.sort((a,b) =>
        arr.filter(v => v===a).length
        - arr.filter(v => v===b).length).pop();
}

export function decodeFromDTMF(origInput: string): Uint8Array | null {
    const input = dedupe(origInput);

    let index = 0;
    let buffer = null;

    while (index !== -1) {

        const result = parseDTMFInstruction(input, index);
        const instr = result.instr;
        if (!instr) {
            continue;
        }

        switch (instr.opcode) {
            case opAnnounce:
                const version = mode(instr.payload);
                console.log('announce', version);
                if (version !== currentVersion) {
                    alert('Inconsistent version');
                    return null;
                }
                break;
            case opSize:
                const m = mode(instr.payload);
                if (m === undefined) {
                    console.log('illformatted size operator', instr.payload);
                    break;
                }
                const size = parseInt(m, 10);
                console.log('size', size);
                buffer = new Uint8Array(size);
                break;
            case opData:
                const offset = parseInt(instr.payload[0], 10)
                const bytes = instr.payload.slice(1).map((s) => parseInt(s, 10));
                console.log('data', offset, bytes);
                if (buffer === null) {
                    console.log('missing header');
                    return null;
                }
                if (offset > buffer.length) {
                    console.log('invalid offset', {offset, fragment: bytes.length, buffer: buffer.length});
                } else if (offset + bytes.length > buffer.length) {
                    console.log('too long fragment', {offset, fragment: bytes.length, buffer: buffer.length});
                    buffer.set(bytes.slice(0, buffer.length - offset), offset);
                } else {
                    buffer.set(bytes, offset);
                }
                break;
            case opEnd:
                console.log('end');
                return buffer;
            default:
                console.log('unknown instruction', instr.opcode, instr.payload);
                break;
        }

        index = result.next;
    }

    return buffer;
}

function parseDTMFInstruction(str: string, index: number): {next: number, instr?: DTMFInstruction} {
    const next = str.indexOf('*', index + 1);

    const instrStr =
        next === -1 ? str.slice(index + 1) : str.slice(index + 1, next);

    if (str[index] !== '*') {
        return {
            next,
        };
    }

    const [opcode, ...payload] = instrStr.split('#');

    return {
        next,
        instr: {
            opcode: opcode,
            payload
        }
    };
}

function showDTMFInstruction(instr: DTMFInstruction) {

    const header = `*${instr.opcode}`;
    const contents =
        instr.payload.map((s) => `${s}`).join('#');

    return header + contents;
}
