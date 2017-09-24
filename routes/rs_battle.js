/**
 * Created by vedant on 24/09/17.
 */

'use strict';

const express = require('express');
const router = express.Router();
const battleC = require('../controllers/cs_battle');

router.get('/getLocations', battleC.getList);
router.get('/getCount', battleC.totalBattleCount);
router.get('/stats', battleC.stats);
router.get('/search', battleC.search);

module.exports = router;
