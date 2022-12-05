FROM node:18

WORKDIR /web
# ADD ./package.json /web/package.json
# ADD ./package-lock.json /web/package-lock.json
# RUN npm install
ADD . /web

CMD ["npm", "run", "dev"]
