import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { getMovie, updateMovie } from '../../actions/actionsMovies';
import { MovieDto } from '../../models/movieDto';
import { UpdateMovieDto } from '../../models/updateMovieDto';

import '../../styles/forms.scss';

export function EditForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateMovieDto>();
  const navigate = useNavigate();
  const params = useParams();
  const [errorDate, setErrorDate] = useState(false);
  const [isMovieLoaded, setMovieLoaded] = useState(false);
  const [movie, setMovie] = useState<MovieDto | null>(null);

  const formWidthPx = 350;
  const maxProcents = 100;
  const formLeft = (maxProcents - (formWidthPx / window.innerWidth) * maxProcents) / 2;

  const submit: SubmitHandler<UpdateMovieDto> = (data) => {
    if(Date.parse(data.date) > Date.now()) {
      setErrorDate(true);
      return;
    }
    if(params.id) {
      updateMovie(params.id,data);
    }
    navigate('/');
  };

  useEffect(() => {
    if(!params.id) {
      navigate('/');
    }
    getMovie(params.id as string).then(dto => {
      setMovie(dto);
      setMovieLoaded(true);
    });
  },[]);

  return (
    <section
      className="form-wrapper"
      onClick={(event) => closeForm(event, navigate)}
    >
      <form
        className="form"
        onClick={(event) => event.stopPropagation()}
        style={{ width: `${formWidthPx}px`, left: `${formLeft}%` }}
        onSubmit={handleSubmit(submit)}
      >
        {!movie && !isMovieLoaded && (
          <div className="details__header-wrapper details-content-wrapper">
            <h1 className="details__header details-header">Loading...</h1>
          </div>
        )}
        {isMovieLoaded && !movie && (
          <div className="details__header-wrapper details-content-wrapper">
            <h1 className="details__header details-header">Not found</h1>
            <button
              className="details__close-button close-button"
              onClick={event => closeForm(event, navigate)}
            >
              X
            </button>
          </div>
        )}
        {isMovieLoaded && movie && (
          <>
            <div className="form__header-wrapper form-header-wrapper">
              <h1 className="form__header form-header">Изменить фильм</h1>
              <button
                className="form__close-button close-button"
                onClick={event => closeForm(event, navigate)}
              >
                X
              </button>
            </div>
            <div className="form__title-wrapper form-title-wrapper">
              <label htmlFor="form-title" className="form-label">
                Наименование
              </label>
              <input
                id="form-title"
                defaultValue={movie.title}
                className={`form__title form-title ${
                  (errors.title && 'input-error') || (!errors.title && '')
                }`}
                type="text"
                {...register('title', { required: true })}
              />
            </div>
            <div className="form__rate-wrapper form-rate-wrapper">
              <label htmlFor="form-rate" className="form-label">
                Оценка
              </label>
              <input
                defaultValue={movie.rate}
                id="form-rate"
                className={`form__rate-wrapper form-rate ${
                  (errors.rate && 'input-error') || (!errors.rate && '')
                }`}
                type="number"
                {...register('rate', {
                  max: 5,
                  min: 1,
                  required: true,
                  valueAsNumber: true,
                })}
              />
            </div>
            <div className="form__comment-wrapper form-comment-wrapper">
              <label htmlFor="form-comment" className="form-label">
                Описание
              </label>
              <textarea
                defaultValue={movie.comment || ''}
                id="form-comment"
                className={`form__comment form-comment ${
                  (errors.comment && 'input-error') || (!errors.comment && '')
                }`}
                {...register('comment', { maxLength: 200 })}
              />
            </div>
            <div className="form__date-wrapper form-date-wrapper">
              <label htmlFor="form-date" className="form-label">
                Дата
              </label>
              <input
                defaultValue={movie.date}
                id="form-date"
                className={`form__date form-date ${
                  ((errors.date || errorDate) && 'input-error') ||
                  (!errors.date && '')
                }`}
                type="date"
                {...register('date', { required: true })}
              />
            </div>
            <button className="form__button-submit form-button-submit">
              Принять
            </button>
          </>
        )}
      </form>
    </section>
  );
}

function closeForm(
  event: React.MouseEvent<HTMLElement, globalThis.MouseEvent>,
  navigate: NavigateFunction
) {
  navigate('/');
  event.preventDefault();
}
