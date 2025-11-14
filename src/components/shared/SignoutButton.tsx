import { logoutUser } from '@/features/user/userSlice';
import { cn } from '@/lib/utils';
import { useAppDispatch } from '@/store/hooks';
import { LogOut } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

interface SignOutButtonProps {
	miniSidebar?: boolean;
}

const SignOutButton = ({ miniSidebar }: SignOutButtonProps) => {
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
			className={cn('flex items-center w-full ', miniSidebar ? 'justify-center' : 'p-4')}
		>
			{miniSidebar ? (
				<div className='w-full'>
				<LogOut />
				</div>
			) : (
				<div className='flex gap-2 items-center justify-center capitalize text-sm font-medium text-primary hover:text-green-800'>
					<LogOut className='w-5 h-5 ' /> {loading ? '…' : t('logout')}
				</div>
			)}
		</button>
	);
};

export default SignOutButton;
