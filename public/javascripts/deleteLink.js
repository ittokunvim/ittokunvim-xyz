const postDeleteLink = document.querySelector('form[name=post_delete] a');
const commentDeleteLinks = document.querySelectorAll('form[name^=comment_delete_] a');

postDeleteLink.addEventListener('click', callbackDeleteLink);
commentDeleteLinks.forEach(link => {
  link.addEventListener('click', callbackDeleteLink)
});

function callbackDeleteLink(e) {
  (window.confirm('本当に削除してよろしいですか？'))
    ? 'Delete'
    : e.preventDefault();
}
