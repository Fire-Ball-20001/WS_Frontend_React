import React, { useEffect, useState } from 'react';
import { RowComponent } from '../Row/rowComponent';
import { getPages } from './pageManager';
import { PageComponent } from '../pageComponent/PageComponent';
import { MovieDto } from '../../models/movieDto';
import { Outlet, useNavigate } from 'react-router-dom';

import './tableStyles.scss';
import { getList } from '../../actions/actionsMovies';
import { MovieListDto } from '../../models/movieListDto';
import { CollectionDto } from '../../interfaces/collectionDto';
export interface Data {
  data: MovieDto[];
  deleteData: CallableFunction;
}

export function TableComponent(props: Data) {
  const countsElementsInPage = 20;
  const timeUpdate = 5000;
  const [page, setPage] = useState(0);
  const [onUpdate, setOnUpdate] = useState(true);
  const navigate = useNavigate();
  const [movies, setMovies] = useState<MovieListDto[]>([]);
  const [totalCount, setTotalCount] = useState(0);


  useEffect(() => {
    const interval = setInterval(
      () =>
        setOnUpdate(true),
      timeUpdate
    );
    return () => clearInterval(interval);
  }, []);

  useEffect(()=> {
    setOnUpdate(true);
  },[page]);

  useEffect(() => {
    if(!onUpdate) return;
    updateListMovies(setTotalCount, setMovies, page, countsElementsInPage);
    setOnUpdate(false);
  },[onUpdate]);

  return (
    <div className="table-wrapper twrapper">
      <button
        className="twrapper__create-button create-button"
        onClick={() => navigate('create')}
      >
        +
      </button>
      <table className="twraper__table table" rules={'rows'}>
        <tbody className="table__body tbody">
          {Array.from(movies).map((element: MovieListDto, index: number) => (
            <RowComponent
              key={index}
              data={element}
              onUpdate={setOnUpdate}
            />
          ))}
        </tbody>
      </table>
      <PageComponent
        setPage={setPage}
        thisPage={page + 1}
        maxPages={getPages(totalCount, countsElementsInPage)}
      />
      <Outlet />
    </div>
  );
}

function updateListMovies(
  setTotalCount: CallableFunction,
  setMovies: CallableFunction,
  page: number,
  size: number
) {
  
  getList(page, size).then((movies: CollectionDto<MovieListDto>) => {
    setMovies(movies.items);
    setTotalCount(movies.totalCount);
  });
}
