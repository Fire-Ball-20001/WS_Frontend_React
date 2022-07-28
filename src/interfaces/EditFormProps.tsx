import { Movie } from '../models/Movie';

export interface EditFormProps {
  onSumbit: CallableFunction;
  setMovies: CallableFunction;
  movies: Movie[];
}
