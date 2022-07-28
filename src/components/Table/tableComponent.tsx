import React, { useState } from 'react';
import { RowComponent} from '../Row/rowComponent';
import { getDataIsPage, getPages } from './pageManager';
import { PageComponent } from '../pageComponent/PageComponent';
import { Movie } from '../../models/Movie';
import { Outlet, useNavigate } from 'react-router-dom';

import './tableStyles.scss';
export interface Data {
  data: Movie[],
  deleteData: CallableFunction
}

export function TableComponent(props: Data) {
  const countsElementsInPage = 20;
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  return (
    <div className='table-wrapper twrapper'>
        <button className='twrapper__create-button create-button' onClick={() => navigate('create')}>+</button>
      <table className='twraper__table table' rules={'rows'}>
        <tbody className='table__body tbody'>
          {Array.from(getDataIsPage(props.data, page, countsElementsInPage)).map(
            (element: Movie, index: number) => (
              <RowComponent
                key={index}
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


