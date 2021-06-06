const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//SCHEMA ONLY
//reaction id
   //use mongoose's objectId data types
   //default value is set to a new objectId

//reactionBody
   //string
   //required
   //280 character maximum

//username
   //string 
   //required

//createdAt
   //date
   //set defualt value to the current timestamp
   //use a getter method to format the timestamp on query

//schema settings
//this will not be a model, but rather will be used as the reaction fields subdocument schema in the thought model


const ThoughtSchema = new Schema(
   {
      thoughtText: {
         type: String,
         required: true,
         //must be betweeen 1 and 280 characters 
      },
      createdAt: {
         type: date,
         default: Date.now,
         get: createdAtVal = dateFormat(createdAtVal)
      },
      username: { //(the user that created this thought)
         type: string,
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