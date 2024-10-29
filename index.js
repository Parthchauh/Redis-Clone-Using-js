const net = require('net');
const Parser = require('redis-parser');
const os = require('os');
const process = require('process');

const store = {}; // In-memory key-value store
let totalConnections = 0;
let totalCommands = 0;
const serverStartTime = Date.now();

const server = net.createServer((connection) => {
    console.log('Client connected...');
    totalConnections++;

    const parser = new Parser({
        returnReply: (reply) => {
            totalCommands++;
            const command = reply[0].toUpperCase(); // Normalize command to uppercase
            switch (command) {
                case 'SET': {
                    const key = reply[1];
                    const value = reply[2];
                    if (key && value) {
                        store[key] = value;
                        connection.write(`+OK\r\n`);
                    } else {
                        connection.write(`-ERR SET requires a key and a value\r\n`);
                    }
                    break;
                }
                case 'GET': {
                    const key = reply[1];
                    if (key in store) {
                        const value = store[key];
                        connection.write(`$${value.length}\r\n${value}\r\n`);
                    } else {
                        connection.write(`$-1\r\n`);
                    }
                    break;
                }
                case 'INFO': {
                    const uptimeSeconds = Math.floor((Date.now() - serverStartTime) / 1000);
                    const usedMemory = process.memoryUsage().heapUsed;

                    const info = `# Server
redis_version:0.1
redis_mode:standalone
os:${os.platform()}
arch_bits:${os.arch() === 'x64' ? 64 : 32}
uptime_in_seconds:${uptimeSeconds}
uptime_in_days:${Math.floor(uptimeSeconds / 86400)}

# Clients
connected_clients:1

# Memory
used_memory:${usedMemory}
used_memory_human:${(usedMemory / 1024).toFixed(2)}K

# Stats
total_connections_received:${totalConnections}
total_commands_processed:${totalCommands}

# Keyspace
db0:keys=${Object.keys(store).length},expires=0,avg_ttl=0\r\n`;

                    connection.write(`$${info.length}\r\n${info}\r\n`);
                    break;
                }
                default: {
                    connection.write(`-ERR Unknown command '${command}'\r\n`);
                    break;
                }
            }
        },
        returnError: (err) => {
            console.log('=> ', err);
            connection.write(`-ERR ${err.message}\r\n`);
        },
    });

    connection.on('data', (data) => {
        try {
            parser.execute(data);
        } catch (error) {
            console.error('Parsing error:', error);
            connection.write(`-ERR Parsing error: ${error.message}\r\n`);
        }
    });

    connection.on('end', () => {
        console.log('Client disconnected.');
    });

    connection.on('error', (err) => {
        console.error('Connection error:', err.message);
    });
});

server.listen(8000, () => {
    console.log('Custom Redis running on port 8000');
});
