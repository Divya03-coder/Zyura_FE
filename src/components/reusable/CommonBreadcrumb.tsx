import React from "react";
import { ChevronRight } from "lucide-react";
import { BreadcrumbItem } from "../dashboard/gamified-learning/types";
import { Link } from "react-router-dom";

interface BreadcrumbProps {
  breadcrumbs: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumbs }) => {
  return (
    <nav className="flex items-center flex-wrap text-nowrap space-x-1 text-sm text-gray-500 mb-6">
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={index}>
          <Link
            to={breadcrumb.link}
            className={`hover:text-gray-700 transition-colors ${index === breadcrumbs.length - 1
                ? "text-gray-900 font-medium"
                : ""
              }`}
          >
            {breadcrumb.name}
          </Link>
          {index < breadcrumbs.length - 1 && (
            <ChevronRight className="h-4 w-4 text-gray-400" />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
