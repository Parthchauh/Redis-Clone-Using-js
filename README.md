# Redis-Clone-Using-js

A basic in-memory Redis-like server built in Node.js. This clone supports fundamental `SET`, `GET`, and `INFO` commands and handles client connections over TCP. Designed for educational purposes, it demonstrates how a simple key-value store server can operate using the Redis protocol.

## Features

- **SET**: Store a key-value pair in memory.
- **GET**: Retrieve the value for a specified key.
- **INFO**: Display server statistics (uptime, memory usage, command count, and more).
- Tracks total connections and commands processed.
- Lightweight, running on a default port of 8000.

## Requirements

- Node.js (version 14 or higher)
- `redis-parser` module

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/Redis-Clone-Using-js.git
   cd Redis-Clone-Using-js

# Navigate into the project directory
cd Redis-Clone-Using-js || exit

# Install dependencies
npm install

# Start the server
node server.js