import { Meteor } from 'meteor/meteor';

import { Template } from 'meteor/templating';

import { Posts, UserImages, Post_Content } from '../api/Post.js';



import { Comments } from '../api/Comment.js';
 

import './post.html';
import './postEditModal.js';
import './comment.js';
import './helpers/open-modal.js';
 
if (Meteor.isClient){
Meteor.subscribe('comments');


 Template.Post_Card_Template.helpers({
  Comments() {
    return Comments.find({post_id: this._id});

  },
    UserImages() {

    var URL = UserImages.findOne({post_Id: this._id});
    console.log(URL);
    return URL;
  },

 });

  Template.Post_Content_Template.helpers({
  Content() {
    return Post_Content.find({post_id: this._id, status_active: 1});  
  },
  
  ownedPost(){
     currentPost = Posts.find({_id: this.post_id});
      var fetch = currentPost.fetch();
      var currentPostId = fetch[0].owner;
 
      return currentPostId === Meteor.userId()
  }
 });

  Template.Post_Card_Template.events({
   'submit #new-comment': function(e) {

      e.preventDefault();

      const commentvalue = e.target.commentvalue.value;
      const post_Id = this._id;
      const email = Meteor.user().emails[0].address;


      Meteor.call('comments.publish_comment', commentvalue, this._id, email);
      e.target.commentvalue.value= '';


    },

    'click #editPostModal': function(e) {

      e.preventDefault();

     
    post = $(e.target).closest('.postedit')
    postId = post.attr('data-id')
    method = 0;
    ModalHelper.openModalFor(postId, method);

    },
    'click #deletePost': function(e) {

      e.preventDefault();

     
    post = $(e.target).closest('.postedit')
    postId = post.attr('data-id')
    method = 1;
    ModalHelper.openModalFor(postId, method);

    },

 });

}


if (Meteor.isServer) {
    Meteor.startup(function () {
        if (Meteor.isServer) {
            Meteor.publish('comments', function() {
                return Comments.find({});
            })
        }
    });
}



