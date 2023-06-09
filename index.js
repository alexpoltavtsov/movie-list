
const dom = {
    newMovie: document.getElementById('new-movie'),
    addButton: document.getElementById('addbutton'),
    movies: document.getElementById('movies'),
    count: document.getElementById('count')
}
// Массив фильмов
let movies = [];

// Отслеживаем клик по кнопке добавить фильм
dom.addButton.onclick = () => {
    const newMovieText = dom.newMovie.value.trim();
    if(newMovieText && isNotHaveMovie(newMovieText, movies)) {
        addMovie(newMovieText, movies)
        dom.newMovie.value = ''
        moviesRender(movies)
    }

    if (newMovieText === '') {
        alert('Ошибка: введите текст');
    }
}   
// Функция добавления фильма
function addMovie(text, list) {
    const timestamp = Date.now()
    const movie = {
        id: timestamp,
        text,
        isComplete: false
    }
    list.push(movie)
    localStorage.setItem('movies', JSON.stringify(list));
}
// Проверка повторения названия фильма в массиве
function isNotHaveMovie (text, list) {
    let isNotHave = true

    list.forEach(movie => {
       if(movie.text === text) {
        alert('Такой фильм уже есть в списке!')
        isNotHave = false
       }
    });
    return isNotHave
}

// Функция вывода фильма
function moviesRender(list) {
    let htmlList = ''

    list.forEach(movie => {
        const cls = movie.isComplete 
        ? 'movie-task movie-task_complete'
        : 'movie-task'
        const checked = movie.isComplete ? 'checked' : ''

    
        const movieHtml = `
        <div id="${movie.id}" class="${cls}">
            <label class="movie-checkbox">
              <input type="checkbox" ${checked}>
              <div class="movie-checkbox-div"></div>
            </label>
            <div class="movie-task-text">
            <p class='movie-title'>${movie.text}</p>
            </div>
            <div class="movie-task-del"></div>
          </div>
        `
        htmlList = htmlList + movieHtml
    });

    dom.movies.innerHTML = htmlList

    renderMoviesCount(list)
}

const storedMovies = localStorage.getItem('movies');
if (storedMovies) {
    movies = JSON.parse(storedMovies);
    moviesRender(movies);
}

// Отслеживаем клик по чекбоксу фильма
dom.movies.onclick = (event) => {
   const target = event.target
   const isCheckboxEl = target.classList.contains('movie-checkbox-div')
   const isDeleteEl = target.classList.contains('movie-task-del')

   if(isCheckboxEl) {
    const movie = target.parentElement.parentElement
    const movieId = movie.getAttribute('id')
    changeMovieStatus(movieId, movies)
    moviesRender(movies)
   }

   if(isDeleteEl) {
    const movie = target.parentElement
    const movieId = movie.getAttribute('id')
    deleteMovie(movieId, movies)
    moviesRender(movies)
   }
}

// Функция изменения статуса фильма
function changeMovieStatus(id, list) {
    list.forEach((movie) => {
        if(movie.id == id) {
            movie.isComplete = !movie.isComplete;
            localStorage.setItem('movies', JSON.stringify(list));
        }
    });
}

// Функция удаления фильма
function deleteMovie(id, list) {
    list.forEach((movie, idx) => {
       if (movie.id == id) {
            list.splice(idx, 1)
            localStorage.setItem('movies', JSON.stringify(list));
       } 
    });
    
}

// Вывод количества фильмов
function renderMoviesCount(list) {
    dom.count.innerHTML = list.length
}






