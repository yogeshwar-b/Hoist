import { useEffect, useRef, useState } from 'react'

export default function DivCreator({ imageUrl }: { imageUrl: string }) {
  const imgRef = useRef<HTMLImageElement>(null)

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

  const rowcount = 3
  const colcount = 3

  const gridDimensionsRef = useRef<{
    gridRowHeight: number
    gridColumnWidth: number
  }>({ gridRowHeight: 0, gridColumnWidth: 0 })
  const [isGridReady, setIsGridReady] = useState<boolean>(false)
  console.log(imageUrl)
  return (
    <div className='object-contain h-100 w-full relative'>
      {isGridReady ? (
        <div className='absolute top-0 left-0 opacity-100 flex flex-col gap-1'>
          {Array.from({ length: rowcount }).map((_, i) => (
            <div key={i} className='flex gap-1'>
              {Array.from({ length: colcount })
                .fill(0)
                .map((_, j) => {
                  return (
                    <div
                      className={`inline`}
                      style={{
                        backgroundImage: `url(${imageUrl})`,
                        backgroundSize: `${
                          gridDimensionsRef.current.gridColumnWidth * colcount
                        }px ${
                          gridDimensionsRef.current.gridRowHeight * rowcount
                        }px`,
                        backgroundPosition: `-${
                          j * gridDimensionsRef.current.gridColumnWidth
                        }px -${i * gridDimensionsRef.current.gridRowHeight}px `,
                        width: `${gridDimensionsRef.current.gridColumnWidth}px`,
                        height: `${gridDimensionsRef.current.gridRowHeight}px`
                      }}
                    >
                      <span className='absolute' style={{ color: 'black' }}>
                        {` ${i}-${j} ${(
                          j * gridDimensionsRef.current.gridColumnWidth
                        ).toPrecision(4)}px ${(
                          i * gridDimensionsRef.current.gridRowHeight
                        ).toPrecision(4)}px `}
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
        className='pointer-events-none h-100 shadow-lg object-contain opacity-0'
        src={imageUrl}
        alt='UploadedImage'
      />
    </div>
  )
}
