import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import LanguageSwitcher from '../shared/LanguageSwitcher';

import Logo from '../shared/logo';
import ThemeToggle from '../shared/ThemeToggle';

const Nav = () => {
	const { i18n, t } = useTranslation();
	const isArabic = i18n.language === 'ar';

	return (
		<div className='w-full flex justify-between items-center py-8 mb-24'>
			{/* Logo */}

			<Logo />

			{/*  nav items */}
			<div
				className={`flex items-center gap-4 ${
					isArabic ? 'order-1' : 'order-2'
				}`}
			>
				{/* Links */}
				<ul
					className={`flex items-center gap-4 `}
				>
					<li>
						{/* Theme + Lang */}
						<ThemeToggle />
					</li>
					<li>
						<LanguageSwitcher />
					</li>
					<li>
						<Link
							to='/login'
							className='text-white hover:text-gray-300 transition'
						>
							{isArabic ? 'تسـجـيل الدخـول' : 'Login'}
						</Link>
					</li>
					<li>
						<Link
							to='/register'
							className='flex gap-2 items-center text-white hover:text-gray-300 transition bg-[rgb(99,102,241)] px-4 py-2 rounded-md'
						>
							{isArabic ? 'ابــــدأ الآن' : 'Get Started'}
							<ArrowRight
								className={`${
									isArabic ? 'rotate-180' : ''
								} text-[rgb(125,211,252)] mt-1`}
								size={16}
								height={14}
							/>
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Nav;
