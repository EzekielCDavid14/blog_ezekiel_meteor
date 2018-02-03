import { Meteor } from 'meteor/meteor';

import { Template } from 'meteor/templating';

import { Posts, Post_Content } from '/imports/api/Post.js';

import './request_delete_post.html';


if (Meteor.isClient){

Meteor.subscribe('posts');
Meteor.subscribe('comments');



 Template.request_delete_template.helpers({
    post_content_delete() {
    console.log("this is delete");
    console.log(this._id);
    return Post_Content.find({post_id: this._id});

  },

 });

 Template.request_delete_template.events({
   'click #approve_delete': function(e) {
      e.preventDefault();

      const requestId = this._id;

      Meteor.call('posts.approve_delete',requestId);

      console.log(requestId);
    },
 });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        if (Meteor.isServer) {
            Meteor.publish('posts', function() {
                return Posts.find({});
            });
        }
    });
}

