import { Meteor } from 'meteor/meteor';

import { Template } from 'meteor/templating';

import { Comments, Comments_Content } from '/imports/api/Comment.js';

import './request_delete_comment_template.html';


if (Meteor.isClient){

Meteor.subscribe('comments');



 Template.request_delete_comment_template.helpers({
  comment_content_delete() {
    console.log("this is delete");
    console.log(this._id);
    return Comments_Content.find({comment_id: this._id, status_active: 1});

  },

 });

 Template.request_delete_comment_template.events({
   'click #approve_delete_comment': function(e) {
      e.preventDefault();

      const requestId = this._id;

      Meteor.call('comments.approve_delete',requestId);

      console.log(requestId);
    },
 });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        if (Meteor.isServer) {
            Meteor.publish('posts', function() {
                return Comments_Content.find({});
            });
        }
    });
}

