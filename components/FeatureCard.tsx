// components/FeatureCard.tsx
import Image from "next/image";

type FeatureCardProps = {
  imageSrc: string;
  header: string;
  subHeader: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  imageSrc,
  header,
  subHeader,
}) => {
  return (
    <div className="rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow flex flex-col items-center">
      <div className="relative w-full mb-4 h-56">
        <Image
          src={imageSrc}
          alt={header}
          layout="fill"
          objectFit="contain"
          className="rounded-t-md"
        />
      </div>
      <h2 className="text-xl font-semibold mb-2 w-full text-center">
        {header}
      </h2>
      <p className="text-gray-600 text-center w-full">{subHeader}</p>
    </div>
  );
};

export default FeatureCard;
