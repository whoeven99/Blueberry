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

    gptRes = (await chatCall(prompt)).message.content;
    updateHistory(userId, characterName, message, gptRes);
    console.log(`gptReq:`, prompt, `\ngptRes :`,  gptRes);
    res.send({"text": gptRes});
});

module.exports = router;
