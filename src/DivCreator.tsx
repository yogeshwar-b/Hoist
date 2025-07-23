export default function DivCreator({ imageUrl }: { imageUrl: string }) {
  function r() {
    return Math.floor(Math.random() * 256)
  }

  // const color = "rgb(" + r() + "," + r() + "," + r() + ")";

  const rowcount = 10,
    colcount = 20
  const divArr = []
  for (let i = 0; i < rowcount; i++) {
    let temp = []
    for (let j = 0; j < colcount; j++) {
      temp.push(
        <div
          className='inline'
          style={{
            backgroundColor: `rgb(${r()},${r()},${r()})`
          }}
        >
          <span className='mix-blend-difference' style={{ color: 'white' }}>
            {` ${i}-${j} `}
          </span>
        </div>
      )
    }
    divArr.push(temp)
  }
  console.log(imageUrl)
  return (
    <div className='h-100 w-full relative'>
      <div className='absolute top-0 left-0 opacity-70'>
        {divArr.map((row) => {
          return <div>{row}</div>
        })}
      </div>
      <img className='h-100 shadow-lg' src={imageUrl} alt='UploadedImage' />
    </div>
  )
}
