"use client"
import React, { useState } from 'react';
// import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock teachers list
const teachers = [
  { id: 't1', name: 'Mrs. Smith', subject: 'Math' },
  { id: 't2', name: 'Mr. Johnson', subject: 'Science' },
  { id: 't3', name: 'Ms. Davis', subject: 'English' },
  { id: 't4', name: 'Mr. Wilson', subject: 'History' },
  { id: 't5', name: 'Mrs. Brown', subject: 'Art' },
];

const Compose: React.FC = () => {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the message
    console.log({ recipient, subject, message });
    
    // Clear form after submission
    setRecipient('');
    setSubject('');
    setMessage('');
    
    // Show success message (in a real app, you'd use a toast/notification)
    alert('Message sent successfully!');
  };

  return (
    <>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compose Message</h1>
          <p className="text-gray-600">Write new messages to teachers</p>
        </div>
        
        <Card className="w-full max-w-2xl mx-auto">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>New Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="recipient">Recipient</Label>
                <Select value={recipient} onValueChange={setRecipient} required>
                  <SelectTrigger id="recipient">
                    <SelectValue placeholder="Select a teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map(teacher => (
                      <SelectItem key={teacher.id} value={teacher.id}>
                        {teacher.name} ({teacher.subject})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  value={subject} 
                  onChange={(e) => setSubject(e.target.value)} 
                  placeholder="Enter message subject" 
                  required 
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  placeholder="Type your message here..." 
                  className="min-h-[150px]"
                  required 
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" type="button" onClick={() => {
                setRecipient('');
                setSubject('');
                setMessage('');
              }}>
                Cancel
              </Button>
              <Button type="submit">Send Message</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Compose;
