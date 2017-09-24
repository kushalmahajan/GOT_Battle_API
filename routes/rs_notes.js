'use strict';
const express = require('express');
const router = express.Router();
const notes = require('../controllers/cs_notes');

router.get('/', notes.getNotes);

router.post('/', notes.saveNotes);

module.exports = router;
