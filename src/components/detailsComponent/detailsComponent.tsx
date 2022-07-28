import React from 'react';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { DetailsProps } from '../../interfaces/DetailsProps';
import { Movie } from '../../models/movie';

import './detailsStyles.scss';

export function DetailsComponent(props: DetailsProps) {
  const params = useParams();
  const navigate = useNavigate();

  const movie: Movie | undefined = props.movies.find(
    (movie: Movie) => movie.id === params.id
  );

  if (!movie) {
    navigate('/');
    return <></>;
  }
  const rate:number[] = new Array(movie.rate);
  rate.fill(0);

  const formWidthPx = 350;

  const maxProcents = 100;
  const formLeft = (maxProcents - (formWidthPx / window.innerWidth) * maxProcents) / 2;

  return (
    <section
      className="details-wrapper"
    >
      <div
        className="details"
        style={{ width: `${formWidthPx}px`, left: `${formLeft}%` }}
      >
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
          <section className="details__rate details-rate">{rate.map((_, index: number) => <p key={index} className="star-style">&#xf0ab;</p> )}</section>
        </div>
        <div className="details__comment-wrapper details-content-wrapper">
          <p className="details-label">Описание:</p>
          <textarea
            readOnly={true}
            defaultValue={movie.comment as string}
            className="details__comment details-comment"
          />
        </div>
        <div className="details__date-wrapper details-content-wrapper">
          <p className="details-label">Дата:</p>
          <p defaultValue={movie.date} className="details__date details-date">
            {movie.date}
          </p>
        </div>
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
