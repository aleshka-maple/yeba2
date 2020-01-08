import {screen} from './screen';
import * as fs from 'fs';
import * as path from 'path';
import * as net from 'net';
import {Socket} from "net";

const port = 4446;
const host = '127.0.0.1';

const filePath = path.resolve(__dirname, '../files/temp1.html');
try {
    fs.unlinkSync(filePath);
} catch (e) {

}

const fileStream = fs.createWriteStream(filePath);
const maxSize = 1024 * 1024 * 1;

const server = net.createServer();
server.listen(port);


server.on('connection', (socket: Socket) => {
    socket.on('data', function(chunk: Buffer) {
        console.log(chunk.byteLength);
        let rgb = [];
        Array.from(chunk.values()).forEach((byt) => {
            rgb.push(byt);
            if (rgb.length === 4) {
                const pixel = `<span style="background-color: rgba(${rgb[2]}, ${rgb[1]}, ${rgb[0]}); width: 1px; height: 1px; display: inline-block"></span>`;
                rgb = [];
                framesInstance.push(pixel);
            }
        });

        const frames = framesInstance.getFrames();
        if (frames.length > 1) {
            socket.destroy();
            server.close();
        }
    });

    socket.on('error', (error) => {
        console.log('socket error', error && error.toString());
    });
});

server.on('close', () => {
    savetoFile();
});

server.on('error', (error) => {
    console.log('server error', error && error.toString());
});

const frameSize = 400*300*4;
const width = 400;
const height = 400;
const pixels = 4;

class Frame {
    constructor (private width: number, private height: number) {}
    private data: string[][] = [[]];
    private from: number = 0;

    public isFilled () {
        return this.data.length === this.height && this.data[this.height - 1].length === this.width;
    }

    public isRowFilled () {
        return this.data[this.from].length === this.width;
    }

    public getPixelsData (): string[][] {
        return this.data;
    }

    public push (pixel: string) {
        if (this.isFilled()) {
            throw Error('I`m already filled, you made mistake');
        }
        if (this.isRowFilled()) {
            this.data.push([]);
            this.from++;
        }
        this.data[this.from].push(pixel);
    }
}

class Frames {
    constructor (private width: number, private height: number) {}

    frames: Frame[] = [new Frame(this.width, this.height)];
    from: number = 0;

    getFrames (): Frame[] {
        return this.frames;
    }

    push (pixel: string) {
        const frame = this.frames[this.from];
        if (frame.isFilled()) {
            this.from++;
            this.frames[this.from] = new Frame(this.width, this.height);
            this.push(pixel);
        } else {
            frame.push(pixel);
        }
    }
}

const framesInstance = new Frames(width, height);

// run ffmpeg grabber
const screenProcessInstance = screen(`tcp://${host}:${port}`);

screenProcessInstance.stderr.on('data', (error) => {
    console.log('stderr: ', error && error.toString());
});

function savetoFile () {
    const frames = framesInstance.getFrames();

    console.log('save');

    for (let frame of frames) {
        for (let row of frame.getPixelsData()) {
            for (let a of row) {
                fileStream.write(a);
            }
            fileStream.write('</br>');
        }
        fileStream.write('</br>');
    }

    fileStream.close();
}