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

## Setting Up Redis CLI (Check if Redis CLI is Installed if not then install it from the Official Redis Website)
```
https://redis.io/downloads/
```

## Now configurate it
- 1.Add to Environment Variables (Windows Only)
- 2.Locate the Redis installation directory.
- 3.Right-click on "This PC" > "Properties" > "Advanced system settings" > "Environment Variables".
- 4.Select the Path variable, click "Edit...", and add the Redis directory.
- 5.Restart terminal sessions.


Run the following command to check:

```bash
redis-cli --version
```

##Or You can Spin up the Docker Container

->Install Docker from Docker website.

1.Run Redis container:

```bash
docker run --name my-redis -p 6379:6379 -d redis
```

2.Access Redis CLI:

```bash
docker exec -it my-redis redis-cli
```

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/Redis-Clone-Using-js.git
   cd Redis-Clone-Using-js

# Navigate into the project directory
```
cd Redis-Clone-Using-js || exit
```

# Install dependencies
```
npm install
```

# Start the server
```
node server.js
```

## Screen shots for reference
![Screenshot 2024-10-29 212931](https://github.com/user-attachments/assets/90744ca7-a66b-4af5-95b9-c7c88443d013)

![Screenshot 2024-10-29 213101](https://github.com/user-attachments/assets/fa61350a-9b1c-464c-8497-bc34de0ed36b)


