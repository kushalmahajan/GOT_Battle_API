/**
 * Created by vedant on 23/09/17.
 */

'use strict';
const counter = require('./counter');

const  decrement = function() {
    console.log('In b.js count is ', counter.count);
    counter.count--;
};

module.exports = decrement;
