type TDiagramProps = {
    image: string;
    title: string;
};

export default function DiagramCard({ image, title }: TDiagramProps) {
    return (
        <div className="relative max-w-xs rounded-xl overflow-hidden shadow-md bg-white">
            <img
                src={image}
                alt={title}
                className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-0 w-full bg-white/80 px-3 py-2">
                <p className="text-gray-800 font-medium">{title}</p>
            </div>
        </div>
    );
}
