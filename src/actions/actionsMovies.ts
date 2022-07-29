import axios from 'axios';
import { CollectionDto } from '../interfaces/collectionDto';
import { MovieDto } from '../models/movieDto';
import { MovieListDto } from '../models/movieListDto';
import { CreateMovieDto } from '../models/createMovieDto';

const token = '75b885c6-2126-4291-a797-d975c05827fa';

const instance = axios.create({
  baseURL: 'http://students.dev.thewhite.ru/api/',
  headers: {
    'Authorization': token,
    'Content-Type': 'application/json',
  },
});

export function getList(page: number, size: number) {
  return instance
    .get<CollectionDto<MovieListDto>>('movies/page-my', {
      params: {
        page,
        size,
      },
    })
    .then(res => res.data);
}

export function getMovie(id: string) {
    return instance
      .get<MovieDto>(`movies/${id}`)
      .then(res => res.data)
      .catch(() => null);
  }

  export function deleteMovie(id: string) {
    return instance.post(`movies/${id}/delete`);
  }

  export function createMovie(newMovie: CreateMovieDto) {
    return instance
      .post<MovieDto>('movies/create', newMovie)
      .then(res => res.data);
  }

  export function updateMovie(id: string,newMovie: CreateMovieDto) {
    return instance
      .post<MovieDto>(`movies/${id}/update`, newMovie)
      .then(res => res.data);
  }
