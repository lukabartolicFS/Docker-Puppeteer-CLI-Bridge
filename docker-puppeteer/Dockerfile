FROM buildkite/puppeteer:latest
WORKDIR /app
COPY . /app
RUN npm install
ENV PATH="${PATH}:/node_modules/.bin"
ENTRYPOINT ["node", "converter.js"]
CMD ["url_value"]