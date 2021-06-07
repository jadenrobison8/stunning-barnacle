const { User } = require('../models');

// /api/users
const userController = {
   //GET all users
   getAllUsers(req,res) {
      User.find({})
         .populate({
            path: 'thoughts',
            select: '-__v'
         })
         .select('-__v')
         .sort({ _id: -1 })
         .then(dbUserData => res.json(dbUserData))
         .catch(err => {
            console.log(err);
            res.status(400).json(err)
         });
   },

   //GET a single user by its _id
   getUserById( {params} , res) {
      User.findOne({ _id: params.id })
         .populate({
            path: 'thoughts',
            select: '-__v'
         })
         .select('-__v')
         .then(dbUserData => {
            if(!dbUserData) {
               res.status(404).json({ message: 'No User found with this id'});
               return;
            }
            res.json(dbUserData);
         })
         .catch(err => {
            console.log(err);
            res.status(400).json(err);
         });
   },

   //POST a new user
      // {
      //    "username": "lerantino",
      //    "email": "lerantino@gmail.com"
      // }
   createUser({ body }, res) {
      User.create(body)
         .then(dbUserData => res.json(dbUserData))
         .catch( err => res.status(400).json(err));
   },

   //PUT to update a user by its id
   updateUser({ params, body }, res) {
      User.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true })
         .then(dbUserData => {
            if (!dbUserData) {
               res.status(404).json({ message: 'No user found with this id'});
               return;
            }
            res.json(dbUserData);
         })
         .catch(err => res.status(400).json(err));
   },

   //DELETE to remove user by its id
   deleteUser({ params }, res) {
      User.findOneAndDelete({ _id: params.id })
         .then(dbUserData => {
            if (!dbUserData) {
               res.status(404).json({ message: 'No user found with this id'})
               return;
            }
            res.json(dbUserData);
         })
         .catch(err => res.status(400).json(err));

      //bonus: remove associated thoughts when deleted
      //Thought.findAllAndDelete({ _id: params.id})
         //.then
   },

   // /api/users/:userid/friends/:friendId

   //POST to add a new friend to a users friend list
   createFriend({ params }, res) {
      User.findOneAndUpdate(
         { _id: params.userId },
         { $push: { friends: params.friendId }},
         { new: true, runValidators: true }
      )
      .then(dbUserData => {
         if (!dbUserData) {
            res.status(404).json({ message: 'no user with this id'});
            return;
         }
         res.json(dbUserData);
      })
      .catch(err => res.json(err));
   },

   //DELETE to remove a friend from a users friend list
   deleteFriend({ params }, res) {
      User.findOneAndUpdate(
         { _id: params.userId },
         { $pull: { friends: params.friendId }},
         { new: true, runValidators: true }
      )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
   }
};

module.exports = userController;
