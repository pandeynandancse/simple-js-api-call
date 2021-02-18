Load the movies using a fetch instead of an XMLHttpRequest. Listen to the form's submit event and make sure to return false in the HTML, to avoid server-side submission/redirect. I would also store variables in a context data structure. This makes the code much easier to follow.

const context = {
  movies: []
};

const init = () => {
  document.forms['movie-search'].addEventListener('submit', loadMovies);
  loadMovies();
};

const loadMovies = () => {
  fetch("movie.json")
      .then(response => response.json())
      .then(onLoad);
};

const onLoad = (movies) => {
  const query = document.querySelector('#query').value.trim();
  context.movies = query ? movies.filter(({ imdbID }) => imdbID === query) : movies;
  render();
};

const render = () => {
  document.querySelector("#movie-div").innerHTML =
      context.movies.map(renderMovie).join('');
};

const renderMovie = ({ Title, Runtime }) => `
  <div>
    <p> Movie: ${Title}</p>
    <br/>
    <p> Runtime: ${Runtime}</p>
  </div>
`;
