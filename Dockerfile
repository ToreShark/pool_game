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
# Install serve to serve the static files
RUN npm install -g serve

# Expose port 3000 for the container
EXPOSE 3000

# Command to serve the static files from the build directory
CMD ["serve", "-s", "build", "-l", "3000"]