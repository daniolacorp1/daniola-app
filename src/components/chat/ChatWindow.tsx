import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
}

export const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { chatId } = useParams();
  
  // Fetch messages on component mount
  useEffect(() => {
    const fetchMessages = async () => {
      // Replace with actual fetch logic
      const fetchedMessages: Message[] = [
        // Example messages
        { id: '1', senderId: 'user1', content: 'Hello', timestamp: new Date() },
        { id: '2', senderId: 'user2', content: 'Hi', timestamp: new Date() },
      ];
      setMessages(fetchedMessages);
    };

    fetchMessages();
    // Also set up real-time listeners
  }, [chatId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    
    // Add message to database
    // Update real-time listeners
    // Clear input
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Chat Header */}
      <div className="p-4 border-b">
        <h2>Chat with [User Name]</h2>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.senderId === 'currentUserId' 
                ? 'ml-auto bg-blue-500 text-white' 
                : 'mr-auto bg-gray-200'
            } rounded-lg p-3 max-w-[70%]`}
          >
            {message.content}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
