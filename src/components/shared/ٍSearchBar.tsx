import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const suggestions = [
	'Invoice #123',
	'Samuel',
	'Property Spending',
	'Installment Plan',
];

export const SearchBar = () => {
	const [query, setQuery] = useState('');

	const filtered = suggestions.filter((item) =>
		item.toLowerCase().includes(query.toLowerCase()),
	);

	return (
		<div className='relative w-full max-w-sm'>
			<Search
				className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'
				size={18}
			/>

			<input
				type='text'
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder='Search...'
				className='w-full pl-10 pr-10 py-2 rounded-md bg-white shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all'
			/>

			<AnimatePresence>
				{query && (
					<motion.button
						key='clear-btn'
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.8 }}
						transition={{ duration: 0.2 }}
						onClick={() => setQuery('')}
						className='absolute right-3 top-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
					>
						<X size={16} />
					</motion.button>
				)}
			</AnimatePresence>

			{/* اقتراحات البحث */}
			<AnimatePresence>
				{query && filtered.length > 0 && (
					<motion.ul
						initial={{ opacity: 0, y: -5 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -5 }}
						className='absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-md mt-1 z-10'
					>
						{filtered.map((item) => (
							<li
								key={item}
								className='px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm'
								onClick={() => setQuery(item)}
							>
								{item}
							</li>
						))}
					</motion.ul>
				)}
			</AnimatePresence>
		</div>
	);
};
