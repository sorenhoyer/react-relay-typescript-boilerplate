FROM node:14

WORKDIR /server/graphql

COPY package.json ./

COPY yarn* ./

ENV HOST=0.0.0.0

ENV PORT=4000

RUN yarn

COPY . .

# EXPOSE 4000

CMD ["yarn", "start"]

