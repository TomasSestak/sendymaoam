/**
 * This file is for global type definitions
 */

import { EditableEmployee, Employee } from '@/store/employees';

export enum Currency {
	CZK = 'CZK',
	EUR = 'EUR',
}

export enum SalaryType {
	HOURLY = 'HOURLY',
	MONTHLY = 'MONTHLY',
}

export interface EmployeeDetail extends Employee {
	data: EditableEmployee;
}

export type ValueOf<T> = T[keyof T];

export enum mangerState {
	ACTIVE = 'ACTIVE',
	TERMINATED = 'TERMINATED',
}

export interface Manager {
	email: string;
	employer: {
		accountNumber: string;
		drawLimit: number;
		id: number;
		name: string;
		shortName: string;
		withdrawalFrequency: number;
	};
	id: number;
	jobPosition: string;
	managerState: mangerState;
	name: string;
	phone: string;
	photo: string;
	surname: string;
}
