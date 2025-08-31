import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { signup } from '../firebaseConfigs/auth';

type SignupFormInputs = {
	email: string;
	password: string;
	confirmPassword: string;
};

const Signup = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<SignupFormInputs>();
	const navigate = useNavigate();

	const onSubmit = async (data: SignupFormInputs) => {
		if (data.password !== data.confirmPassword) {
			alert('كلمة المرور غير متطابقة');
			return;
		}
		try {
			await signup(data.email, data.password);
			alert('تم إنشاء الحساب بنجاح');
			navigate('/dashboard');
		} catch (err: any) {
			alert(err.message);
		}
	};

	return (
		<div className='flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900'>
			<div className='flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden max-w-4xl w-full'>
				{/* صورة جانبية */}
				<div className='hidden md:block md:w-1/2'>
					<img
						src='/assets/signup.jpg'
						alt='Invoice Illustration'
						className='h-full w-full object-cover'
					/>
				</div>

				{/* فورم التسجيل */}
				<div className='w-full md:w-1/2 p-8'>
					<h2 className='text-2xl font-bold mb-6 text-gray-800 dark:text-white'>
						اشتراك جديد
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
									minLength: 6,
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

						<div>
							<Label>Confirm Password</Label>
							<Input
								{...register('confirmPassword', {
									required: 'تأكيد كلمة المرور مطلوب',
								})}
								type='password'
								placeholder='تأكيد كلمة المرور'
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
							إنشاء الحساب
						</Button>
					</form>

					<p className='mt-4 text-gray-600 dark:text-gray-300'>
						لديك حساب بالفعل؟{' '}
						<span
							className='text-blue-500 cursor-pointer'
							onClick={() => navigate('/login')}
						>
							تسجيل الدخول
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Signup;
