import { MovieDto } from '../models/movieDto';

export interface EditFormProps {
  onSumbit: CallableFunction;
  setMovies: CallableFunction;
  movies: MovieDto[];
}
