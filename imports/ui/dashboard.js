import { Meteor } from 'meteor/meteor';

import { Template } from 'meteor/templating';

import { Posts } from '../api/Post.js';
import { ReactiveVar } from 'meteor/reactive-var';

import './dashboard.html';
import './post.js';
 
if (Meteor.isClient){

Meteor.subscribe('posts');
Meteor.subscribe('comments');

Template.dashboard_template.onCreated( () => {
  let template = Template.instance();
  template.topContributorsResult = new ReactiveVar();

  template.subscribe( 'posts' );
});



Template.dashboard_template.onRendered( () => {
    let template = Template.instance();
  template.topContributorsResult = new ReactiveVar();

  template.subscribe( 'posts' );
    
  Meteor.call('posts.aggregate_top_posts', function( error, response ){
    if ( error ) {
     alert( error );
    } else {
      template.topContributorsResult.set( response );
    }
  });
});



 Template.dashboard_template.helpers({

  Posts_Dashboard() {
     const Dashboard_Posts = Posts.find({}, { sort: { createdAt: -1 } });
     return Dashboard_Posts;
  },

  Top_Contributors() {
    let resultTC = Template.instance().topContributorsResult.get();

    if ( resultTC ) {

      return resultTC.map( ( item, index ) => {
        return {
          _id: index,
          username_id:item._id,
          count: item.count
        };
      });
    }
  },
 });


  Template.tc_content_template.helpers({

    Tc_Content() {
      var topusers = Meteor.users.find({_id: this.username_id });
      return topusers;
  },
  });

  Template.tc_content_template_date.helpers({

    Tc_Content_Date() {
      var topusers = Meteor.users.find({_id: this.username_id });
      return topusers;
  },
  });

}


if (Meteor.isServer) {

          Meteor.publish('posts', function() {
                return Posts.find({});
            });

             Meteor.methods({
              'aggregate_top_posts'()
                {
                  var query = [
                    {$group:{_id:'$owner', count:{$sum: 1}}},
                    {$limit:5},
                    {$sort:{count: -1}}
                  ];
                  var top_contributors = Posts.aggregate(query);
                },
  });
 

}

