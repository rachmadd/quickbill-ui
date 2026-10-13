FROM oven/bun:1

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install

COPY . .

EXPOSE 6006

CMD ["bun", "run", "storybook", "--", "--host", "0.0.0.0", "--ci"]
