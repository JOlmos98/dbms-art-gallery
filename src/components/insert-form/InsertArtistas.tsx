"use client";


export const InsertArtistas = () => {



  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen mx-36">
      <div className="flex flex-col row-start-2 items-start sm:items-start">
        <h1 className="text-4xl font-bold mb-8 mt-8"></h1>
        <div>
          <h2 className="text-2xl font-bold mb-8"></h2>
          <form action="" className='flex  flex-col w-200 items-center justify-center gap-1'>
            <label htmlFor="username" className='text-xl pt-3'>Username</label>
            <input 
            type="text" placeholder="Username"  className='bg-gray-400 rounded-md placeholder-gray-300'

            />
            <label htmlFor="email" className='text-xl pt-3'>Email</label>
            <input type="email" placeholder="Email" className='bg-gray-400 rounded-md placeholder-gray-300'

            />
            <label htmlFor="password" className='text-xl pt-3'>Password</label>
            <input type="password" placeholder="Password" className='bg-gray-400 rounded-md placeholder-gray-300' 

            />
            <label htmlFor="confirmPassword" className='text-xl pt-3'>Confirm password</label>
            <input type="password" placeholder="Repeat password" className='bg-gray-400 rounded-md placeholder-gray-300' 

            />
            <button type="submit" className='bg-blue-500 p-2 rounded-md font-bold hover:bg-blue-800'>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

