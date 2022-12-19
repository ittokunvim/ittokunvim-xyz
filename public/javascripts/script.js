window.addEventListener('load', displayFooterTools);

function displayFooterTools() {
  const toolsData = [
    {
      href: 'https://github.com/ittoku-ky73',
      icon: 'fa-brands fa-github',
    },
    {
      href: "https://twitter.com/ittoku_ky73",
      icon: "fa-brands fa-twitter"
    },
    {
      href: "https://www.w3schools.com/html/",
      icon: "fa-brands fa-html5",
    },
    {
      href: "https://www.w3schools.com/css/default.asp",
      icon: "fa-brands fa-css3-alt",
    },
    {
      href: "https://javascript.info/",
      icon: "fa-brands fa-js",
    },
    {
      href: "https://nodejs.org/",
      icon: "fa-brands fa-node",
    }
  ];

  const footerTools = document.querySelector('.site__footer__tools');

  const myPara = document.createElement('p');
  const myStorong = document.createElement('strong');
  myStorong.textContent = 'web development tools';
  myPara.appendChild(myStorong);

  const myList = document.createElement('ul');

  toolsData.forEach(tool => {
    const myLink = document.createElement('a');
    const myIcon = document.createElement('i');

    myLink.href = tool.href;
    myIcon.classList = tool.icon;

    myLink.appendChild(myIcon);
    myList.appendChild(myLink);
  });

  footerTools.appendChild(myPara);
  footerTools.appendChild(myList);
}
