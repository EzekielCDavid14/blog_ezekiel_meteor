import { Meteor } from 'meteor/meteor';
import '../imports/api/Post.js';
import '../imports/api/Comment.js';
import '../imports/api/ChatRoom.js';
import '/server/publications.js'

Meteor.startup(() => {

	Accounts.onCreateUser(function(options,user)
	{
		if(!user.profile){
			user.profile = {};
		}

		user.profile.firstname = options.firstname;
		user.profile.lastname = options.lastname;

		assignRoles(options, user);
		return user;
	});


	const checkIfFirstUser = () => {
  	const userCount = Meteor.users.find().count();
  	return userCount === 0;
	};

	const assignRoles = (options, user) => {
  	const firstUser = checkIfFirstUser();
  	if (firstUser) {
    	const roles = ['admin'];
    	user.roles = roles;
    	Roles.addUsersToRoles(user._id, roles);
  	} else {
    	const roles = ['user'];
    	user.roles = roles;
    	Roles.addUsersToRoles(user._id, roles);
  	}
  	return user;
	};




});
