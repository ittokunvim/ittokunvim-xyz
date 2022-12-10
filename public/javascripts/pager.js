window.addEventListener('load', function () {
  const myul = document.createElement('ul');
  const pageCount = Math.ceil(totalCount / pageStep);

  const url = new URL(window.location.href);
  const params = url.searchParams;

  // ページャーを表示しない
  if (pageStep >= totalCount)
    return;

  // ページャーを作成
  for (let i=1; i<=pageCount; i++) {
    if (i === 1)
      myul.appendChild(createPageList('Prev'));

    myul.appendChild(createPageList(i.toString()));

    if (i === pageCount)
      myul.appendChild(createPageList('Next'));
  }
  pager.appendChild(myul);

  // リストを作成する。
  function createPageList(text) {
    const myli = document.createElement('li');

    switch (text) {
      case 'Prev':
      case '1':
        (!params.get('page') || params.get('page') === '1')
          ? myli.appendChild(createPageSpan(text))
          : myli.appendChild(createPageLink(text));
        break;
      case 'Next':
        (params.get('page') === pageCount.toString())
          ? myli.appendChild(createPageSpan(text))
          : myli.appendChild(createPageLink(text))
        break;
      default:
        (params.get('page') === text)
          ? myli.appendChild(createPageSpan(text))
          : myli.appendChild(createPageLink(text))
        break;
    }
    return myli;
  }

  // リストのスパンを作成する
  function createPageSpan(text) {
    const myspan = document.createElement('span');

    switch (text) {
      case 'Prev':
        myspan.textContent = text;
        myspan.classList.add('prev')
          break;
      case 'Next':
        myspan.textContent = text;
        myspan.classList.add('next')
        break;
      default:
        myspan.textContent = text;
        if (params.get('page') === text || (!params.get('page') && text === '1')) 
          myspan.classList.add('current');
        break;
    }
     return myspan;
  }

  // リストのリンクを作成する
  function createPageLink(text) {
    const mylink = document.createElement('a');

    switch (text) {
      case 'Prev':
        mylink.textContent = text;
        mylink.href = getPageURL(Number(params.get('page')) - 1);
        mylink.classList.add('prev')
          break;
      case 'Next':
        mylink.textContent = text;
        mylink.href = getPageURL(Number(params.get('page') || 1) + 1);
        mylink.classList.add('next')
        break;
      default:
        mylink.textContent = text;
        mylink.href = getPageURL(text);
        break;
    }
    return mylink;
  }

  // リストのリンクのURLを作成する
  function getPageURL(i) {
    const page = 'page=' + i;

    if (params.toString() === '') 
      return url.pathname + '?' + page;

    if (params.get('page'))
      return url.pathname + url.search.replace(/page=\d*/i, page);
    else
      return url.pathname + url.search + '&' + page;
  }
});
