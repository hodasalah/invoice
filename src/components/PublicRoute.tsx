// components/PublicRoute.tsx
import { type RootState } from '@/store';
import { type ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

interface Props {
	children: ReactNode;
}

const PublicRoute = ({ children }: Props) => {
	const currentUser = useSelector(
		(state: RootState) => state.user.currentUser,
	);

	if (currentUser) {
		return (
			<Navigate
				to='/dashboard'
				replace
			/>
		);
	}

	return <>{children}</>;
};

export default PublicRoute;
