import { motion, AnimatePresence } from 'framer-motion';
import { Pencil, Check, X } from 'lucide-react';

interface EditFieldProps {
	label: string;
	value: string;
	editing: boolean;
	onChange: (v: string) => void;
	type?: string;
}

export const EditField = ({ label, value, editing, onChange, type = 'text' }: EditFieldProps) => (
	<div className='flex flex-col gap-1.5'>
		<label className='text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest'>
			{label}
		</label>
		<AnimatePresence mode='wait'>
			{editing ? (
				<motion.input
					key='input'
					initial={{ opacity: 0, y: -4 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -4 }}
					transition={{ duration: 0.15 }}
					type={type}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className='w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 transition-all shadow-sm'
				/>
			) : (
				<motion.p
					key='text'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='text-sm font-medium text-gray-900 dark:text-gray-100 py-2 border-b border-transparent'
				>
					{value || '—'}
				</motion.p>
			)}
		</AnimatePresence>
	</div>
);

interface EditableInfoSectionProps {
	icon: React.ReactNode;
	title: string;
	editLabel: string;
	saveLabel: string;
	cancelLabel: string;
	editing: boolean;
	saving: boolean;
	onEdit: () => void;
	onSave: () => void;
	onCancel: () => void;
	children: React.ReactNode;
	delay?: number;
}

export default function EditableInfoSection({
	icon, title, editLabel, saveLabel, cancelLabel,
	editing, saving, onEdit, onSave, onCancel, children, delay = 0
}: EditableInfoSectionProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, delay }}
			className='rounded-2xl border border-gray-200/80 dark:border-gray-700/50 bg-white dark:bg-gray-900/80 backdrop-blur-sm shadow-sm overflow-hidden group'
		>
			{/* Card header */}
			<div className='flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800/80 bg-gray-50/50 dark:bg-gray-800/30'>
				<div className='flex items-center gap-3'>
					<span className='flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary'>
						{icon}
					</span>
					<h3 className='font-semibold text-gray-900 dark:text-white text-sm'>{title}</h3>
				</div>
				<div className='flex items-center gap-2'>
					{editing ? (
						<>
							<button
								onClick={onSave}
								disabled={saving}
								className='flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed'
							>
								<Check className='w-3.5 h-3.5' />
								{saving ? '...' : saveLabel}
							</button>
							<button
								onClick={onCancel}
								className='flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700 shadow-sm'
							>
								<X className='w-3.5 h-3.5' />
								{cancelLabel}
							</button>
						</>
					) : (
						<button
							onClick={onEdit}
							className='flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700 shadow-sm opacity-0 group-hover:opacity-100 focus:opacity-100'
						>
							<Pencil className='w-3 h-3' />
							{editLabel}
						</button>
					)}
				</div>
			</div>
			{/* Card body */}
			<div className='px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6'>
				{children}
			</div>
		</motion.div>
	);
}
