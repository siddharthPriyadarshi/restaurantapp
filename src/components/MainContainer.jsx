import React from 'react'
import HomeContainer from './HomeContainer'

const MainContainer = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />
      
      <section className='w-full bg-blue-500'>
        <div className = "w-full items-center justify-between">
          <p className = "text-2xl text-headingColor font-semibold capitalize relative before:absolute before:rounded-lg before:content before:w-20 before:h-1 before:bottom-0 before:left-0 before: bg-orange-500 transition-all ease-in-out duration-100">
            Our fresh & healthy fruits
          </p>

        </div>
      </section>

    </div>
  )
}

export default MainContainer
