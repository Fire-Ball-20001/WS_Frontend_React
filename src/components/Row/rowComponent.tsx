import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MovieDto } from '../../models/movieDto';

import './rowStyles.scss';

export interface SingleRowElement {
  data: MovieDto;
  onDelete: CallableFunction;
}

export function RowComponent(props: SingleRowElement) {
  const navigate = useNavigate();
  const rate: number[] = new Array(props.data.rate);
  rate.fill(0);
  return (
    <tr className="table__row row-table">
      <td className="row-table__left-ceil lceil-table common-ceil" onClick={() => navigate(`/details/${props.data.id}`)}>
        <p>{props.data.title}</p>
      </td>
      <td className='common-ceil' onClick={() => navigate(`/details/${props.data.id}`)}>
        <section className="row-table__rate-ceil rate-ceil">{rate.map((_, index: number) => <p key={index} className="star-style">&#xf0ab;</p> )}</section>
      </td>
      <td className='common-ceil' onClick={() => navigate(`/details/${props.data.id}`)}>
        <p>{props.data.date}</p>
      </td>
      <td className="row-table__edit-ceil ceil-edit">
        <button
          className="row-table__button-edit button-edit"
          onClick={() => navigate(`edit/${props.data.id}`)}
        >
          Edit
        </button>
      </td>
      <td className="row-table__right-ceil rceil-table">
        <button
          className="row-table__button-delete button-delete"
          onClick={() => props.onDelete(props.data.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
