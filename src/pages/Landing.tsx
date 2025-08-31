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
		<main >
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
