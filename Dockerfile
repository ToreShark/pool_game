# Stage 1: Build
FROM node:16-alpine as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run
FROM node:16-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/build ./build
# Install a server for serving the build directory, if not already installed
RUN npm install -g serve

EXPOSE 3000
# Use serve to serve the static files from the build directory
CMD ["serve", "-s", "build", "-l", "3000"]