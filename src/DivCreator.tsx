import { useEffect, useRef, useState } from 'react'

export default function DivCreator({ imageUrl }: { imageUrl: string }) {
  const imgRef = useRef<HTMLImageElement>(null)
  function r() {
    return Math.floor(Math.random() * 256)
  }
  useEffect(() => {
    console.log(imgRef.current?.getBoundingClientRect().height)
    console.log(imgRef.current?.getBoundingClientRect().width)
    gridDimensionsRef.current.gridRowHeight =
      Number(imgRef.current?.getBoundingClientRect().height) / rowcount
    gridDimensionsRef.current.gridColumnWidth =
      Number(imgRef.current?.getBoundingClientRect().width) / colcount
    console.log('got dimensions', gridDimensionsRef.current)
    setIsGridReady(true)
  }, [imageUrl])

  const rowcount = 10
  const colcount = 20

  const gridDimensionsRef = useRef<{
    gridRowHeight: number
    gridColumnWidth: number
  }>({ gridRowHeight: 0, gridColumnWidth: 0 })
  const [isGridReady, setIsGridReady] = useState<boolean>(false)
  console.log(imageUrl)
  return (
    <div className='object-contain h-100 w-full relative'>
      {isGridReady ? (
        <div className='absolute top-0 left-0 opacity-70'>
          {Array.from({ length: rowcount }).map((_, i) => (
            <div key={i} className='flex'>
              {Array.from({ length: colcount })
                .fill(0)
                .map((_, j) => {
                  return (
                    <div
                      className={`inline`}
                      style={{
                        backgroundColor: `rgb(${r()},${r()},${r()})`,
                        width: `${gridDimensionsRef.current.gridColumnWidth}px`,
                        height: `${gridDimensionsRef.current.gridRowHeight}px`
                      }}
                    >
                      <span
                        className='mix-blend-difference '
                        style={{ color: 'white' }}
                      >
                        {` ${i}-${j} `}
                      </span>
                    </div>
                  )
                })}
            </div>
          ))}
        </div>
      ) : (
        <>Grid Not Ready</>
      )}
      <img
        ref={imgRef}
        className='h-100 shadow-lg object-contain'
        src={imageUrl}
        alt='UploadedImage'
      />
    </div>
  )
}
