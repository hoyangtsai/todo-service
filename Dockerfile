FROM node:14-alpine
ENV NODE_ENV=development
WORKDIR /usr/app
COPY ["package*.json", "tsconfig.json", "./"]
RUN npm install --development
COPY . .
ENV PORT=9000
EXPOSE 9000
CMD ["npm", "run", "dev"]
