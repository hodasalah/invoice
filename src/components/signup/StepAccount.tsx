import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const StepAccount = () => {
	const { t } = useTranslation('auth');
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<div className='space-y-4'>
			<h2 className='text-xl font-bold'>{t('signup_title')}</h2>

			<div>
				<Label>{t('email')}</Label>
				<Input
					{...register('email', { required: t('email_required') })}
					type='email'
					placeholder={t('email_placeholder')}
				/>
				{errors.email && (
					<p className='text-red-500 text-sm'>
						{typeof errors.email?.message === 'string'
							? errors.email?.message
							: ''}
					</p>
				)}
			</div>

			<div>
				<Label>{t('password')}</Label>
				<Input
					{...register('password', {
						required: t('password_required'),
						minLength: { value: 6, message: t('password_min') },
					})}
					type='password'
					placeholder={t('password_placeholder')}
				/>
				{errors.password && (
					<p className='text-red-500 text-sm'>
						{typeof errors.password?.message === 'string'
							? errors.password?.message
							: ''}
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
					placeholder={t('confirm_password_required')}
				/>
				{errors.confirmPassword && (
					<p className='text-red-500 text-sm'>
						{typeof errors.confirmPassword?.message === 'string'
							? errors.confirmPassword?.message
							: ''}
					</p>
				)}
			</div>
		</div>
	);
};

export default StepAccount;
