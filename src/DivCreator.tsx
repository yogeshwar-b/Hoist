import { useEffect, useRef, useState } from 'react'

export default function GridCreator({ imageUrl }: { imageUrl: string }) {
  const imgRef = useRef<HTMLImageElement>(null)
  const [isGridReady, setIsGridReady] = useState<boolean>(false)
  const rowcount = 10
  const colcount = 10

  const gridDimensionsRef = useRef<{
    gridRowHeight: number
    gridColumnWidth: number
  }>({ gridRowHeight: 0, gridColumnWidth: 0 })

  const handleImageLoad = () => {
    if (imgRef.current) {
      gridDimensionsRef.current.gridRowHeight =
        Number(imgRef.current?.getBoundingClientRect().height) / rowcount
      gridDimensionsRef.current.gridColumnWidth =
        Number(imgRef.current?.getBoundingClientRect().width) / colcount
      console.log('got dimensions', gridDimensionsRef.current)
      setIsGridReady(true)
    }
  }

  useEffect(() => {
    if (imgRef.current) {
      setIsGridReady(false)
      imgRef.current.onload = handleImageLoad
    }
    return () => {
      if (imgRef.current) {
        imgRef.current.onload = null
      }
    }
  }, [imageUrl])

  console.log(imageUrl)
  return (
    <div className='object-contain h-100 w-full relative'>
      {isGridReady ? (
        <div className='absolute top-0 left-0 opacity-100 flex flex-col '>
          {Array.from({ length: rowcount }).map((_, i) => (
            <div key={i} className='flex'>
              {Array.from({ length: colcount })
                .fill(0)
                .map((_, j) => {
                  return (
                    <GridTile
                      imageUrl={imageUrl}
                      key={j}
                      i={i}
                      j={j}
                      rowcount={rowcount}
                      colcount={colcount}
                      gridDimensionsRef={gridDimensionsRef}
                    />
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
        className='pointer-events-none h-100 shadow-lg opacity-0'
        src={imageUrl}
        alt='UploadedImage'
      />
    </div>
  )
}

const GridTile = ({
  imageUrl,
  i,
  j,
  rowcount,
  colcount,
  gridDimensionsRef
}: {
  imageUrl: string
  i: number
  j: number
  rowcount: number
  colcount: number
  gridDimensionsRef: React.RefObject<{
    gridRowHeight: number
    gridColumnWidth: number
  }>
}) => {
  return (
    <div
      key={j}
      className={`inline animate-float `}
      style={{
        animationDelay: `${j * 350}ms`,
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: `${
          gridDimensionsRef.current.gridColumnWidth * colcount
        }px ${gridDimensionsRef.current.gridRowHeight * rowcount}px`,
        backgroundPosition: `-${
          j * gridDimensionsRef.current.gridColumnWidth
        }px -${i * gridDimensionsRef.current.gridRowHeight}px `,
        width: `${gridDimensionsRef.current.gridColumnWidth}px`,
        height: `${gridDimensionsRef.current.gridRowHeight}px`
      }}
    />
  )
}
