import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

interface AvatarUploaderProps {
	src: string;
	uploading: boolean;
	uploadLabel: string;
	onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AvatarUploader({ src, uploading, uploadLabel, onFileSelect }: AvatarUploaderProps) {
	const fileRef = useRef<HTMLInputElement>(null);

	return (
		<div className='relative group cursor-pointer' onClick={() => fileRef.current?.click()}>
			<motion.div
				whileHover={{ scale: 1.05 }}
				transition={{ type: 'spring', stiffness: 300 }}
				className='w-28 h-28 rounded-2xl border-[3px] border-white/30 shadow-2xl overflow-hidden bg-gray-300 dark:bg-gray-700 ring-4 ring-white/10'
			>
				<img
					src={src}
					alt='avatar'
					className='w-full h-full object-cover'
					onError={(e) => { (e.target as HTMLImageElement).src = '/assets/user.jpg'; }}
				/>
			</motion.div>

			{/* Hover overlay */}
			<div className='absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-1'>
				{uploading ? (
					<div className='w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin' />
				) : (
					<>
						<Camera className='w-5 h-5 text-white' />
						<span className='text-[10px] text-white/80 font-medium'>{uploadLabel}</span>
					</>
				)}
			</div>

			<input
				ref={fileRef}
				type='file'
				accept='image/*'
				className='hidden'
				onChange={onFileSelect}
			/>

			{/* Online badge */}
			<div className='absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-gray-900 shadow-md' />
		</div>
	);
}
