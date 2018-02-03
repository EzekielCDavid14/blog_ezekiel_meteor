import { Meteor } from 'meteor/meteor';

import { Template } from 'meteor/templating';

import { Posts, Post_Content } from '/imports/api/Post.js';
import { Comments, Comments_Content } from '/imports/api/Comment.js';

import './admin.html';

import './request_update_post.js';

import './request_delete_post.js';

import './request_edit_comment_template.js';

import './request_delete_comment_template.js';


 
if (Meteor.isClient){

Meteor.subscribe('posts');
Meteor.subscribe('comments');



 Template.admin_template.helpers({
  request_edit() {
    
    return Post_Content.find({request_update: 1});

  },
    request_delete() {
    
    return Posts.find({status_req_delete: 1});

  },

    request_edit_comment() {
    
    return Comments_Content.find({request_update: 1});

  },
    request_delete_comment() {
    
    return Comments.find({status_req_delete: 1});

  },
 });

 Template.admin_template.events({

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





