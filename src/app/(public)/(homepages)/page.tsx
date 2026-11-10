import { PropertyCarousel } from "@/components/modules/home-scrooler-card";
import HomeHero from "@/components/modules/home-top";
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
    
      < QuestiontAccordionDemo></QuestiontAccordionDemo>
        <DreamHomeSection/>
    </div>
  );
}