import { Meteor } from 'meteor/meteor';

import { Template } from 'meteor/templating';

import { Posts, Post_Content } from '/imports/api/Post.js';

import './request_update_post.html';



if (Meteor.isClient){

Meteor.subscribe('posts');
Meteor.subscribe('comments');



 Template.request_edit_template.helpers({

 });

 Template.request_edit_template.events({
   'click #approve_update': function(e) {
      e.preventDefault();

      var originPost = {};

      currentContent = Post_Content.find({post_id: this.post_id, status_active: 1});
      var fetch = currentContent.fetch();
      var currentPostId = fetch[0]._id;

      Meteor.call('posts.approve_update', currentPostId, this._id);

      console.log(currentPostId);
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

