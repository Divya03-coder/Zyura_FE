// src/components/ProfileSetupTab.tsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ProfileSetupData } from "./schemas";
import {
  useGetAllStudentTypeQuery,
  useGetAllProfessionalTypeQuery,
} from "@/store/features/auth/auth.api";
import { SearchableSelect } from "@/components/SearchableSelect";
import { countries } from "@/data/countries";

interface Props {
  onNext: (data: ProfileSetupData) => void;
  onRoleChange?: (role: Role) => void;
  defaultValues?: Partial<ProfileSetupData>;
}

type Role = "student" | "professional" | "mentor" | "";

type FormValues = {
  role: Role;
  subRole?: string;
  firstName: string;
  lastName?: string;
  country: string;
  university?: string;
  academicYear?: string;
  hospital?: string;
  postgraduateYear?: string;
  experience?: string;
  mentorField?: string;
  currentRole?: string;
  hospitalOrInstitute?: string;
  specialty?: string;
  postgraduateDegree?: string;
  otherSubRole?: string;
};

export default function ProfileSetupTab({
  onNext,
  onRoleChange,
  defaultValues,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const role = watch("role");

  const { data: studentType } = useGetAllStudentTypeQuery({});
  const { data: professionalType } = useGetAllProfessionalTypeQuery({});

  const studentTypes = studentType?.data || [];
  const professionalTypes = professionalType?.data || [];

  const studentOptions = [
    ...studentTypes.map((type: any) => ({
      value: type.typeName,
      label: type.typeName,
    })),
    { value: "Other", label: "Other" },
  ];

  const professionalOptions = [
    ...professionalTypes.map((type: any) => ({
      value: type.typeName,
      label: type.typeName,
    })),
    { value: "Other", label: "Other" },
  ];

  const countriesOptions = countries.map((c) => ({
    value: c,
    label: c,
  }));

  // reset fields when defaultValues change (e.g., user navigates back)
  useEffect(() => {
    if (defaultValues) {
      reset((prev) => ({ ...prev, ...defaultValues }));
    }
  }, [defaultValues, reset]);

  // Notify parent of role change for real-time step updates
  useEffect(() => {
    if (onRoleChange) onRoleChange(role);
  }, [role, onRoleChange]);

  // clear role-specific fields whenever role changes
  useEffect(() => {
    if (role === "student") {
      setValue("hospital", undefined);
      setValue("postgraduateYear", undefined);
      setValue("experience", undefined);
      setValue("mentorField", undefined);
      setValue("currentRole", undefined);
      setValue("hospitalOrInstitute", undefined);
      setValue("specialty", undefined);
      setValue("postgraduateDegree", undefined);
    } else if (role === "professional") {
      setValue("university", undefined);
      setValue("academicYear", undefined);
      setValue("mentorField", undefined);
      setValue("currentRole", undefined);
      setValue("hospitalOrInstitute", undefined);
      setValue("specialty", undefined);
      setValue("postgraduateDegree", undefined);
    } else if (role === "mentor") {
      setValue("university", undefined);
      setValue("academicYear", undefined);
      setValue("hospital", undefined);
      setValue("postgraduateYear", undefined);
      // specialty, experience, postgraduateDegree, currentRole, hospitalOrInstitute are kept for mentor
      setValue("subRole", undefined);
    }
  }, [role, setValue]);

  const onSubmit = (data: FormValues) => {
    const finalData = { ...data };
    if (data.subRole === "Other" && data.otherSubRole) {
      finalData.subRole = data.otherSubRole;
    }
    delete (finalData as any).otherSubRole;
    onNext(finalData as ProfileSetupData);
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-6">
      <h1 className="text-3xl font-bold text-center mb-2">Profile setup</h1>
      <p className="text-center text-gray-500 mb-8">Select Who You Are</p>

      {/* Role selection */}
      <div className="flex gap-4 justify-center mb-8">
        {(["student", "professional", "mentor"] as Role[]).map((r) => (
          <label
            key={r}
            className={`px-6 py-3 rounded-lg border cursor-pointer flex items-center justify-center w-40 transition-all ${
              role === r
                ? "border-blue-main bg-[#F4F7FC] shadow"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <input
              {...register("role")}
              type="radio"
              value={r}
              className="mr-2"
            />
            <span className="capitalize font-medium">{r}</span>
          </label>
        ))}
      </div>

      {!role && (
        <p className="text-center text-red-500 font-medium mb-6">
          {" "}
          Please select a role to continue filling the form{" "}
        </p>
      )}

      {/* Show form only after role is selected */}
      {role && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white border border-slate-300 rounded-lg p-6 space-y-4 shadow-sm"
        >
          {/* Sub role if not mentor */}
          {role !== "mentor" && (
            <div>
              <label className="mb-2 block text-slate-950">
                {role === "student" ? "Student Type" : "Professional Type"}
              </label>
              <SearchableSelect
                options={
                  role === "student" ? studentOptions : professionalOptions
                }
                value={watch("subRole")}
                onChange={(val) => {
                  setValue("subRole", val);
                  if (val !== "Other") {
                    setValue("otherSubRole", undefined);
                  }
                }}
                placeholder={
                  role === "student"
                    ? "Select Student Type"
                    : "Select Professional Type"
                }
                error={errors.subRole?.message}
              />

              {watch("subRole") === "Other" && (
                <div className="mt-4">
                  <label className="mb-2 block text-slate-950 font-medium">
                    Please specify your {role === "student" ? "student" : "professional"} type
                  </label>
                  <input
                    {...register("otherSubRole", {
                      required: watch("subRole") === "Other",
                    })}
                    placeholder="Enter your type"
                    className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-main outline-none"
                  />
                  {errors.otherSubRole && (
                    <p className="text-red-500 text-sm mt-1">
                      Please specify your type
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-slate-950">First Name</label>
              <input
                {...register("firstName")}
                required
                placeholder="First name"
                className="w-full p-3 border border-slate-300 rounded-md"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-slate-950">Last Name</label>
              <input
                {...register("lastName")}
                placeholder="Last name"
                className="w-full p-3 border border-slate-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-slate-950">Country</label>
            <SearchableSelect
              options={countriesOptions}
              value={watch("country")}
              onChange={(val) => {
                setValue("country", val);
                if (val && errors.country) {
                  // handle error clearing if needed
                }
              }}
              placeholder="Select your country"
              error={errors.country?.message}
            />
          </div>

          {/* Student */}
          {role === "student" && (
            <>
              <div>
                <label className="mb-2 block text-slate-950">
                  University/School
                </label>
                <input
                  {...register("university")}
                  placeholder="University/School"
                  className="w-full p-3 border border-slate-300 rounded-md"
                />
                {errors.university && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.university.message}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-2 block text-slate-950">
                  Academic Year
                </label>
                <select
                  {...register("academicYear")}
                  className="w-full p-3 border border-slate-300 rounded-md"
                >
                  <option value="">Select Academic Year</option>
                  <option value="1">Year 1</option>
                  <option value="2">Year 2</option>
                  <option value="3">Year 3</option>
                  <option value="4">Year 4</option>
                  <option value="5">Year 5</option>
                  <option value="6">Year 6</option>
                  <option value="7">Year 7</option>
                </select>
                {errors.academicYear && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.academicYear.message}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Professional */}
          {role === "professional" && (
            <>
              <div>
                <label className="mb-2 block text-slate-950">
                  Hospital/Institute
                </label>
                <input
                  {...register("hospital")}
                  placeholder="Hospital/Institute"
                  className="w-full p-3 border border-slate-300 rounded-md"
                />
                {errors.hospital && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.hospital.message}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-2 block text-slate-950">
                  Postgraduate Year
                </label>
                <input
                  {...register("postgraduateYear")}
                  placeholder="Postgraduate year"
                  className="w-full p-3 border border-slate-300 rounded-md"
                />
                {errors.postgraduateYear && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.postgraduateYear.message}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-2 block text-slate-950">
                  Years of Professional Experience
                </label>
                <input
                  {...register("experience")}
                  placeholder="Years of experience"
                  className="w-full p-3 border border-slate-300 rounded-md"
                />
                {errors.experience && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.experience.message}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Mentor */}
          {role === "mentor" && (
            <>
              <div>
                <label className="mb-2 block text-slate-950">
                  Current Role
                </label>
                <input
                  {...register("currentRole")}
                  placeholder="Current role (e.g., Senior Medical Mentor)"
                  className="w-full p-3 border border-slate-300 rounded-md"
                />
                {errors.currentRole && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.currentRole.message}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-2 block text-slate-950">
                  Hospital/Institute
                </label>
                <input
                  {...register("hospitalOrInstitute")}
                  placeholder="Hospital/Institute"
                  className="w-full p-3 border border-slate-300 rounded-md"
                />
                {errors.hospitalOrInstitute && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.hospitalOrInstitute.message}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-2 block text-slate-950">
                  Medical Specialty
                </label>
                <input
                  {...register("specialty")}
                  placeholder="Medical specialty (e.g., Internal Medicine)"
                  className="w-full p-3 border border-slate-300 rounded-md"
                />
                {errors.specialty && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.specialty.message}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-2 block text-slate-950">
                  Professional Experience (Years)
                </label>
                <input
                  type="number"
                  min={0}
                  {...register("experience")}
                  placeholder="Years of experience"
                  className="w-full p-3 border border-slate-300 rounded-md"
                />
                {errors.experience && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.experience.message}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-2 block text-slate-950">
                  Postgraduate Degree
                </label>
                <input
                  {...register("postgraduateDegree")}
                  placeholder="Postgraduate degree (e.g., MD, Internal Medicine)"
                  className="w-full p-3 border border-slate-300 rounded-md"
                />
                {errors.postgraduateDegree && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.postgraduateDegree.message}
                  </p>
                )}
              </div>
            </>
          )}

          <div className="flex gap-3 mt-3">
            <button
              type="submit"
              className="w-full bg-blue-main text-white p-3 rounded-md cursor-pointer"
            >
              Continue
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
