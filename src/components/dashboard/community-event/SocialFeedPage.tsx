import { useState } from "react";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import SocialFeed from "./social-feed/SocialFeed";
import CreatePostModal from "./social-feed/CreatePostModal";
import CreateRoomModal from "./social-feed/CreateRoomModal";


const SocialFeedPage = () => {
  const [activeTab] = useState("Social Feed");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mb-4 md:mb-8 space-y-2">
        <h4 className="text-[16px] md:text-[20px] font-semibold text-[#0F172A]">
          Social Feed
        </h4>
        <p className="text-[14px] md:text-[16px] text-gray-600">Share knowledge, ask questions, and connect with the medical community</p>
      </div>
      {/* Header */}
      <div className="flex relative flex-col sm:flex-row items-center justify-between h-auto sm:h-16 gap-3 py-4">

        {/* Dynamic Button */}
        <PrimaryButton className="absolute right-0 top-0" onClick={() => setIsModalOpen(true)}>
          {activeTab === "Social Feed" ? "+ Create Post" : "+ Create Room"}
        </PrimaryButton>
      </div>

      {/* Content */}
      <SocialFeed />

      {/* Modals */}
      {activeTab === "Social Feed" ? (
        <CreatePostModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      ) : (
        <CreateRoomModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      )}
    </div>
  );
};

export default SocialFeedPage;
