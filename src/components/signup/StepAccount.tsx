import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const StepAccount = () => {
	const { t } = useTranslation('auth');
	const {
		register,
		trigger,
		watch,
		setError,
		clearErrors,
		formState: { errors },
	} = useFormContext();

	const password = watch('password');
	const confirmPassword = watch('confirmPassword');

	useEffect(() => {
		if (typeof confirmPassword === 'undefined' || confirmPassword === '') {
			if (errors.confirmPassword?.type === 'manual') {
				clearErrors('confirmPassword');
			}
			return;
		}

		if (password !== confirmPassword) {
			setError('confirmPassword', {
				type: 'manual',
				message: t('password_mismatch'),
			});
		} else {
		
			if (errors.confirmPassword?.type === 'manual') {
				clearErrors('confirmPassword');
			}
		}
		
	}, [password, confirmPassword, t]);

	return (
		<div className='space-y-4'>
			<h2 className='text-xl font-bold'>{t('signup_title')}</h2>

			<div className='relative z-0 w-full mb-5 group'>
				<Input
					id='signup_email'
					placeholder=' '
					{...register('email')}
					type='email'
				/>
				<Label htmlFor='signup_email'>{t('email')}</Label>

				{errors.email && (
					<p className='text-red-500 text-sm'>
						{typeof errors.email?.message === 'string'
							? errors.email?.message
							: ''}
					</p>
				)}
			</div>

			<div className='relative z-0 w-full mb-5 group'>
				<Input
					id='signup_password'
					placeholder=' '
					{...register('password')}
					type='password'
				/>
				<Label htmlFor='signup_password'>{t('password')}</Label>
				{errors.password && (
					<p className='text-red-500 text-sm'>
						{typeof errors.password?.message === 'string'
							? errors.password?.message
							: ''}
					</p>
				)}
			</div>

			<div className='relative z-0 w-full mb-5 group'>
				<Input
					id='signup_confirm_password'
					{...register('confirmPassword')}
					type='password'
					placeholder=' '
				/>
				<Label htmlFor='signup_confirm_password'>
					{t('confirm_password')}
				</Label>
				{errors.confirmPassword?.message && (
					<p className='text-red-500 text-sm'>
						{errors.confirmPassword.message}
					</p>
				)}
			</div>
		</div>
	);
};

export default StepAccount;
