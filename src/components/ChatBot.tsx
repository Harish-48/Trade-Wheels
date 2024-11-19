import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const predefinedQuestions = [
  {
    q: "How do I buy a car?",
    a: "To buy a car: 1. Create a buyer account 2. Browse available cars 3. Add to cart 4. Complete the purchase process"
  },
  {
    q: "How do I sell my car?",
    a: "To sell your car: 1. Create a seller account 2. Click 'Add New Car' 3. Fill in car details and upload photos 4. Submit listing"
  },
  {
    q: "Is it safe to buy/sell here?",
    a: "Yes! We verify all users and provide secure payment processing. All transactions are protected."
  },
  {
    q: "How do I contact support?",
    a: "You can reach our support team at support@tradewheels.com or use this chat for common questions."
  }
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Hello! How can I help you today?", isUser: false }
  ]);

  const handleQuestionClick = (question: string, answer: string) => {
    setMessages(prev => [
      ...prev,
      { text: question, isUser: true },
      { text: answer, isUser: false }
    ]);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-80 max-h-[500px] flex flex-col">
          <div className="bg-gray-900 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Trade Wheels Support</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-80">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${
                  msg.isUser
                    ? 'ml-auto bg-yellow-500 text-white'
                    : 'mr-auto bg-gray-100 text-gray-800'
                } rounded-lg p-3 max-w-[80%]`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <h4 className="font-medium text-gray-700 mb-2">
              Common Questions:
            </h4>
            <div className="space-y-2">
              {predefinedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuestionClick(q.q, q.a)}
                  className="block w-full text-left text-sm text-gray-600 hover:bg-gray-100 p-2 rounded"
                >
                  {q.q}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-yellow-500 text-white p-4 rounded-full shadow-lg hover:bg-yellow-600 transition-colors"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}