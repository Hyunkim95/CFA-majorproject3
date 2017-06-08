
    export function secondsToHMS(d) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
        return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
    }

    export function randomProperty(obj) {
        var keys = Object.keys(obj)
        return obj[keys[ keys.length * Math.random() << 0]];
    }

    export function cycleThroughObject(obj, i) {
        var keys = Object.keys(obj);
        i < keys.length ? i++ : i = 0;
        return i
    }

    export function getAverageVolume(array) {
        var values = 0;
        var average;

        var length = array.length;

        // get all the frequency amplitudes
        for (var i = 0; i < length; i++) {
            values += array[i];
        }

        average = values / length;
        return average;
    }

    export function hexToRgb(hex) {
        hex.replace("#", "");
        var bigint = parseInt(hex, 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;

        return r + "," + g + "," + b;
    }
