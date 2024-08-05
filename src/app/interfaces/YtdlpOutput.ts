export interface YTDlpOutput {
    id: string;
    title: string;
    uploader?: string;
    uploader_id?: string;
    uploader_url?: string;
    upload_date?: string;
    channel?: string;
    channel_id?: string;
    channel_url?: string;
    duration?: number;
    view_count?: number;
    like_count?: number;
    dislike_count?: number;
    repost_count?: number;
    average_rating?: number;
    age_limit?: number;
    webpage_url: string;
    categories?: string[];
    tags?: string[];
    playable_in_embed?: boolean;
    is_live?: boolean;
    was_live?: boolean;
    live_status?: string;
    release_timestamp?: number;
    description?: string;
    thumbnail?: string;
    format_id?: string;
    format?: string;
    format_note?: string;
    width?: number;
    height?: number;
    resolution?: string;
    fps?: number;
    vcodec?: string;
    vbr?: number;
    acodec?: string;
    abr?: number;
    filesize?: number;
    filesize_approx?: number;
    tbr?: number;
    protocol?: string;
    extractor?: string;
    extractor_key?: string;
    extractor_version?: string;
    requested_formats?: Format[];
    formats?: Format[];
    subtitles?: Subtitles;
    automatic_captions?: Captions;
    requested_subtitles?: Subtitles;
    asr?: number;
    language?: string;
    requested_downloads?: RequestedDownload[];
  }
  
  interface Format {
    format_id: string;
    format: string;
    format_note?: string;
    ext: string;
    width?: number;
    height?: number;
    fps?: number;
    vcodec?: string;
    acodec?: string;
    abr?: number;
    vbr?: number;
    filesize?: number;
    filesize_approx?: number;
    tbr?: number;
    protocol?: string;
    container?: string;
    url: string;
    manifest_url?: string;
    fragments?: Fragment[];
    http_headers?: Record<string, string>;
  }
  
  interface Fragment {
    path: string;
    duration: number;
  }
  
  interface Subtitles {
    [language: string]: Subtitle[];
  }
  
  interface Subtitle {
    ext: string;
    url: string;
    name?: string;
  }
  
  interface Captions extends Subtitles {}
  
  interface RequestedDownload {
    filepath: string;
    temppath: string;
    info_dict: YTDlpOutput;
    fragment_index?: number;
  }
  