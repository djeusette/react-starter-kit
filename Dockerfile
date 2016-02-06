FROM node:5.5-slim

ENV HOME /home/client_frontend
WORKDIR $HOME

ADD package.json $HOME/
RUN npm install

ADD . $HOME

EXPOSE 3000
EXPOSE 3001
EXPOSE 5000

CMD ["npm", "start"]
