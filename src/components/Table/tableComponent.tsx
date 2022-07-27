import React, { useState } from 'react';
import { RowComponent} from '../Row/rowComponent';
import { getDataIsPage, getPages } from './pageManager';
import { PageComponent } from '../pageComponent/PageComponent';
import { Movie } from '../../models/Movie';
import { Outlet, useNavigate } from 'react-router-dom';
export interface Data {
  data: Movie[],
  deleteData: CallableFunction
}

export function TableComponent(props: Data) {
  const countsElementsInPage = 20;
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  return (
    <div>
        <button onClick={() => navigate('create')}>+</button>
      <table>
        <tbody>
          {Array.from(getDataIsPage(props.data, page, countsElementsInPage)).map(
            (element) => (
              <RowComponent
                key={element.id}
                data={element}
                onDelete={props.deleteData}
              />
            )
          )}
        </tbody>
      </table>
      <PageComponent
        setPage={setPage}
        thisPage={page+1}
        maxPages={getPages(props.data, countsElementsInPage)}
      />
      <Outlet/>
    </div>
  );
}


