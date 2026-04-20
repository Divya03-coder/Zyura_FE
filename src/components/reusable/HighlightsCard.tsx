import React from "react";
import PrimaryButton from "./PrimaryButton";
import { useNavigate } from "react-router-dom";

type CardProps = {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string;
};

const HighlightsCard: React.FC<CardProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
  image,
}) => {
  const navigate = useNavigate();
  return (
    <div className="p-4 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-gray-50 border border-slate-300">
      <div className="grid grid-cols-3 gap-4 items-center">
        <img
          className="w-full h-24 object-contain rounded-lg"
          src={image}
          alt={title}
        />
        <div className="col-span-2">
          <h3 className="text-lg lg:text-xl font-semibold text-gray-800">
            {title}
          </h3>
          <p className="mt-2 text-[#535353] text-sm line-clamp-2">
            {description}
          </p>
        </div>
      </div>
      <PrimaryButton
        onClick={() => navigate(`${buttonLink}`)}
        className="rounded-full mt-4 flex justify-self-end"
      >
        {buttonText}
      </PrimaryButton>
    </div>
  );
};

export default HighlightsCard;
