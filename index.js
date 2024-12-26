const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <h3>Status</h3>
            <form action="/" method="POST">
                <input name="email" type="email" placeholder="Input your email">
                <button type="submit">Push</button>
            </form>
        `);
    } else if (req.method === 'POST') {
        let body = '';

        // Collect data chunks
        req.on('data', chunk => {
            body += chunk.toString();
        });

        // When all data is received
        req.on('end', () => {
            // Parse form-encoded data (e.g., email=value)
            const params = new URLSearchParams(body);
            const email = params.get('email'); // Extract the input value by its name attribute

            console.log('Email:', email);

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Received email: ${email}`);
        });
    }
});

server.listen(8080, () => {
    console.log('Server running on port 8080');
});
