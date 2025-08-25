const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const ChatRouter = router;

const PPLX_API_KEY = process.env.PPLX_API_KEY;

ChatRouter.post("/", async (req, res) => {
    const {content} = req.body;
    console.log("Received content:", content);
    if (!content) {
        return res.status(400).send('No content provided.');
    }
    try {
        const response = await fetch('https://api.perplexity.ai/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${PPLX_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'sonar-pro',
                messages: [
                    {
                        role: 'user',
                        content: `${content}`
                    }
                ]
            })
        });
        const responseData = await response.json();
        console.log(responseData);
        console.log(responseData.choices[0].message.content);
        res.send(responseData);
    } catch (error) {
        console.error('Error in /chat route:', error);
        return res.status(500).send('An error occurred while processing the request.');
    }
});

module.exports = ChatRouter;
