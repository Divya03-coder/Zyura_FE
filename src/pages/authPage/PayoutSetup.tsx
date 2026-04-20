import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PayoutSetupData, payoutSetupSchema } from "./schemas";

interface Props {
  onNext: (data: PayoutSetupData) => void;
  onBack: () => void;
  onSkip?: () => void;
  defaultValues?: Partial<PayoutSetupData>;
}

export default function PayoutSetup({
  onNext,
  onBack,
  onSkip,
  defaultValues,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PayoutSetupData>({
    resolver: zodResolver(payoutSetupSchema),
    defaultValues: {
      paymentMethod: "Bank Transfer", // Default as per image or choice
      ...defaultValues,
    },
  });

  const paymentMethod = watch("paymentMethod");

  useEffect(() => {
    if (defaultValues) reset({ ...defaultValues });
  }, [defaultValues, reset]);

  const onSubmit = (data: PayoutSetupData) => {
    onNext(data);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">Pay-out Setup</h2>
        {onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="text-blue-500 underline hover:text-blue-600 font-medium"
          >
            Skip
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* <div>
          <h3 className="text-xl font-semibold mb-1">Payouts</h3>
          <p className="text-gray-600 mb-6">
            Configure how you'd like to receive your earnings
          </p>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Choose Payment Method
            </label>
            <div className="flex items-center space-x-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  {...register("paymentMethod")}
                  value="Bank Transfer"
                  className="mr-2"
                />
                Bank Transfer
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  {...register("paymentMethod")}
                  value="PayPal"
                  className="mr-2"
                />
                PayPal
              </label>
            </div>
            {errors.paymentMethod && (
              <p className="text-red-500 text-sm mt-1">
                {errors.paymentMethod.message}
              </p>
            )}
          </div>
        </div> */}

        {paymentMethod === "Bank Transfer" && (
          <div className="border border-slate-300 rounded-lg p-6 bg-blue-50/10">
            <h4 className="font-semibold mb-4 text-lg">Bank Account Details</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Account Holder name
                </label>
                <input
                  {...register("accountHolderName")}
                  className="w-full p-3 border border-slate-200 rounded-md bg-blue-50/20"
                />
                {errors.accountHolderName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.accountHolderName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Bank name
                </label>
                <input
                  {...register("bankName")}
                  className="w-full p-3 border border-slate-200 rounded-md bg-blue-50/20"
                />
                {errors.bankName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.bankName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Account Number
                </label>
                <input
                  {...register("accountNumber")}
                  className="w-full p-3 border border-slate-200 rounded-md bg-blue-50/20"
                />
                {errors.accountNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.accountNumber.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Routing Number
                </label>
                <input
                  {...register("routingNumber")}
                  className="w-full p-3 border border-slate-200 rounded-md bg-blue-50/20"
                />
                {errors.routingNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.routingNumber.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Account Type
                </label>
                <select
                  {...register("accountType")}
                  className="w-full p-3 border border-slate-200 rounded-md bg-blue-50/20"
                >
                  <option value="">Select Account Type</option>
                  <option value="Savings">Savings</option>
                  <option value="Current">Current</option>
                  <option value="Checking">Checking</option>
                </select>
                {errors.accountType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.accountType.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {paymentMethod === "PayPal" && (
          <div className="border border-slate-300 rounded-lg p-6 bg-blue-50/10">
            <h4 className="font-semibold mb-4 text-lg">PayPal Details</h4>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                PayPal Email
              </label>
              <input
                {...register("paypalEmail")}
                placeholder="email@example.com"
                className="w-full p-3 border border-slate-200 rounded-md bg-blue-50/20"
              />
              {errors.paypalEmail && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.paypalEmail.message}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Payout Schedule - Visual only as per current requirement/no validation provided in schema but in image */}
        <div className="border border-slate-300 rounded-lg p-6 bg-gray-50">
          <h4 className="font-semibold mb-4 text-sm">Payout Schedule</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Minimum pay-out
              </label>
              <input
                type="number"
                placeholder="50"
                className="w-full p-2 border border-slate-200 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Pay-out Frequency
              </label>
              <select className="w-full p-2 border border-slate-200 rounded-md text-sm">
                <option>Monthly</option>
                <option>Weekly</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 border border-slate-300 rounded hover:bg-gray-50 text-gray-700"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isSubmitting ? "Processing..." : "Complete Onboarding"}
          </button>
        </div>
      </form>
    </div>
  );
}
