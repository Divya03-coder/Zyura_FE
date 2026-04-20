export default function TransactionsCard({
  transaction,
}: {
  transaction: any;
}) {
  const isPending = transaction?.status === "Pending";

  return (
    <div className="flex items-center justify-between border border-slate-300 p-4 rounded-[8px]">
      <div>
        <p className="max-w-[220px] text-[#0A0A0A]">
          {transaction?.sessionTitle} with{" "}
          <span className="text-slate-600 underline">
            {transaction?.studentName}
          </span>
        </p>
        <p className="text-sm text-zinc-700">
          {transaction?.createdAt &&
            new Date(transaction.createdAt).toLocaleDateString("en-GB")}
        </p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-green-700 font-medium">
          +${transaction?.amount?.toFixed(2)} fee
        </p>
        <p
          className={`${
            isPending ? "bg-[#CA8A04]" : "bg-green-800"
          } rounded-full text-white text-center mt-4 py-0.5 px-3 min-w-[100px] text-sm`}
        >
          {isPending ? "Due" : "Complete"}
        </p>
      </div>
    </div>
  );
}
