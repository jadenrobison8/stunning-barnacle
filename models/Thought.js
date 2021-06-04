//thoughtText
   //string/
   //required
   //must be betweeen 1 and 280 characters 

//createdAt
   //date
   //set default value to the current timestamp
   //use a getter method to format the timestamp on query

//username(the user that created this thought)
   //string
   //required

//reactions(like replies)
   //array of nested documents created within the reactionSchema

//schema settings
//create a virtual called reactionCount that retrieves the length of the thoughts reactions array field on query
