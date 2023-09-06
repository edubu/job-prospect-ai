// components/FeaturesSection.tsx
import FeatureCard from "./FeatureCard";

const FeaturesSection = () => {
  return (
    <div id="features" className="container mx-auto mt-10 py-10">
      <h1 className="text-center text-5xl font-bold mb-4">
        10x your productivity
      </h1>
      <p className="text-center text-subHeader mb-8">
        Tired of prepping for Coffee Chats, Interviews, or Career Fairs? Let us
        help you prepare by doing the research for you and creating
        lightning-fast, comprehensive, and personalized prep sheets so that you
        can focus on what truly matters.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FeatureCard
          imageSrc="/images/industryInsights.png"
          header="Dive deep into industry insights"
          subHeader="Navigate the nuances of any sector with precision. Our platform curates comprehensive industry backgrounds, giving you an edge before your interview."
        />
        <FeatureCard
          imageSrc="/images/generateQuestions.png"
          header="Generate targeted questions"
          subHeader="Generate questions that not only show that you've done your homework about the company but also indicate your keen interest in understanding the bigger picture and how you can potentially fit into it."
        />
        <FeatureCard
          imageSrc="/images/jobQuals.png"
          header="Decipher job qualifications"
          subHeader="From tech jargon to role-specific nuances, get a clear breakdown of every preferred qualification. Understand not just the 'what', but the 'why' and 'how' it matters to your dream job."
        />
        <FeatureCard
          imageSrc="/images/jobQuals.png"
          header="Dive into data-driven details"
          subHeader="Get a holistic view of your potential employer, from job-specific salary benchmarks to company scale. Know more, negotiate better."
        />
      </div>
    </div>
  );
};

export default FeaturesSection;
