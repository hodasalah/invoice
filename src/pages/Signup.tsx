import StepAccount from '@/components/signup/StepAccount';
import StepBusinessInfo from '@/components/signup/StepBusinessInfo';
import StepUserInfo from '@/components/signup/StepUserInfo';
import { Button } from '@/components/ui/button';
import { signup } from '@/firebaseConfigs/auth';
import { setUserData } from '@/firebaseConfigs/firestore';
import { signupSchema, type SignupSchema } from '@/validations/signupSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { toast } from 'sonner';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/firebaseConfigs/firebase'; // تأكدي من مسار التصدير الصحيح

type FormData = {
	email: string;
	password: string;
	confirmPassword: string;
	firstName: string;
	lastName: string;
	phone: string;
	position?: string;
	companySize?: string;
	businessName: string;
	address: string;
	city: string;
	vatNumber?: string;
	crNumber?: string;
	postalCode: string;
	secondaryCrNumber?: string;
};

const stepFields: Record<number, (keyof FormData)[]> = {
	1: ['email', 'password', 'confirmPassword'],
	2: ['firstName', 'lastName', 'phone', 'position', 'companySize'],
	3: ['businessName', 'address', 'city', 'postalCode', 'crNumber'],
};

const Signup = () => {
	const [step, setStep] = useState(1);
	const [isStepValid, setIsStepValid] = useState(true);
	const { t } = useTranslation('auth');

	const methods = useForm<SignupSchema>({
		resolver: zodResolver(signupSchema(t)),
		mode: 'onChange',
	});

	const {
		trigger,
		formState: { isValid },
	} = methods;

	const validateCurrentStep = async () => {
		const fields = stepFields[step];
		const valid = await trigger(fields);
		return valid;
	};




	const onSubmit = async (data: FormData) => {
		try {
			toast.loading(t('creating_account'));

			// 1) أنشئي المستخدم (modular SDK example)
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				data.email,
				data.password,
			);
			const uid = userCredential.user.uid;
			console.log('created user uid:', uid);

			// 2) اكتبي مباشرةً إلى Firestore للتحقق (تجاوزي wrapper مؤقتًا)
			const docRef = doc(db, 'users', uid);
			await setDoc(docRef, {
				email: data.email,
				firstName: data.firstName,
				lastName: data.lastName,
				phone: data.phone,
				position: data.position || '',
				companySize: data.companySize || '',
				businessName: data.businessName,
				address: data.address,
				city: data.city,
				vatNumber: data.vatNumber || '',
				crNumber: data.crNumber || '',
				postalCode: data.postalCode,
				secondaryCrNumber: data.secondaryCrNumber || '',
				createdAt: new Date().toISOString(),
			});

			toast.success(t('signup_success'));
		} catch (error: any) {
			// سجّلي تفاصيل الخطأ كاملة
			console.error('Firestore write failed:', error);
			// حاول استخراج الكود والرسالة لو موجودة
			console.error('error.code', error?.code);
			console.error('error.message', error?.message);
			// عرض للمستخدم رسالة عامة
			toast.error(error?.message || t('signup_error'));
		}
	};
	const handleNext = async () => {
		const valid = await trigger(stepFields[step]);
		setIsStepValid(valid);

		if (valid) setStep(step + 1);
		else toast.error(t('please_fix_errors'));
	};



	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900'>
			<div className='bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-3xl'>
				<h2 className='text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center'>
					{t('signup_title')}
				</h2>

				<p className='text-center text-sm text-muted-foreground mb-4'>
					{t('step', { count: step })}
				</p>

				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)}>
						{step === 1 && <StepAccount />}
						{step === 2 && <StepUserInfo />}
						{step === 3 && <StepBusinessInfo />}

						<div className='flex justify-between mt-6'>
							{step > 1 && (
								<Button
									type='button'
									onClick={() => setStep(step - 1)}
								>
									{t('previous')}
								</Button>
							)}
							{step < 3 ? (
								<Button
									type='button'
									onClick={handleNext}
									disabled={!isStepValid}
								>
									{t('next')}
								</Button>
							) : (
								<Button
									type='submit'
									disabled={!isValid}
								>
									{t('submit')}
								</Button>
							)}
						</div>

						<p className='mt-4 text-center text-sm text-gray-600 dark:text-gray-300'>
							{t('already_have_account')}{' '}
							<Link
								to='/login'
								className='text-blue-500 hover:underline'
							>
								{t('login')}
							</Link>
						</p>
					</form>
				</FormProvider>
			</div>
		</div>
	);
};

export default Signup;
