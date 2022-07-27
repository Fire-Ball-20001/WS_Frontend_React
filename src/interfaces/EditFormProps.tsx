import { Movie } from '../models/Movie';

export interface EditFormProps {
  onSumbit: CallableFunction;
  setData: CallableFunction;
  movies: Movie[];
}
