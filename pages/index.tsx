import useTranslation from 'next-translate/useTranslation';
import Typo from '@/components/core/Typo';
import Icon from '@/components/core/Icon';
import {FunctionComponent, ReactComponentElement, ReactElement, useState} from 'react';
import { Translate } from 'next-translate';
import Button from '@/components/core/Button';
import Link from 'next/link';
import {NextRouter, useRouter} from 'next/router';
import AuthorizationBox from '@/components/authorization/AuthorizationBox';
import Login from '@/components/authorization/Login';
import Activation from '@/components/authorization/Activation';
import ForgottenPassword from '@/components/authorization/ForgottenPassword';
import NextImage from 'next/image';

const Index: FunctionComponent = (): ReactElement<'div'> => {

	const router: NextRouter = useRouter();


	return (
		<div className="index">

		</div>
	);
};

export default Index;
