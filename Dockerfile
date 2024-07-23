## Temporary image only used to build server
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

## Optimized image used as server
FROM node:20-alpine AS server
WORKDIR /app
COPY --from=builder ./app/dist ./dist
COPY package* ./
RUN npm install --production
EXPOSE 8080

CMD ["npm", "start:prod"]