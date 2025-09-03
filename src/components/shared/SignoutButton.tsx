import { Button } from '@/components/ui/button';
import { logout } from '@/firebaseConfigs/auth';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const SignOutButton = () => {
	const { t, i18n } = useTranslation('auth');
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const onSignOut = async () => {
		// (اختياري) تأكيد قبل الخروج
		const ok = window.confirm(t('logout_confirm'));
		if (!ok) return;
		try {
			setLoading(true);
			await logout();
			toast.success(t('logout_success'));
			document.documentElement.dir =
				i18n.language === 'ar' ? 'rtl' : 'ltr';
			navigate('/login');
		} catch (e: any) {
			toast.error(e?.message || t('logout_error'));
		} finally {
			setLoading(false);
		}
	};

	return (
		<Button
			onClick={onSignOut}
			disabled={loading}
			variant='outline'
		>
			{loading ? '…' : t('logout')}
		</Button>
	);
};

export default SignOutButton;
