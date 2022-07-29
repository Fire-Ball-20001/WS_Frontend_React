import { useEffect, useState } from 'react';
import { RowComponent } from '../rowComponent/rowComponent';
import { getPages } from './pageManager';
import { PageComponent } from '../pageComponent/PageComponent';
import { Outlet, useNavigate } from 'react-router-dom';

import './tableStyles.scss';
import { getList } from '../../actions/actionsMovies';
import { MovieListDto } from '../../models/movieListDto';
import { CollectionDto } from '../../interfaces/collectionDto';

export function TableComponent() {
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
    <div className="table__wrapper table-wrapper">
      <section className='table-wrapper__button-section button-section'>
        <button
          title='Create Movie'
          className="table-wrapper__create-button create-button"
          onClick={() => navigate('create')}
        >
          +
        </button>
        <button
          title='Update'
          onClick={() => setOnUpdate(true)}
          className="table-wrapper__update-button update-button"
        >
          Update
        </button>
      </section>
      <table className="table-wraper__table table" rules={'rows'}>
        <tbody className="table__body table-body">
          {movies.map((element: MovieListDto, index: number) => (
            <RowComponent key={index} data={element} onUpdate={setOnUpdate} />
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
