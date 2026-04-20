// components/InputField.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface InputFieldProps {
    value: string;
    onChange: (value: string) => void;
    onSend: () => void;
    disabled?: boolean;
}

export default function InputField({ value, onChange, onSend, disabled = false }: InputFieldProps) {
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') onSend();
    };

    return (
        <div className="flex items-center space-x-2 border-gray-200 bgwhite">
            <Input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 h-11 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={disabled}
            />
            <Button onClick={onSend} className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer" disabled={disabled}>Send</Button>
        </div>
    );
}