// components/ChatWindow.tsx
import { useContext, useState, useEffect, useRef } from 'react';
import NewChatPrompt from './NewChatPrompt';
import ChatMessages from './ChatMessages';
import InputField from './InputField';
import { ChatContext, ChatContextType, Message } from './AITutor';
import { useSendQuestionMutation, useGetHistoryQuery, IMessage } from '@/store/features/aiTutor/aiTutor.api';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';



export default function ChatWindow() {
    const { currentChatId, setCurrentChatId } = useContext(ChatContext) as ChatContextType;
    const [inputValue, setInputValue] = useState<string>('');
    const [displayMessages, setDisplayMessages] = useState<Message[]>([]);
    
    // Using a ref to track if we are waiting for a response to show loading state
    // We cannot solely rely on isLoading from mutation because we might want to keep the loader bits longer or handle transitions
    const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
    
    const lastMessageRef = useRef<HTMLLIElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollBehaviorRef = useRef<ScrollBehavior>('auto');

    const [sendQuestion] = useSendQuestionMutation();
    
    // Skip query if no currentChatId
    // We add refetchOnMountOrArgChange to ensure we get fresh data when switching threads
    const { data: historyData, isLoading: isHistoryLoading, refetch: refetchHistory } = useGetHistoryQuery(currentChatId!, {
        skip: !currentChatId,
        refetchOnMountOrArgChange: true
    });

    // Reset view when switching chats
    useEffect(() => {
        if (!currentChatId) {
            setDisplayMessages([]); // Clear messages for new chat prompt
            setInputValue('');
        }
        // Force instant scroll when switching sessions
        scrollBehaviorRef.current = 'auto';
    }, [currentChatId]);

    // Handle History Data
    useEffect(() => {
        if (currentChatId && historyData) {
            const messages: Message[] = [];
            // Assuming the backend returns messages in chronologic or reverse-chronologic order.
            // If the backend returns newest first (reverse chronological), we reverse it back to chronological (oldest first)
            const sortedHistory = [...historyData].reverse(); 
            
            sortedHistory.forEach(item => {
                item.messages.forEach((msg: IMessage) => {
                    messages.push({
                        role: msg.type === 'HumanMessage' ? 'user' : 'ai',
                        content: msg.content
                    });
                });
            });
            
            setDisplayMessages(messages);
        }
    }, [historyData, currentChatId]);

    // Auto-scroll logic
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: scrollBehaviorRef.current });
    };

    useEffect(() => {
        scrollToBottom();
    }, [displayMessages, isWaitingForResponse]);


    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const questionText = inputValue;
        setInputValue('');
        
        // Use smooth scroll for new user interactions
        scrollBehaviorRef.current = 'smooth';

        // Optimistic Update: Show user message immediately
        const optimisticMsg: Message = { role: 'user', content: questionText };
        setDisplayMessages(prev => [...prev, optimisticMsg]);
        setIsWaitingForResponse(true);

        try {
            let responseData;
            
            if (currentChatId) {
                // Existing Chat
                responseData = await sendQuestion({ question: questionText, thread_id: currentChatId }).unwrap();
                // Refetch history to get updated messages from backend
                refetchHistory();
            } else {
                // New Chat
                responseData = await sendQuestion({ question: questionText }).unwrap();
                setCurrentChatId(responseData.thread_id);
            }

            // Immediately append AI response from the mutation result
            if (responseData && responseData.response) {
                const aiMsg: Message = { role: 'ai', content: responseData.response };
                setDisplayMessages(prev => [...prev, aiMsg]);
            }
            
        } catch (error: any) {
            console.error('AI Tutor error:', error);
            toast.error(error?.data?.message || 'Failed to get AI response.');
        } finally {
            setIsWaitingForResponse(false);
        }
    };

    return (
        <section className="flex-1 flex flex-col mb-1 scrollbar-hide h-full overflow-hidden">
            {/* <header className="border-b border-gray-200 pb-4 mb-4 shrink-0">
                <h2 className="text-xl font-semibold">AI Tutor</h2>
            </header> */}
            
            <div className="flex-1 overflow-y-auto custom-scrollbar thin-scrollbar flex flex-col">
                {!currentChatId && displayMessages.length === 0 ? (
                    <NewChatPrompt />
                ) : (
                    <div className="space-y-4 flex-1">
                        {/* Only show full spinner if we are loading history AND have no messages to show.
                            This prevents the chat disappearing when switching threads or sending first message. */}
                        {isHistoryLoading && displayMessages.length === 0 ? (
                             <div className="flex justify-center p-8 h-full items-center">
                                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                            </div>
                        ) : (
                            <>
                                <ChatMessages messages={displayMessages} lastMessageRef={lastMessageRef} />
                                
                                {isWaitingForResponse && (
                                    <div className="flex items-start gap-3 mb-4 animate-fadeIn">
                                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-semibold shrink-0">
                                            AI
                                        </div>
                                        <div className="bg-gray-100 p-4 rounded-lg rounded-tl-none">
                                            <div className="flex gap-1.5 grayscale opacity-60">
                                                <span className="w-2 h-2 bg-gray-600 rounded-full animate-[bounce_1s_infinite_0ms]"></span>
                                                <span className="w-2 h-2 bg-gray-600 rounded-full animate-[bounce_1s_infinite_200ms]"></span>
                                                <span className="w-2 h-2 bg-gray-600 rounded-full animate-[bounce_1s_infinite_400ms]"></span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </>
                        )}
                    </div>
                )}
            </div>

            <div className="shrink-0 px-1">
                <InputField 
                    value={inputValue} 
                    onChange={setInputValue} 
                    onSend={handleSend} 
                    disabled={isWaitingForResponse} 
                />
            </div>
        </section>
    );
}