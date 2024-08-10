import { YTDLPBinaryPath } from '@/app/utils/constants';
import { spawn } from 'child_process';
import { Readable } from 'node:stream';
const crypto = require('crypto');
import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';
import { NextApiResponse } from 'next';
import { getCookiesPath } from '@/app/utils/ytdl-helpers';

export  async function GET(req ) {
  const res = NextResponse;
    console.log({res});
    const { searchParams } = new URL(req.url);
  const videoUrl = searchParams.get("url");
  const formatId = searchParams.get("formatId");

  if (!videoUrl) {
    return NextResponse.json(
        { error: "No video provided" },
        { status: 400 },
      );
    }

  if (!formatId) {
    return NextResponse.json(
        { error: "Format id not provided" },
        { status: 400 },
      );
  }

  // Determine file extension based on formatId
  const isAudio = formatId.startsWith('bestaudio') || formatId.includes('audio');
  const fileExtension = isAudio ? 'mp3' : 'mp4';
  const contentType = isAudio ? 'audio/mpeg' : 'video/mp4';

  // Temporary file path
  const fileName = crypto.createHash('sha256').update(videoUrl + formatId).digest('hex')
  const tempFilePath = path.join(process.cwd(), `${fileName}.${fileExtension}`);
  const cookies = getCookiesPath();
  // Execute yt-dlp command to download the video with specified format
  const ytdlp = spawn(YTDLPBinaryPath, [
    ...(cookies ? ['--cookies', cookies] : []),
    '-f', formatId, '-o', tempFilePath, videoUrl]);

  return await new Promise((resolve, reject) => {
    ytdlp.on('error', (error) => {
      console.error(`Error: ${error.message}`);
      resolve(NextResponse.json(
          { error: 'Error downloading video' },
          { status: 500 },
        ));
    });
  
    ytdlp.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
  
    ytdlp.on('close', (code) => {
      if (code === 0) {
        const fileStream = fs.createReadStream(tempFilePath);
        const headers = new Headers();
        headers.set("Content-Disposition", `attachment; filename="${fileName}.${fileExtension}"`);
        headers.set('Content-Type', contentType);
  
        const response = new Response(fileStream as any, {
          headers,
        });
     
  
        fileStream.on('end', () => {
          fs.unlink(tempFilePath, (err) => {
            if (err) console.error(`Error deleting temp file: ${err.message}`);
          });
        });
        resolve(response);
      } else {
        resolve(NextResponse.json(
              { error: 'Error downloading video' },
              { status: 500 },
            ))
      }
    });

  }) 
}
