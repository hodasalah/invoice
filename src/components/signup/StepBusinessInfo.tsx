import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const StepBusinessInfo = () => {
	const { t } = useTranslation('auth');
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<div className='space-y-4'>
			<h2 className='text-xl font-bold'>{t('business_info_title')}</h2>

			<div>
				<Label>{t('full_business_name')}</Label>
				<Input
					{...register('businessName', {
						required: t('full_business_name_required'),
					})}
					placeholder={t('full_business_name_placeholder')}
				/>
				{errors.businessName && (
					<p className='text-red-500 text-sm'>
						{typeof errors.businessName?.message === 'string'
							? errors.businessName?.message
							: ''}
					</p>
				)}
			</div>

			<div>
				<Label>{t('address')}</Label>
				<Input
					{...register('address', {
						required: t('address_required'),
					})}
					placeholder={t('address_placeholder')}
				/>
				{errors.address && (
					<p className='text-red-500 text-sm'>
						{typeof errors.address?.message === 'string'
							? errors.address?.message
							: ''}
					</p>
				)}
			</div>

			<div>
				<Label>{t('city')}</Label>
				<Input
					{...register('city', {
						required: t('city_required'),
					})}
					placeholder={t('city_placeholder')}
				/>
				{errors.city && (
					<p className='text-red-500 text-sm'>
						{typeof errors.city?.message === 'string'
							? errors.city?.message
							: ''}
					</p>
				)}
			</div>

			<div>
				<Label>{t('postal_code')}</Label>
				<Input
					{...register('postalCode', {
						required: t('postal_code_required'),
					})}
					placeholder={t('postal_code_placeholder')}
				/>
				{errors.postalCode && (
					<p className='text-red-500 text-sm'>
						{typeof errors.postalCode?.message === 'string'
							? errors.postalCode?.message
							: ''}
					</p>
				)}
			</div>

			<div>
				<Label>{t('cr_number')}</Label>
				<Input
					{...register('crNumber', {
						required: t('cr_number_required'),
					})}
					placeholder={t('cr_number_placeholder')}
				/>
				{errors.crNumber && (
					<p className='text-red-500 text-sm'>
						{typeof errors.crNumber?.message === 'string'
							? errors.crNumber?.message
							: ''}
					</p>
				)}
			</div>

			<div>
				<Label>{t('secondary_cr_number')}</Label>
				<Input
					{...register('secondaryCrNumber')}
					placeholder={t('secondary_cr_number_placeholder')}
				/>
			</div>
		</div>
	);
};

export default StepBusinessInfo;
