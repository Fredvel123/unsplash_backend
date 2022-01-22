const USERS = require('../models/users.schema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getAllUsers = async (req, res) => {
  const users = await USERS.find();
  res.json(users);
}

const createNewUser = async (req, res) => {
  const user = new USERS(req.body);
  const emailRepeted = await USERS.findOne({email: req.body.email});
  if(!emailRepeted) {
    bcrypt.hash(user.password, 10, async (err, hash) => {
      if (!err) {
        user.password = hash;
        const newUser = await user.save();
        res.json({
          isCreated: true,
          message: `the user: ${newUser.name} was created successfully`
        })
      } else {
        console.log(err);
      }
    }  )
  } else {
    res.json({
      isCreated: false,
      message: `the email: ${user.email} is already used, you need a new email`
    })
  }
}


const removeUserById = async (req, res) => {
  const {id} = req.params;
  const user = await USERS.findByIdAndRemove(id);
  res.json({
    message: `the user: ${user.name} was removed successfully `
  })
}

const verifyUser = async (req, res) => {
  const user =  await USERS.findOne({email: req.body.email});
  if(user) {
    bcrypt.compare(req.body.password, user.password, (err, data) => {
      if(data) {
        const _token = jwt.sign({id: user._id}, process.env.SECRET_WORD, {expiresIn: 60*60*24*14}) // token expires in 14 days
        res.json({
          isLogged: true,
          token: _token
        })
      } else{
        res.json({
          isLogged: false,
          message: 'something is not working, please try again.'
        })
        console.log(err);
      }
    })
  }else {
    res.json({
      isLogged: false,
      message: 'the email is not correct'
    })
  }
}
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZWI0OWU1MzFhMjdjMDhiM2Y2YTkzMyIsImlhdCI6MTY0MjgxMTE0MCwiZXhwIjoxNjQ0MDIwNzQwfQ.HX7kxSmcr6qyHJ9rzHzxTaz0wr-U9KjI63r7CTo_ceU

const verifyToken = async (req, res, next) => {
  const _token = req.headers['access-token'];
  if (_token) {
    jwt.verify(_token, process.env.SECRET_WORD, (err, payload) => {
      if (!err) {
        req.userId = payload.id;
        next();
      } else {
        res.json({
          auth: false,
          message: 'your token is not valid'
        })
      }
    })
  } else {
    res.json({
      auth: false,
      message: 'you have no access here, you need a token.'
    })
  }
}

const getUserById = async (req, res) => {
  const user = await USERS.findById({_id: req.userId}).select('-password')
  res.json(user)
}

module.exports = {
  createNewUser,
  getAllUsers,
  verifyUser,
  removeUserById,
  verifyToken, 
  getUserById

}