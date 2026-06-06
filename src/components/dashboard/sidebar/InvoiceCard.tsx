import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

/**
 * InvoiceCard
 * Props:
 * - imageSrc: string (path to the illustration)
 * - title: string (button text or heading)
 * - onCreate: () => void
 *
 * Usage:
 * <InvoiceCard imageSrc="/images/invoice-illustration.png" title="Create invoice" onCreate={() => {}} />
 */

export default function InvoiceCard({
	imageSrc = '/images/invoice-illustration.png',
	title,
	onCreate = () => {},
}: { imageSrc?: string; title?: string; onCreate?: () => void }) {
	const { t } = useTranslation('common');
	return (
		<div className='max-w-xs mx-auto'>
			<Card className='bg-emerald-700 text-emerald-50 rounded-2xl overflow-hidden shadow-[0_4px_12px_rgba(16,185,129,0.4)]'>
				<CardContent className='flex flex-col items-center gap-6 p-6'>
					<div className='w-full flex justify-center'>
						<div className='w-full h-full relative'>
							<img
								src={imageSrc}
								alt='illustration'
								style={{ objectFit: 'cover' }}
								className='pointer-events-none select-none w-full h-full'
							/>
						</div>
					</div>

					<div className='flex-1 w-full' />

					<div className='w-full'>
						<Button
							variant='ghost'
							onClick={onCreate}
							className='w-full rounded-xl bg-amber-200 text-emerald-800 font-medium shadow-inner py-3'
						>
							{title || t('Create Invoice')}
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
