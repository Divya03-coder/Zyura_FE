import { useNavigate } from "react-router-dom";
import { BioModel } from "../data";

interface ModelCardProps {
  model: BioModel;
  accessToken: string;
}

export default function ModelCard({ model, accessToken }: ModelCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate(`/dashboard/bio-digital/details?id=${model.id}`, {
          state: { model, accessToken },
        })
      }
      className="group bg-white border border-slate-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={model.thumbnail}
          alt={model.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-blue-600 shadow-sm border border-blue-100">
          {model.category}
        </div> */}
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-800 text-lg mb-1 group-hover:text-blue-600 transition-colors">
          {model.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">
          {model.description}
        </p>
      </div>

      <div className="px-4 pb-4 mt-auto">
        <button className="w-full py-2 bg-slate-50 text-slate-600 rounded-lg text-sm font-medium group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
          View Model
        </button>
      </div>
    </div>
  );
}
