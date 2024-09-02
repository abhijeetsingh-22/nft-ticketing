import Particles from "@/components/magicui/particles";
import { SphereMask } from "@/components/magicui/sphere-mask";
import ClientSection from "@/components/Marketing/landing/client-section";
import CallToActionSection from "@/components/Marketing/landing/cta-section";
import { FeaturesSection } from "@/components/Marketing/landing/features-section";
import HeroSection from "@/components/Marketing/landing/hero-section";
import PricingSection from "@/components/Marketing/landing/pricing-section";

export default async function LandingPage() {
	return (
		<>
			<HeroSection />
			<ClientSection />
			<SphereMask />
			<FeaturesSection />
			{/* <PricingSection /> */}
			<CallToActionSection />
			<Particles
				className='-z-10 absolute inset-0 text-black dark:text-white'
				quantity={50}
				ease={70}
				size={0.05}
				staticity={40}
				// color={"#ffffff"}
			/>
		</>
	);
}
