const { User, Thought, Reaction } = require('../models');
const { db } = require('../models/User');

// /api/thoughts

const thoughtController = {

   //GET to get all thoughts
   getAllThoughts(req,res) {
      Thought.find({})
         .populate({
            path: 'reactions',
            select: '-__v'
         })
         .select('-__v')
         .sort({ _id: -1 })
         .then(dbThoughtData => res.json(dbThoughtData))
         .catch(err => {
            console.log(err);
            res.status(400).json(err);
         });
   },

   //GET a single thought
   getThoughtById({ params }, res) {
      Thought.findOne({ _id: params.id })
         .populate({
            path: 'reactions',
            select: '-__v'
         })
         .select('-__v')
         .then(dbThoughtData => {
            if (!dbThoughtData) {
               res.status(404).json({ message: 'No Thought found with this id'});
               return;
            }
            res.json(dbThoughtData);
         })
         .catch(err => {
            console.log(err);
            res.status(400).json(err);
         });
   },

   //POST to create a new thought (dont forget to push the created thoughts _id to the associated users thoughts array field)
      // {
      //    "thoughtText": "Heres a cool thought...",
      //    "username": "lerantino",
      //    "userId": "55849495684fjg"
      // }
   createThought({ params, body }, res) {
      Thought.create(body)
         .then(({ _id }) => {
            console.log(_id);
            return User.findOneAndUpdate(
               { _id: params.userId },
               { $push: { thoughts: _id }},
               { new: true}
            );
         }) 
         .then(dbUserData => {
            if (!dbUserData) {
               res.status(404).json({ message: 'No user with that id!' });
               return;
            }
            res.json(dbUserData);
         })
         .catch( err => res.status(500).json(err));
   },


   //PUT to update a thought by its id
   updateThought({ params, body }, res) {
      Thought.findOneAndUpdate(
         {_id: params.thoughtId},
         body,
         {new: true, runValidators: true}
      )
      .then(dbThoughtData => {
         if(!dbThoughtData) {
            res.status(404).json({ message: 'No thought with this id' });
            return;
         }
         res.json(dbThoughtData);
      })
      .catch(err => res.status(500).json(err));
   },

   //DELETE to remove a thought by its id
   deleteThought({ params }, res) {
      Thought.findOneAndDelete({ _id: params.thoughtId })
         .then(dbThoughtData => {
            if(!dbThoughtData) {
               return res.json(404).json({ message: 'No thought with this id!' });
            }
            res.json(dbThoughtData);
         })
         .catch(err => res.json(err));
   },

   // /api/thoughts/:thoughtId/reactions

   //POST to create a reaction stored in a single thoughts reactions array
   createReaction({ params, body }, res) {
      Thought.findOneAndUpdate(
         { _id: params.thoughtId },
         { $push: { reactions: body } },
         { new: true, runValidators: true }
      )
      .then(dbThoughtData => {
         if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought with this id'});
            return;
         }
         res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
   },

   //DELETE to pull and remove a reaction by the reactions reactionID value
   deleteReaction({ params }, res) {
      Thought.findOneAndUpdate(
         { _id: params.thoughtId },
         { $pull: { reactions: { reactionId: params.reactionId } } },
         { new: true },
      )
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
   }
};

module.exports = thoughtController;