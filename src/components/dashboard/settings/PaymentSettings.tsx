import { CreditCard } from "lucide-react";
import { useState } from "react";
import { PaymentSettingsProps } from "./types";

const PaymentSettings = ({ paymentMethods }: PaymentSettingsProps) => {
  const [billingInfo] = useState({
    subscriptionPlan: "Premium",
    nextBilling: "Oct 26, 2025",
    amount: "$29.99",
  });

  return (
    <div className="space-y-8">
      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <h3 className="font-semibold text-lg text-green-900 mb-4">
          Current Subscription
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="font-medium text-green-800">Plan</div>
            <div className="text-green-700">{billingInfo.subscriptionPlan}</div>
          </div>
          <div>
            <div className="font-medium text-green-800">Next Billing</div>
            <div className="text-green-700">{billingInfo.nextBilling}</div>
          </div>
          <div>
            <div className="font-medium text-green-800">Amount</div>
            <div className="text-green-700">{billingInfo.amount}</div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-gray-900 mb-4">Payment Methods</h4>
        <div className="space-y-3">
          {paymentMethods && paymentMethods.length > 0 ? (
            paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-8 h-8 text-gray-400" />
                  <div>
                    <div className="font-medium">
                      {method.type} ending in {method.last4}
                    </div>
                    <div className="text-sm text-gray-600">
                      Expires {method.expiry}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {method.isDefault && (
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      Default
                    </span>
                  )}
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Edit
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-sm">
              No payment methods available.
            </div>
          )}
          <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors">
            + Add Payment Method
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSettings;
