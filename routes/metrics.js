var express = require('express');

var GameMetrics = require('../models/GameMetrics');
var router = express.Router();

router.get('/:username', function (req, res) {
    GameMetrics.findOne({username: req.params.username}, function (err, obj) {
        if (err) return res.send(err);
        if (!obj) return res.send({message: "Metrics for this user do not exist."});
        res.send(obj.data);
    });
});

module.exports = router;
