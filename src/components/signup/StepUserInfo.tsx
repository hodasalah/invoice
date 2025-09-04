import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';

const StepUserInfo = () => {
	const { t } = useTranslation('auth');
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<div className='space-y-4'>
			<h2 className='text-xl font-bold'>{t('user_info_title')}</h2>

			<div>
				<Label>{t('first_name')}</Label>
				<Input
					{...register('firstName', {
						required: t('first_name_required'),
					})}
					placeholder={t('first_name_placeholder')}
				/>
				{errors.firstName?.message && (
					<p className='text-red-500 text-sm'>
						{String(errors.firstName?.message)}
					</p>
				)}
			</div>

			<div>
				<Label>{t('last_name')}</Label>
				<Input
					{...register('lastName', {
						required: t('last_name_required'),
					})}
					placeholder={t('last_name_placeholder')}
				/>
				{errors.lastName && (
					<p className='text-red-500 text-sm'>
						{String(errors.lastName?.message)}
					</p>
				)}
			</div>

			<div>
				<Label>{t('phone')}</Label>
				<Input
					{...register('phone', { required: t('phone_required') })}
					placeholder={t('phone_placeholder')}
				/>
				{errors.phone && (
					<p className='text-red-500 text-sm'>
						{String(errors.phone?.message)}
					</p>
				)}
			</div>

			<div>
				<Label>{t('position')}</Label>
				<Input
					{...register('position')}
					placeholder={t('position_placeholder')}
				/>
			</div>

			<div>
				<Label>{t('company_size')}</Label>
				<Input
					{...register('companySize')}
					placeholder={t('company_size_placeholder')}
				/>
			</div>
		</div>
	);
};

export default StepUserInfo;
