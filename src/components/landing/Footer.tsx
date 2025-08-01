import { Facebook, Linkedin, Mail, Phone, Twitter } from 'lucide-react';
import { Trans, useTranslation } from 'react-i18next';
import Logo from '../shared/logo';

const Footer = () => {
	const { t, i18n } = useTranslation();
	const isArabic = i18n.language === 'ar';

	const year = new Date().getFullYear();

	return (
		<footer
			className='bg-[rgb(30,41,59)] text-gray-300 px-6 py-14 mt-16'
			dir={isArabic ? 'rtl' : 'ltr'}
		>
			<div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12'>
				{/* Logo and description */}
				<div className='flex flex-col gap-4'>
					<Logo />
					<p className='text-sm leading-relaxed'>
						{t('footer.description')}
					</p>
				</div>

				{/* Quick Links */}
				<div>
					<h4 className='text-lg font-semibold mb-4'>
						{t('footer.quickLinks')}
					</h4>
					<ul className='space-y-2 text-sm'>
						<li>
							<a
								href='#features'
								className='hover:text-white transition'
							>
								{t('footer.links.features')}
							</a>
						</li>
						<li>
							<a
								href='#pricing'
								className='hover:text-white transition'
							>
								{t('footer.links.pricing')}
							</a>
						</li>
						<li>
							<a
								href='#contact'
								className='hover:text-white transition'
							>
								{t('footer.links.contact')}
							</a>
						</li>
						<li>
							<a
								href='#faq'
								className='hover:text-white transition'
							>
								{t('footer.links.faq')}
							</a>
						</li>
					</ul>
				</div>

				{/* Contact and social media */}
				<div>
					<h4 className='text-lg font-semibold mb-4'>
						{t('footer.contactUs')}
					</h4>
					<ul className='space-y-3 text-sm'>
						<li className='flex items-center gap-2'>
							<Mail size={16} /> {t('footer.email')}
						</li>
						<li className='flex items-center gap-2'>
							<Phone size={16} /> {t('footer.phone')}
						</li>
					</ul>
					<div className='flex gap-4 mt-4'>
						<a
							href='https://facebook.com'
							target='_blank'
							rel='noreferrer'
							aria-label='Facebook'
							className='hover:text-white transition'
						>
							<Facebook size={20} />
						</a>
						<a
							href='https://twitter.com'
							target='_blank'
							rel='noreferrer'
							aria-label='Twitter'
							className='hover:text-white transition'
						>
							<Twitter size={20} />
						</a>
						<a
							href='https://linkedin.com'
							target='_blank'
							rel='noreferrer'
							aria-label='LinkedIn'
							className='hover:text-white transition'
						>
							<Linkedin size={20} />
						</a>
					</div>
				</div>
			</div>

			<div className='mt-12 border-t border-slate-700 pt-6 text-xs text-center text-slate-400'>
				<Trans
					i18nKey='footer.madeBy'
					values={{ year }}
					components={[
						<></>,
						<a
							key='link'
							href='https://www.linkedin.com/in/hoda-salah/'
							target='_blank'
							rel='noreferrer'
							className=' text-[rgb(99,102,241)] hover:text-white transition'
						/>,
					]}
				/>
			</div>
		</footer>
	);
};

export default Footer;
