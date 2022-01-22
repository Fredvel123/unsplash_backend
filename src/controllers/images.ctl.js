const IMAGES = require('../models/images.schema');

const getImagesByUser = async (req, res) => {
  const images = await IMAGES.find({ author: req.userId });
  if(images) {
    res.json(images)
  }else {
    res.json({
      message: 'you still have no images added.'
    })
  }
}

const addImage = async (req, res) => {
  const image = new IMAGES({
    imageUrl: req.body.imageUrl,
    author: req.userId
  });
  const newImage = await image.save();
  res.json({
    status: 200,
    added: true,
    message: 'image added, now you can see it in the favorit section.',
    details: newImage
  }) 
}

const removeImageById = async (req, res) => {
  const {id} = req.params;
  const image = await IMAGES.findByIdAndRemove(id);
  res.json({
    message: 'the image was removed successfully',
    details: image
  })
}



module.exports = {
  getImagesByUser,
  addImage,
  removeImageById
}