import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const CSV_PATH = path.join(__dirname, 'waitlist.csv');
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'admin123';

app.use(cors());
app.use(express.json());

// Logger
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Auth middleware
const authenticateAdmin = (req, res, next) => {
    const secret = req.headers['x-admin-secret'];
    console.log(`Auth check for ${req.url}: Received secret: "${secret}"`);
    if (secret === ADMIN_SECRET) {
        next();
    } else {
        console.log(`Auth failed: "${secret}" does not match "${ADMIN_SECRET}"`);
        res.status(401).json({ error: 'Unauthorized: Invalid admin secret' });
    }
};

// Ensure CSV file exists
if (!fs.existsSync(CSV_PATH)) {
    fs.writeFileSync(CSV_PATH, 'timestamp,email\n');
}

// Get all waitlist data
app.get('/api/waitlist/data', authenticateAdmin, (req, res) => {
    try {
        if (!fs.existsSync(CSV_PATH)) {
            return res.json([]);
        }
        const data = fs.readFileSync(CSV_PATH, 'utf8');
        const lines = data.trim().split('\n');
        const signups = lines.slice(1).map(line => {
            const [timestamp, email] = line.split(',');
            return { timestamp, email };
        });
        res.json(signups);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read waitlist data' });
    }
});

// Get total count
app.get('/api/waitlist/count', (req, res) => {
    try {
        if (!fs.existsSync(CSV_PATH)) {
            return res.json({ count: 0 });
        }
        const data = fs.readFileSync(CSV_PATH, 'utf8');
        const lines = data.trim().split('\n');
        // Subtract 1 for the header
        const count = Math.max(0, lines.length - 1);
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: 'Failed to read waitlist' });
    }
});

app.post('/api/waitlist', (req, res) => {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    try {
        const data = fs.readFileSync(CSV_PATH, 'utf8');
        const emails = data.split('\n').map(line => line.split(',')[1]);

        if (emails.includes(email)) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        const timestamp = new Date().toISOString();
        fs.appendFileSync(CSV_PATH, `${timestamp},${email}\n`);

        console.log(`New waitlist signup: ${email}`);
        res.status(201).json({ message: 'Successfully joined waitlist' });
    } catch (error) {
        console.error('Error saving to waitlist:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login verification
app.post('/api/admin/login', (req, res) => {
    const { secret } = req.body;
    console.log(`Login attempt with secret: "${secret}"`);
    console.log(`Expected secret: "${ADMIN_SECRET}"`);

    if (secret === ADMIN_SECRET) {
        console.log('Login successful');
        res.status(200).json({ success: true });
    } else {
        console.log('Login failed: Invalid secret');
        res.status(401).json({ error: 'Invalid secret' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Current ADMIN_SECRET is set to: "${ADMIN_SECRET}"`);
});
