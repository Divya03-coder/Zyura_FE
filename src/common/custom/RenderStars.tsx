import { IoMdStar } from "react-icons/io";

interface RenderStarsProps {
  rating: number;
}

const RenderStars: React.FC<RenderStarsProps> = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <IoMdStar key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
    );
  }

  // Half star
  if (hasHalfStar) {
    stars.push(
      <div key="half" className="relative">
        <IoMdStar className="w-5 h-5 text-gray-300" />
        <div className="absolute inset-0 overflow-hidden w-1/2">
          <IoMdStar className="w-5 h-5 fill-orange-400 text-orange-400" />
        </div>
      </div>
    );
  }

  // Empty stars
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <IoMdStar key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
    );
  }

  return <div className="flex gap-1">{stars}</div>;
};

export default RenderStars;
