import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // ✅ fixed import
import { Calendar, Clock, MapPin, Star } from "lucide-react";
import PrimaryButton from "@/components/reusable/PrimaryButton";

interface FeaturedEventCardProps {
  featuredEvent: {
    id: string;
    title: string;
    type: string;
    date: string;
    time?: string;
    description: string;
    price: string;
    status: "Free" | "Paid";
  };
  getTypeColor: (type: string) => string; //added prop type
}

const FeaturedEventCard: React.FC<FeaturedEventCardProps> = ({
  featuredEvent,
  getTypeColor,
}) => {
  console.log(getTypeColor);
  return (
    <div className="bg-white px-8 py-6 border border-gray-200 rounded-lg">
      <div className="pb-4">
        <div className="flex items-start justify-between">
          <div className="text-sm font-medium">Featured Event</div>
          <Star className="h-5 w-5 text-yellow-400 fill-current" />
        </div>
      </div>
      <div className="space-y-4">
        <div className=" ">
          <div className="flex items-start gap-4">
            <div className="flex-1 space-y-3 md:space-y-5">
              <h3 className="text-xl font-semibold">{featuredEvent.title}</h3>

              <div className="flex items-center gap-2">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="/api/placeholder/40/40" />
                  <AvatarFallback>
                    {featuredEvent.title.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">
                    {featuredEvent.description.split(" - ")[0]}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {featuredEvent.description.split(" - ")[1] ?? ""}
                  </div>
                </div>
              </div>
              <hr className="border-t border-gray-400" />

              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-800">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {featuredEvent.date}
                </div>
                {featuredEvent.time && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {featuredEvent.time}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-primary">Zoom Platform</span>
                </div>
              </div>

              <div className="p-4 bg-[#007BFF]/10 rounded-xl">
                <h3 className="text-slate-800 font-medium mb-2 text-base">
                  Bonus for Attendees:
                </h3>
                <p className="text-base text-slate-700">
                  Free PDF resources and personalized study schedule
                </p>
              </div>
            </div>
          </div>
        </div>

        <PrimaryButton>Register Now – {featuredEvent.status}</PrimaryButton>
      </div>
    </div>
  );
};

export default FeaturedEventCard;
