import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CreateForm } from './components/createFormComponent/createForm';
import { CreateFormData } from './interfaces/CreateFormData';
import { TableComponent } from './components/Table/tableComponent';
import { v4 as uuidv4 } from 'uuid';
import { Movie } from './models/Movie';
import { EditForm } from './components/editFormComponent/editForm';
import { EditFormData } from './interfaces/EditFormData';

import './styles/globalStyles.scss';
import './styles/fonts.scss';
import './assets/fonts/wingding.ttf';

import firstData from './assets/data/MOVIES.json';
import { DetailsComponent } from './components/detailsComponent/detailsComponent';

function App() {
  const [data, setData] = useState(firstData);
  const [deleteId, setDeleteId] = useState('');
  useEffect(() => {
    setData((oldData) => {
      const deleteFilms = oldData.filter((element) => element.id === deleteId);
      return oldData.filter(
        (movie) => !deleteFilms.find((deleteMovie) => movie === deleteMovie)
      );
    });
  }, [deleteId]);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<TableComponent data={data} deleteData={setDeleteId} />}
        >
          <Route
            path="create"
            element={<CreateForm onSumbit={addMovie} setData={setData} />}
          ></Route>
          <Route
            path="edit/:id"
            element={<EditForm movies={data} onSumbit={editMovie} setData={setData} />}
          ></Route>
          <Route
            path="details/:id"
            element={<DetailsComponent data={data}/>}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function addMovie(data: CreateFormData, setData: CallableFunction) {
  setData((oldData: Movie[]) => {
    const movie: Movie = {
      id: uuidv4(),
      title: data.title,
      rate: data.rate,
      comment: data.comment,
      date: data.date,
    };
    oldData.push(movie);
    return oldData;
  });
}

function editMovie(data: EditFormData, setData: CallableFunction) {
  setData((oldData: Movie[]) => {
    const movie: Movie = {
      id: data.id,
      title: data.title,
      rate: data.rate,
      comment: data.comment,
      date: data.date,
    };
    return oldData.map(element => element.id===movie.id ? movie : element);
  });
}

export default App;
