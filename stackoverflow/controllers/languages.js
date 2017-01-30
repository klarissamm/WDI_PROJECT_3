module.exports = {
  index: languagesIndex,
  create: languagesCreate,
  show: languagesShow,
  update: languagesUpdate,
  delete: languagesDelete
};

const Language = require('../models/language');

/*
 * UNPROTECTED
 * GET /languages
 */
function languagesIndex(req, res){
  Language
    .find({}, (err, language) => {
      if (err) return res.status(500).json({ message: 'Something went wrong.' });
      if (!language) return res.status(404).json({ message: 'Language not found.' });
      return res.status(200).json(language);
    });
}

/*
 * UNPROTECTED
 * GET /languages/:id
 */
function languagesShow(req, res){
  Language
  .findById({ _id: req.params.id })
  .populate(['questions'])
  .exec((err, language) => {
    if (err) return res.status(500).json(err);
    if (!language) return res.status(404).json({ error: 'No language was found.' });
    return res.status(200).json(language);
  });
}

/*
 * PROTECTED
 * POST /languages
 */
function languagesCreate(req, res){
  if (req.user.role !== 'admin') {
    return res.status(401).json({
      message: 'You must be an admin to create languages.'
    });
  }

  Language.create(req.body.language, (err, language) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    return res.status(201).json(language);
  });
}

/*
 * PROTECTED
 * PUT /languages/:id
 */
function languagesUpdate(req, res){
  if (req.user.role !== 'admin') {
    return res.status(401).json({
      message: 'You must be an admin to update languages.'
    });
  }

  Language
    .findByIdAndUpdate(req.params.id, req.body.language, {new: true}, (err, language) => {
      if (err) return res.status(500).json({ message: 'Something went wrong.' });
      if (!language) return res.status(404).json({ message: 'Language not found.' });
      return res.status(200).json(language);
    });
}

/*
 * PROTECTED
 * DELETE /languages/:id
 */
function languagesDelete(req, res){
  if (req.user.role !== 'admin') {
    return res.status(401).json({
      message: 'You must be an admin to delete languages.'
    });
  }

  Language
    .findByIdAndRemove(req.params.id, err => {
      if (err) return res.status(500).json({ message: 'Something went wrong.' });
      return res.status(204).json({success: true});
    });
}
