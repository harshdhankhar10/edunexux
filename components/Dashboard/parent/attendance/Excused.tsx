"use client";

import React, { useState } from 'react';
// import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { FileX, CalendarDays, Clock, CheckCircle2, CloudUpload as FileUpload} from 'lucide-react';


import { format } from 'date-fns';

// Mock data for past excused absences
const pastExcuses = [
  {
    id: 'e1',
    date: '2023-09-05',
    reason: 'Doctor appointment',
    status: 'approved',
    notes: 'Medical checkup at City Medical Center'
  },
  {
    id: 'e2',
    date: '2023-08-22',
    reason: 'Family emergency',
    status: 'approved',
    notes: 'Had to travel to see grandmother who was hospitalized'
  },
  {
    id: 'e3',
    date: '2023-08-15',
    reason: 'Illness',
    status: 'approved',
    notes: 'Fever and cold'
  },
  {
    id: 'e4',
    date: '2023-08-10',
    reason: 'Religious holiday',
    status: 'approved',
    notes: 'Family observance'
  },
  {
    id: 'e5',
    date: '2023-07-05',
    reason: 'Transportation issues',
    status: 'rejected',
    notes: 'Car broke down on the way to school'
  }
];

const ExcusedAbsence: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [reason, setReason] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the submission of the excuse
    console.log({
      date: selectedDate,
      reason,
      notes,
      file
    });
    
    // Show success message (in a real app, would use a toast)
    alert('Absence excuse submitted successfully!');
    
    // Reset form
    setSelectedDate(undefined);
    setReason('');
    setNotes('');
    setFile(null);
  };

  return (
    <>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Excused Absence</h1>
          <p className="text-gray-600">Submit absence excuse notes for your child</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Submit Excuse</CardTitle>
                <CardDescription>Provide details about the absence</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="date">Absence Date</Label>
                    <div className="border rounded-md p-3">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="mx-auto"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="reason">Reason for Absence</Label>
                    <Select value={reason} onValueChange={setReason}>
                      <SelectTrigger id="reason">
                        <SelectValue placeholder="Select reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="illness">Illness</SelectItem>
                        <SelectItem value="doctor">Doctor Appointment</SelectItem>
                        <SelectItem value="family">Family Emergency</SelectItem>
                        <SelectItem value="religious">Religious Observance</SelectItem>
                        <SelectItem value="transportation">Transportation Issues</SelectItem>
                        <SelectItem value="weather">Severe Weather</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea 
                      id="notes" 
                      placeholder="Please provide any details about the absence" 
                      value={notes}
                      onChange={(e:any) => setNotes(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label>Supporting Document (Optional)</Label>
                    <div className="flex items-center justify-center w-full">
                      <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <FileUpload className="w-8 h-8 mb-3 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                          <p className="text-xs text-gray-500">PDF, JPG, PNG (MAX. 10MB)</p>
                        </div>
                        <input id="file-upload" type="file" className="hidden" onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setFile(e.target.files[0]);
                          }
                        }} />
                      </label>
                    </div>
                    {file && (
                      <div className="flex items-center justify-between p-2 mt-2 bg-gray-50 rounded-md">
                        <span className="text-sm truncate">{file.name}</span>
                        <button 
                          type="button" 
                          onClick={() => setFile(null)}
                          className="p-1 text-gray-500 rounded-full hover:bg-gray-200"
                        >
                          <FileX className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => {
                    setSelectedDate(undefined);
                    setReason('');
                    setNotes('');
                    setFile(null);
                  }}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={!selectedDate || !reason}>
                    Submit Excuse
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Past Excused Absences</CardTitle>
                <CardDescription>History of submitted excuse notes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pastExcuses.length === 0 ? (
                    <p className="text-center text-gray-500">No excused absences on record</p>
                  ) : (
                    pastExcuses.map((excuse) => (
                      <div key={excuse.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-2">
                            <CalendarDays className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium">{format(new Date(excuse.date), 'MMMM d, yyyy')}</span>
                          </div>
                          {excuse.status === 'approved' && (
                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                              Approved
                            </Badge>
                          )}
                          {excuse.status === 'pending' && (
                            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                              Pending
                            </Badge>
                          )}
                          {excuse.status === 'rejected' && (
                            <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                              Rejected
                            </Badge>
                          )}
                          {excuse.status === 'submitted' && (
                            <Badge variant="outline" className="bg-blue-100 text-blue-800">
                              Submitted
                            </Badge>
                          )}
                        </div>
                        <div className="mt-2">
                          <p className="text-sm font-medium">{excuse.reason}</p>
                          <p className="text-xs text-gray-500 mt-1">{excuse.notes}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExcusedAbsence;
