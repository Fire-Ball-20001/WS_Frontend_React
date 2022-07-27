import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { EditFormData } from '../../interfaces/EditFormData';
import { EditFormProps } from '../../interfaces/EditFormProps';
import { Movie } from '../../models/Movie';

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

  const submit: SubmitHandler<EditFormData> = (data) => {
    data.id=movie.id;
    props.onSumbit(data, props.setData);
    navigate('/');
  };

  return (
    <section>
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <input
            type="text"
            defaultValue={movie.title}
            {...register('title', { required: true })}
          />
          {errors.title && <p>Error Title</p>}
        </div>
        <div>
          <input
            type="number"
            defaultValue={movie.rate}
            {...register('rate', {
              max: 5,
              min: 0,
              required: true,
              valueAsNumber: true,
            })}
          />
          {errors.rate && <p>Error Rate</p>}
        </div>
        <textarea
          defaultValue={movie.comment as string}
          {...register('comment', { maxLength: 200 })}
        ></textarea>
        <div>
          <input
            type="date"
            defaultValue={movie.date}
            {...register('date', { required: true })}
          />
          {errors.date && <p>Error Date</p>}
        </div>
        <button>Submit</button>
      </form>
    </section>
  );
}
