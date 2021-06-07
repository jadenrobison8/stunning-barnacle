const router = require('express').Router();

const {
   getAllUsers,
   getUserById,
   createUser,
   updateUser,
   deleteUser,
   createFriend,
   deleteFriend
} = require('../../controllers/user-controller');

//set up get all and post at /api/users
router
   .route('/')
   .get(getAllUsers)
   .post(createUser);

//set up get one, put, and delete
router  
   .route('/:id')
   .get(getUserById)
   .put(updateUser)
   .delete(deleteUser);

// /api/users/:userid/friends/:friendId
router 
   .route('/:userId/friends/:friendId')
   .post(createFriend)
   .delete(deleteFriend)


module.exports = router;