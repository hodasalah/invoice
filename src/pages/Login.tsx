import WhiteLogo from '@/components/shared/logo/WhiteLogo';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginUser } from '@/features/user/userSlice';
import { login } from '@/firebaseConfigs/auth';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginSchema } from '@/validations/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { TagsIcon } from 'lucide-react';
import { use } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

type LoginFormInputs = {
	email: string;
	password: string;
};

const Login = () => {
	const { t } = useTranslation('auth');
	const dispatch = useAppDispatch();
	const { currentUser, loading, error } = useAppSelector(
		(state) => state.user,
	);

	const list = [
		t('module_sales'),
		t('module_inventory'),
		t('module_pos'),
		t('module_booking'),
		t('module_membership'),
		t('module_chart'),
		t('module_clients'),
		t('module_branches'),
		t('module_hr'),
		t('module_points'),
	];
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<LoginFormInputs>({
		resolver: zodResolver(loginSchema(t)),
		mode: 'onTouched',
	});

const onSubmit = async (data: LoginFormInputs) => {
	try {
		const userData = await login(data.email, data.password);
    dispatch(loginUser({ email: data.email, password: data.password }));
		toast.success(t('login_success'));

		// Cast userData to a type that may include an optional role, or use a safe assertion
		const role = (userData as { role?: string } & Record<string, any>)?.role;
		if (role === 'admin') {
			navigate('/dashboard');
		} else {
			navigate('/dashboard/user');
		}
	} catch (error: unknown) {
		const errorMessage =
			typeof error === 'object' && error !== null && 'message' in error
				? (error as { message?: string }).message
				: undefined;
		toast.error(errorMessage || t('signup_error'));
	}
};

	return (
		<div className='bg-[url("/assets/login-bg.jpg")] bg-center bg-cover h-screen md:p-[100px] p-[50px]'>
			{/* login-wrapper */}
			{loading && (<h1>loading...</h1>)}
			<div className='flex flex-col md:flex-row bg-white  overflow-hidden max-w-6xl  mx-auto'>
				{/* Left side */}
				<div className='hidden md:block  p-[50px] l-bg-gradient bg-bottom max-w-[60%] flex-grow-0 flex-shrink-0 basis-[60%] '>
					<WhiteLogo />
					<h2 className='text-5xl font-bold my-10 text-[#1b2b00]'>
						{t('tagline')}
					</h2>
					<p className='text-md text-[#1b2b00] mb-4 max-w-md'>
						{t('description')}
					</p>
					<ul className='list pl-5 text-xl text-[#1b2b00] space-y-1 p-8 flex flex-wrap font-bold'>
						{list.map((item, index) => (
							<li
								key={index}
								className='flex items-center w-1/2 mb-2'
							>
								<TagsIcon className='w-4 h-4 text-[#1b2b00]' />
								<span className='ml-2'>{item}</span>
							</li>
						))}
					</ul>
				</div>

				{/* Right side */}
				<div className='p-12 w-full h-full flex flex-col justify-center items-center '>
					<div className='flex flex-col h-full'>
						<div className='mb-6'>
							<h2 className='text-3xl font-semibold mb-3 text-gray-800 dark:text-white'>
								{t('login_title')}
							</h2>
							<p className='text-gray-600 text-sm'>
								{t('login_description')}
							</p>
						</div>

						<form
							onSubmit={handleSubmit(onSubmit)}
							className='my-auto'
						>
							<div className=''>
								<div className='relative z-0 w-full mb-5 group'>
									<Input
										type='email'
										{...register('email')}
										id='floating_email'
										placeholder=' '
										required
										className='py-4'
									/>
									<Label htmlFor='floating_email' >
										{t('email')}
									</Label>
									{errors.email && (
										<p className='text-red-500 text-sm'>
											{errors.email.message}
										</p>
									)}
								</div>

								<div className='relative z-0 w-full mb-5 group'>
									<Input
										id='floating_password'
										{...register('password')}
										type='password'
										placeholder=' '
										required
										className='py-4'
									/>
									<Label htmlFor='floating_password'>
										{t('password')}
									</Label>
									{errors.password && (
										<p className='text-red-500 text-sm'>
											{errors.password.message}
										</p>
									)}
								</div>
							</div>

							<div className='text-right text-sm text-blue-500 cursor-pointer'>
								{t('forgot_password')}
							</div>

							<button
								type='submit'
								disabled={!isValid}
								className={`w-full ${
									!isValid
										? 'opacity-50 cursor-not-allowed'
										: ''
								} bg-green-600 text-white py-2 rounded-md mt-4`}
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
		</div>
	);
};

export default Login;
