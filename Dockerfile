FROM 648064107398.dkr.ecr.us-west-2.amazonaws.com/bank-frontend:node
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY . ./
CMD ["npm", "start"]
