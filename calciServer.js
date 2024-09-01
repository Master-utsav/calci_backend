const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/calculate', (req, res) => {
    const expression = req.query.expression;
    if (expression) {
        try {
            const result = eval(expression); // Note: eval is dangerous; use a safer expression parser in production
            res.json({ result });
        } catch (error) {
            res.status(400).json({ error: 'Invalid Expression' });
        }
    } else {
        res.status(400).json({ error: 'No Expression Provided' });
    }
});

app.get('/delete', (req, res) => {
    res.json({ result: '' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
