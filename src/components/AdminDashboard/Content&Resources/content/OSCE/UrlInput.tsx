// UrlInput.tsx
import CommonHeader from "@/common/header/CommonHeader";
import React from "react";
import { Control, UseFormRegister } from "react-hook-form";
import { OsceFormValues } from "./osceSchema";

const inputClass = {
  label: "block text-sm font-normal text-[#020617] font-inter mb-2",
  input:
    "w-full border border-[#CBD5E1] bg-white rounded-md p-3 outline-none text-[#94A3B8] text-xs",
  error: "text-red-500 text-sm mt-1",
};

const UrlInput: React.FC<{
  control: Control<OsceFormValues>;
  register: UseFormRegister<OsceFormValues>;
}> = ({ register }) => {
  return (
    <div className="w-full ">
      <CommonHeader className="pb-6">
        Learning Resources & Guidance
      </CommonHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-white p-6  border border-border rounded-md">
        <div>
          <label htmlFor="linkTitle" className={inputClass.label}>
            Link Title
          </label>
          <input
            id="linkTitle"
            type="text"
            {...register("learningResource.resourceTitle" as const)}
            className={inputClass.input}
          />
        </div>

        <div>
          <label htmlFor="videoUrl" className={inputClass.label}>
            Video Url
          </label>
          <input
            id="videoUrl"
            type="url"
            {...register("learningResource.resourceUrl" as const)}
            className={inputClass.input}
          />
        </div>
      </div>
    </div>
  );
};

export default UrlInput;
