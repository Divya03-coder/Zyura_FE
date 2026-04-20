import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonButton from "@/common/button/CommonButton";
import CommonSelect from "@/common/custom/CommonSelect";
import MediumHeader from "@/common/header/MediumHeader";
import CommonSpace from "@/common/space/CommonSpace";
import { createOptions } from "@/help/help";
import { useGetStudentTypeApiQuery } from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import { usePostPricePlanMutation } from "@/store/features/adminDashboard/planAndFaq/PricePlanApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import React from "react";
import { Controller, Resolver, useFieldArray, useForm } from "react-hook-form";
import CommonBorderWrapper from "../reuseable/CommonBorderWrapper";
import DashboardTopSection from "../reuseable/DashboardTopSection";
import { planFormSchema, PlanFormValues } from "./schema";

export const inputClass = {
  input:
    "text-sm font-normal  text-[#0F172A]  font-inter leading-[20px] outline-none transition w-full px-4 py-3 border border-border rounded-md ",
  label:
    "text-sm font-normal  text-[#18181B]  font-inter leading-[20px] block mb-2",
  error: "text-red-500 text-sm mt-1",
};

export const billingCycleOptions = [
  { label: "Monthly", value: "Monthly" },
  { label: "Yearly", value: "Yearly" },
] as const;

export const priceOptions = [
  { label: "100/month", value: "100/month" },
  { label: "200/month", value: "200/month" },
  { label: "300/month", value: "300/month" },
  { label: "400/month", value: "400/month" },
  { label: "500/month", value: "500/month" },
  { label: "600/month", value: "600/month" },
  { label: "700/month", value: "700/month" },
  { label: "800/month", value: "800/month" },
  { label: "900/month", value: "900/month" },
  { label: "1000/month", value: "1000/month" },
];

interface PlanFormProps {
  handleCancel: () => void;
}

const PlanForm: React.FC<PlanFormProps> = ({ handleCancel }) => {
  const { data } = useGetStudentTypeApiQuery({});
  const userTypes = data?.data.map((item) => item.typeName) ?? [];
  const userTypeOptions = createOptions(userTypes);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PlanFormValues>({
    resolver: zodResolver(planFormSchema) as Resolver<PlanFormValues>,
    defaultValues: {
      planName: "",

      description: "",
      billingCycle: "Monthly",
      userType: userTypes[0] || "",
      planFeatures: [{ featureName: "", featureLimit: "100/month" }],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "planFeatures",
  });

  const [postPricePlan, { isLoading }] = usePostPricePlanMutation();
  const handleSubmitForm = async (data: PlanFormValues) => {
    try {
      await postPricePlan(data).unwrap();
      handleCancel();
    } catch (error) {
      console.error("Failed to submit plan:", error);
    }
  };

  return (
    <div>
      <DashboardTopSection
        title="Create Plan"
        description="Create a new online event, seminar, or workshop with detailed scheduling and pricing options."
      />

      <CommonSpace>
        <CommonBorderWrapper className=" !border-0 !rounded-none">
          <form className="space-y-6" onSubmit={handleSubmit(handleSubmitForm)}>
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="planName" className={inputClass.label}>
                  Plan Name
                </label>
                <input
                  type="text"
                  id="planName"
                  className={inputClass.input}
                  {...register("planName")}
                  placeholder="Enter plan name"
                />
                {errors.planName && (
                  <p className={inputClass.error}>{errors.planName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="price" className={inputClass.label}>
                  Price
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="price"
                    className={inputClass.input}
                    {...register("price", { valueAsNumber: true })}
                    placeholder="Enter plan price"
                  />
                </div>
                {errors.price && (
                  <p className={inputClass.error}>{errors.price.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="description" className={inputClass.label}>
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                className={inputClass.input}
                {...register("description")}
                placeholder="Enter plan description"
              />
              {errors.description && (
                <p className={inputClass.error}>{errors.description.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="billingCycle" className={inputClass.label}>
                Billing Cycle
              </label>
              <Controller
                control={control}
                name="billingCycle"
                render={({ field }) => (
                  <CommonSelect
                    item={billingCycleOptions}
                    value={field.value}
                    onValueChange={field.onChange}
                    className="w-full"
                  />
                )}
              />
              {errors.billingCycle && (
                <p className={inputClass.error}>
                  {errors.billingCycle.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="userType" className={inputClass.label}>
                User Type
              </label>
              <Controller
                control={control}
                name="userType"
                render={({ field }) => (
                  <CommonSelect
                    item={userTypeOptions}
                    value={field.value}
                    onValueChange={field.onChange}
                    className="w-full"
                  />
                )}
              />
              {errors.userType && (
                <p className={inputClass.error}>{errors.userType.message}</p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center">
                <MediumHeader className="!text-xl !font-normal mb-4">
                  Plan Features
                </MediumHeader>
                <CommonButton
                  type="button"
                  onClick={() =>
                    append({ featureName: "", featureLimit: "100/month" })
                  }
                  className="flex items-center gap-1 !bg-blue-main !text-white"
                >
                  <Plus className="w-4 h-4" /> Add Feature
                </CommonButton>
              </div>

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="gap-6 grid grid-cols-1 md:grid-cols-2 mb-4"
                >
                  <div>
                    <label
                      htmlFor={`featureName-${index}`}
                      className={inputClass.label}
                    >
                      Feature name
                    </label>
                    <input
                      type="text"
                      className={inputClass.input}
                      {...register(
                        `planFeatures.${index}.featureName` as const
                      )}
                    />
                    {errors.planFeatures?.[index]?.featureName && (
                      <p className={inputClass.error}>
                        {errors.planFeatures[index]?.featureName?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor={`featureLimit-${index}`}
                      className={inputClass.label}
                    >
                      Set Limit
                    </label>
                    <Controller
                      control={control}
                      name={`planFeatures.${index}.featureLimit` as const}
                      render={({ field }) => (
                        <CommonSelect
                          item={priceOptions}
                          value={field.value}
                          onValueChange={field.onChange}
                          className="w-full"
                        />
                      )}
                    />
                    {errors.planFeatures?.[index]?.featureLimit && (
                      <p className={inputClass.error}>
                        {errors.planFeatures[index]?.featureLimit?.message}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-4 pt-6 pb-5 sm:pb-0">
              <CommonButton type="button" onClick={handleCancel}>
                Cancel
              </CommonButton>
              <CommonButton
                type="submit"
                className="!bg-[linear-gradient(103deg,#0076F5_6.94%,#0058B8_99.01%)] !text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <ButtonWithLoading title="Creating..." />
                ) : (
                  "Create Plan"
                )}
              </CommonButton>
            </div>
          </form>
        </CommonBorderWrapper>
      </CommonSpace>
    </div>
  );
};

export default PlanForm;
