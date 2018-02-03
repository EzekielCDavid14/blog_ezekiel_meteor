
import { Meteor } from 'meteor/meteor';

import { Template } from 'meteor/templating';

import { Posts } from '../api/Post.js';

import './postEditModal.html';
 


 Template.PostEditModal_Template.helpers({
  postedit: function() {

     var postId = Session.get('selectedPostId');
     return Posts.find({owner: postId});
     
  }
});

Template.PostEditModal_Template.events({
  'submit #edit-post': function(e) {
    e.preventDefault();

      const title = e.target.title.value;
      const postvalue = e.target.postvalue.value;
      const email = Meteor.user().emails[0].address;
      var postId = Session.get('selectedPostId');

      Meteor.call('posts.request_edit_post', title, postvalue, email,postId);

      Modal.hide('PostEditModal_Template');


  }
});


Template.PostDeleteModal_Template.events({
  'click #delete_yes': function(e) {
    e.preventDefault();

      var postId = Session.get('selectedPostId');

      Meteor.call('posts.request_delete_post', postId);

      Modal.hide('PostDeleteModal_Template');

     
  }
});