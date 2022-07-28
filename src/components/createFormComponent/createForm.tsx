import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { CreateFormData } from '../../interfaces/createFormData';
import { CreateFormProps } from '../../interfaces/CreateFormProps';

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
  const maxProcents = 100;
  const formLeft = (maxProcents - (formWidthPx / window.innerWidth) * maxProcents) / 2;

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
        <div className="form__header-wrapper form-header-wrapper">
          <h1 className="form__header form-header">Добавить фильм</h1>
          <button
            className="form__close-button close-button"
            onClick={(event) => closeForm(event, navigate)}
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
            id="form-date"
            className={`form__date form-date ${
              (errors.date && 'input-error') || (!errors.date && '')
            }`}
            type="date"
            {...register('date', { required: true })}
          />
        </div>
        <button className="form__button-submit form-button-submit">Принять</button>
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
