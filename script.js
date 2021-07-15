// Creating Elements -
let container = document.createElement('div');
container.setAttribute('class', 'container');
container.setAttribute('id', 'container');
document.body.append(container);

let table = document.createElement("table");
table.setAttribute('class', 'table');
table.setAttribute('id', 'table-info');
container.append(table);

let thead = document.createElement("thead");
thead.setAttribute('class', 'thead');
table.append(thead);

let tr = document.createElement("tr");
tr.setAttribute('class', 'tr');
thead.append(tr);

let th1 = document.createElement("th");
th1.setAttribute('class', 'th1');
th1.innerText = "Id";
tr.append(th1);

let th2 = document.createElement("th");
th2.setAttribute('class', 'th2');
th2.innerText = "Name";
tr.append(th2);

let th3 = document.createElement("th");
th3.setAttribute('class', 'th3');
th3.innerText = "Email";
tr.append(th3);

let tbody = document.createElement('tbody');
tbody.setAttribute('id', 'table-row');
table.append(tbody);

let nav = document.createElement('nav');
nav.setAttribute('class', 'pagination-wrapper');
nav.setAttribute('id', 'pagination-wrapper');
nav.setAttribute('aria-label', 'Page navigation example');
container.append(nav);

let ul = document.createElement('ul');
ul.setAttribute('id', 'pagination');
nav.append(ul);

let li1 = document.createElement('li');
li1.setAttribute('id', 'first');
li1.setAttribute('name', 'first');
ul.append(li1);

let a1 = document.createElement('a');
a1.setAttribute('class', 'page-link');
a1.setAttribute('tabindex', '-1');
a1.setAttribute('href', '#');
a1.setAttribute('onclick', "pageChange('first',pageStart,pageEnd)");
a1.innerText = "First";
li1.append(a1);

let li2 = document.createElement('li');
li2.setAttribute('id', 'prev');
li2.setAttribute('name', 'prev');
ul.append(li2);

let a2 = document.createElement('a');
a2.setAttribute('class', 'page-link');
a2.setAttribute('tabindex', '-1');
a2.setAttribute('href', '#');
a2.setAttribute('onclick', "pageChange('prev',pageStart,pageEnd)");
a2.innerText = "Previous";
li2.append(a2);

let li3 = document.createElement('li');
li3.setAttribute('id', 'page1');
li3.setAttribute('name', 'page1');
ul.append(li3);

let a3 = document.createElement('a');
a3.setAttribute('class', 'page-link');
a3.setAttribute('href', '#');
a3.setAttribute('onclick', "pageChange('page1',pageStart,pageEnd)");
a3.innerText = "1";
li3.append(a3);

let li4 = document.createElement('li');
li4.setAttribute('id', 'page2');
li4.setAttribute('name', 'page2');
ul.append(li4);

let a4 = document.createElement('a');
a4.setAttribute('class', 'page-link');
a4.setAttribute('href', '#');
a4.setAttribute('onclick', "pageChange('page2',pageStart,pageEnd)");
a4.innerText = "2";
li4.append(a4);

let li5 = document.createElement('li');
li5.setAttribute('id', 'page3');
li5.setAttribute('name', 'page3');
ul.append(li5);

let a5 = document.createElement('a');
a5.setAttribute('class', 'page-link');
a5.setAttribute('href', '#');
a5.setAttribute('onclick', "pageChange('page3',pageStart,pageEnd)");
a5.innerText = "3";
li5.append(a5);

let li6 = document.createElement('li');
li6.setAttribute('id', 'next');
li6.setAttribute('name', 'next');
ul.append(li6);

let a6 = document.createElement('a');
a6.setAttribute('class', 'page-link');
a6.setAttribute('href', '#');
a6.setAttribute('onclick', "pageChange('next',pageStart,pageEnd)");
a6.innerText = "Next";
li6.append(a6);

let li7 = document.createElement('li');
li7.setAttribute('id', 'last');
li7.setAttribute('name', 'last');
ul.append(li7);

let a7 = document.createElement('a');
a7.setAttribute('class', 'page-link');
a7.setAttribute('href', '#');
a7.setAttribute('onclick', "pageChange('last',pageStart,pageEnd)");
a7.innerText = "Last";
li7.append(a7);

var row = document.getElementById('table-row');
// creating variables -
let pageStart = 0;
let pageEnd = 10;
let personalInfo = []

// XMLHttpRequest request for fetching JSON data -
const xhr = new XMLHttpRequest();
xhr.open(
  "GET",
  "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json",
  true
);

xhr.onload = function () {
  data = JSON.parse(this.responseText);
  console.log(data);

  personalInfo = data;
  let details = ''
  data.forEach((value, i) => {
    if (i < 10) {
      details += `<tr><td>${value.id}</td>`
      details += `<td>${value.name}</td>`
      details += `<td>${value.email}</td></tr>`
    }
  });
  row.innerHTML = details;
};
xhr.send();

// func for page swap -
function pageChange(id, start, end) {
  var currentItem = document.getElementById(id);
  var first = document.getElementById('first');
  var prev = document.getElementById('prev');
  var page1 = document.getElementById('page1');
  var page2 = document.getElementById('page2');
  var page3 = document.getElementById('page3');
  var next = document.getElementById('next');
  var last = document.getElementById('last');

  // remove class
  page1.classList.remove('active');
  page2.classList.remove('active');
  page3.classList.remove('active');
  first.classList.remove('disabled');
  prev.classList.remove('disabled');
  next.classList.remove('disabled');
  last.classList.remove('disabled');

  console.log(id);
  // switch statement -
  switch (id) {
    case 'first':
      pageStart = 0;
      pageEnd = 10;
      prev.classList.add('disabled');
      break;

    case 'prev':
      if (start !== 0 && end !== 10) {
        pageStart = start - 10;
        pageEnd = end - 10;
      } else {
        first.classList.add('disabled');
        prev.classList.add('disabled');
      }
      break;

    case 'page1':
      pageStart = 0;
      pageEnd = 10;
      currentItem.classList.add('active')
      break;

    case 'page2':
      pageStart = 10;
      pageEnd = 20;
      currentItem.classList.add('active')
      break;

    case 'page3':
      pageStart = 20;
      pageEnd = 30;
      currentItem.classList.add('active')
      break;

    case 'next':
      if (start !== personalInfo.length - 10 && end !== personalInfo.length) {
        pageStart = start + 10;
        pageEnd = end + 10;
      } else {
        next.classList.add('disabled');
        last.classList.add('disabled');
      }
      break;

    case 'last':
      pageStart = personalInfo.length - 10;
      pageEnd = personalInfo.length;
      next.classList.add('disabled');
      break;

    default:
      break;
  }
  const data = personalInfo.slice(pageStart, pageEnd);
  let details = '';
  data.forEach((value, i) => {
    details += `<tr><td>${value.id}</td>`
    details += `<td>${value.name}</td>`
    details += `<td>${value.email}</td></tr>`
  });
  row.innerHTML = details;

}