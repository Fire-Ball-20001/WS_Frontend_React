import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CreateFormData } from '../../interfaces/CreateFormData';
import { CreateFormProps } from '../../interfaces/CreateFormProps';

export function CreateForm(props: CreateFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>();

  const navigate = useNavigate();

  const submit: SubmitHandler<CreateFormData> = (data) => {
    props.onSumbit(data, props.setData);
    navigate('/');
  };

  return (
    <section>
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <input type="text" {...register('title', { required: true })} />
          {errors.title && <p>Error Title</p>}
        </div>
        <div>
          <input
            type="number"
            {...register('rate', {
              max: 5,
              min: 0,
              required: true,
              valueAsNumber: true,
            })}
          />
          {errors.rate && <p>Error Rate</p>}
        </div>
        <textarea {...register('comment', { maxLength: 200 })}></textarea>
        <div>
          <input
            type="date"
            {...register('date', { required: true})}
          />
          {errors.date && <p>Error Date</p>}
        </div>
        <button>Submit</button>
      </form>
    </section>
  );
}
