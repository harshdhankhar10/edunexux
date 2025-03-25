"use client";

import { useState } from "react";
import { Search, Download, Filter, ArrowUpDown } from "lucide-react";

interface Student {
  id: number;
  name: string;
  grade: number;
  subject: string;
  submissionDate: string;
  status: "Excellent" | "Good" | "Average" | "Poor";
}

const tempData: Student[] = [
  {
    id: 1,
    name: "John Smith",
    grade: 95,
    subject: "Mathematics",
    submissionDate: "2024-03-15",
    status: "Excellent"
  },
  {
    id: 2,
    name: "Emma Wilson",
    grade: 88,
    subject: "Physics",
    submissionDate: "2024-03-14",
    status: "Good"
  },
  {
    id: 3,
    name: "Michael Brown",
    grade: 75,
    subject: "Chemistry",
    submissionDate: "2024-03-13",
    status: "Average"
  },
  {
    id: 4,
    name: "Sarah Davis",
    grade: 92,
    subject: "Biology",
    submissionDate: "2024-03-15",
    status: "Excellent"
  },
  {
    id: 5,
    name: "James Johnson",
    grade: 65,
    subject: "Physics",
    submissionDate: "2024-03-12",
    status: "Poor"
  }
];

export default function GradesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const subjects = Array.from(new Set(tempData.map(student => student.subject)));

  const filteredData = tempData
    .filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedSubject === "all" || student.subject === selectedSubject)
    )
    .sort((a, b) => 
      sortOrder === "asc" ? a.grade - b.grade : b.grade - a.grade
    );

  const averageGrade = filteredData.reduce((acc, curr) => acc + curr.grade, 0) / filteredData.length;
  const highestGrade = Math.max(...filteredData.map(student => student.grade));
  const lowestGrade = Math.min(...filteredData.map(student => student.grade));

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Student Grade Management</h1>
          
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-600 rounded-lg p-4 text-white">
              <p className="text-sm opacity-80">Average Grade</p>
              <p className="text-2xl font-bold">{averageGrade.toFixed(1)}%</p>
            </div>
            <div className="bg-blue-600 rounded-lg p-4 text-white">
              <p className="text-sm opacity-80">Highest Grade</p>
              <p className="text-2xl font-bold">{highestGrade}%</p>
            </div>
            <div className="bg-blue-600 rounded-lg p-4 text-white">
              <p className="text-sm opacity-80">Lowest Grade</p>
              <p className="text-2xl font-bold">{lowestGrade}%</p>
            </div>
          </div>

          {/* Filters Section */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search students..."
                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="all">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => setSortOrder(prev => prev === "asc" ? "desc" : "asc")}
            >
              <ArrowUpDown className="h-4 w-4" />
              Sort by Grade
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submission Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.grade}%</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        student.status === "Excellent" ? "bg-green-100 text-green-800" :
                        student.status === "Good" ? "bg-blue-100 text-blue-800" :
                        student.status === "Average" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.submissionDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}