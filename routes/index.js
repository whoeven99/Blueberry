var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('Home111');
    res.sendFile(path.join(__dirname, "../public", "index.html"));
});

router.post('/test', function(req, res, next) {
    const resStr = {};
    resStr["text"] = "Successful";
    console.log(`/test content:\n` + resStr);
    res.send({"text": resStr});
});

module.exports = router;
