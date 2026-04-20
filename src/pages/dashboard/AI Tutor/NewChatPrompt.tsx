// components/NewChatPrompt.tsx

export default function NewChatPrompt() {
    return (
        <div className="flex flex-col items-center justify-center p-6 h-full">
            <div className="max-w-md text-center">
                <img src="/logo.svg" alt="Medical AI" className="h-48 w-48 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Medical AI Assistant</h2>
                <p className="text-gray-600 mb-4">Your Personalized Learning Companion</p>
                <p className="text-gray-500 text-sm">
                    Ask about medical concepts, exam preparation, clinical scenarios, or research summaries.
                </p>
            </div>
        </div>
    );
}