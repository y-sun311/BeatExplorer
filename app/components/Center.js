"use client";

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import { ChevronDoubleDownIcon } from '@heroicons/react/outline';

const colors = [
  'bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400',
  'bg-purple-400', 'bg-pink-400', 'bg-indigo-400', 'bg-gray-400',
  'bg-black', 'bg-white'
];

function Center() {
  const { data: session, status } = useSession();
  const [color, setColor] = useState(null);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, []);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex-grow">
      <header className='absolute top-5 right-8'>
        <div className='bg-red-300 flex items-center space-x-3 rounded-full opacity-80 hover:opacity-60 cursor-pointer p-1 pr-2'>
          <img className='rounded-full w-10 h-10' src={session?.user?.image} alt="" />
          <h2>{session?.user?.name}</h2>
          <ChevronDoubleDownIcon className='h-5 w-5' />
        </div>
      </header>

      <section className={`flex items-end w-full space-x-7 bg-gradient-to-b  ${color} h-80 text-white p-8`}>
        <h1>Hello</h1>
      </section>
    </div>
  );
}

export default Center;
