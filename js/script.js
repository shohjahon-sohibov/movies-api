const elLoader  = $_('.loader')
const elFilmsList = $_('.js-films-list');
const elSearchForm = $_('.js-search-form');
const elSearchInput = $_('.js-search-form__input');
const elPrev = $_('.prev');
const elNext = $_('.next');


let page = 18;

elLoader.style.display = 'none'

// ==============================================

elSearchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  elLoader.style.display = 'block'
  const inputValue = elSearchInput.value.trim()
  getData(page, inputValue)
})

elSearchInput.focus()

function getData(page, value) {
  fetch(`https://www.omdbapi.com/?s=&apikey=3855c4ee&s=${value}&page=${page}`)
.then((response) => response.json())
.then((data) => {
  console.log(data.totalResults);
  
  if (page <= 1) {
    elPrev.disabled = true
  }
  if (page > 1) {
    elPrev.disabled = false
  }
  if (page == Math.ceil(data.totalResults / 10)) {
    elNext.disabled = true
  }
  if (page < Math.ceil(data.totalResults / 10)) {
    elNext.disabled = false
  } 
  if (Math.ceil(data.totalResults / 10) < 2) {
    elPrev.disabled = true
    elNext.disabled = true
  }

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

// =============  prev button function=====
function prevPage() {
  page = page - 1;

  elFilmsList.innerHTML = "";
  elLoader.style.display = "block";
  const inputValue = elSearchInput.value.trim()
  getData(page, inputValue);
};  
elPrev.addEventListener("click", prevPage)

// =============  next button function=====

function nextPage() {
  page = page + 1;

  elFilmsList.innerHTML = "";
  elLoader.style.display = "block";
  const inputValue = elSearchInput.value.trim()
  getData(page, inputValue);
};
elNext.addEventListener("click", nextPage);

