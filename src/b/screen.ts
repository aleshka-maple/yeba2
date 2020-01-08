const path = require('path');
const os = require('os');
const spawn = require('child_process').spawn;

export function screen (tcpConnection: string, opts?) {

    const cmd = path.resolve(__dirname, './../ffmpeg/ffmpeg.exe');

    opts = opts || {};
    opts.fps = opts.fps || 1;
    opts.resolution = '400x400';
    opts.bitrateKbps = "2M";
    opts.videoCodec = 'rawvideo';
    opts.pixelFormat = 'rgb32';

    opts.captureVideoDevice = "dshow";
    //opts.captureAudioDevice = "pulse";
    opts.display = 'video=HD Pro Webcam C920';

    const params = [
        '-f',           opts.captureVideoDevice,
        '-i',           opts.display,
        '-b:v',         opts.bitrateKbps,
        '-minrate',     opts.bitrateKbps,
        '-maxrate',     opts.bitrateKbps,
        '-rtbufsize',  '1024M',
        '-bufsize',     opts.bitrateKbps,
        '-s',           opts.resolution,
        //'-aspect',      '1:1',
        '-pix_fmt',     opts.pixelFormat,
        '-vcodec',      opts.videoCodec,
        '-keyint_min',  opts.fps,
        //'-vf',         'scale=320:-1',
        //'-frames:v',    10,
        //'-r',           opts.fps,
        /*
        '-f',           'alsa',
        '-i',           'pulse',
        '-f',           'flv',
        '-ac',          '2',
        '-g',           opts.fps * 2,
        '-keyint_min',  opts.fps,
        '-preset',      'ultrafast',
        '-tune',        'film',
        '-threads',     opts.threads,
        '-strict',      'normal',
        */
    ];

    params.push('-an');
    params.push('-f');
    params.push('rawvideo');
    //params.push('image2pipe');
    //params.push('mpegts');
    params.push(tcpConnection);

    //return spawn(cmd, params);

    //return spawn(cmd, ['-list_devices', true, '-f', 'dshow', '-i', 'dummy']);
    return spawn(cmd, ['-list_options', true, '-f', 'gdigrab', '-i', 'desktop']);
}
