'use client';

import { useState } from 'react';
import { MessageCircle, Search, Send, User } from 'lucide-react';

// Temporary data
const students = [
  { id: 1, name: 'Alice Johnson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
  { id: 2, name: 'Bob Smith', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100' },
  { id: 3, name: 'Carol Williams', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
];

interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  { id: 1, senderId: 0, receiverId: 1, content: 'Hello Alice, how is your progress in Math?', timestamp: new Date('2024-03-20T10:00:00') },
  { id: 2, senderId: 1, receiverId: 0, content: 'Hi teacher, I\'m doing well. Just completed the homework.', timestamp: new Date('2024-03-20T10:05:00') },
];

export default function CommunicationPage() {
  const [selectedStudent, setSelectedStudent] = useState<typeof students[0] | null>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedStudent) return;

    const message: Message = {
      id: messages.length + 1,
      senderId: 0, // 0 represents teacher
      receiverId: selectedStudent.id,
      content: newMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const relevantMessages = messages.filter(
    msg => (msg.senderId === 0 && msg.receiverId === selectedStudent?.id) ||
           (msg.senderId === selectedStudent?.id && msg.receiverId === 0)
  );

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-white">
      {/* Students List */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Messages</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search students..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredStudents.map(student => (
            <div
              key={student.id}
              className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 ${
                selectedStudent?.id === student.id ? 'bg-blue-50' : ''
              }`}
              onClick={() => setSelectedStudent(student)}
            >
              {student.avatar ? (
                <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              )}
              <div className="ml-3">
                <p className="font-medium text-gray-900">{student.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedStudent ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 flex items-center">
            {selectedStudent.avatar ? (
              <img src={selectedStudent.avatar} alt={selectedStudent.name} className="w-10 h-10 rounded-full" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            )}
            <h2 className="ml-3 text-lg font-semibold text-gray-800">{selectedStudent.name}</h2>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {relevantMessages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.senderId === 0 ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.senderId === 0
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p>{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.senderId === 0 ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Select a student to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
}
