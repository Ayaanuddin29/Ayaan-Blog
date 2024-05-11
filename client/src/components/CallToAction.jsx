import { Button } from "flowbite-react"

function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl mx-auto text-center">
        <div className="flex-1  ">
        <h2 className="text-2xl">
            Want to learn more about JavaScript
        </h2>
        <p className="text-gray-500 my-2">Checkout these resources with 100 JavaScript Projects</p>
        <Button className="rounded-tl-xl m-5  w-full rounded-bl-none" gradientDuoTone='purpleToPink'><a href='https://www.100jsprojects.com' rel='noopener noreferrer' target="_blank">100 JavaScript Projects</a>  </Button>
        </div>
        <div className="p-7 flex-1">
            <img src='https://1.bp.blogspot.com/-KLh-NQa0LS4/XgOK1kgdBKI/AAAAAAAADBk/MbLnp4gy_OsZx5O5S_tA7vWNBEyoIVeWQCLcBGAsYHQ/w1200-h630-p-k-no-nu/java-script.png'/>
        </div>
    </div>
  )
}

export default CallToAction