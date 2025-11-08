import { Button } from '@/components/ui/button';
import { logoutUser } from '@/features/user/userSlice';
import { useAppDispatch } from '@/store/hooks';
import { LogOut } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

const SignOutButton = () => {
	const { t, i18n } = useTranslation('auth');
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const onSignOut = () => {
		setLoading(true);
		dispatch(logoutUser());
		setLoading(false);
		navigate('/login');
	};

	return (
		<button
			onClick={onSignOut}
			disabled={loading}
			className='p-4 w-full'
		>
			<span className='flex gap-2 items-center justify-center capitalize text-sm font-medium text-red-600 hover:text-red-800'>
				<LogOut /> {loading ? '…' : t('logout')}
			</span>
		</button>
	);
};

export default SignOutButton;
