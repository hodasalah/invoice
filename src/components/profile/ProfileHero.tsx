import { motion } from 'framer-motion';
import { ShieldCheck, MapPin, Calendar } from 'lucide-react';
import AvatarUploader from './AvatarUploader';

interface ProfileHeroProps {
	user: any;
	uploading: boolean;
	uploadLabel: string;
	memberSinceLabel: string;
	onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProfileHero({ user, uploading, uploadLabel, memberSinceLabel, onFileSelect }: ProfileHeroProps) {
	const avatarSrc = user?.avatar || '/assets/user.jpg';
	const fmt = (d?: string) => (d ? new Date(d).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' }) : '—');

	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
			className='relative rounded-3xl overflow-hidden'
		>
			{/* Background layers */}
			<div className='absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 dark:from-emerald-800 dark:via-teal-900 dark:to-cyan-950' />
			<div className='absolute inset-0 opacity-[0.07]' style={{
				backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
			}} />
			{/* Glow blobs */}
			<div className='absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3' />
			<div className='absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4' />

			{/* Content */}
			<div className='relative z-10 px-6 sm:px-10 pt-8 pb-6'>
				<div className='flex flex-col sm:flex-row items-center sm:items-end gap-6'>
					<AvatarUploader
						src={avatarSrc}
						uploading={uploading}
						uploadLabel={uploadLabel}
						onFileSelect={onFileSelect}
					/>

					<div className='flex-1 text-center sm:text-start text-white'>
						<h1 className='text-2xl sm:text-3xl font-bold tracking-tight'>
							{user?.firstName} {user?.lastName}
						</h1>
						<p className='text-white/60 text-sm mt-0.5'>{user?.email}</p>

						<div className='flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3'>
							<span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold backdrop-blur-sm border border-white/10'>
								<ShieldCheck className='w-3.5 h-3.5' />
								{user?.role ?? 'user'}
							</span>
							{user?.address?.city && (
								<span className='inline-flex items-center gap-1.5 text-xs text-white/70'>
									<MapPin className='w-3.5 h-3.5' />
									{user.address.city}, {user.address.country}
								</span>
							)}
							<span className='inline-flex items-center gap-1.5 text-xs text-white/70'>
								<Calendar className='w-3.5 h-3.5' />
								{memberSinceLabel} {fmt(user?.createdAt)}
							</span>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
