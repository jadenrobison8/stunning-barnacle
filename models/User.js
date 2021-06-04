const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//username
   //string
   //unique
   //required
   //trimmed

//email
   //string
   //required
   //unique
   //must match a vaild email address(look into Mongoose's matching validation)

//thoughts
   //array of id values referencing the thought model

//friends
   //array of id values referencing the user model(self-reference)

//schema settings
//create a virtual called friendCount that retrieves the length of the users friends array field on query