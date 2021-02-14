import Input from '@/components/core/Input';
import CreateWrapper from '@/components/modal/CreateWrapper';
import { SubmitHandler, useForm } from 'react-hook-form';
import { axiosInstance } from '@/components/layout/Layout';
import Overlay from '@/components/modal/Overlay';
import { FunctionComponent } from 'react';

interface FormData {
	email: string;
	name: string;
	surname: string;
}

interface Props {
	hide: () => void;
	refresh: () => Promise<void>;
}

const Admin: FunctionComponent<Props> = ({ hide, refresh }) => {
	const { register, errors, handleSubmit } = useForm<FormData>();

	const onSubmit: SubmitHandler<FormData> = async ({ email, name, surname }): Promise<void> => {
		try {
			await axiosInstance.post('/auth/register-admin', { email, name, surname });
			refresh();
		} catch (error) {
			console.log('admin creation error');
		}
	};

	return (
		<Overlay>
			<div className="employer-modal">
				<CreateWrapper label={'Vytvoření admina'} onSubmit={handleSubmit(onSubmit)} hide={hide}>
					<Input
						label={'E-mail'}
						register={register({ required: 'Toto pole je povinné' })}
						name={'email'}
						error={errors['email']}
					/>
					<Input
						label={'Jméno'}
						register={register({ required: 'Toto pole je povinné' })}
						name={'name'}
						error={errors['name']}
					/>
					<Input
						label={'Příjmení'}
						register={register({ required: 'Toto pole je povinné' })}
						name={'surname'}
						error={errors['surname']}
					/>
				</CreateWrapper>
			</div>
		</Overlay>
	);
};

export default Admin;
