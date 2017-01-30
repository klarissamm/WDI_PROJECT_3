module.exports = {
  index: languagesIndex,
  create: languagesCreate,
  show: languagesShow,
  update: languagesUpdate,
  delete: languagesDelete
};

 //Needs testing Insomnia!!
const Language = require('../models/language');

function languagesIndex(req, res){
  Language
    .find({}, (err, language) => {
      if (err) return res.status(500).json({ message: 'Something went wrong.' });
      if (!language) return res.status(404).json({ message: 'Language not found.' });

      return res.status(200).json(language);
    });
}

function languagesCreate(req, res){
  if(req.decoded && req.role === 'ADMIN'){
    Language.create(req.body.language, (err, language) => {
      if (err) return res.status(500).json({ message: 'Something went wrong.' });
      return res.status(201).json(language);
    });
  }
}

function languagesShow(req, res){
    Language
    .findById({ _id: req.params.id })
    .populate('questions')
    .exec((err, language) => {
      if (err) return res.status(500).json(err);
      if (!language) return res.status(404).json({ error: 'No language was found.' });

      return res.status(200).json(language);
    });
}

function languagesUpdate(req, res){
  if(req.decoded && req.role === 'ADMIN'){
    Language
      .findByIdAndUpdate(req.params.id, req.body.language, {new: true}, (err, language) => {
        if (err) return res.status(500).json({ message: 'Something went wrong.' });
        if (!language) return res.status(404).json({ message: 'Language not found.' });
        return res.status(200).json(language);
    });
  }
}

function languagesDelete(req, res){
  if(req.decoded && req.role === 'ADMIN'){
    Language
      .findByIdAndRemove(req.params.id, err => {
        if (err) return res.status(500).json({ message: 'Something went wrong.' });
        return res.status(204).json({success: true});
    });
  }
}
