import CommonHeader from "@/common/header/CommonHeader";

interface FormHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({
  title,
  subtitle,
  className,
}) => {
  return (
    <div className={className}>
      <CommonHeader className="!text-2xl !font-semibold !font-inter text-gray-900 mb-2.5">
        {title}
      </CommonHeader>
      {subtitle && <p className="text-gray-500 text-sm mb-6">{subtitle}</p>}
    </div>
  );
};

export default FormHeader;
