const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
      {
         userName: {
            type: String,
            //unique
            required: true,
            trim: true
         },
         email: {
            type: String,
            required: true,
            //unique
            //must match a vaild email address(look into Mongoose's matching validation)
         },
         thoughts: [
            //array of id values referencing the thought model
            {
               type: Schema.Types.ObjectId,
               ref: 'Thought'
            }
         ],
         friends: [
            //array of id values referencing the user model(self-reference)\
            {
               type: Schema.Types.ObjectId,
               ref: 'User'
            }
         ],
         
      },
      //schema settings
      {
         toJson: {
            virtuals: true,
            getters: true
         },
         id: true
      }
);

//create a virtual called friendCount that retrieves the length of the users friends array field on query
UserSchema.virtual('friendCount').get(function() {
   return this.friends.reduce((total, user) => total + user.friends.length + 1, 0);
});


const User = model('User', UserSchema);

module.exports = User;