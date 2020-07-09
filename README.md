# Simple OpenweatherAPI proxy with MongoDB caching

## Installation

- Run `npm i` command to install dependencies.
- Configure `PORT`, `MONGODB_URI`, and `OPENWEATHER_API_KEY` environment variables.
- Run `start:prod` to start the server.

## HTTP Routes

| Method | URI             |
| ------ | --------------- |
| `GET`  | `weather/:city` |
