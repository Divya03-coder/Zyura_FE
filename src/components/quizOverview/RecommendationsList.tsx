import { NotebookText } from "lucide-react";

interface RecommendationsListProps {
    items: string[];
}

const RecommendationsList: React.FC<RecommendationsListProps> = ({ items }) => (
    <ul className="space-y-2">
        {items.map((item, index) => (
            <li
                key={index}
                className="flex items-center p-2 bg-blue-50 rounded-md text-blue-800"
            >
                <div className="mr-2 text-blue-500"><NotebookText /></div>
                {index + 1}. {item}
            </li>
        ))}
    </ul>
);

export default RecommendationsList;
