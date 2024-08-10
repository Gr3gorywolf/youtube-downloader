import { NextResponse } from "next/server";
const { execSync } = require('node:child_process');
import { YTDlpOutput }  from '@/app/interfaces/YtdlpOutput';
import { YTDLPBinaryPath } from "@/app/utils/constants";
import { getCookiesPath } from "@/app/utils/ytdl-helpers";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const video = searchParams.get("video");

  if (!video)
    return NextResponse.json(
      { error: "No video provided" },
      { status: 400 },
    );

  try { 
    const cookies = getCookiesPath();
    const output = await execSync(`${YTDLPBinaryPath} ${cookies ? `--cookies ${cookies}` : ''} -j ${video}`).toString();
    const videoDetails = JSON.parse(output) as YTDlpOutput;
    return NextResponse.json({
      videoId: videoDetails.id,
      videoUrl: videoDetails.webpage_url,
      videoTitle: videoDetails.title,
      videoDescription: videoDetails.description,
      videoDuration: videoDetails.duration,
      videoViews: videoDetails.view_count,
      videoUploadDate: videoDetails.upload_date,
      videoThumbnail: videoDetails.thumbnail,
      author: {
        name: videoDetails.uploader,
        url: videoDetails.uploader_url
      },
      formatsDetails: videoDetails.formats.map(
        (data) => ({
          itag:data.format_id,
          hasVideo:data.vcodec !== 'none',
          hasAudio: data.acodec !== 'none',
          audioBitrate: data.abr,
          quality:data.width ? `${data.width}x${data.height}` : data.format_note,
          format: data.container,
          url:data.url,
        }),
      ),
    });
  } catch (error) {
    return NextResponse.json({ error: "Video not found" }, { status: 404 });
  }
}
