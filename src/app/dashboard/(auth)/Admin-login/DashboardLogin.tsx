'use client';

import React, { useState } from 'react';

import USRcomponent from 'components/userComponent/userComponent';
import { IoIosLock, IoMdMail } from 'react-icons/io';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const DashboardLogin = () => {

  const intialvalue = {
    email: '',
    password: '',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [formData, setFormData] = useState(intialvalue);

  const [loginError, setError] = useState<string | null | undefined>();
  const [adminType, setadminType] = useState<string | undefined>('Admin');
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!formData.email || !formData.password) {
      return setError('All fields are rquired');
    }
    try {



      const adminFlag = adminType == 'Admin'


      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        IsAdmin: adminFlag,
        redirect: false,

      });
      console.log(result, "result")
      if (result?.error) {
        setError(result.error); // This is where incorrect credentials error will appear
        return;
      }

      router.push("/dashboard");


    } catch (err: any) { //eslint-disable-line
      console.log(err, "err")
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
      throw err;
    }
  };

  const inputFields = [
    {
      type: 'email',
      name: 'email',
      id: 'email',
      placeholder: 'Email',
      value: formData.email,
      onChange: handleChange,
      Icon: IoMdMail,
      iconClassName: 'text-red-500',
    },
    {
      type: 'password',
      name: 'password',
      id: 'password',
      placeholder: 'Enter Password',
      value: formData.password,
      onChange: handleChange,
      Icon: IoIosLock,
      iconClassName: 'text-red-500',
    },
  ];

  return (
    <div className=' mt-50'>
      <USRcomponent
        handleSubmit={handleSubmit}
        error={loginError}
        loading={false}
        inputFields={inputFields}
        title="Sign In as Admin"
        buttonTitle="Sign In"
        setadminType={setadminType}
        adminType={adminType}
      />
    </div>
  );
};

export default DashboardLogin;
