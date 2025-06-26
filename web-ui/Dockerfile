# Stage 1: Build Stage
FROM node:22-alpine as build-stage

# Set working directory
WORKDIR /app

# Increase memory limit for Node.js
ENV NODE_OPTIONS=--max_old_space_size=8192

# Install dependencies
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm@9 && \
    pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the project
RUN pnpm build
RUN echo "✅ Build successful 🎉"

# Stage 2: Production Stage
FROM nginx:stable-alpine as production-stage

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built files from previous stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
