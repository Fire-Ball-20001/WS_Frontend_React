import { Movie } from '../models/movie';

export interface EditFormProps {
  onSumbit: CallableFunction;
  setMovies: CallableFunction;
  movies: Movie[];
}
