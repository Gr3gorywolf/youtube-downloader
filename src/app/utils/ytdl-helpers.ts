import fs from "node:fs";

export const getCookiesPath = () =>{ 
    if (fs.existsSync('./ytdlp-bin/cookies.txt')) {
        console.log('cookies exist');
        return `./ytdlp-bin/cookies.txt`;
    }
    return null;
}