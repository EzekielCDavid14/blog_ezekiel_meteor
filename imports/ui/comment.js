import { Meteor } from 'meteor/meteor';

import { Template } from 'meteor/templating';

import { Comments, Comments_Content } from '../api/Comment.js';

import './comment.html';
import './helpers/open-modal.js';
import './commentModal.js';


 Template.Comment_Template.helpers({
  Comments_Content() {
    return Comments_Content.find({comment_id: this._id, status_active: 1});

  },
    ownedComment(){
     currentComment = Comments.find({_id: this.comment_id});
      var fetch = currentComment.fetch();
      var currentCommentId = fetch[0].owner;
      return currentCommentId === Meteor.userId()
  }

 });

  Template.Comment_Template.events({

    'click #editCommentModal': function(e) {

      e.preventDefault();

     
    comment = $(e.target).closest('.commentedit')
    commentId = comment.attr('data-id')
    method = 3;
 
    ModalHelper.openModalFor(commentId, method);

    },
    'click #deleteRequestComment': function(e) {

      e.preventDefault();

     
    comment = $(e.target).closest('.commentedit')
    commentId = comment.attr('data-id')
    method = 4;

    ModalHelper.openModalFor(commentId, method);

    },

 });
 