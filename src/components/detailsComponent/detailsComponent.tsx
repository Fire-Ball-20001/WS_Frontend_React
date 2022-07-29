import React, { useEffect, useState } from 'react';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { getMovie } from '../../actions/actionsMovies';
import { MovieDto } from '../../models/movieDto';

import './detailsStyles.scss';

export function DetailsComponent() {
  const params = useParams();
  const navigate = useNavigate();
  const [isRender, setRender] = useState(false);
  const [movie, setMovie] = useState<MovieDto | null>(null);
  const [rate, setRate] = useState<number[]>([]);

  if (!params.id) {
    navigate('/');
  }


  const formWidthPx = 350;

  const maxProcents = 100;
  const formLeft =
    (maxProcents - (formWidthPx / window.innerWidth) * maxProcents) / 2;

  useEffect(() => {
    getMovie(params.id as string).then((dto) => {
      setMovie(dto);
      setRender(true);
    });
  },[]);

  useEffect(() => {
    if (isRender) {
      if (movie) {
        const newRate = new Array(movie.rate);
        newRate.fill(0);
        setRate(newRate);
      }
    }
  },[isRender]);

  return (
    <section 
      className="details-wrapper"
      onClick={event => closeDetails(event, navigate)}
    >
      <div
        className="details"
        style={{ width: `${formWidthPx}px`, left: `${formLeft}%` }}
        onClick={event => event.stopPropagation()}
      >
        {!movie && !isRender && (
          <div className="details__header-wrapper details-content-wrapper">
            <h1 className="details__header details-header">Loading...</h1>
          </div>
        )}
        {isRender && !movie && (
          <div className="details__header-wrapper details-content-wrapper">
            <h1 className="details__header details-header">Not found</h1>
            <button
              className="details__close-button close-button"
              onClick={event => closeDetails(event, navigate)}
            >
              X
            </button>
          </div>
        )}
        {isRender && movie && (
          <>
            <div className="details__header-wrapper details-content-wrapper">
              <h1 className="details__header details-header">Детали</h1>
              <button
                className="details__close-button close-button"
                onClick={event => closeDetails(event, navigate)}
              >
                X
              </button>
            </div>
            <div className="details__title-wrapper details-content-wrapper">
              <p className="details-label">Наименование:</p>
              <p className="details__title details-title">{movie.title}</p>
            </div>
            <div className="details__rate-wrapper details-content-wrapper">
              <p className="details-label">Оценка:</p>
              <section className="details__rate details-rate">
                {rate.map((_, index: number) => (
                  <p key={index} className="star-style">
                    &#xf0ab;
                  </p>
                ))}
              </section>
            </div>
            <div className="details__comment-wrapper details-content-wrapper">
              <p className="details-label">Описание:</p>
              <textarea
                readOnly
                defaultValue={movie.comment || ''}
                className="details__comment details-comment"
              />
            </div>
            <div className="details__date-wrapper details-content-wrapper">
              <p className="details-label">Дата:</p>
              <p className="details__date details-date">{movie.date}</p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}


function closeDetails(
  event: React.MouseEvent<HTMLElement, globalThis.MouseEvent>,
  navigate: NavigateFunction
) {
  navigate('/');
  event.preventDefault();
}
