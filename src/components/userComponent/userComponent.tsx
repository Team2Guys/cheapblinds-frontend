
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FaRegUser } from 'react-icons/fa';
import { USRPROPS } from 'types/type';

export default function UserComponent({
  handleSubmit,
  error,
  loading = false,
  inputFields,
  title,
  InstructionText,
  routingText,
  buttonTitle,
  navigationLink,
  navigationTxt,
  setadminType,
}: USRPROPS) {
  const [activeTab, setActiveTab] = useState('Admin');
  const [showPassword, setShowPassword] = useState(false);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (setadminType) {
      setadminType(value);
    }
  };

  return (
    <div className="flex justify-center px-4 py-6">
      <div className="w-full max-w-md bg-primary dark:bg-white p-6 sm:p-10 rounded-lg shadow-md relative">
        <Link className='bg-black text-white p-2 rounded-md absolute top-2 left-2' href="/">Back To Home</Link>
        <div className="flex justify-center mb-5 pt-5">
          <div className="flex w-full border-b border-gray-300">
            <button
              className={`flex-1 py-2 px-4 text-center text-lg font-bold flex cursor-pointer items-center justify-center gap-2 ${activeTab === 'Admin'
                ? 'text-white dark:text-black border-b-2 border-black'
                : 'text-gray-500'
                }`}
              onClick={() => handleTabChange('Admin')}
            >
              <FaRegUser /> Admin
            </button>
            <button
              className={`flex-1 py-2 px-4 text-center text-lg font-bold flex items-center cursor-pointer justify-center gap-2 ${activeTab === 'Super-Admin'
                ? 'text-white border-b-2 dark:text-black border-black'
                : 'text-gray-500'
                }`}
              onClick={() => handleTabChange('Super-Admin')}
            >
              <FaRegUser /> Super Admin
            </button>
          </div>
        </div>

        <div className="mt-6">
          <form className="space-y-4" onSubmit={handleSubmit} >
            {inputFields.map((field: { type: string; name: string; id: string; placeholder: string; value: string; onChange: () => void; }, index: number) => {
              const isPasswordField = field.type === 'password';
              return (
                <div key={index} className="relative">
                  <input
                    type={isPasswordField && showPassword ? 'text' : field.type}

                    name={field.name}
                    id={field.id}
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={field.onChange}
                    className="primary-input border"
                  />
                  {isPasswordField && (
                    <button
                      type="button"
                      className="absolute cursor-pointer right-2 top-2 text-gray-600 z-10"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  )}
                </div>
              )
            }
            )}
            {error && (
              <div className="text-center text-red-500 text-sm">
                {typeof error === 'string' ? error : JSON.stringify(error)}
              </div>
            )}
            {navigationLink && (
              <p className="text-center text-sm text-gray-500 mt-2">
                <Link href={navigationLink} className="underline hover:text-blue-600">
                  {navigationTxt}
                </Link>
              </p>
            )}
            <button
              type="submit"
              className={`w-full dashboard_primary_button text-white flex justify-center ${loading && 'bg-blue-400 cursor-not-allowed'
                }`}
              disabled={loading ? loading : false}
            >
              {loading ? 'Loading...' : buttonTitle}
            </button>
            <div className="text-right text-sm text-gray-500 mt-3">
              {InstructionText && <span>{InstructionText} </span>}
              {routingText && (
                <Link
                  href={title === 'Sign In' ? '/register' : '/login'}
                  className="underline hover:text-blue-600"
                >
                  {routingText}
                </Link>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}