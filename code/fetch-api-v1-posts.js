// api.ittoku-tech.comからデータを取得する
async function getPosts() {
  try {
    const res = await fetch('http://0.0.0.0:8000/api/v1/posts');
    const json = await res.json();
    displayPosts(json);
  }
  catch (err) {
    console.error(err);
  }
}

// ブラウザにapi.ittoku-tech.comから撮ってきたデータを表示する
function displayPosts(posts) {
  const mytable = document.createElement('table');
  const mythead = document.createElement('thead');
  const mytheadtr = document.createElement('tr');
  const mytbody = document.createElement('tbody');

  let postKeyArray = Object.keys(posts[0])

  // thead
  postKeyArray.forEach(key => {
    const myth = document.createElement('th');

    myth.textContent = key;
    mytheadtr.appendChild(myth);
  })
  mythead.appendChild(mytheadtr);

  // tbody
  posts.forEach(post => {
    const mytr = document.createElement('tr');

    postKeyArray.forEach(key => {
      const mytd = document.createElement('td');

      mytd.textContent = post[key];
      mytr.appendChild(mytd);
    });
    mytbody.appendChild(mytr);
  });

  mytable.appendChild(mythead);
  mytable.appendChild(mytbody);
  document.body.appendChild(mytable);
}

getPosts();
