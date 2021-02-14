import Input from '@/components/core/Input';
import CreateWrapper from '@/components/modal/CreateWrapper';
import { SubmitHandler, useForm } from 'react-hook-form';
import { axiosInstance } from '@/components/layout/Layout';
import Overlay from '@/components/modal/Overlay';
import { FunctionComponent } from 'react';

interface FormData {
	accountNumber: string;
	drawLimit: number;
	name: string;
	shortName: string;
	withdrawalFrequency: number;
}

interface Props {
	hide: () => void;
}

const EmployerModal: FunctionComponent<Props> = ({ hide }) => {
	const { register, errors, handleSubmit } = useForm<FormData>();

	const onSubmit: SubmitHandler<FormData> = async ({
		accountNumber,
		drawLimit,
		name,
		shortName,
		withdrawalFrequency,
	}): Promise<void> => {
		try {
			await axiosInstance.post('/employers', { accountNumber, drawLimit, name, shortName, withdrawalFrequency });
		} catch (error) {
			console.log('employer creation error');
		}
	};

	return (
		<Overlay>
			<div className="employer-modal">
				<CreateWrapper label={'Vytvoření firmy'} onSubmit={handleSubmit(onSubmit)} hide={hide}>
					<Input
						label={'Číslo účtu'}
						register={register({ required: 'Toto pole je povinné' })}
						name={'accountNumber'}
						error={errors['accountNumber']}
					/>
					<Input
						label={'Limit výběru'}
						register={register({ required: 'Toto pole je povinné' })}
						name={'drawLimit'}
						error={errors['drawLimit']}
					/>
					<Input
						label={'Název'}
						register={register({ required: 'Toto pole je povinné' })}
						name={'name'}
						error={errors['name']}
					/>
					<Input
						label={'Zkratka'}
						register={register({ required: 'Toto pole je povinné' })}
						name={'shortname'}
						error={errors['shortname']}
					/>
					<Input
						label={'Frekvence výběrů'}
						register={register({ required: 'Toto pole je povinné' })}
						name={'withdrawalFrequency'}
						error={errors['withdrawalFrequency']}
					/>
				</CreateWrapper>
			</div>
		</Overlay>
	);
};

export default EmployerModal;
