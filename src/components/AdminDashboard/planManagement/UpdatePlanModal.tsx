import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonButton from "@/common/button/CommonButton";
import CommonSelect from "@/common/custom/CommonSelect";
import MediumHeader from "@/common/header/MediumHeader";
import { createOptions } from "@/help/help";
import { useGetStudentTypeApiQuery } from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import { useUpdatePricePlanMutation } from "@/store/features/adminDashboard/planAndFaq/PricePlanApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import React, { useEffect } from "react";
import { Controller, Resolver, useFieldArray, useForm } from "react-hook-form";
import CommonBorderWrapper from "../reuseable/CommonBorderWrapper";
import FormHeader from "../reuseable/FormHeader";
import ModalCloseButton from "../reuseable/ModalCloseButton";
import { billingCycleOptions, inputClass, priceOptions } from "./PlanForm";
import { planFormSchema, PlanFormValues } from "./schema";

interface UpdatePlanModalProps {
  onClose: () => void;
  planData: PlanFormValues | null;
  selectedPlanId: string | null;
}

const UpdatePlanModal: React.FC<UpdatePlanModalProps> = ({
  planData,
  onClose,
  selectedPlanId,
}) => {
  const { data } = useGetStudentTypeApiQuery({});
  const userTypes = data?.data.map((item) => item.typeName) ?? [];
  const userTypeOptions = createOptions(userTypes);

  const formattedPlanData = planData
    ? {
        ...planData,
        billingCycle: planData.billingCycle as "Monthly" | "Yearly",
      }
    : undefined;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<PlanFormValues>({
    resolver: zodResolver(planFormSchema) as Resolver<PlanFormValues>,
    defaultValues: formattedPlanData,
  });

  useEffect(() => {
    reset(planData ?? {});
  }, [planData, reset]);

  const { fields, append } = useFieldArray({
    control,
    name: "planFeatures",
  });

  const [updatePlan, { isLoading }] = useUpdatePricePlanMutation();

  const handleSubmitForm = async (data: PlanFormValues) => {
    try {
      if (selectedPlanId) {
        await updatePlan({ id: selectedPlanId, data }).unwrap();
        onClose();
      }
    } catch (error) {
      console.error("Failed to update plan:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh] relative">
        <ModalCloseButton onClick={onClose} />
        <FormHeader title="Update Plan" />

        <CommonBorderWrapper className="!border-0 !rounded-none">
          <form className="space-y-6" onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <input
                  type="number"
                  id="price"
                  className={inputClass.input}
                  {...register("price", { valueAsNumber: true })}
                  placeholder="Enter plan price"
                />
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
              <CommonButton type="button" onClick={onClose}>
                Cancel
              </CommonButton>
              <CommonButton
                type="submit"
                className="!bg-[linear-gradient(103deg,#0076F5_6.94%,#0058B8_99.01%)] !text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <ButtonWithLoading title="Updating..." />
                ) : (
                  "Update Plan"
                )}
              </CommonButton>
            </div>
          </form>
        </CommonBorderWrapper>
      </div>
    </div>
  );
};

export default UpdatePlanModal;
