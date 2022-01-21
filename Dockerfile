FROM 648064107398.dkr.ecr.us-west-2.amazonaws.com/bank-frontend:b7c144a
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY . ./
CMD ["npm", "start"]
