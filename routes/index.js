var express = require('express');
var router = express.Router();
const { chatCall } = require('../openai');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('Home');
});

router.post('/talk', async function(req, res, next) {
    userId = req.body.userId;
    characterName = req.body.characterName;
    message = req.body.message;
    
    gptRes = await chatCall(message);
    console.log(`gptReq:`, message, `\ngptRes :`,  gptRes);
    res.send({"text": gptRes});
});

module.exports = router;
