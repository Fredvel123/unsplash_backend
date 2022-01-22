const router = require('express').Router();
const { getImagesByUser, addImage, removeImageById } = require('../controllers/images.ctl');
const { verifyToken } = require('../controllers/users.ctl');


router.get('/byuser', verifyToken, getImagesByUser)
router.post('/add', verifyToken, addImage)
router.delete('/remove/:id', removeImageById)

module.exports = router;