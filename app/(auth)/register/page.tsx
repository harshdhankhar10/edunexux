"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User,
  Lock,
  Mail,
  Phone,
  BookOpen,
  School,
  Calendar,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  Home,
  MapPin,
  FileText,
  ChevronDown,
  GraduationCap,
  Bookmark,
  ClipboardList,
  UserPlus
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const NewAdmissionForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    previousSchool: '',
    gradeLevel: '',
    courseInterest: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    emergencyContact: '',
    medicalInfo: '',
    documents: [] as File[],
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [documentPreviews, setDocumentPreviews] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, ...files]
      }));

      const previews = files.map(file => URL.createObjectURL(file));
      setDocumentPreviews(prev => [...prev, ...previews]);
    }
  };

  const removeDocument = (index: number) => {
    const newDocuments = [...formData.documents];
    newDocuments.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      documents: newDocuments
    }));

    const newPreviews = [...documentPreviews];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setDocumentPreviews(newPreviews);
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.dob) newErrors.dob = 'Date of birth is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
    }

    if (step === 2) {
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state.trim()) newErrors.state = 'State is required';
      if (!formData.country.trim()) newErrors.country = 'Country is required';
      if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    }

    if (step === 3) {
      if (!formData.previousSchool.trim()) newErrors.previousSchool = 'Previous school is required';
      if (!formData.gradeLevel) newErrors.gradeLevel = 'Grade level is required';
      if (!formData.courseInterest) newErrors.courseInterest = 'Course interest is required';
    }

    if (step === 4) {
      if (!formData.parentName.trim()) newErrors.parentName = 'Parent name is required';
      if (!formData.parentPhone.trim()) newErrors.parentPhone = 'Parent phone is required';
      if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact is required';
    }

    if (step === 5) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        // Reset form after success
        setTimeout(() => {
          router.push('/admissions/success');
        }, 2000);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-2xl font-bold text-blue-600">SmartClass Admissions</span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 hidden md:inline">Have questions?</span>
              <Link 
                href="/contact" 
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Progress Bar */}
          <div className="bg-gray-100 px-6 py-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold text-gray-900">
                New Student Admission - Step {currentStep} of 5
              </h2>
              <span className="text-sm text-blue-600 font-medium">
                {Math.round((currentStep / 5) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${(currentStep / 5) * 100}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg flex items-center"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>Admission submitted successfully! Redirecting...</span>
              </motion.div>
            )}

            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                  <User className="h-5 w-5 text-blue-500 mr-2" />
                  Personal Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.firstName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="John"
                      />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <XCircle className="h-4 w-4 mr-1" /> {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.lastName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Doe"
                      />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <XCircle className="h-4 w-4 mr-1" /> {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="john.doe@example.com"
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <XCircle className="h-4 w-4 mr-1" /> {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="+1 (555) 123-4567"
                      />
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <XCircle className="h-4 w-4 mr-1" /> {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth *
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.dob ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                    {errors.dob && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <XCircle className="h-4 w-4 mr-1" /> {errors.dob}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                      Gender *
                    </label>
                    <div className="relative">
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none ${
                          errors.gender ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                    {errors.gender && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <XCircle className="h-4 w-4 mr-1" /> {errors.gender}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Address Information */}
            {currentStep === 2 && (
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                  <Home className="h-5 w-5 text-blue-500 mr-2" />
                  Address Information
                </h3>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="123 Main St"
                    />
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <XCircle className="h-4 w-4 mr-1" /> {errors.address}
                    </p>
                    )}
                    </div>



                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.city ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="New York"
                      />
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <XCircle className="h-4 w-4 mr-1" /> {errors.city}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State/Province *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.state ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="California"
                      />
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                    {errors.state && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <XCircle className="h-4 w-4 mr-1" /> {errors.state}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.postalCode ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="10001"
                      />
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                    {errors.postalCode && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <XCircle className="h-4 w-4 mr-1" /> {errors.postalCode}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country *
                  </label>
                  <div className="relative">
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none ${
                        errors.country ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="IN">India</option>
                      <option value="other">Other</option>
                    </select>
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  {errors.country && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <XCircle className="h-4 w-4 mr-1" /> {errors.country}
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 3: Academic Information */}
            {currentStep === 3 && (
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                  <BookOpen className="h-5 w-5 text-blue-500 mr-2" />
                  Academic Information
                </h3>

                <div>
                  <label htmlFor="previousSchool" className="block text-sm font-medium text-gray-700 mb-1">
                    Previous School *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="previousSchool"
                      name="previousSchool"
                      value={formData.previousSchool}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.previousSchool ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Name of your previous school"
                    />
                    <School className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  {errors.previousSchool && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <XCircle className="h-4 w-4 mr-1" /> {errors.previousSchool}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="gradeLevel" className="block text-sm font-medium text-gray-700 mb-1">
                      Grade Level Applying For *
                    </label>
                    <div className="relative">
                      <select
                        id="gradeLevel"
                        name="gradeLevel"
                        value={formData.gradeLevel}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none ${
                          errors.gradeLevel ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select grade level</option>
                        <option value="kindergarten">Kindergarten</option>
                        <option value="1">Grade 1</option>
                        <option value="2">Grade 2</option>
                        <option value="3">Grade 3</option>
                        <option value="4">Grade 4</option>
                        <option value="5">Grade 5</option>
                        <option value="6">Grade 6</option>
                        <option value="7">Grade 7</option>
                        <option value="8">Grade 8</option>
                        <option value="9">Grade 9</option>
                        <option value="10">Grade 10</option>
                        <option value="11">Grade 11</option>
                        <option value="12">Grade 12</option>
                        <option value="college">College</option>
                      </select>
                      <Bookmark className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                    {errors.gradeLevel && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <XCircle className="h-4 w-4 mr-1" /> {errors.gradeLevel}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="courseInterest" className="block text-sm font-medium text-gray-700 mb-1">
                      Course/Program Interest *
                    </label>
                    <div className="relative">
                      <select
                        id="courseInterest"
                        name="courseInterest"
                        value={formData.courseInterest}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none ${
                          errors.courseInterest ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select course interest</option>
                        <option value="general">General Education</option>
                        <option value="stem">STEM</option>
                        <option value="arts">Arts & Humanities</option>
                        <option value="business">Business</option>
                        <option value="computer_science">Computer Science</option>
                        <option value="engineering">Engineering</option>
                        <option value="medicine">Medicine</option>
                        <option value="law">Law</option>
                        <option value="other">Other</option>
                      </select>
                      <ClipboardList className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                    {errors.courseInterest && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <XCircle className="h-4 w-4 mr-1" /> {errors.courseInterest}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="medicalInfo" className="block text-sm font-medium text-gray-700 mb-1">
                    Medical Information (Allergies, Conditions, etc.)
                  </label>
                  <textarea
                    id="medicalInfo"
                    name="medicalInfo"
                    value={formData.medicalInfo}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    placeholder="Any medical information we should be aware of..."
                  ></textarea>
                </div>
              </motion.div>
            )}

            {/* Step 4: Parent/Guardian Information */}
            {currentStep === 4 && (
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                  <UserPlus className="h-5 w-5 text-blue-500 mr-2" />
                  Parent/Guardian Information
                </h3>

                <div>
                  <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-1">
                    Parent/Guardian Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="parentName"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.parentName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Jane Doe"
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  {errors.parentName && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <XCircle className="h-4 w-4 mr-1" /> {errors.parentName}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="parentEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Parent/Guardian Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="parentEmail"
                        name="parentEmail"
                        value={formData.parentEmail}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="parent@example.com"
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="parentPhone" className="block text-sm font-medium text-gray-700 mb-1">
                      Parent/Guardian Phone *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="parentPhone"
                        name="parentPhone"
                        value={formData.parentPhone}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.parentPhone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="+1 (555) 987-6543"
                      />
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                    {errors.parentPhone && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <XCircle className="h-4 w-4 mr-1" /> {errors.parentPhone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700 mb-1">
                    Emergency Contact (Name & Phone) *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="emergencyContact"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.emergencyContact ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Emergency contact name and phone"
                    />
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  {errors.emergencyContact && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <XCircle className="h-4 w-4 mr-1" /> {errors.emergencyContact}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Required Documents (Upload scans or photos)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                        >
                          <span>Upload files</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            className="sr-only"
                            accept=".pdf,.jpg,.jpeg,.png"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PDF, JPG, PNG up to 10MB each
                      </p>
                    </div>
                  </div>

                  {documentPreviews.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Documents:</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {documentPreviews.map((preview, index) => (
                          <li key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 text-blue-500 mr-2" />
                              <span className="text-sm truncate">{formData.documents[index].name}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeDocument(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <XCircle className="h-5 w-5" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 5: Account Setup */}
            {currentStep === 5 && (
                              <motion.div
                              variants={fadeIn}
                              initial="hidden"
                              animate="visible"
                              className="space-y-6"
                            >
                              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                                <Lock className="h-5 w-5 text-blue-500 mr-2" />
                                Account Setup
                              </h3>
              
                              <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                  Create Password *
                                </label>
                                <div className="relative">
                                  <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                      errors.password ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="At least 8 characters"
                                  />
                                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                  <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                  >
                                    {showPassword ? (
                                      <EyeOff className="h-4 w-4" />
                                    ) : (
                                      <Eye className="h-4 w-4" />
                                    )}
                                  </button>
                                </div>
                                {errors.password && (
                                  <p className="mt-1 text-sm text-red-600 flex items-center">
                                    <XCircle className="h-4 w-4 mr-1" /> {errors.password}
                                  </p>
                                )}
                              </div>
              
                              <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                  Confirm Password *
                                </label>
                                <div className="relative">
                                  <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="Re-enter your password"
                                  />
                                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                  <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  >
                                    {showConfirmPassword ? (
                                      <EyeOff className="h-4 w-4" />
                                    ) : (
                                      <Eye className="h-4 w-4" />
                                    )}
                                  </button>
                                </div>
                                {errors.confirmPassword && (
                                  <p className="mt-1 text-sm text-red-600 flex items-center">
                                    <XCircle className="h-4 w-4 mr-1" /> {errors.confirmPassword}
                                  </p>
                                )}
                              </div>
              
                              <div className="p-4 bg-blue-50 rounded-lg">
                                <h4 className="text-sm font-medium text-blue-800 mb-2 flex items-center">
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Admission Requirements
                                </h4>
                                <ul className="text-xs text-blue-700 list-disc list-inside space-y-1">
                                  <li>All fields marked with * are required</li>
                                  <li>You'll need to upload scanned copies of required documents</li>
                                  <li>An interview may be required as part of the admission process</li>
                                  <li>You'll receive an email confirmation after submission</li>
                                </ul>
                              </div>
              
                              <div className="flex items-center">
                                <input
                                  id="terms-agreement"
                                  name="terms-agreement"
                                  type="checkbox"
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                  required
                                />
                                <label htmlFor="terms-agreement" className="ml-2 block text-sm text-gray-700">
                                  I agree to the <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and{' '}
                                  <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
                                </label>
                              </div>
                            </motion.div>
                          )}
              
                          {/* Form Navigation */}
                          <div className="mt-8 flex justify-between">
                            {currentStep > 1 ? (
                              <button
                                type="button"
                                onClick={prevStep}
                                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              >
                                Previous
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 opacity-50 cursor-not-allowed"
                                disabled
                              >
                                Previous
                              </button>
                            )}
              
                            {currentStep < 5 ? (
                              <button
                                type="button"
                                onClick={nextStep}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                              >
                                Next Step
                              </button>
                            ) : (
                              <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                                }`}
                              >
                                {isSubmitting ? 'Submitting...' : 'Submit Application'}
                              </button>
                            )}
                          </div>
                        </form>
                      </motion.div>
                    </main>
              
                    {/* Footer */}
                    <footer className="bg-white border-t mt-12">
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="md:flex md:items-center md:justify-between">
                          <div className="flex justify-center md:order-2 space-x-6">
                            <Link href="#" className="text-gray-400 hover:text-gray-500">
                              <span className="sr-only">Facebook</span>
                              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                              </svg>
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-gray-500">
                              <span className="sr-only">Twitter</span>
                              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                              </svg>
                            </Link>
                          </div>
                          <div className="mt-8 md:mt-0 md:order-1">
                            <p className="text-center text-sm text-gray-500">
                              &copy; {new Date().getFullYear()} SmartClass Admissions. All rights reserved.
                            </p>
                          </div>
                        </div>
                      </div>
                    </footer>
                  </div>
                );
              };
              
              export default NewAdmissionForm;