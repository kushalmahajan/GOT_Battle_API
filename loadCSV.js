/**
 * Created by vedant on 24/09/17.
 */

'use strict';

module.exports = function () {
	const fastcsv = require('fast-csv'),
	    BattleModel = require('./models/m_battles');

    fastcsv
	  .fromPath('./data/battles.csv',
		{
		    headers:true,
		    quote:'"',
		    ignoreEmpty:true
		})
	  .on('data', function(data){

		parseToNumber(data);
		console.log('formatted Data->>>>>', data);
		//Save to database
		BattleModel.create({
		    name: data.name,
		    year: data.year,
		    battle_number: data.battle_number,
		    attacker_king: data.attacker_king,
		    defender_king: data.defender_king,
		    attacker_1: data.attacker_1,
		    attacker_2: data.attacker_2,
		    attacker_3: data.attacker_3,
		    attacker_4: data.attacker_4,
		    defender_1: data.defender_1,
		    defender_2: data.defender_2,
		    defender_3: data.defender_3,
		    defender_4: data.defender_4,
		    attacker_outcome: data.attacker_outcome,
		    battle_type: data.battle_type,
		    major_death: data.major_death,
		    major_capture: data.major_capture,
		    attacker_size: data.attacker_size,
		    defender_size: data.defender_size,
		    attacker_commander: data.attacker_commander,
		    defender_commander: data.defender_commander,
		    summer: data.summer,
		    location: data.location,
		    region: data.region,
		    note: data.note
		}, function (err, result) {
		    if (err) return console.log(err);
		    // saved!
		    console.log('CSV save result->>>>', result);
		});

	  })
	  .on('end', function(){
		console.log('Battle CSV saved');
	  });

    function parseToNumber(data){
	  data.year = parseInt(data.year, 10) || '';
	  data.battle_number = parseInt(data.battle_number, 10) || '';
	  data.major_death = parseInt(data.major_death, 10) || '';
	  data.major_capture = parseInt(data.major_capture, 10) || '';
	  data.attacker_size = parseInt(data.attacker_size, 10) || '';
	  data.defender_size = parseInt(data.defender_size, 10) || '';
	  data.summer = parseInt(data.summer, 10) || '';

    }

}