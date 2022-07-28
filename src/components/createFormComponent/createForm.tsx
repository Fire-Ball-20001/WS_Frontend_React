import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { CreateFormData } from '../../interfaces/createFormData';
import { CreateFormProps } from '../../interfaces/createFormProps';

import '../../styles/forms.scss';

export function CreateForm(props: CreateFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>();

  const navigate = useNavigate();

  const formWidthPx = 350;

  const submit: SubmitHandler<CreateFormData> = (data) => {
    props.onSumbit(data, props.setMovies);
    navigate('/');
  };
  const formLeft = (100 - (formWidthPx / window.innerWidth) * 100) / 2;

  return (
    <section
      className="form-wrapper"
      onClick={event => closeForm(event, navigate)}
    >
      <form
        className="form"
        onClick={event => event.preventDefault()}
        style={{ width: `${formWidthPx}px`, left: `${formLeft}%` }}
        onSubmit={handleSubmit(submit)}
      >
        <div className="form__header-wrapper fheader-wrapper">
          <h1 className="form__header form-header">Добавить фильм</h1>
          <button
            className="form__close-button close-button"
            onClick={(event) => closeForm(event, navigate)}
          >
            X
          </button>
        </div>
        <div className="form__title-wrapper ftitle-wrapper">
          <label htmlFor="form-title" className="form-label">
            Наименование
          </label>
          <input
            id="form-title"
            className={`form__title ftitle ${
              (errors.title && 'input-error') || (!errors.title && '')
            }`}
            type="text"
            {...register('title', { required: true })}
          />
        </div>
        <div className="form__rate-wrapper frate-wrapper">
          <label htmlFor="form-rate" className="form-label">
            Оценка
          </label>
          <input
            id="form-rate"
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
          <label htmlFor="form-comment" className="form-label">
            Описание
          </label>
          <textarea
            id="form-comment"
            className={`form__comment fcomment ${
              (errors.comment && 'input-error') || (!errors.comment && '')
            }`}
            {...register('comment', { maxLength: 200 })}
          />
        </div>
        <div className="form__date-wrapper fdate-wrapper">
          <label htmlFor="form-date" className="form-label">
            Дата
          </label>
          <input
            id="form-date"
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
