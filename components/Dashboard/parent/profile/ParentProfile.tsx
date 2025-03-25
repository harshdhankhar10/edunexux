"use client"
import React, { useState } from 'react';
// import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Edit, User, Mail, Phone, Bell, Shield, LogOut, Key, Upload, Save, Lock, UserCog, Users, Home, Wallet } from 'lucide-react';
import { student } from '@/components/Dashboard/parent/data/mockData';

// Mock parent profile data
const parentProfile = {
  id: 'p1',
  name: 'Michael Johnson',
  email: 'michael.johnson@example.com',
  phone: '(555) 123-4567',
  address: '123 Main St, Anytown, CA 12345',
  avatar: 'https://i.pravatar.cc/150?img=12',
  occupation: 'Software Engineer',
  preferredContact: 'email',
  emergencyContact: 'Sarah Johnson (Wife) - (555) 789-1234',
  relationship: 'Father',
  notificationPreferences: {
    email: true,
    sms: true,
    app: true,
    attendance: true,
    grades: true,
    behavior: true,
    announcements: true,
    meetings: true
  },
  paymentInfo: {
    cards: [
      {
        id: 'card1',
        type: 'Visa',
        last4: '4242',
        expiry: '05/25'
      },
      {
        id: 'card2',
        type: 'Mastercard',
        last4: '8888',
        expiry: '12/24'
      }
    ]
  }
};

// Mock children data
const children = [
  student,
  {
    id: '2',
    name: 'Emma Johnson',
    grade: '5th Grade',
    avatar: 'https://i.pravatar.cc/150?img=43'
  }
];

const ParentProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(parentProfile);
  const [selectedChild, setSelectedChild] = useState(children[0].id);
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the updated profile to a backend
    console.log('Updated profile:', profile);
    setIsEditing(false);
    // Show success message
    alert('Profile updated successfully!');
  };
  
  const handleNotificationChange = (key: string, value: boolean) => {
    setProfile({
      ...profile,
      notificationPreferences: {
        ...profile.notificationPreferences,
        [key]: value
      }
    });
  };
  
  return (
    <>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600">Manage your account information and settings</p>
        </div>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="w-full max-w-md grid grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="children">Children</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="relative w-32 h-32 mb-4">
                    <Avatar className="w-full h-full border-4 border-white shadow-md">
                      <AvatarImage src={profile.avatar} alt={profile.name} />
                      <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <div className="absolute bottom-0 right-0">
                        <label htmlFor="avatar-upload" className="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full cursor-pointer shadow-md">
                          <Upload className="w-4 h-4" />
                          <input id="avatar-upload" type="file" className="hidden" />
                        </label>
                      </div>
                    )}
                  </div>
                  
                  <h2 className="text-xl font-bold text-center">{profile.name}</h2>
                  <p className="text-gray-500 mb-4">{profile.relationship}</p>
                  
                  <div className="w-full space-y-4">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm">{profile.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm">{profile.phone}</span>
                    </div>
                    <div className="flex items-start">
                      <Home className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                      <span className="text-sm">{profile.address}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 w-full">
                    {!isEditing ? (
                      <Button 
                        className="w-full"
                        variant="outline"
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    ) : (
                      <Button 
                        className="w-full"
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                      >
                        Cancel Editing
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <form onSubmit={handleProfileUpdate}>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <Label htmlFor="name">Full Name</Label>
                            <Input 
                              id="name" 
                              value={profile.name}
                              onChange={(e) => setProfile({...profile, name: e.target.value})}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email"
                              type="email"
                              value={profile.email}
                              onChange={(e) => setProfile({...profile, email: e.target.value})}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <Label htmlFor="phone">Phone</Label>
                            <Input 
                              id="phone"
                              value={profile.phone}
                              onChange={(e) => setProfile({...profile, phone: e.target.value})}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="occupation">Occupation</Label>
                            <Input 
                              id="occupation"
                              value={profile.occupation}
                              onChange={(e) => setProfile({...profile, occupation: e.target.value})}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <Label htmlFor="address">Address</Label>
                          <Input 
                            id="address"
                            value={profile.address}
                            onChange={(e) => setProfile({...profile, address: e.target.value})}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <Label htmlFor="relationship">Relationship to Child</Label>
                            <Select 
                              value={profile.relationship}
                              onValueChange={(value) => setProfile({...profile, relationship: value})}
                            >
                              <SelectTrigger id="relationship">
                                <SelectValue placeholder="Select relationship" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Father">Father</SelectItem>
                                <SelectItem value="Mother">Mother</SelectItem>
                                <SelectItem value="Guardian">Guardian</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="preferredContact">Preferred Contact Method</Label>
                            <Select 
                              value={profile.preferredContact}
                              onValueChange={(value) => setProfile({...profile, preferredContact: value})}
                            >
                              <SelectTrigger id="preferredContact">
                                <SelectValue placeholder="Select contact method" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="email">Email</SelectItem>
                                <SelectItem value="phone">Phone</SelectItem>
                                <SelectItem value="sms">SMS</SelectItem>
                                <SelectItem value="app">App Notification</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <Label htmlFor="emergency">Emergency Contact</Label>
                          <Input 
                            id="emergency"
                            value={profile.emergencyContact}
                            onChange={(e) => setProfile({...profile, emergencyContact: e.target.value})}
                          />
                        </div>
                      </>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                            <p>{profile.name}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Email</h3>
                            <p>{profile.email}</p>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                            <p>{profile.phone}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Occupation</h3>
                            <p>{profile.occupation}</p>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Address</h3>
                          <p>{profile.address}</p>
                        </div>
                        
                        <Separator />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Relationship to Child</h3>
                            <p>{profile.relationship}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Preferred Contact Method</h3>
                            <p className="capitalize">{profile.preferredContact}</p>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Emergency Contact</h3>
                          <p>{profile.emergencyContact}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  
                  {isEditing && (
                    <CardFooter className="flex justify-end space-x-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </CardFooter>
                  )}
                </form>
              </Card>
              
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Account Security</CardTitle>
                  <CardDescription>Manage your account security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center">
                          <Lock className="h-5 w-5 text-gray-500 mr-2" />
                          <h3 className="font-medium">Password</h3>
                        </div>
                        <Button variant="outline" size="sm">
                          <Key className="h-4 w-4 mr-2" />
                          Change
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500">Last changed: 3 months ago</p>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center">
                          <Shield className="h-5 w-5 text-gray-500 mr-2" />
                          <h3 className="font-medium">Two-Factor Authentication</h3>
                        </div>
                        <Button variant="outline" size="sm">
                          Setup
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500">Enhance your account security</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium mb-3">Recent Login Activity</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium">Website Login</p>
                          <p className="text-xs text-gray-500">192.168.1.1 - Chrome on Windows</p>
                        </div>
                        <p className="text-sm text-gray-500">Today, 9:32 AM</p>
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium">Mobile App Login</p>
                          <p className="text-xs text-gray-500">Mobile Device - iPhone 13</p>
                        </div>
                        <p className="text-sm text-gray-500">Yesterday, 7:15 PM</p>
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium">Website Login</p>
                          <p className="text-xs text-gray-500">192.168.1.1 - Chrome on Windows</p>
                        </div>
                        <p className="text-sm text-gray-500">Sep 12, 2023, 8:45 AM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="children" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {children.map((child) => (
                <Card key={child.id} className={`transition-all hover:shadow-md ${selectedChild === child.id ? 'ring-2 ring-primary' : ''}`} onClick={() => setSelectedChild(child.id)}>
                  <CardContent className="p-6 flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={child.avatar} alt={child.name} />
                      <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-bold">{child.name}</h3>
                    <p className="text-gray-500 mb-3">{child.grade}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="flex items-center justify-center p-6 border-dashed">
                <div className="text-center">
                  <UserCog className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium mb-2">Add Another Child</h3>
                  <p className="text-sm text-gray-500 mb-4">Connect another child to your account</p>
                  <Button variant="outline">
                    Request Access
                  </Button>
                </div>
              </Card>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Child Details</h2>
              
              {selectedChild && (
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="flex flex-col items-center lg:items-start">
                        <Avatar className="h-32 w-32 mb-4">
                          <AvatarImage src={children.find(c => c.id === selectedChild)?.avatar} alt={children.find(c => c.id === selectedChild)?.name} />
                          <AvatarFallback>{children.find(c => c.id === selectedChild)?.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h3 className="text-xl font-bold">{children.find(c => c.id === selectedChild)?.name}</h3>
                        <p className="text-gray-500 mb-2">{children.find(c => c.id === selectedChild)?.grade}</p>
                        <div className="flex space-x-2 mt-2">
                          <Button variant="outline" size="sm">Edit Info</Button>
                          <Button variant="outline" size="sm">Contact Teacher</Button>
                        </div>
                      </div>
                      
                      <div className="lg:col-span-2 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Student ID</h4>
                            <p className="text-gray-700">S-2023-{selectedChild}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Grade Level</h4>
                            <p className="text-gray-700">{children.find(c => c.id === selectedChild)?.grade}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Homeroom Teacher</h4>
                            <p className="text-gray-700">Mrs. Smith</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Current GPA</h4>
                            <p className="text-gray-700">3.7</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-3">Quick Actions</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            <Button variant="outline" size="sm" className="h-auto py-2">
                              View Grades
                            </Button>
                            <Button variant="outline" size="sm" className="h-auto py-2">
                              Attendance
                            </Button>
                            <Button variant="outline" size="sm" className="h-auto py-2">
                              Schedule Meeting
                            </Button>
                            <Button variant="outline" size="sm" className="h-auto py-2">
                              Submit Excuse
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose how you want to be notified</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">Contact Methods</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <Label htmlFor="notify-email">Email Notifications</Label>
                        </div>
                        <Switch 
                          id="notify-email" 
                          checked={profile.notificationPreferences.email}
                          onCheckedChange={(checked):any => handleNotificationChange('email', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <Label htmlFor="notify-sms">SMS Notifications</Label>
                        </div>
                        <Switch 
                          id="notify-sms" 
                          checked={profile.notificationPreferences.sms}
                          onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Bell className="h-4 w-4 text-gray-500" />
                          <Label htmlFor="notify-app">App Notifications</Label>
                        </div>
                        <Switch 
                          id="notify-app" 
                          checked={profile.notificationPreferences.app}
                          onCheckedChange={(checked) => handleNotificationChange('app', checked)}
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">Notification Types</h3>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="notify-attendance">Attendance Updates</Label>
                        <Switch 
                          id="notify-attendance" 
                          checked={profile.notificationPreferences.attendance}
                          onCheckedChange={(checked) => handleNotificationChange('attendance', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="notify-grades">Grade Reports</Label>
                        <Switch 
                          id="notify-grades" 
                          checked={profile.notificationPreferences.grades}
                          onCheckedChange={(checked) => handleNotificationChange('grades', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="notify-behavior">Behavior Updates</Label>
                        <Switch 
                          id="notify-behavior" 
                          checked={profile.notificationPreferences.behavior}
                          onCheckedChange={(checked) => handleNotificationChange('behavior', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="notify-announcements">Announcements</Label>
                        <Switch 
                          id="notify-announcements" 
                          checked={profile.notificationPreferences.announcements}
                          onCheckedChange={(checked) => handleNotificationChange('announcements', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="notify-meetings">Meeting Reminders</Label>
                        <Switch 
                          id="notify-meetings" 
                          checked={profile.notificationPreferences.meetings}
                          onCheckedChange={(checked) => handleNotificationChange('meetings', checked)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Manage your payment information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {profile.paymentInfo.cards.map((card) => (
                        <div key={card.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <div className="h-8 w-12 bg-primary rounded mr-3 flex items-center justify-center text-white text-xs font-bold">
                              {card.type}
                            </div>
                            <div>
                              <p className="text-sm font-medium">•••• •••• •••• {card.last4}</p>
                              <p className="text-xs text-gray-500">Expires {card.expiry}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                      ))}
                      
                      <Button variant="outline" size="sm" className="w-full mt-3">
                        <Wallet className="h-4 w-4 mr-2" />
                        Add Payment Method
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Language & Accessibility</CardTitle>
                    <CardDescription>Customize your experience</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="language">Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="high-contrast">High Contrast Mode</Label>
                      <Switch id="high-contrast" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="text-size">Larger Text</Label>
                      <Switch id="text-size" />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Account Actions</CardTitle>
                  <CardDescription>Manage your account settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="justify-start">
                      <UserCog className="h-4 w-4 mr-2" />
                      Update Account Info
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Manage Family Access
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Shield className="h-4 w-4 mr-2" />
                      Privacy Settings
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                    <h3 className="text-red-800 font-medium mb-2">Danger Zone</h3>
                    <p className="text-sm text-red-700 mb-4">These actions are permanent and cannot be undone.</p>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="outline" className="bg-white text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                        Delete Account Data
                      </Button>
                      <Button variant="outline" className="bg-white text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out from All Devices
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ParentProfile;
