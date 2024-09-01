const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const math = require('mathjs');

dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/calculate', (req, res) => {
    const expression = req.query.expression;
    console.log(`Received expression: ${expression}`); // Log the expression for debugging
    if (expression) {
        try {
            const result = math.evaluate(expression);
            res.json({ result });
        } catch (error) {
            console.error('Error evaluating expression:', error); // Log detailed error
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
