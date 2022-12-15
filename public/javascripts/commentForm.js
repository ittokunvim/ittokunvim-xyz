const commentFormTextarea = document.querySelector('.comment__form textarea');

commentFormTextarea.addEventListener('input', (e) => {
  let lineHeight = getComputedStyle(e.target).lineHeight;
  let lines = e.target.value.concat('\n').match(/\n/g).length + 1;
  e.target.style.height = (pxToEm(parseFloat(lineHeight)) * lines) + 'em';
});

function pxToEm(px) {
  let fontSize = getComputedStyle(document.documentElement).fontSize;
  return px / parseFloat(fontSize);
}
