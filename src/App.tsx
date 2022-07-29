import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CreateForm } from './components/createFormComponent/createForm';
import { CreateFormData } from './interfaces/createFormData';
import { TableComponent } from './components/Table/tableComponent';
import { v4 as uuidv4 } from 'uuid';
import { Movie } from './models/movie';
import { EditForm } from './components/editFormComponent/editForm';
import { EditFormData } from './interfaces/editFormData';

import './styles/globalStyles.scss';
import './styles/fonts.scss';
import './assets/fonts/wingding.ttf';

import firstData from './assets/data/MOVIES.json';
import { DetailsComponent } from './components/detailsComponent/detailsComponent';

function App() {
  const [movies, setMovies] = useState(firstData);
  const [deleteId, setDeleteId] = useState('');
  useEffect(() => {
    setMovies((oldData) => oldData.filter(movie => movie.id !== deleteId));
  }, [deleteId]);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<TableComponent data={movies} deleteData={setDeleteId} />}
        >
          <Route
            path="create"
            element={<CreateForm onSumbit={addMovie} setMovies={setMovies} />}
          />
          <Route
            path="edit/:id"
            element={<EditForm movies={movies} onSumbit={editMovie} setMovies={setMovies} />}
          />
          <Route
            path="details/:id"
            element={<DetailsComponent movies={movies}/>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function addMovie(movies: CreateFormData, setMovies: CallableFunction) {
  setMovies((oldData: Movie[]) => {
    const movie: Movie = {
      id: uuidv4(),
      title: movies.title,
      rate: movies.rate,
      comment: movies.comment,
      date: movies.date,
    };
    oldData.push(movie);
    return oldData;
  });
}

function editMovie(movies: EditFormData, setMovies: CallableFunction) {
  setMovies((oldData: Movie[]) => {
    const movie: Movie = {
      id: movies.id,
      title: movies.title,
      rate: movies.rate,
      comment: movies.comment,
      date: movies.date,
    };
    return oldData.map(element => element.id===movie.id ? movie : element);
  });
}

export default App;
