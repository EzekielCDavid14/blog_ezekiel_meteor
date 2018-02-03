ModalHelper = {};

ModalHelper.openModalFor = function(postId, method) {
  Session.set('selectedPostId', postId);
  if(method == 0)
  Modal.show('PostEditModal_Template');
  if(method == 1)
 	 Modal.show('PostDeleteModal_Template');
  if(method == 3)
 	 Modal.show('CommentEditModal_Template');
  if(method == 4)
 	 Modal.show('CommentDeleteModal_Template');

}

