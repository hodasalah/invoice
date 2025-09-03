import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

interface LoaderOverlayProps {
	status: 'loading' | 'success' | null;
}

const AuthLoader = ({ status }: LoaderOverlayProps) => {
	const { t } = useTranslation('auth');
	const [show, setShow] = useState(true);

	useEffect(() => {
		if (status === 'success') {
			const timer = setTimeout(() => setShow(false), 1500); // يخفيه بعد 1.5 ثانية
			return () => clearTimeout(timer);
		}
	}, [status]);

	if (!show) return null;

	return (
		<div className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-gray-900'>
			{status === 'loading' && (
				<>
					{/* دوران */}
					<motion.div
						className='w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full'
						animate={{ rotate: 360 }}
						transition={{
							repeat: Infinity,
							duration: 1,
							ease: 'linear',
						}}
					/>
					<p className='mt-6 text-lg font-medium text-gray-700 dark:text-gray-200'>
						{t('creating_account')}
					</p>
				</>
			)}

			{status === 'success' && (
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ duration: 0.5 }}
					className='flex flex-col items-center'
				>
					{/* علامة صح */}
					<div className='w-16 h-16 rounded-full bg-green-500 flex items-center justify-center'>
						<motion.svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-10 w-10 text-white'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
							strokeWidth='3'
						>
							<motion.path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M5 13l4 4L19 7'
							/>
						</motion.svg>
					</div>
					<p className='mt-6 text-lg font-medium text-gray-700 dark:text-gray-200'>
						{t('signup_success')}
					</p>
				</motion.div>
			)}
		</div>
	);
};

export default AuthLoader;
