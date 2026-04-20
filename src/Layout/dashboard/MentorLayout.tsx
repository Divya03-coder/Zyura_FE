import { Outlet } from "react-router-dom";
import CommonWrapper from "@/common/CommonWrapper";
import MentorNavbar from "./MentorNavbar";

const MentorLayout: React.FC = () => {
  return (
    <div>
      <MentorNavbar />
      <main>
        <CommonWrapper>
          <div className="my-6 md:my-10">
            <Outlet />
          </div>
        </CommonWrapper>
      </main>
    </div>
  );
};

export default MentorLayout;
