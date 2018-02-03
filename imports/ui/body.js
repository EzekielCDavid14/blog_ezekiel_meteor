import { Meteor } from 'meteor/meteor';

import { Template } from 'meteor/templating';

import { Posts,Post_Images } from '../api/Post.js';
 
import './body.html';
import './post.js';
 

if (Meteor.isClient){

Meteor.subscribe('posts');
Meteor.subscribe('comments');



 Template.posting_template.helpers({
  Posts() {
    
    return Posts.find({owner: Meteor.userId()}, { sort: { createdAt: -1 } });

  },
 });

 Template.posting_template.events({
   'submit #new-post': function(e) {
      e.preventDefault();

      const title = e.target.title.value;
      const postvalue = e.target.postvalue.value;
      const email = Meteor.user().emails[0].address;


      var file = $(".postingImage").get(0).files[0];

      if(file)
      {
                fsFile = new FS.File(file); 
                  console.log(fsFile);
                  Post_Images.insert(
                    fsFile,function(err, result)
                    {
                       if(err){
                       throw new Meteor.Error(err);
                       }
                       else{
                                console.log("afterposting");
                    
                        Meteor.call('posts.publish_post_image', title, postvalue, email, result._id);   
                       }
                    });
       
      }
      else
      {
        Meteor.call('posts.publish_post', title, postvalue, email);
      }

      e.target.title.value= '';
      e.target.postvalue.value= '';
    },
 });
}



if (Meteor.isServer) {
    Meteor.startup(function () {
        if (Meteor.isServer) {
            Meteor.publish('posts', function() {
                return Posts.find({});
            });
              Meteor.publish('comments', function() {
                return Comments.find({});
            });
        }
    });
}




