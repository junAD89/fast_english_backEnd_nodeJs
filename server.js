

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
global.fetch = fetch;
global.Headers = fetch.Headers;
// Importer selon la documentation Google
const { GoogleGenAI } = require('@google/genai');

// Configuration
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Clé API
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Initialiser selon la documentation Google
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// Route de chat
app.post('/chat', async (req, res) => {

    ///get front message 
    const frontMessage = req.body.message;

    try {
        // Utiliser la syntaxe exacte de la documentation
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: `This is a word from the user: ${frontMessage}.
            Give me two examples of how it is used in everyday life (each example less than 25 words).
            For each example:
            - Start with: Example 1 English: [your sentence]
            - Then: French: [translation]
            - Then: Example 2 English: [your sentence]
            - Then: French: [translation]
            Ensure there is proper space between words. Make sure there's a space between each word, and no words are joined together.
            No extra symbols, no bold, no colons at the start, no formatting.
            Plain text only.`


        });


        console.log(response.text);
        res.send(response.text);
    } catch (error) {
        console.error("Erreur complète:", error);
        res.status(500).send(`Erreur: ${error.message}`);
    }
});


app.post('/test', (req, res) => {
    const frontMessage = req.body.message;


    console.log(frontMessage)
    res.send({ welcome: "welcome" })
})



// Démarrer le serveur
app.listen(3000, () => {
    console.log("Serveur démarré sur http://localhost:3000");
});
