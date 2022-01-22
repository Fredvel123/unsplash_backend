const router = require('express').Router();
const { getAllUsers, createNewUser, removeUserById, verifyUser, verifyToken, getUserById } =  require('../controllers/users.ctl');

router.get('/all', verifyToken, getAllUsers);
router.get('/user', verifyToken, getUserById);
router.post('/signup', createNewUser);
router.delete('/remove/:id', removeUserById);
router.post('/login', verifyUser);

module.exports = router;