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