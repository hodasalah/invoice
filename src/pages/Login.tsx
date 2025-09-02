// src/pages/Login.tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/firebaseConfigs/auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

type LoginFormInputs = {
	email: string;
	password: string;
};

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormInputs>();
	const navigate = useNavigate();

	const onSubmit = async (data: LoginFormInputs) => {
		try {
			await login(data.email, data.password);
			toast.success('تم تسجيل الدخول بنجاح');
			navigate('/dashboard'); // توجه للداشبورد بعد الدخول
		} catch (err: any) {
			toast.error(err.message);
		}
	};

	return (
		<div className='flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900'>
			<div className='flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden max-w-4xl w-full'>
				{/* صورة جانبية */}
				<div className='hidden md:block md:w-1/2'>
					<img
						src='/assets/login.jpg'
						alt='Login Illustration'
						className='h-full w-full object-cover'
					/>
				</div>

				{/* فورم تسجيل الدخول */}
				<div className='w-full md:w-1/2 p-8'>
					<h2 className='text-2xl font-bold mb-6 text-gray-800 dark:text-white'>
						تسجيل الدخول
					</h2>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='space-y-4'
					>
						<div>
							<Label>Email</Label>
							<Input
								{...register('email', {
									required: 'Email مطلوب',
								})}
								type='email'
								placeholder='email@example.com'
							/>
							{errors.email && (
								<p className='text-red-500 text-sm'>
									{errors.email.message}
								</p>
							)}
						</div>

						<div>
							<Label>Password</Label>
							<Input
								{...register('password', {
									required: 'Password مطلوب',
								})}
								type='password'
								placeholder='كلمة المرور'
							/>
							{errors.password && (
								<p className='text-red-500 text-sm'>
									{errors.password.message}
								</p>
							)}
						</div>

						<Button
							type='submit'
							className='w-full mt-4'
						>
							Login
						</Button>
					</form>

					<p className='mt-4 text-gray-600 dark:text-gray-300'>
						ليس لديك حساب؟{' '}
						<span
							className='text-blue-500 cursor-pointer'
							onClick={() => navigate('/signup')}
						>
							إنشاء حساب جديد
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
