import { useForm } from 'react-hook-form';
import Button from '@/components/core/Button';
import Input from '@/components/core/Input';
import { FunctionComponent, ReactComponentElement } from 'react';

interface FormData {
	name: string;
	password: string;
}

const Form: FunctionComponent = (): ReactComponentElement<'form'> => {
	const { register, errors, handleSubmit } = useForm<FormData>();

	const onSubmit = (data: FormData) => {
		console.log(data);
	};

	return (
		<form className="form" onSubmit={handleSubmit(onSubmit)}>
			<Input name={'name'} label={'Jméno'} register={register} error={errors['name']} />
			<Input name={'password'} label={'Heslo'} register={register} error={errors['password']} />
			<Button type={'submit'} variant={'primary'}>
				Odeslat
			</Button>
		</form>
	);
};

export default Form;
