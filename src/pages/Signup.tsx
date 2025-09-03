import AuthLoader from '@/components/shared/AuthLoader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { signup } from '../firebaseConfigs/auth';

type SignupFormInputs = {
	email: string;
	password: string;
	confirmPassword: string;
};

const Signup = () => {
	const { t } = useTranslation('auth'); // نحدد namespace "auth"
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignupFormInputs>();
	const navigate = useNavigate();
	const [status, setStatus] = useState<'loading' | 'success' | null>(null);

	const onSubmit = async (data: SignupFormInputs) => {
		if (data.password !== data.confirmPassword) {
			toast.error(t('password_mismatch'));
			return;
		}
		try {
			setStatus('loading'); // تشغيل اللودر

			await signup(data.email, data.password);
			toast.success(t('signup_success'));
			navigate('/dashboard');
		} catch (err: any) {
			toast.error(err.message || t('signup_error'));
		} finally {
			setStatus(null);
		}
	};

	return (
		<div className='flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900'>
			{/* OVERLAY LOADER */}
			{status && <AuthLoader status={status} />}
			<div className='flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden max-w-4xl w-full'>
				{/* صورة جانبية */}
				<div className='hidden md:block md:w-1/2'>
					<img
						src='/assets/signup.jpg'
						alt='Signup Illustration'
						className='h-full w-full object-cover'
					/>
				</div>

				{/* فورم التسجيل */}
				<div className='w-full md:w-1/2 p-8'>
					<h2 className='text-2xl font-bold mb-6 text-gray-800 dark:text-white'>
						{t('signup_title')}
					</h2>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='space-y-4'
					>
						<div>
							<Label>{t('email')}</Label>
							<Input
								{...register('email', {
									required: t('email_required'),
								})}
								type='email'
								placeholder={t('email_placeholder')}
							/>
							{errors.email && (
								<p className='text-red-500 text-sm'>
									{errors.email.message}
								</p>
							)}
						</div>

						<div>
							<Label>{t('password')}</Label>
							<Input
								{...register('password', {
									required: t('password_required'),
									minLength: {
										value: 6,
										message: t('password_min'),
									},
								})}
								type='password'
								placeholder={t('password_placeholder')}
							/>
							{errors.password && (
								<p className='text-red-500 text-sm'>
									{errors.password.message}
								</p>
							)}
						</div>

						<div>
							<Label>{t('confirm_password')}</Label>
							<Input
								{...register('confirmPassword', {
									required: t('confirm_password_required'),
								})}
								type='password'
								placeholder={t('confirm_password_placeholder')}
							/>
							{errors.confirmPassword && (
								<p className='text-red-500 text-sm'>
									{errors.confirmPassword.message}
								</p>
							)}
						</div>

						<Button
							type='submit'
							className='w-full mt-4'
						>
							{t('submit')}
						</Button>
					</form>

					<p className='mt-4 text-gray-600 dark:text-gray-300'>
						{t('already_have_account')}{' '}
						<span
							className='text-blue-500 cursor-pointer'
							onClick={() => navigate('/login')}
						>
							{t('login')}
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Signup;
