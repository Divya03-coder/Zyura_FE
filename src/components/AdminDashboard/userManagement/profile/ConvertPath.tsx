import { useLocation } from "react-router-dom";

const ConvertPath = () => {
  const { pathname } = useLocation();

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .filter((segment) => segment !== "admin" && !/^[a-f\d]{24}$/i.test(segment))
    .map((segment) =>
      segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    );

  return (
    <div className="mb-6">
      <p className="text-sm text-gray-500">
        Dashboard {" > "}
        {segments.map((item, index) => {
          const isLast = index === segments.length - 1;

          return (
            <span key={index}>
              {isLast ? (
                <span className="text-gray-800 font-medium">{item}</span>
              ) : (
                <span>{item}</span>
              )}
              {!isLast && " > "}
            </span>
          );
        })}
      </p>
    </div>
  );
};

export default ConvertPath;
