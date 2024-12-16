import React from 'react'


function ProgressBar({progress=40}) {
  return (
    <div className='bg-gray-400 w-full h-4 mt-3 rounded-full'>
      <div className='py-0.2 bg-primary  h-4 text-[10px] rounded-full text-white' style={{width: `${progress}%`}}>
                {`${Number(progress).toFixed(0)}%`}
      </div>
    </div>
  )
}

export default ProgressBar
