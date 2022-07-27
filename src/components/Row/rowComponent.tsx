import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../../models/Movie';

export interface SingleRowElement {
    data: Movie,
    onDelete: CallableFunction
}

export function RowComponent(props: SingleRowElement) {
    const navigate = useNavigate();

    return <tr><td>{props.data.title}</td>
    <td>{props.data.rate}</td>
    <td>{props.data.date}</td>
    <td><button onClick={() => navigate(`edit/${props.data.id}`)}>Edit</button></td>
    <td><button onClick={() => props.onDelete(props.data.id)}>Delete</button></td></tr>;
}
