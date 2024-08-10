# Use the official Node.js image as a base image
FROM node:18.19.0
# Set the working directory in the container
WORKDIR /
RUN usermod -G staff www-data
# Install FFmpeg and other dependencies
RUN apt-get update && apt-get install -y ffmpeg curl
# Download the latest version of yt-dlp
COPY . .
COPY package*.json ./
RUN yarn
# Build the Next.js application
RUN npm run build
# Expose the port the app runs on
EXPOSE 3000
