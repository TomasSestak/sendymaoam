import Input from '@/components/core/Input';
import CreateWrapper from '@/components/modal/CreateWrapper';
import { SubmitHandler, useForm } from 'react-hook-form';
import { axiosInstance } from '@/components/layout/Layout';
import { Employer, EmployerWithoutId } from '@/store/employers';
import Overlay from '@/components/modal/Overlay';
import { FunctionComponent } from 'react';
import md5 from 'blueimp-md5';
import { AppDispatch } from '@/pages/_app';
import { useDispatch } from 'react-redux';
import { setMessageModal } from '@/store/modal';
import FileInput from '@/components/parts/FileInput';
import { toBase64 } from '@/helpers/toBase64';
import { Detail } from '@/pages/employers';

interface FormData {
	email: string;
	jobPosition: string;
	name: string;
	password: string;
	phone: string;
	surname: string;
	file: File;
}

interface Props {
	hide: () => void;
	employerId: number;
	detail: Detail;
}

const ManagerModal: FunctionComponent<Props> = ({ hide, employerId }) => {
	const dispatch: AppDispatch = useDispatch();
	const { register, errors, handleSubmit, setError } = useForm<FormData>();

	const onSubmit: SubmitHandler<FormData> = async ({
		email,
		jobPosition,
		name,
		password,
		surname,
		file,
	}): Promise<void> => {
		password = md5(password);

		const photo: string = file[0] ? await toBase64(file[0]) : '';

		console.log(photo);

		try {
			const res = await axiosInstance.post('/auth/register-manager', {
				email,
				employerId,
				jobPosition,
				name,
				photo,
				password,
				surname,
			});
			console.log(res);
			await dispatch(
				setMessageModal({
					show: true,
					text: `HR manažer ${name} byl úspěšně vytvořen`,
					type: 'success',
				})
			);
			await hide();
		} catch (error) {
			if (error.response.data.code === 409) {
				setError('email', { type: 'manual', message: 'Tento e-mail už v databázi existuje' });
			} else {
				await dispatch(setMessageModal({ show: true, text: `Vyskytla se neznámá chyba`, type: 'error' }));
			}
			console.log('manager creation error');
		}
	};

	return (
		<Overlay>
			<div className="manager-modal">
				<CreateWrapper label={'Vytvoření HR manažera'} onSubmit={handleSubmit(onSubmit)} hide={hide}>
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
					<Input
						label={'Pozice'}
						register={register({ required: 'Toto pole je povinné' })}
						name={'jobPosition'}
						error={errors['jobPosition']}
					/>
					<Input
						label={'Telefon'}
						register={register({ required: 'Toto pole je povinné' })}
						name={'phone'}
						error={errors['phone']}
					/>
					<Input
						label={'heslo'}
						register={register({ required: 'Toto pole je povinné' })}
						name={'password'}
						error={errors['password']}
					/>

					<FileInput register={register} label={'Foto'} />
				</CreateWrapper>
			</div>
		</Overlay>
	);
};

export default ManagerModal;
