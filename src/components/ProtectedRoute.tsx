// components/ProtectedRoute.tsx
import {type ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { type RootState } from '@/store';

interface Props {
	children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
	const currentUser = useSelector(
		(state: RootState) => state.user.currentUser,
	);

	if (!currentUser) {
		// إذا المستخدم غير مسجل دخول، تحويله للصفحة Login
		return (
			<Navigate
				to='/login'
				replace
			/>
		);
	}

	return <>{children}</>;
};

export default ProtectedRoute;
