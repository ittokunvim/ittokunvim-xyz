const postFormContainer = document.querySelector('.post__form');
const postForm = document.querySelector('.post__form form');
const postFormTextArea = document.querySelector('.post__form form textarea');

const easyMDE = new EasyMDE({ element: postFormTextArea });

// // プレビューの設置
// const markdownPreview = document.createElement('div');
// markdownPreview.id = 'markdown__preview';
// postFormContainer.appendChild(markdownPreview);

// // テキストが入力されたらプレビューに逐次反映
// postFormTextArea.addEventListener('input', function () {
//   markdownPreview.innerHTML = marked.parse(this.value);
// });
