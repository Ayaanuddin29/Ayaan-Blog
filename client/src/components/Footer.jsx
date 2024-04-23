import {Footer} from 'flowbite-react'
import { Link } from 'react-router-dom'
import {BsFacebook, BsGithub, BsInstagram, BsLinkedin, BsTwitterX} from 'react-icons/bs'

function Footercom() {
  return (
    <Footer className='border border-t-8 border-teal-500 container'>
        <div className='w-full max-w-7xl mx-auto'> 
          <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
            <div className='mt-5'>
            <Link to='/' className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"><span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Ayaan's</span>
        Blog
        </Link> 
            </div>
            <div className='grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6'>
           <div className='mt-5'>
            <Footer.Title title='About'/>
            <Footer.LinkGroup col>
                <Footer.Link href='https://github.com/Ayaanuddin29/ShopVista' target='_blank' rel='noopener noreferrer'>
                    E-commerce Project
                </Footer.Link>
                <Footer.Link href='https://github.com/Ayaanuddin29/ayaanpos-own' target='_blank' rel='noopener noreferrer'>
                   Point of Sale Project Code
                </Footer.Link>
            </Footer.LinkGroup>
</div>
           <div className='mt-5'>
            <Footer.Title title='Follow Us'/>
            <Footer.LinkGroup col>
                <Footer.Link href='https://github.com/Ayaanuddin29' target='_blank' rel='noopener noreferrer'>
                Git-Hub
                </Footer.Link>
                <Footer.Link href='#' target='_blank' rel='noopener noreferrer'>
                   Discord
                </Footer.Link>
                <Footer.Link href='https://www.linkedin.com/in/khaja-ayaanuddin-7553a1240/' target='_blank' rel='noopener noreferrer'>
                   Linkdin
                </Footer.Link>
                <Footer.Link href='#' target='_blank' rel='noopener noreferrer'>
                   Instagram
                </Footer.Link>
            </Footer.LinkGroup>
</div>
    <div className='mt-5'>
            <Footer.Title title='Legal'/>
            <Footer.LinkGroup col>
                <Footer.Link href='#' target='_blank' rel='noopener noreferrer'>
               Privacy Policy
                </Footer.Link>
                <Footer.Link href='#' target='_blank' rel='noopener noreferrer'>
                   Terms &amp; Condition
                </Footer.Link>
             
            </Footer.LinkGroup>
</div>
            </div>
          </div>
    <Footer.Divider/>
    <div className='py-2 mx-4 w-full sm:items-center sm:flex sm:justify-between'>
    &copy;Ayaan's Blog 2024
    <div className='flex gap-6 sm:mt-0 mt-4 lg:mt-4 sm:justify-center'>
        <Footer.Icon href='#' icon={BsFacebook}/>
        <Footer.Icon href='#' icon={BsInstagram}/>
        <Footer.Icon href='https://github.com/Ayaanuddin29' icon={BsGithub}/>
        <Footer.Icon href='https://www.linkedin.com/in/khaja-ayaanuddin-7553a1240/' icon={BsLinkedin}/>
        <Footer.Icon href='#' icon={BsTwitterX}/>
    </div>
    </div>
        </div>
    </Footer>
  )
}

export default Footercom