import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CreateForm } from './components/createFormComponent/createForm';
import { TableComponent } from './components/table/tableComponent';
import { EditForm } from './components/editFormComponent/editForm';

import './styles/globalStyles.scss';
import './styles/fonts.scss';
import './assets/fonts/wingding.ttf';

import { DetailsComponent } from './components/detailsComponent/detailsComponent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<TableComponent />}
        >
          <Route
            path="create"
            element={<CreateForm/>}
          />
          <Route
            path="edit/:id"
            element={<EditForm/>}
          />
          <Route
            path="details/:id"
            element={<DetailsComponent/>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
