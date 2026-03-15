import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const StepAccount = () => {
	const { t } = useTranslation('auth');
	const {
		register,
		watch,
		setError,
		clearErrors,
		formState: { errors },
	} = useFormContext();

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
				<Label htmlFor='signup_email'>{t('email')} <span className='text-red-500'>*</span></Label>

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
					type={showPassword ? 'text' : 'password'}
					className="ltr:pr-10 rtl:pl-10"
				/>
				<button
					type="button"
					onClick={() => setShowPassword(!showPassword)}
					className="absolute top-2.5 right-3 rtl:right-auto rtl:left-3 text-gray-400 hover:text-gray-600 focus:outline-none"
				>
					{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
				</button>
				<Label htmlFor='signup_password'>{t('password')} <span className='text-red-500'>*</span></Label>
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
					type={showConfirmPassword ? 'text' : 'password'}
					placeholder=' '
					className="ltr:pr-10 rtl:pl-10"
				/>
				<button
					type="button"
					onClick={() => setShowConfirmPassword(!showConfirmPassword)}
					className="absolute top-2.5 right-3 rtl:right-auto rtl:left-3 text-gray-400 hover:text-gray-600 focus:outline-none"
				>
					{showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
				</button>
				<Label htmlFor='signup_confirm_password'>
					{t('confirm_password')} <span className='text-red-500'>*</span>
				</Label>
				{errors.confirmPassword?.message && (
					<p className='text-red-500 text-sm'>
						{typeof errors.confirmPassword.message === 'string' 
							? errors.confirmPassword.message 
							: ''}
					</p>
				)}
			</div>
		</div>
	);
};

export default StepAccount;
