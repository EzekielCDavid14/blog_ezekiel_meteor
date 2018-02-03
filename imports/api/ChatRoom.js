import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const ChatRooms = new Mongo.Collection('chatrooms');

ChatRooms.allow({
    insert: function(userId, doc){
        return true;
    },
    update: function(userId,doc,fieldNames, modifier){
        return true;
    },

    remove: function(userId,doc){
        return false;
    },

});