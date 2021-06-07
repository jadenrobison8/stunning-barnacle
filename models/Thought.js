const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
   {
      reactionId: {
         type: Schema.Types.ObjectId,
         default: () => new Types.ObjectId()
      },
      reactionBody: {
         type: String,
         required: true,
         //280 character maximum
         maxLength: [280, 'too many characters']
      },
      userName: {
         type: String, 
         required: true
      },
      createdAt: {
         type: Date,
         default: Date.now,
         get: createdAtVal => dateFormat(createdAtVal)
      }
   },
   {
      //schema settings
      //this will not be a model, but rather will be used as the reaction fields subdocument schema in the thought model
      toJSON: {
         getters: true
      }
   }
);


const ThoughtSchema = new Schema(
   {
      thoughtText: {
         type: String,
         required: true,
         //must be betweeen 1 and 280 characters 
         minLength: [1, 'too few characters'],
         maxLength: [280, 'too many characters']
      },
      createdAt: {
         type: Date,
         default: Date.now,
         get: createdAtVal => dateFormat(createdAtVal)
      },
      username: { //(the user that created this thought)
         type: String,
         required: true,
      },
      reactions: [ReactionSchema]
   },
   {
      //schema settings
      toJSON: {
         virtuals: true,
         getters: true
      },
      id: false
   }
);

//create a virtual called reactionCount that retrieves the length of the thoughts reactions array field on query
ThoughtSchema.virtual('reactionCount').get(function() {
   return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;