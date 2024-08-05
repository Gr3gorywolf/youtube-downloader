# Use the official Node.js image as a base image
FROM node:18.19.0

RUN usermod -G staff www-data
# Install FFmpeg and other dependencies
RUN apt-get update && apt-get install -y ffmpeg curl
# Download the latest version of yt-dlp
COPY . .
RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o ./ytdlp-bin/yt-dlp
RUN chmod 777 ./ytdlp-bin/yt-dlp
COPY package*.json ./
RUN npm install
# Build the Next.js application
RUN npm run build
RUN yarn
RUN npm run build
# Expose the port the app runs on
EXPOSE 3000

# Command to start the Next.js application
CMD ["npm","start"]
