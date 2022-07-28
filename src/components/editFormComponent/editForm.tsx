import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { EditFormData } from '../../interfaces/editFormData';
import { EditFormProps } from '../../interfaces/editFormProps';
import { Movie } from '../../models/movie';

import '../../styles/forms.scss';

export function EditForm(props: EditFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditFormData>();
  const navigate = useNavigate();
  const params = useParams();

  const movie: Movie | undefined = props.movies.find(
    (element) => element.id === params.id
  );

  if (!movie) {
    navigate(-1);
    return <></>;
  }

  const formWidthPx = 350;

  const formLeft = (100 - (formWidthPx / window.innerWidth) * 100) / 2;

  const submit: SubmitHandler<EditFormData> = (data) => {
    data.id=movie.id;
    props.onSumbit(data, props.setMovies);
    navigate('/');
  };

  return (
    <section 
      className="form-wrapper"
      onClick={event => closeForm(event, navigate)}
    >
      <form
        className="form"
        onClick={event => event.stopPropagation()}
        style={{ width: `${formWidthPx}px`, left: `${formLeft}%` }}
        onSubmit={handleSubmit(submit)}
      >
        <div className="form__header-wrapper fheader-wrapper">
          <h1 className="form__header form-header">Изменить фильм</h1>
          <button
            className="form__close-button close-button"
            onClick={event => closeForm(event, navigate)}
          >
            X
          </button>
        </div>
        <div className="form__title-wrapper ftitle-wrapper">
          <label htmlFor='form-title' className="form-label">Наименование</label>
          <input
            id="form-title"
            defaultValue={movie.title}
            className={`form__title ftitle ${
              (errors.title && 'input-error') || (!errors.title && '')
            }`}
            type="text"
            {...register('title', { required: true })}
          />
        </div>
        <div className="form__rate-wrapper frate-wrapper">
          <label htmlFor='form-rate' className="form-label">Оценка</label>
          <input
          defaultValue={movie.rate}
          id='form-rate'
            className={`form__rate-wrapper frate ${
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
        <div className="form__comment-wrapper fcomment-wrapper">
          <label htmlFor='form-comment' className="form-label">Описание</label>
          <textarea
          defaultValue={movie.comment as string}
          id='form-comment'
            className={`form__comment fcomment ${
              (errors.comment && 'input-error') || (!errors.comment && '')
            }`}
            {...register('comment', { maxLength: 200 })}
          />
        </div>
        <div className="form__date-wrapper fdate-wrapper">
          <label htmlFor='form-date' className="form-label">Дата</label>
          <input
          defaultValue={movie.date}
          id='form-date'
            className={`form__date fdate ${
              (errors.date && 'input-error') || (!errors.date && '')
            }`}
            type="date"
            {...register('date', { required: true })}
          />
        </div>
        <button className="form__button-submit fbutton-submit">Принять</button>
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
