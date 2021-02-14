import {FunctionComponent, ReactComponentElement} from 'react';
import {Facebook, Instagram, Twitter} from 'react-feather';


const Socials: FunctionComponent = (): ReactComponentElement<'div'> => {

	return (
		<div className="socials">
			<a href="https://www.instagram.com/photo.sendym" target="_blank">
				<Instagram color={'#fff'}/>
			</a>
			<a href="https://facebook.com/fotosendym" target="_blank">
				<Facebook color={'#fff'}/>
			</a>
			<a href="https://twitter.com/sendymaresova" target="_blank">
				<Twitter color={'#fff'}/>
			</a>
		</div>
	);
};

export default Socials;
