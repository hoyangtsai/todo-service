FROM node:14-alpine
ENV NODE_ENV=development
WORKDIR /usr/app
COPY ["package*.json", "tsconfig.json", "./"]
RUN npm install --development
COPY . .
EXPOSE 9000
CMD ["npm", "run", "dev"]
