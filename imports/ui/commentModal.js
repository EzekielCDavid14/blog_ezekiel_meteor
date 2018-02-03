import { Meteor } from 'meteor/meteor';

import { Template } from 'meteor/templating';

import { Comment } from '../api/Comment.js';

import './commentModal.html';
 


 Template.CommentEditModal_Template.helpers({
  postedit: function() {

     var postId = Session.get('selectedPostId');
     return Posts.find({owner: postId});
     
  }
});

Template.CommentEditModal_Template.events({
  'submit #edit-comment': function(e) {
    e.preventDefault();


      const comment = e.target.commentvalue.value;
      const email = Meteor.user().emails[0].address;
      var commentId = Session.get('selectedPostId');

      Meteor.call('comments.request_edit_comments', comment, email,commentId);

      Modal.hide('CommentEditModal_Template');


  }
});


Template.CommentDeleteModal_Template.events({
  'click #delete_yes': function(e) {
    e.preventDefault();

      var commentId = Session.get('selectedPostId');

      Meteor.call('comments.request_delete_comments', commentId);

      Modal.hide('CommentDeleteModal_Template');

     
  }
});