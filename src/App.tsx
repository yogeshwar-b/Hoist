import { useRef, useState } from 'react'
import FlagContainer from './FlagContainer'
import defaultImage from './assets/img/1ef67fd545a13e424447d81fe0d7c14d.jpeg'

function App() {
  const handleUploadClick = () => {
    fileInputRef.current && fileInputRef.current.click()
  }
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imageUrl, setImageUrl] = useState<string>(defaultImage)
  return (
    <div>
      <div className='flex flex-col'>
        <div className='flex flex-row justify-center'>
          <div className='flex flex-row gap-2 p-2'>
            <div>
              <span className='select-none cursor-crosshair inline-block font-bold underline hover:scale-105 transition duration-150 ease-out origin-left text-3xl'>
                Hoist
              </span>
            </div>
            <input
              type='file'
              name='imagefile'
              id='imagefile'
              className=' hidden'
              accept='image/*'
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const imageUrl = URL.createObjectURL(e.target.files[0])
                  setImageUrl(imageUrl)
                  console.log(e.target.files[0])
                }
              }}
            />
            <div>
              <UploadButton handleClick={handleUploadClick} />
            </div>
          </div>
        </div>
        <FlagContainer imageUrl={imageUrl} />
      </div>
    </div>
  )
}

const UploadButton = ({
  type,
  handleClick
}: {
  type?: 'submit' | 'reset' | 'button'
  handleClick: () => void
}) => {
  return (
    <button
      onClick={handleClick}
      type={type}
      className=' group bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer hover:scale-105 transition duration-150 ease-out overflow-clip relative '
    >
      <div className=' absolute transition duration-500 ease-out group-hover:-translate-y-6 opacity-100 group-hover:opacity-0 group-hover:scale-120'>
        Upload
      </div>
      <div>Upload</div>
    </button>
  )
}

export default App
