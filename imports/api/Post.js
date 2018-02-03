import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Posts = new Mongo.Collection('posts');

export const Post_Content = new Mongo.Collection('postContent');

export const Post_Images = new FS.Collection('Post_Images',{
    stores: [new FS.Store.GridFS("Post_Images")]
});
export const UserImages = new Mongo.Collection('UserImages');

Post_Images.allow({
    insert: function(userId, doc){
        return true;
    },
    update: function(fields, modifier){
        return true;
    },
    download: function(){
      return true;
    }

});

UserImages.allow({
    insert: function(){
        return true;
    },
    update: function(userId, doc, fields, modifier){
        return true;
    },
});


 
Meteor.methods({
  'posts.publish_post'(title, postvalue, email) {
    var post_id = Posts.insert({
       
        email: email,
        owner: Meteor.userId(),
        status_req_delete: 0,
        createdAt: new Date()
    
    },function(err){
        if(err){
            throw new Meteor.Error(err);
        }
        else{
            Post_Content.insert({

                post_id:post_id,
                title: title,
                email: email,
                post_content: postvalue,
                owner: Meteor.userId(),
                createdAt: new Date(),
                request_update:0,
                status_active:1 
            });
        }
    });

  },

'posts.request_edit_post'(title, postvalue, email, post_id){
        Post_Content.insert({
          post_id:post_id,
          title: title,
          email: email,
          post_content: postvalue,
          owner: Meteor.userId(),
          createdAt: new Date(),
          request_update:1,
          status_active:0 
    
    });
         alert("Edit request has been successfully submitted to admin!", "success");

  },

  'posts.request_delete_post'(post_id){
    Posts.update({_id : post_id},
        {$set:{status_req_delete: 1}});
         alert("Delete request has been successfully submitted to admin!", "success");
  },

 'posts.publish_post_image'(title, postvalue, email, imageId)
  {

    var post_id = Posts.insert({
            title: title,
            post_text: postvalue,
            email: email,
            owner: Meteor.userId(),
            status_req_delete: 0,
            createdAt: new Date()
    },function(err){
        if(err){
            throw new Meteor.Error(err);
        }
        else{
            Post_Content.insert({

                post_id:post_id,
                title: title,
                email: email,
                post_content: postvalue,
                owner: Meteor.userId(),
                createdAt: new Date(),
                request_update:0,
                status_active:1 
            },function(err){
                if(err)
                {
                    throw new Meteor.Error(err);
                }
                else
                {   
                        var imageLoc = '/cfs/files/Post_Images/'+imageId;
                        UserImages.insert({
                            post_Id: post_id,
                            email: email,
                            owner: Meteor.userId(),
                            image: imageLoc,
                        });
                }
        });
        }
    });
  },

 'posts.approve_update'(currentPostId, requestId)
  {

    Post_Content.update({_id : currentPostId},
        {$set:{status_active: 0}}, function(err){
            if(err){
                throw new Meteor.Error(err);
                alert:(err,"message");
            }
            else{
                Post_Content.update({_id: requestId},
                {$set:{request_update: 0, status_active:1}});
                alert:("Post Updated Successfully","success");
            }
        });
  },

 'posts.approve_delete'(requestId)
  {

        Posts.remove(requestId);
        alert:("Post Deleted Successfully","success");
  },

 'posts.aggregate_top_posts'()
  {
    var query = [
    {$group:{_id:'$owner', count:{$sum: 1}}},
    {$limit:5},
    {$sort:{count: -1}}
    ];
   var top_contributors = Posts.aggregate(query);
   return top_contributors;
  },

});






