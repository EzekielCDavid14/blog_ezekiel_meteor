import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ChatRooms } from '../imports/api/ChatRoom.js';

import '../imports/startup/accounts-config.js';
import '../imports/ui/body.js';
import '../imports/ui/dashboard.js';
import '../imports/ui/admin/admin.js';
import './main.html';



if (Meteor.isClient) {
Meteor.subscribe("chatrooms");
Meteor.subscribe("onlusers");
Template.body.events({
    'click #logout': function(e){
    
      e.preventDefault();

      Meteor.logout();
      Router.go('/');
     

    }
});

Template.sidebar.helpers({
  'onlusr': function(){
    onlineusers = Meteor.users.find({"status.online":true,_id:{$ne:Meteor.userId()}}); 
    return onlineusers;
  }
});

Template.sidebar.events({
 'click .user':function(){
  Session.set('currentId', this._id);
  var res = ChatRooms.findOne({chatIds:{$all:[this._id, Meteor.userId()]}});
  
  if(res){
    Session.set("roomid",res._id);
     
  }
  else{
    var newRoom = ChatRooms.insert({chatIds:[this._id, Meteor.userId()],messages:[]});
    Session.set('roomid',newRoom);
  }

}
});

Template.messages.helpers({
  'msgs': function(){
    var result=ChatRooms.find({_id:Session.get('roomid')});
    var fetch = result.fetch();
    var messages = fetch[0].messages;
    return messages; 
  },
  'myUsernameMessage': function(name){
    return name === Meteor.user().username; 
  },
});

Template.input_template.events({
    'click #btn-chat': function(e){
      e.preventDefault();
        if(Meteor.user())
        {
            var name = Meteor.user().username;

            var message = document.getElementById('btn-input');

            if(message.value !== ''){
              var de=ChatRooms.update({"_id":Session.get("roomid")},{$push:{messages:{
                name: name,
                text: message.value,
                createdAt: Date.now()
              }}});
              document.getElementById('btn-input').value='';
              message.value='';
            }
        }
        else{
          alert("please login");
        }




    }


});

Template.Register.events({
    'submit #register-form': function(e){
    
      e.preventDefault();

      const email = e.target.emailreg.value;
      const password = e.target.passwordreg.value;
      const username = e.target.username.value;
      const fname = e.target.fname.value;
      const lname = e.target.lname.value;

            var users = {
                email: email,
                username: username,
                password: password,
                firstname: fname,
                lastname: lname,
            }

      Accounts.createUser(users);
      e.target.emailreg.value= '';
      e.target.passwordreg.value= '';
      e.target.fname.value = '';
      e.target.lname.value = '';

       FlowRouter.go('posting')
     

    }


});

Template.Login.events({
    'submit #login-form': function(e){
    
      e.preventDefault();

      const email = e.target.emaillog.value;
      const password = e.target.passwordlog.value;
  
      Meteor.loginWithPassword(email, password);
      e.target.emailreg.value= '';
      e.target.passwordreg.value= '';
      FlowRouter.go('dashboard')
     

    }
});
}



