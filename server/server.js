const config = require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {TechSheet} = require('./models/techsheet');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');


var app = express();
var port = process.env.PORT;

app.use(bodyParser.json());

app.post(`/techsheets`, authenticate, (req, res) => {
  var body = _.pick(req.body, ['_brand', 'varietyName', 'speciesName', 'keyFeatures', 'briefDescription', 'seedingRate', 'adaptation', 'modified', 'lastModified', '_creator']);
  var ts = new TechSheet(body);

  ts.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

// app.get('/techsheets', authenticate, (req,res) => {
//   Todo.find({
//     _creator: req.user._id
//   }).then((todos) => {
//     res.send({todos});
//   }, (e) => {
//     res.status(400).send(e);
//   });
// });
//
// app.get('/techsheets/:id', authenticate, (req, res) => {
//   var id = req.params.id;
//
//   if(!ObjectID.isValid(id)) {
//     return res.status(404).send();
//   }
// TechSheet.findOne({
//   _id: id,
//   _creator: req.user.id
// }).then((todo) => {
//   if(!todo) {
//     return  res.status(404).send();
//   }
//       res.send({todo});
//   }, (e) => {
//     res.status(400).send();
//   });
// });
//
// app.delete('/techseets/:id', authenticate, (req, res) => {
//   var id = req.params.id;
//   if (!ObjectID.isValid(id)) {
//     return res.status(404).send();
//   }
//
// Todo.findOneAndRemove({
//   _id: id,
//   _creator: req.user._id
// }).then((todo) => {
//   if (!todo) {
//     return res.status(404).send();
//   }
//     res.send({todo});
// }).catch((e) => {
//     res.status(400).send();
//   });
// });
//
// app.patch('/techsheets/:id', authenticate, (req, res) => {
//   var id = req.params.id;
//   var body = _.pick(req.body, ['text', 'completed']);
//
//   if (!ObjectID.isValid(id)) {
//     return res.status(404).send();
//   }
//
//   if (_.isBoolean(body.completed) && body.completed) {
//     body.completedAt = new Date().getTime();
//   } else {
//     body.completed = false;
//     body.completedAt = null;
//   }
//
//   Todo.findOneAndUpdate({ _id: id, _creator: req.user._id }, {$set: body}, {new: true}).then((todo) => {
//     if (!todo) {
//       return res.status(404).send();
//     }
//     res.send({todo});
//   }).catch((e) => {
//     res.status(400).send();
//   });
// });
//
// POST /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});
//
//
// app.get('/users/me', authenticate, (req, res) => {
//   res.send(req.user);
// });
//
//
// app.post('/users/login', (req, res) => {
//     var body = _.pick(req.body, ['email', 'password']);
//
//   User.findByCredentials(body.email, body.password).then((user) => {
//    return user.generateAuthToken().then((token) => {
//      res.header('x-auth', token).send(user);
//
//    });
//   }).catch((e) => {
//     res.status(400).send();
//   });
// });
//
// app.delete('/users/me/token', authenticate, (req, res) => {
//   req.user.removeToken(req.token).then(() => {
//     res.status(200).send();
//   }, () => {
//     res.status(400).send();
//   });
// });

app.listen(port, () => {
  console.log(`Started on ${port}`);
});


module.exports = {app};
