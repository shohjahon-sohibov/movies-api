const elLoader  = document.querySelector('.loader')
const elFilmsList = document.querySelector('.js-films-list');

const elPrev = document.querySelector('.prev');
const elNext = document.querySelector('.next');

let page = 1;

// ==============================================

function getData() {
  fetch(`http://www.omdbapi.com/?s=marvel&apikey=3855c4ee&page=${page}`)
.then((response) => response.json())
.then((data) => {
  console.log(data);
  
  elLoader.style.display = 'none'
  working(data.Search)
});
// ============================================
// ================= function ============
// ============================================

  function  working(array) {
    array.forEach((element) => {
      renderFilms(element)
    })
  };
};

// ============================================
// ================= render function ============
// ============================================

function renderFilms (object) {

  const newLi = createElement('li', 'card')
  const ElHeading = createElement('h2', 'title', object.Title)
  const ElYear = createElement('p', 'year', object.Year)
  const ElType = createElement('p', 'type', object.Type)
  const elPosterWrapper = createElement('div', 'poster-wrapper')
  const ElPoster = createElement('img', 'poster')
  ElPoster.src = object.Poster
  ElPoster.alt =  'it the poster(image) of movie'
  
  // ElHeading.textContent = object.Title;

  newLi.appendChild(ElHeading)
  newLi.appendChild(ElYear)
  newLi.appendChild(ElType)
  newLi.appendChild(elPosterWrapper)
  elPosterWrapper.appendChild(ElPoster)
  elFilmsList.appendChild(newLi);
}

// ============================================
// ================= buttons function ============
// ============================================

elNext.addEventListener("click", nextPage);
function nextPage() {
  elFilmsList.innerHTML = "";
  page = page + 1;
  getData(page);
};

getData(page);

elPrev.addEventListener("click", prevPage)
function prevPage() {
  elFilmsList.innerHTML = "";
  page = page - 1;
  getData(page);
};  

getData(page);

// window.history.back();




