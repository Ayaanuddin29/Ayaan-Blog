import CallToAction from '../components/CallToAction'
function Projects() {
  return (
    <div className='flex flex-col justify-center max-w-2xl items-center mx-auto min-h-screen gap-6 p-3'>
      <h1 className=' text-3xl font font-semibold '>Projects</h1>
      <p className='text-md text-gray-700 flex flex-col gap-3 items-center'>Build fun and engaging projects while learning HTML, CSS, and JavaScript!</p>
      <div className='max-w-3xl'>
      <CallToAction/>
      </div>
    </div>
  )
}

export default Projects