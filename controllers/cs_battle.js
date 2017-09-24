/**
 * Created by vedant on 24/09/17.
 */

'use strict';
const battle = require('../models/m_battles');


function removeEmptyValues(data) {
	return data.reduce( (acc,item) => {
		if(item.location) acc.push(item.location);
		return acc;
	}, []);
}

function maxCountElm(arr) {
    if(arr.length == 0)
	  return null;
    let o = {};
    let maxElm = arr[0], maxCount = 1;
    for(let i = 0; i < arr.length; i++) {
	  let elm = arr[i];
	  if(o[elm] == null)
		o[elm] = 1;
	  else
		o[elm]++;
	  if(o[elm] > maxCount)
	  {
		maxElm = elm;
		maxCount = o[elm];
	  }
    }
    return maxElm;
}
function getUniqueArr(arr) {

    if(arr.length == 0)
	  return null;
    let o = {};
    return arr.reduce((acc, item) => {

	  if(o[item] == null)
		o[item] = 1;
	  else
		o[item]++;
	  if(o[item] === 1) {
	      if(item){
		    acc.push(item);
		}

	  }
	//console.log('o is >> ', o);
	  return acc;

    }, []);

}

function getStats(response){

	  if(response.length > 0) {

		let values = {
		    attacker_kings: [],
		    defender_kings: [],
		    regions: []
		};
		let attacker_outcome = {
		    wins: 0,
		    loss: 0
		};
		let battleTypes = [];
		let defenderValues = [];
		let defender_size = {};
		let defenderSum = 0;
		response.forEach(item => {

		    //Mongoose inherits from Documents. Conversion required to extend or perform operations
		    let obj = item.toObject();

		    for (let key in obj) {

			  if (obj.hasOwnProperty(key)) {

				switch (key) {
				    case 'attacker_king':
					  values.attacker_kings.push(obj[key]);
					  break;
				    case 'defender_king':
					  values.defender_kings.push(obj[key]);
					  break;
				    case 'region':
					  values.regions.push(obj[key]);
					  break;
				    case 'attacker_outcome':
				        if(obj[key] === 'win'){
						attacker_outcome.wins++
					  }else if(obj[key] === 'loss'){
						attacker_outcome.loss++;
					  }
				        break;
				    case 'battle_type':
					  battleTypes.push(obj[key]);
				        break;
				    case 'defender_size':
					  defenderValues.push(obj[key]);
					  defenderSum += (obj[key]);
				        break;
				    default:
					  break;
				}
			  }

		    }
		});

		let most_active = {};
		most_active.attacker_king = maxCountElm(values.attacker_kings);
		most_active.defender_king = maxCountElm(values.defender_kings);
		most_active.region = maxCountElm(values.regions);

		let battle_types = getUniqueArr(battleTypes);
		console.log('defenders>>>', defenderValues);
		defender_size.min = defenderValues.reduce((a, b) =>  Math.min(a, b));
		defender_size.max = defenderValues.reduce((a, b) =>  Math.max(a, b));
		defender_size.average = parseInt(defenderSum / defenderValues.length);
		return {
		    most_active,
		    attacker_outcome,
		    battle_types,
		    defender_size
		};
	  }

}


module.exports =  {

    getList(req, res){
        battle.find({}, 'location -_id').exec().then(response => {
            if(response.length > 0){

		    let result = removeEmptyValues(response);

		    res.send({
			  code: 1,
			  data: result
		    });
		}else{
                res.send({
                    code: 0,
			  data: response
		    })
		}

	  }).catch(err => {
	      console.log('getList Err',err);
	  });
    },
    totalBattleCount(req, res){
        battle.count({}, (err, response) => {
		console.log('total battles occured->>>', response);
		res.send({
		    code: 1,
		    data: response
		})
	  });
    },
    stats(req, res){

	  battle.find({}, 'attacker_king defender_king region attacker_outcome battle_type defender_size -_id').exec().then(response => {
		if (response.length > 0) {
		    let stats = getStats(response);

		    res.send({
			  code: 1,
			  data: stats
		    });
		} else {
		    res.send({
			  code: 0,
			  data: response
		    });
		}

	  }).catch(err => {
		console.log('getList Err >>>>', err);
	  });


    },
    search(req, res){
	console.log('req query', req.query);
	let query = {
	    $and : [
		  { $or: [ { attacker_king: req.query.king} , { defender_king: req.query.king } ] },
		  { location: req.query.location, battle_type: req.query.type }
	    ]
	};
	battle.find(query, '-__v').exec().then(response => {
	    res.send({
		  code: 1,
		  data: response
	    });
	});
    }
}