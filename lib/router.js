FlowRouter.route( '/', {
  action: function() {
    BlazeLayout.render('Login'); 
  },
});

FlowRouter.route( '/login', {
  action: function() {
    BlazeLayout.render( 'Login'); 
  },
});

FlowRouter.route( '/admin', {
  action: function() {
    if(Roles.userIsInRole(Meteor.userId(),'admin'))
    {
      BlazeLayout.render( 'admin_template'); 
    }
  },
});

FlowRouter.route( '/register', {
  action: function() {
    BlazeLayout.render( 'Register'); 
  },
});


FlowRouter.route( '/dashboard', {
  action: function() {
    BlazeLayout.render('dashboard_template'); 
  },
});

FlowRouter.route( '/posting', {
  action: function() {
    BlazeLayout.render('posting_template', { main: 'Post_Card_Template', sub:'Post_Content_Template' }  ); 
  },
});

FlowRouter.route( '/message', {
  action: function() {
    BlazeLayout.render( 'message_template'); 
  },
});