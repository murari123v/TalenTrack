import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Users, ClipboardList, MailCheck } from 'lucide-react';

const navItems = [
  { path: '/', icon: Briefcase, label: 'Jobs' },
  { path: '/candidates', icon: Users, label: 'Candidates' },
  { path: '/assessments', icon: ClipboardList, label: 'Assessments' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-blue-800">
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <MailCheck className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  TalenTrack
                </span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navItems.map(({ path, icon: Icon, label }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`${
                      location.pathname === path
                        ? 'border-indigo-500 text-green-600'
                        : 'border-transparent text-blue-900 hover:border-gray-300 hover:text-gray-700'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}