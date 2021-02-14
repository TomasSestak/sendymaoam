import {FunctionComponent, useEffect, useState} from 'react';
import {AppDispatch} from '@/pages/_app';
import {useDispatch} from 'react-redux';
import {setMessageModal} from '@/store/modal';
import Typo from '@/components/core/Typo';
import Icon from '@/components/core/Icon';

interface Props {
	readonly text: string;
	readonly type: 'success' | 'error';
}

const Message: FunctionComponent<Props> = ({ text, type }) => {
	const dispatch: AppDispatch = useDispatch();

	const [data, setData] = useState<{text: string, type: 'success' | 'error'}>({text, type});

	useEffect(() => {
		setTimeout(() => {
			dispatch(setMessageModal({show: false}));
		}, 4000)
	}, [])

	return (
		<div className={`message ${data.type ? `message--${data.type}` : ''}`}>
			<div className="message__inner">
				<Icon name={data.type} className={'message__icon'}/>
				<Typo
					variant={'h3'}
					className={'message__text'}
				>
					{data.text}
				</Typo>
			</div>
		</div>
	)
};

export default Message;
