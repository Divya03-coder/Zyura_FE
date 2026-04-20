/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import CommonWrapper from "@/common/CommonWrapper";
import PricingCard from "@/components/PricingCard";
import { useGetAllPricingQuery } from "@/store/features/pricing/pricing.api";
import GlobalLoader2 from "@/common/GlobalLoader2";
import { useInitiatePaymentMutation } from "@/store/features/payment/payment.api";
import { useMastercardCheckout } from "@/hooks/useMastercardCheckout";
import { toast } from "sonner";

import { useGetMeQuery } from "@/store/features/auth/auth.api";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/features/auth/auth.slice";

const Pricing = () => {
  const user = useSelector(selectUser);
  const { data: userData } = useGetMeQuery(undefined, {
    skip: !user?.account?._id,
    refetchOnMountOrArgChange: true,
  });
  const userAccount = userData?.data?.account;

  const [activeCycle, setActiveCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const { data: userPricingData, isLoading: pricingLoading } =
    useGetAllPricingQuery({});
  const plans = userPricingData?.data || [];

  console.log("Debug Pricing:", {
    userId: user?.account?._id,
    userPlanId: userAccount?.planId,
    plans: plans,
    isSubscribed: userAccount?.isSubscribed,
    userAccountFull: userAccount,
  });

  const [initiatePayment, { isLoading: isPaymentLoading }] =
    useInitiatePaymentMutation();
  const { startCheckout } = useMastercardCheckout();

  const handleUpgrade = async (planId: string) => {
    try {
      const response = await initiatePayment({
        planId,
        redirectUrl: `${window.location.origin}/checkout/success?type=plan_upgrade`,
      }).unwrap();
      if (response.success && response.data?.sessionId) {
        // URL parameters will be used for verification (no sessionStorage needed)
        // const successUrl = `${window.location.origin}/checkout/success?orderId=${response.data.paymentId}&type=plan_upgrade`;
        // const successUrl = `${window.location.origin}/checkout/success?orderId=${response.data.paymentId}&type=plan_upgrade`;
        startCheckout(response.data.sessionId);
        // console.log("url:", successUrl);
      } else {
        toast.error("Failed to initiate payment. Please try again.");
      }
    } catch (error: any) {
      console.error("Payment initiation failed:", error);
      toast.error(error?.data?.message || "Payment initiation failed");
    }
  };

  /* --------------------------------
      Filter plans by billing cycle
  --------------------------------- */
  const filteredPlans = useMemo(() => {
    return plans.filter(
      (plan: any) => plan.billingCycle.toLowerCase() === activeCycle
    );
  }, [plans, activeCycle]);

  return (
    <div className="bg-white pb-10">
      <CommonWrapper>
        <div className="text-center pt-20">
          <h2 className="text-7xl text-slate-700 font-semibold font-bricolage mb-2">
            Upgrade your Plan
          </h2>

          <p className="text-2xl text-slate-700 font-semibold mb-6">
            Unlock advanced features and get more powerful tools.
          </p>

          {/* ------------------
              Monthly / Yearly Tab
          ------------------- */}
          <div className="inline-flex border border-slate-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setActiveCycle("monthly")}
              className={`px-6 py-2 text-sm font-medium ${
                activeCycle === "monthly"
                  ? "bg-blue-main text-white"
                  : "bg-white text-slate-700"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setActiveCycle("yearly")}
              className={`px-6 py-2 text-sm font-medium ${
                activeCycle === "yearly"
                  ? "bg-blue-main text-white"
                  : "bg-white text-slate-700"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* ------------------
            Pricing cards
        ------------------- */}
        {pricingLoading ? (
          <GlobalLoader2 />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-9 items-center justify-center mt-24 p-4">
            {filteredPlans.map((plan: any) => {
              const isCurrentPlan = userAccount?.planId === plan._id;
              return (
                <PricingCard
                  key={plan._id}
                  title={plan.planName}
                  price={`$${plan.price}`}
                  period={`/per ${plan.billingCycle.toLowerCase()}`}
                  description={plan.description}
                  features={plan.planFeatures.map(
                    (f: any) => `${f.featureName} (${f.featureLimit})`
                  )}
                  buttonText={
                    isCurrentPlan
                      ? "Current Plan"
                      : isPaymentLoading
                      ? "Processing..."
                      : "Upgrade Your plan"
                  }
                  onUpgrade={() => !isCurrentPlan && handleUpgrade(plan._id)}
                  disabled={isCurrentPlan || isPaymentLoading}
                />
              );
            })}
          </div>
        )}
      </CommonWrapper>
    </div>
  );
};

export default Pricing;
