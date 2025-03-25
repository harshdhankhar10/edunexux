'use client';

import { useState } from 'react';
import { MessageSquare, Search, Send, User, ThumbsUp, MessageCircle, Filter, Tag } from 'lucide-react';

// Temporary data
const teachers = [
  { id: 1, name: 'Emma Davis', subject: 'Mathematics', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
  { id: 2, name: 'James Wilson', subject: 'Physics', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
  { id: 3, name: 'Maria Garcia', subject: 'English', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
];

interface Comment {
  id: number;
  userId: number;
  content: string;
  timestamp: Date;
  likes: number;
}

interface Post {
  id: number;
  userId: number;
  title: string;
  content: string;
  timestamp: Date;
  category: string;
  likes: number;
  comments: Comment[];
}

const initialPosts: Post[] = [
  {
    id: 1,
    userId: 1,
    title: 'Innovative Teaching Methods',
    content: 'What innovative teaching methods have you found effective in engaging students during online classes?',
    timestamp: new Date('2024-03-20T10:00:00'),
    category: 'Teaching Methods',
    likes: 5,
    comments: [
      {
        id: 1,
        userId: 2,
        content: 'I\'ve had great success with interactive quizzes using digital tools.',
        timestamp: new Date('2024-03-20T10:30:00'),
        likes: 3,
      },
    ],
  },
  {
    id: 2,
    userId: 3,
    title: 'Student Engagement Strategies',
    content: 'Looking for suggestions on improving student participation in virtual classroom discussions.',
    timestamp: new Date('2024-03-19T15:00:00'),
    category: 'Student Engagement',
    likes: 7,
    comments: [],
  },
];

const categories = ['All Topics', 'Teaching Methods', 'Student Engagement', 'Curriculum', 'Technology', 'Professional Development'];

export default function ForumPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Topics');
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [activePost, setActivePost] = useState<Post | null>(null);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Topics' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const post: Post = {
      id: Math.max(...posts.map(p => p.id), 0) + 1,
      userId: 1, // Current user
      title: newPost.title,
      content: newPost.content,
      timestamp: new Date(),
      category: selectedCategory === 'All Topics' ? 'General' : selectedCategory,
      likes: 0,
      comments: [],
    };

    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '' });
    setShowNewPostForm(false);
  };

  const handleAddComment = (postId: number) => {
    if (!newComment.trim()) return;

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const newCommentObj: Comment = {
          id: Math.max(...post.comments.map(c => c.id), 0) + 1,
          userId: 1, // Current user
          content: newComment,
          timestamp: new Date(),
          likes: 0,
        };
        return { ...post, comments: [...post.comments, newCommentObj] };
      }
      return post;
    });

    setPosts(updatedPosts);
    setNewComment('');
  };

  const getTeacherInfo = (userId: number) => {
    return teachers.find(t => t.id === userId) || { name: 'Unknown Teacher', avatar: '' };
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 p-6">
      {/* Header and Controls */}
      <div className="max-w-5xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Teacher Discussion Forum</h1>
          <button
            onClick={() => setShowNewPostForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            New Discussion
          </button>
        </div>

        <div className="flex space-x-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search discussions..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="relative">
            <select
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 appearance-none bg-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* New Post Form */}
      {showNewPostForm && (
        <div className="max-w-5xl mx-auto mb-6 bg-white rounded-lg shadow-sm p-6">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Discussion title"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 mb-4"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
            <textarea
              placeholder="Share your thoughts..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 min-h-[100px]"
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setShowNewPostForm(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleCreatePost}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Post Discussion
            </button>
          </div>
        </div>
      )}

      {/* Posts List */}
      <div className="max-w-5xl mx-auto space-y-6">
        {filteredPosts.map(post => {
          const teacher = getTeacherInfo(post.userId);
          return (
            <div key={post.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  {teacher.avatar ? (
                    <img src={teacher.avatar} alt={teacher.name} className="w-10 h-10 rounded-full" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  )}
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">{teacher.name}</p>
                    <p className="text-sm text-gray-500">{post.timestamp.toLocaleDateString()}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                  {post.category}
                </span>
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.content}</p>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 hover:text-blue-600">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </button>
                  <button 
                    className="flex items-center space-x-1 hover:text-blue-600"
                    onClick={() => setActivePost(activePost?.id === post.id ? null : post)}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments.length} Comments</span>
                  </button>
                </div>
              </div>

              {activePost?.id === post.id && (
                <div className="border-t border-gray-200 pt-4">
                  {post.comments.map(comment => {
                    const commentTeacher = getTeacherInfo(comment.userId);
                    return (
                      <div key={comment.id} className="flex items-start space-x-3 mb-4">
                        {commentTeacher.avatar ? (
                          <img src={commentTeacher.avatar} alt={commentTeacher.name} className="w-8 h-8 rounded-full" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div className="flex-1 bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-gray-900">{commentTeacher.name}</span>
                            <span className="text-sm text-gray-500">
                              {comment.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-gray-600">{comment.content}</p>
                        </div>
                      </div>
                    );
                  })}
                  <div className="flex items-center space-x-2 mt-4">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                    />
                    <button
                      onClick={() => handleAddComment(post.id)}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}