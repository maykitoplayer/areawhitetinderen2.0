import React, { useState } from 'react';
import { 
  LogOut, 
  User, 
  BookOpen, 
  Video, 
  Download, 
  CheckCircle, 
  Lock,
  Play,
  FileText,
  Camera,
  MessageCircle,
  TrendingUp,
  Award,
  Clock,
  Instagram
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ModuleProps {
  id: number;
  title: string;
  description: string;
  duration: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  type: 'video' | 'document' | 'exercise';
}

const Module: React.FC<ModuleProps> = ({ title, description, duration, isUnlocked, isCompleted, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'video': return <Video className="w-5 h-5" />;
      case 'document': return <FileText className="w-5 h-5" />;
      case 'exercise': return <CheckCircle className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className={`bg-white rounded-xl p-6 shadow-lg border-2 transition-all hover:shadow-xl ${
      isUnlocked ? 'border-gray-200 hover:border-orange-300' : 'border-gray-100 opacity-60'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${
          isUnlocked ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400'
        }`}>
          {isUnlocked ? getIcon() : <Lock className="w-5 h-5" />}
        </div>
        <div className="flex items-center space-x-2">
          {isCompleted && <CheckCircle className="w-5 h-5 text-green-500" />}
          <span className="text-sm text-gray-500 flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {duration}
          </span>
        </div>
      </div>
      
      <h3 className={`text-lg font-semibold mb-2 ${isUnlocked ? 'text-gray-900' : 'text-gray-500'}`}>
        {title}
      </h3>
      <p className={`text-sm mb-4 ${isUnlocked ? 'text-gray-600' : 'text-gray-400'}`}>
        {description}
      </p>
      
      <button
        disabled={!isUnlocked}
        className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
          isUnlocked 
            ? 'bg-orange-500 text-white hover:bg-orange-600 transform hover:scale-[1.02]'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        {isUnlocked ? (
          <div className="flex items-center justify-center">
            <Play className="w-4 h-4 mr-2" />
            {isCompleted ? 'Review' : 'Start'}
          </div>
        ) : (
          'Locked'
        )}
      </button>
    </div>
  );
};

export default function MembersArea() {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

  const courseModules: ModuleProps[] = [
    {
      id: 1,
      title: 'MatchMaster Fundamentals',
      description: 'Understand the basic principles to master Tinder and create authentic connections.',
      duration: '45 min',
      isUnlocked: true,
      isCompleted: true,
      type: 'video'
    },
    {
      id: 2,
      title: 'Creating the Perfect Profile',
      description: 'Learn to create an irresistible profile with photos and bio that generate matches.',
      duration: '60 min',
      isUnlocked: true,
      isCompleted: false,
      type: 'video'
    },
    {
      id: 3,
      title: 'Psychology of Matching',
      description: 'Discover the psychological triggers that make women swipe right.',
      duration: '40 min',
      isUnlocked: true,
      isCompleted: false,
      type: 'document'
    },
    {
      id: 4,
      title: 'Conversation Strategies',
      description: 'Master the art of the first message and maintain engaging conversations.',
      duration: '55 min',
      isUnlocked: false,
      isCompleted: false,
      type: 'video'
    },
    {
      id: 5,
      title: 'From Match to Date',
      description: 'Techniques to successfully transform matches into real dates.',
      duration: '50 min',
      isUnlocked: false,
      isCompleted: false,
      type: 'exercise'
    },
    {
      id: 6,
      title: 'Success Mindset',
      description: 'Develop the mentality and confidence necessary for success.',
      duration: '35 min',
      isUnlocked: false,
      isCompleted: false,
      type: 'video'
    }
  ];

  const instaCheckModules: ModuleProps[] = [
    {
      id: 7,
      title: 'InstaCheck Fundamentals',
      description: 'Learn the basics of building an irresistible Instagram profile that attracts followers.',
      duration: '50 min',
      isUnlocked: true,
      isCompleted: false,
      type: 'video'
    }
  ];

  const progressPercentage = Math.round((courseModules.filter(m => m.isCompleted).length / courseModules.length) * 100);

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome, {user?.name}!</h2>
            <p className="text-orange-100 text-lg">Continue your MatchMaster journey</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{progressPercentage}%</div>
            <div className="text-orange-100">Complete</div>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {courseModules.filter(m => m.isCompleted).length}/{courseModules.length}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Modules Completed</h3>
          <p className="text-gray-600 text-sm">Keep studying to master all techniques</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">250+</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Hours of Content</h3>
          <p className="text-gray-600 text-sm">Complete and updated material</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Pro</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Current Plan</h3>
          <p className="text-gray-600 text-sm">Full access to all modules</p>
        </div>
      </div>

      {/* Course Modules */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Course Modules</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseModules.map(module => (
            <Module key={module.id} {...module} />
          ))}
        </div>
      </div>

      {/* InstaCheck Section */}
      <div>
        <div className="flex items-center mb-6">
          <div className="p-3 bg-pink-100 rounded-lg mr-4">
            <Instagram className="w-8 h-8 text-pink-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">InstaCheck</h3>
            <p className="text-gray-600">Build an irresistible Instagram profile</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instaCheckModules.map(module => (
            <Module key={module.id} {...module} />
          ))}
        </div>
      </div>
    </div>
  );

  const renderCourse = () => (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">MatchMaster Course</h2>
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Course Progress</h3>
            <span className="text-2xl font-bold text-orange-500">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-orange-500 to-pink-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {courseModules.map(module => (
          <Module key={module.id} {...module} />
        ))}
      </div>

      {/* InstaCheck Course Section */}
      <div className="mt-12">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-pink-100 rounded-lg mr-4">
            <Instagram className="w-8 h-8 text-pink-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">InstaCheck Course</h3>
            <p className="text-gray-600">Master Instagram to attract followers and real connections</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {instaCheckModules.map(module => (
            <Module key={module.id} {...module} />
          ))}
        </div>
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-900">Extra Resources</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <Download className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Bio Templates</h3>
              <p className="text-gray-600">Ready-to-use templates</p>
            </div>
          </div>
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
            Download Templates
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-green-100 rounded-lg mr-4">
              <Camera className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Photo Guide</h3>
              <p className="text-gray-600">Tips for perfect photos</p>
            </div>
          </div>
          <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
            View Guide
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-purple-100 rounded-lg mr-4">
              <MessageCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Conversation Scripts</h3>
              <p className="text-gray-600">Messages that work</p>
            </div>
          </div>
          <button className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors">
            Access Scripts
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-orange-100 rounded-lg mr-4">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Progress Tracker</h3>
              <p className="text-gray-600">Track your results</p>
            </div>
          </div>
          <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors">
            Download Tracker
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-pink-100 rounded-lg mr-4">
              <Instagram className="w-6 h-6 text-pink-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Instagram Templates</h3>
              <p className="text-gray-600">Ready-to-use post templates</p>
            </div>
          </div>
          <button className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors">
            Access Templates
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900">MatchMaster</span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setActiveSection('dashboard')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === 'dashboard'
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveSection('course')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === 'course'
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Course
              </button>
              <button
                onClick={() => setActiveSection('resources')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === 'resources'
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Resources
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-900 font-medium">{user?.name}</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white border-b">
        <div className="flex space-x-1 p-4">
          <button
            onClick={() => setActiveSection('dashboard')}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-colors ${
              activeSection === 'dashboard'
                ? 'bg-orange-100 text-orange-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveSection('course')}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-colors ${
              activeSection === 'course'
                ? 'bg-orange-100 text-orange-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Course
          </button>
          <button
            onClick={() => setActiveSection('resources')}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-colors ${
              activeSection === 'resources'
                ? 'bg-orange-100 text-orange-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Resources
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'dashboard' && renderDashboard()}
        {activeSection === 'course' && renderCourse()}
        {activeSection === 'resources' && renderResources()}
      </main>
    </div>
  );
}