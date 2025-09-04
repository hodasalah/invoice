import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/validations/loginSchema';
import { login } from '@/firebaseConfigs/auth';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import Logo from '@/components/shared/logo';

type LoginFormInputs = {
	email: string;
	password: string;
};

const Login = () => {
	const { t } = useTranslation('auth');
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors ,isValid},
	} = useForm<LoginFormInputs>({
		resolver: zodResolver(loginSchema(t)),
		mode: 'onTouched',
	});
	const onSubmit = async (data: LoginFormInputs) => {
		try {
			toast.loading(t('creating_account'));
			await login(data.email, data.password);
			toast.success(t('login_success'));
			navigate('/dashboard');
		} catch (error: unknown) {
			const errorMessage =
				typeof error === 'object' && error !== null && 'message' in error
					? (error as { message?: string }).message
					: undefined;
			toast.error(errorMessage || t('signup_error'));
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900'>
			<div className='flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden max-w-4xl w-full'>
				{/* Left side */}
				<div className='hidden md:block md:w-1/2 p-8 bg-gray-50 dark:bg-gray-900'>
					<Logo/>
					<h2 className='text-xl font-bold mb-2 text-gray-800 dark:text-white'>
						{t('tagline')}
					</h2>
					<p className='text-sm text-gray-600 dark:text-gray-300 mb-4'>
						{t('description')}
					</p>
					<ul className='list-disc pl-5 text-sm text-gray-700 dark:text-gray-400 space-y-1'>
						<li>{t('module_sales')}</li>
						<li>{t('module_inventory')}</li>
						<li>{t('module_pos')}</li>
						<li>{t('module_booking')}</li>
						<li>{t('module_membership')}</li>
						<li>{t('module_chart')}</li>
						<li>{t('module_clients')}</li>
						<li>{t('module_branches')}</li>
						<li>{t('module_hr')}</li>
						<li>{t('module_points')}</li>
					</ul>
				</div>

				{/* Right side */}
				<div className='w-full md:w-1/2 p-8'>
					<h2 className='text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center'>
						{t('login_title')}
					</h2>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='space-y-4'
					>
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
								{t('email')}
							</label>
							<input
								{...register('email')}
								type='email'
								placeholder={t('email_placeholder')}
								className='w-full mt-1 p-2 border rounded-md'
							/>
							{errors.email && (
								<p className='text-red-500 text-sm'>
									{errors.email.message}
								</p>
							)}
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
								{t('password')}
							</label>
							<input
								{...register('password')}
								type='password'
								placeholder={t('password_placeholder')}
								className='w-full mt-1 p-2 border rounded-md'
							/>
							{errors.password && (
								<p className='text-red-500 text-sm'>
									{errors.password.message}
								</p>
							)}
						</div>

						<div className='text-right text-sm text-blue-500 cursor-pointer'>
							{t('forgot_password')}
						</div>

						<button
							type='submit'
							disabled={!isValid}
							className={`w-full ${!isValid ? 'opacity-50 cursor-not-allowed' : ''} bg-green-600 text-white py-2 rounded-md mt-4`}
						>
							{t('login_button')}
						</button>
					</form>

					<p className='mt-4 text-center text-sm text-gray-600 dark:text-gray-300'>
						{t('no_account')}{' '}
						<span
							className='text-blue-500 cursor-pointer'
							onClick={() => navigate('/signup')}
						>
							{t('create_account')}
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
