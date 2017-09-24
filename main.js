/**
 * Created by vedant on 23/09/17.
 */

'use strict';

const increment = require('./controllers/a');
const decrement = require('./controllers/b');
const counter = require('./controllers/counter');

increment();
decrement();
console.log(counter.count);
