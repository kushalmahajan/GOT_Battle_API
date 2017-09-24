const NotesModel = require('../models/m_notes');

let notes =  {
    getNotes(req, res){
	  NotesModel.find({}, '-__v').exec().then(response => {
	      if(response && response.length > 0){
		    res.send({
			  code: 1,
			  data: response
		    });
		}else{
	          res.send({
	              code: 0,
			  error: response
		    })
		}
	  }, err => {
		res.send({
		    code: 0,
		    error: err
		});
	  });

    },
    saveNotes(req, res){
	let notesModel_instance = new NotesModel({author: req.body.author, title: req.body.title, desc: req.body.desc});

	notesModel_instance.save().then((response) => {
		  res.send({
			code: 1,
			data: response
		  });

	  }, err => {
	    res.send({
			code: 0,
			error: err
	    });
	});
    }
};


module.exports = notes;