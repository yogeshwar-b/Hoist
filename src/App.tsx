function App() {
  return (
    <div>
      <div className='flex flex-row p-2'>
        <div className='flex-1'>
          <span className='inline-block font-bold underline hover:scale-105 transition duration-150 ease-out origin-left text-3xl'>
            Hoist
          </span>
        </div>

        <div className='flex-1'>
          <UploadButton />
        </div>
      </div>
    </div>
  )
}

const UploadButton = () => {
  return (
    <button className=' group bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer hover:scale-105 transition duration-150 ease-out overflow-clip relative '>
      <div className=' absolute transition duration-500 ease-out group-hover:-translate-y-6 opacity-100 group-hover:opacity-0 group-hover:scale-120'>
        Upload
      </div>
      <div>Upload</div>
    </button>
  )
}

export default App
