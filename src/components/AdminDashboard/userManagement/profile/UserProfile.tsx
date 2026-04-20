import bannerDefault from "@/assets/home/banner.jpg";
import camera from "@/assets/home/camera.png";
import image from "@/assets/home/mentor1.png";
import CommonButton from "@/common/button/CommonButton";
import CommonHeader from "@/common/header/CommonHeader";
import MediumHeader from "@/common/header/MediumHeader";
import React from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import ConvertPath from "./ConvertPath";

interface UserProfileProps {
  fullName: string;
  email: string;
  phone: string | number;
  country?: string;
  university?: string;
  preparingFor?: string;
  bio?: string;
  profileImage: string;
  yearOfStudy?: string;
  profession?: string;
  backLink: string;
  role: string;
}

const inputClass = {
  input:
    "text-sm font-normal text-[#0F172A] font-inter leading-[20px] outline-none transition w-full px-4 py-3 border border-border rounded-md ",
  label:
    "text-sm font-normal text-[#18181B] font-inter leading-[20px] block mb-2",
};

const UserProfile: React.FC<UserProfileProps> = ({
  fullName,
  email,
  phone,
  country,
  university,
  preparingFor,
  bio,
  profileImage,
  yearOfStudy,
  profession,
  backLink,
  role,
}) => {
  return (
    <div className="">
      <div className="mb-6">
        <ConvertPath />
      </div>

      <div className="relative h-[215px]">
        <img
          className="w-full h-full object-cover rounded-lg"
          src={bannerDefault}
          alt="Banner"
        />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2))] rounded-lg"></div>

        <div className="absolute top-1 right-1 bg-white w-10 h-10 rounded-full flex items-center justify-center border border-[#94A3B8] cursor-pointer">
          <img src={camera} alt="Upload banner" />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mx-5 absolute top-1/2 left-0 right-0">
          <div>
            <div className="bg-white rounded-md flex flex-col items-center w-full max-w-[415px] px-6 pb-10">
              <div className="relative">
                <img
                  src={profileImage || image}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white -mt-10"
                />
                <div className="absolute top-10 right-0 bg-white w-10 h-10 rounded-full flex items-center justify-center border border-[#94A3B8] cursor-pointer">
                  <img src={camera} alt="Upload profile" />
                </div>
              </div>
              <MediumHeader className="mt-4 !text-xl !font-semibold">
                {fullName}
              </MediumHeader>
              <CommonHeader className=" !font-normal !text-[#334155]">
                {profession}
              </CommonHeader>

              <div className="mt-4 space-y-1">
                <CommonHeader className="!text-[#334155] !font-normal">
                  University: {university}
                </CommonHeader>
                {yearOfStudy && (
                  <CommonHeader className="!text-[#334155] !font-normal">
                    Year of Study: {yearOfStudy}
                  </CommonHeader>
                )}
                <CommonHeader className="!text-[#334155] !font-normal">
                  Preparing For: {preparingFor}
                </CommonHeader>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              {role === "MENTOR" && (
                <CommonButton className="!bg-[#1D4ED8] !text-white ">
                  Activate mentor
                </CommonButton>
              )}

              <CommonButton className="!bg-[#1D4ED8] !text-white ">
                <Link to={backLink}>Back</Link>
              </CommonButton>
            </div>
          </div>

          <div className="bg-white rounded-md p-6 flex-1">
            <CommonHeader className="!text-lg !font-semibold mb-4 flex items-center gap-2 !text-[#2D2D2D]">
              <FaUser /> Profile Information
            </CommonHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <label className={inputClass.label}>Full Name</label>
                <input value={fullName} readOnly className={inputClass.input} />
              </div>
              <div>
                <label className={inputClass.label}>Email Address</label>
                <input value={email} readOnly className={inputClass.input} />
              </div>
              <div>
                <label className={inputClass.label}>Phone Number</label>
                <input value={phone} readOnly className={inputClass.input} />
              </div>
              <div>
                <label className={inputClass.label}>Country</label>
                <input
                  value={country || "Not provided"}
                  readOnly
                  className={inputClass.input}
                />
              </div>
              <div>
                <label className={inputClass.label}>University</label>
                <input
                  value={university}
                  readOnly
                  className={inputClass.input}
                />
              </div>
              <div>
                <label className={inputClass.label}>Preparing For</label>
                <input
                  value={preparingFor}
                  readOnly
                  className={inputClass.input}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className={inputClass.label}>Bio</label>
              <textarea
                value={bio}
                readOnly
                className={inputClass.input}
                rows={3}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
