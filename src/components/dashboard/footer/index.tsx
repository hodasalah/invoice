import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { toggleTheme } from '../../../features/theme/themeSlice';
import { toggleLanguage } from '../../../features/theme/languageSlice';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Heart, Sun, Moon, Globe, ArrowUpRight } from 'lucide-react';
import Logo from '../../shared/logo';

export default function Footer() {
	const dispatch = useAppDispatch();
	const theme = useAppSelector((state) => state.theme);
	const lang = useAppSelector((state) => state.language);
	const { t, i18n } = useTranslation('common');

	const isDark = theme === 'dark';
	const isArabic = lang === 'ar';
	const currentYear = new Date().getFullYear();

	const handleLangToggle = () => {
		dispatch(toggleLanguage());
		i18n.changeLanguage(lang === 'ar' ? 'en' : 'ar');
	};

	const handleThemeToggle = () => {
		dispatch(toggleTheme());
	};

	return (
		<footer className="w-full border-t border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 py-6 px-6 md:px-8 mt-auto transition-colors duration-300">
			<div className="max-w-7xl mx-auto flex flex-col gap-8">
				
				{/* Top Section */}
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
					
					{/* Branding & Status */}
					<div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
						<Logo />
						<div className="hidden sm:block h-4 w-px bg-gray-200 dark:bg-slate-800" />
						
						{/* System Status Indicator */}
						<div className="flex items-center gap-2 bg-emerald-500/10 dark:bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-full text-xs font-medium border border-emerald-500/20 w-fit">
							<span className="relative flex h-2 w-2">
								<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
								<span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
							</span>
							{t('footer.systemsOperational')}
						</div>
					</div>

					{/* Quick Links */}
					<div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-gray-500 dark:text-slate-400">
						<Link 
							to="/dashboard" 
							className="hover:text-primary dark:hover:text-white transition-colors duration-200 relative group"
						>
							{t('Dashboard')}
							<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary dark:bg-emerald-400 transition-all duration-200 group-hover:w-full" />
						</Link>
						<Link 
							to="/dashboard/invoices/list" 
							className="hover:text-primary dark:hover:text-white transition-colors duration-200 relative group"
						>
							{t('Invoices')}
							<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary dark:bg-emerald-400 transition-all duration-200 group-hover:w-full" />
						</Link>
						<Link 
							to="/dashboard/clients/list" 
							className="hover:text-primary dark:hover:text-white transition-colors duration-200 relative group"
						>
							{t('Clients')}
							<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary dark:bg-emerald-400 transition-all duration-200 group-hover:w-full" />
						</Link>
						<Link 
							to="/dashboard/wallets" 
							className="hover:text-primary dark:hover:text-white transition-colors duration-200 relative group"
						>
							{t('Wallets')}
							<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary dark:bg-emerald-400 transition-all duration-200 group-hover:w-full" />
						</Link>
					</div>
				</div>

				{/* Divider */}
				<div className="h-px bg-gray-200 dark:bg-slate-800" />

				{/* Bottom Section */}
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
					
					{/* Creator & Copyright */}
					<div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-500 dark:text-slate-400">
						<div className="flex items-center gap-1.5">
							<span>{t('footer.madeBy')}</span>
							<motion.a
								href="https://www.linkedin.com/in/hoda-salah/"
								target="_blank"
								rel="noopener noreferrer"
								className="font-bold text-primary dark:text-emerald-400 hover:text-primary-hover dark:hover:text-emerald-300 inline-flex items-center gap-0.5 group"
								whileHover={{ scale: 1.02 }}
							>
								{t('footer.hodaSalah')}
								<ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
							</motion.a>
							<motion.span
								animate={{ scale: [1, 1.2, 1] }}
								transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
								className="inline-block"
							>
								<Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
							</motion.span>
						</div>
						<span className="hidden sm:inline text-gray-300 dark:text-slate-600">|</span>
						<span>&copy; {currentYear} {t('footer.rightsReserved')}</span>
					</div>

					{/* Quick Controls */}
					<div className="flex items-center gap-4">
						
						{/* Language Switcher */}
						<div className="flex items-center bg-gray-100 dark:bg-slate-800 p-1 rounded-lg border border-gray-200 dark:border-slate-700">
							<button
								onClick={handleLangToggle}
								className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
									!isArabic 
										? 'bg-white dark:bg-slate-700 text-primary dark:text-white shadow-sm' 
										: 'text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200'
								}`}
							>
								<Globe className="w-3.5 h-3.5" />
								<span>English</span>
							</button>
							<button
								onClick={handleLangToggle}
								className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
									isArabic 
										? 'bg-white dark:bg-slate-700 text-primary dark:text-white shadow-sm' 
										: 'text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200'
								}`}
							>
								<Globe className="w-3.5 h-3.5" />
								<span>العربية</span>
							</button>
						</div>

						{/* Theme Toggle Button */}
						<motion.button
							onClick={handleThemeToggle}
							className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-600 dark:text-yellow-400 border border-gray-200 dark:border-slate-700 transition-all duration-200"
							whileTap={{ scale: 0.95 }}
							whileHover={{ scale: 1.05 }}
							aria-label="Toggle theme"
						>
							{isDark ? (
								<motion.div
									initial={{ rotate: -90, opacity: 0 }}
									animate={{ rotate: 0, opacity: 1 }}
									transition={{ duration: 0.3 }}
								>
									<Sun className="w-4 h-4 fill-current" />
								</motion.div>
							) : (
								<motion.div
									initial={{ rotate: 90, opacity: 0 }}
									animate={{ rotate: 0, opacity: 1 }}
									transition={{ duration: 0.3 }}
								>
									<Moon className="w-4 h-4 fill-current" />
								</motion.div>
							)}
						</motion.button>

					</div>
				</div>

			</div>
		</footer>
	);
}
