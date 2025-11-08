import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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
	title = 'Create invoice',
	onCreate = () => {},
}) {
	return (
		<div className='max-w-xs mx-auto'>
			{/* Outer rounded green card matching the image */}
			<Card className='bg-emerald-700 text-emerald-50 rounded-2xl overflow-hidden shadow-[0_4px_12px_rgba(16,185,129,0.4)]'>
				<CardContent className='flex flex-col items-center gap-6 p-6'>
					{/* Illustration container */}
					<div className='w-full flex justify-center'>
						{/* If you use Next.js Image, keep Image. Otherwise replace with <img /> */}
						<div className='w-full h-full relative'>
							<img
								src={imageSrc}
								alt='illustration'
								style={{ objectFit: 'cover' }}
								className='pointer-events-none select-none w-full h-full'
							/>
						</div>
					</div>

					{/* Spacer to mimic the large empty space above button in the image */}
					<div className='flex-1 w-full' />

					{/* Beige rounded button area */}
					<div className='w-full'>
						<Button
							variant='ghost'
							onClick={onCreate}
							className='w-full rounded-xl bg-amber-200 text-emerald-800 font-medium shadow-inner py-3'
						>
							{title}
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
