import { Meteor } from 'meteor/meteor';

import { Template } from 'meteor/templating';

import { Comments, Comments_Content } from '/imports/api/Comment.js';

import './request_edit_comment_template.html';



if (Meteor.isClient){

Meteor.subscribe('comments');

 Template.request_edit_comment_template.helpers({

 });

 Template.request_edit_comment_template.events({
   'click #approve_update_comment': function(e) {
      e.preventDefault();

      var originPost = {};

      currentContent = Comments_Content.find({comment_id: this.comment_id, status_active: 1});
      var fetch = currentContent.fetch();
      var currentCommentId = fetch[0]._id;

      Meteor.call('comments.approve_update', currentCommentId, this._id);

      console.log(currentCommentId);
    },
 });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        if (Meteor.isServer) {
            Meteor.publish('comments', function() {
                return Comments.find({});
            });
        }
    });
}

