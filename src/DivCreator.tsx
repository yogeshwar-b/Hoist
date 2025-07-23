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
  })
  // const color = "rgb(" + r() + "," + r() + "," + r() + ")";

  const rowcount = 10
  const colcount = 20

  const gridDimensionsRef = useRef<{
    gridRowHeight: number
    gridColumnWidth: number
  }>({ gridRowHeight: 0, gridColumnWidth: 0 })
  const [isGridReady, setIsGridReady] = useState<boolean>(false)
  const divArr = []
  for (let i = 0; i < rowcount; i++) {
    let temp = []
    for (let j = 0; j < colcount; j++) {
      temp.push(
        <div
          className={`inline`}
          style={{
            backgroundColor: `rgb(${r()},${r()},${r()})`,
            width: `${gridDimensionsRef.current.gridColumnWidth}px`,
            height: `${gridDimensionsRef.current.gridRowHeight}px`
          }}
        >
          <span className='mix-blend-difference ' style={{ color: 'white' }}>
            {/* {` ${i}-${j} `} */}
          </span>
        </div>
      )
    }
    divArr.push(temp)
  }
  console.log(imageUrl)
  return (
    <div className='object-contain h-100 w-full relative'>
      {isGridReady ? (
        <div className='absolute top-0 left-0 opacity-70'>
          {divArr.map((row, index) => {
            return (
              <div key={index} className='flex flex-row '>
                {row}
              </div>
            )
          })}
        </div>
      ) : (
        <></>
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
