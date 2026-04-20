
interface DashboardHeadingProps {
    title: string;
    description?: string;
    titleSize?: string;
    titleColor?: string;
    titleFont?: string;
    descSize?: string;
    descColor?: string;
    descFont?: string;
    className?: string;
}

export default function DashboardHeading({
    title,
    description,
    titleSize = "text-3xl",
    titleColor = "text-black",
    titleFont = "font-semibold",
    descSize = "text-base",
    descColor = "text-[#334155]",
    descFont = "font-normal",
    className = "",
}: DashboardHeadingProps) {
    return (
        <div className={className}>
            <h2 className={`${titleSize} ${titleColor} ${titleFont}`}>
                {title}
            </h2>
            {description && (
                <p className={`${descSize} ${descColor} ${descFont}`}>
                    {description}
                </p>
            )}
        </div>
    );
}

