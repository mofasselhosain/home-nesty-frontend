import AgentSection from "@/components/modules/agent-serction/agent-section";
import ClientStories from "@/components/modules/client-stories/client-stories";
import { PropertyCarousel } from "@/components/modules/home-scrooler-card";
import HomeHero from "@/components/modules/home-top";
import LocationInsights from "@/components/modules/location-section/location-section";
import CustomerInterestSection from "@/components/modules/property/customer-interested-section";
import DreamHomeSection from "@/components/modules/property/last-saction";
import OffersSection from "@/components/modules/property/offer-section";
import { QuestiontAccordionDemo } from "@/components/modules/question/question-home-show";

export default function HomePage() {
  return (
    <div>
      <HomeHero></HomeHero>
      <OffersSection/>
      <PropertyCarousel></PropertyCarousel>
      <CustomerInterestSection/>
    <ClientStories></ClientStories>
    <LocationInsights></LocationInsights>
      < QuestiontAccordionDemo></QuestiontAccordionDemo>
        {/* <DreamHomeSection/> */}
        <AgentSection></AgentSection>
    </div>
  );
}