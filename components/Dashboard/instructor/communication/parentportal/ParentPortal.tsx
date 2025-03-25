'use client';

import { useState } from 'react';
import { MessageCircle, Search, Send, User, Phone, Mail, Clock } from 'lucide-react';

// Temporary data
const students = [
  {
    id: 1,
    name: 'Alice Johnson',
    grade: '10th Grade',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    parent: {
      name: 'Sarah Johnson',
      phone: '(555) 123-4567',
      email: 'sarah.j@email.com',
      preferredContact: 'email',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
    }
  },
  {
    id: 2,
    name: 'Bob Smith',
    grade: '10th Grade',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100',
    parent: {
      name: 'Michael Smith',
      phone: '(555) 234-5678',
      email: 'michael.s@email.com',
      preferredContact: 'phone',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
    }
  },
  {
    id: 3,
    name: 'Carol Williams',
    grade: '10th Grade',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100',
    parent: {
      name: 'Jennifer Williams',
      phone: '(555) 345-6789',
      email: 'jennifer.w@email.com',
      preferredContact: 'email',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100'
    }
  }
];

interface Message {
  id: number;
  studentId: number;
  content: string;
  timestamp: Date;
  type: 'sent' | 'received';
}

const initialMessages: Record<number, Message[]> = {
  1: [
    { id: 1, studentId: 1, content: 'Hello Mrs. Johnson, Alice has been doing exceptionally well in mathematics this semester.', timestamp: new Date('2024-03-20T10:00:00'), type: 'sent' },
    { id: 2, studentId: 1, content: 'Thank you for letting me know! We\'ve been working hard at home too.', timestamp: new Date('2024-03-20T10:05:00'), type: 'received' },
  ],
  2: [
    { id: 3, studentId: 2, content: 'Mr. Smith, I\'d like to discuss Bob\'s recent science project performance.', timestamp: new Date('2024-03-19T14:30:00'), type: 'sent' },
  ],
  3: []
};

export default function ParentContactPage() {
  const [selectedStudent, setSelectedStudent] = useState<typeof students[0] | null>(null);
  const [messages, setMessages] = useState<Record<number, Message[]>>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.parent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedStudent) return;

    const message: Message = {
      id: Math.max(...Object.values(messages).flat().map(m => m.id), 0) + 1,
      studentId: selectedStudent.id,
      content: newMessage,
      timestamp: new Date(),
      type: 'sent'
    };

    setMessages(prev => ({
      ...prev,
      [selectedStudent.id]: [...(prev[selectedStudent.id] || []), message]
    }));
    setNewMessage('');
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-white">
      {/* Students List */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Parent Communications</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search students or parents..."
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
              <div className="relative">
                {student.avatar ? (
                  <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                )}
                {student.parent.avatar && (
                  <img 
                    src={student.parent.avatar} 
                    alt={student.parent.name} 
                    className="w-6 h-6 rounded-full absolute -bottom-1 -right-1 border-2 border-white"
                  />
                )}
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900">{student.name}</p>
                <p className="text-sm text-gray-500">{student.parent.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedStudent ? (
        <div className="flex-1 flex flex-col">
          {/* Parent Info Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {selectedStudent.parent.avatar ? (
                  <img src={selectedStudent.parent.avatar} alt={selectedStudent.parent.name} className="w-12 h-12 rounded-full" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                    <User className="w-7 h-7 text-white" />
                  </div>
                )}
                <div className="ml-3">
                  <h2 className="text-lg font-semibold text-gray-800">{selectedStudent.parent.name}</h2>
                  <p className="text-sm text-gray-500">Parent of {selectedStudent.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-2" />
                  <span className="text-sm">{selectedStudent.parent.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-2" />
                  <span className="text-sm">{selectedStudent.parent.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages[selectedStudent.id]?.map(message => (
              <div
                key={message.id}
                className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.type === 'sent'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p>{message.content}</p>
                  <div className="flex items-center mt-1">
                    <Clock className={`w-3 h-3 ${
                      message.type === 'sent' ? 'text-blue-200' : 'text-gray-400'
                    }`} />
                    <p className={`text-xs ml-1 ${
                      message.type === 'sent' ? 'text-blue-200' : 'text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
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
            <p className="text-gray-500">Select a student to message their parent</p>
          </div>
        </div>
      )}
    </div>
  );
}