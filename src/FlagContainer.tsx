import GridCreator from './DivCreator'

export default function FlagContainer({ imageUrl }: { imageUrl: string }) {
  return (
    <div className='ml-6 mr-6 p-6 shadow-2xl flex flex-col items-center rounded-2xl border-gray-200'>
      {imageUrl == '' ? (
        <div className='h-100 place-content-center text-gray-300'>
          No Image Selected
        </div>
      ) : (
        // <img className='h-100 shadow-lg' src={imageUrl} alt='UploadedImage' />
        <GridCreator imageUrl={imageUrl} />
      )}
    </div>
  )
}
