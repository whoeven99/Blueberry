var express = require('express');
var router = express.Router();
const { chatCall, generatePrompt, updateHistory } = require('../openai');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('Home');
});

router.post('/talk', async function(req, res, next) {
    userId = req.body.userId;
    characterName = req.body.characterName;
    message = req.body.message;
    
    prompt = generatePrompt(userId, characterName, message)

    gptRes = await chatCall(prompt);
    console.log(`gptReq:`, prompt, `\ngptRes :`,  gptRes);
    if (gptRes === undefined) {
        res.send({"text": "对不起，你说的意思我没有理解，请你再问一遍？"});
    }
    updateHistory(userId, characterName, message, gptRes);
    res.send({"text": gptRes});
});

module.exports = router;
