import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Comments = new Mongo.Collection('comments');
export const Comments_Content = new Mongo.Collection('commentContent');


Meteor.methods({
  'comments.publish_comment'(commentvalue, post_Id, email) {
    var comment_id = Comments.insert({
        post_id: post_Id,
        email: email,
        owner: Meteor.userId(),
        status_req_delete: 0,
        createdAt: new Date()
    
    },function(err){
        if(err){
            throw new Meteor.Error(err);
        }
        else{
            Comments_Content.insert({
                comment: commentvalue,
                comment_id:comment_id,
                email: email,
                owner: Meteor.userId(),
                createdAt: new Date(),
                request_update:0,
                status_active:1 
            });
        }
    });
  },

  'comments.request_edit_comments'(comment, email,commentId){
        Comments_Content.insert({
          comment_id:commentId,
          email: email,
          comment: comment,
          owner: Meteor.userId(),
          createdAt: new Date(),
          request_update:1,
          status_active:0 
    
    });
         alert("Edit comment request has been successfully submitted to admin!", "success");

  },

    'comments.request_delete_comments'(commentId){
      Comments.update({_id : commentId},
        {$set:{status_req_delete: 1}});
         alert("Delete request has been successfully submitted to admin!", "success");
  },

   'comments.approve_update'(currentCommentId, requestId)
  {

    Comments_Content.update({_id : currentCommentId},
        {$set:{status_active: 0}}, function(err){
            if(err){
                throw new Meteor.Error(err);
                alert:(err,"message");
            }
            else{
                Comments_Content.update({_id: requestId},
                {$set:{request_update: 0, status_active:1}});
                alert:("Comments Updated Successfully","success");
            }
        });
  },

   'comments.approve_delete'(requestId)
  {

        Comments.remove(requestId);
        alert:("Post Deleted Successfully","success");
  },



});


