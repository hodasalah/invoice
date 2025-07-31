import {
	Features,
	Footer,
	Hero,
	Pricing,
	Testimonials,
	WhyUs,
} from '../components/landing';

const Landing = () => {
	return (
		<main className='bg-[rgb(15,23,42)] text-white'>
			<Hero />
			<Features />
			<WhyUs />
			<Pricing />
			<Testimonials />
			<Footer />
		</main>
	);
};

export default Landing;
