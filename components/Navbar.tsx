
import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { buttonVariants } from './ui/button'
import { ArrowRight, Github } from 'lucide-react'
import MobileNav from './MobileNav'
import SignOutButton from './auth/SignOutButton'
import { auth } from '@/auth'
import ConnectWalletButton from '@/components/ConnectWalletButton'

const Navbar = async () => {
  const session = await auth()

  const isAuth = session?.user ? true : false


  return (
    <nav className='top-0 z-30 sticky inset-x-0 border-gray-200 bg-white/75 backdrop-blur-lg border-b w-full h-14 transition-all'>
      <MaxWidthWrapper>
        <div className='flex justify-between items-center border-zinc-200 border-b h-14'>
          <Link
            href='/'
            className='z-40 flex font-semibold'>
            <span>MintTix</span>
          </Link>

          <MobileNav isAuth={isAuth} />

          <div className='sm:flex items-center space-x-4 hidden'>
            <Link
              href='/events'
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
              })}>
              All Events
            </Link>
            {!isAuth ? (
              <>
                {/* <Link
                  target='_blank'
                  href='https://github.com/abhijeetsingh-22/nft-ticketing'
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  <Github className='w-5 h-5' />
                </Link> */}
                {/* <Link
                  href='/login'
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  Sign in
                </Link> */}
                <ConnectWalletButton />
                <Link
                  href='/signup'
                  className={buttonVariants({
                    size: 'sm',
                  })}>
                  Get started{' '}
                  <ArrowRight className='ml-1.5 w-5 h-5' />
                </Link>
              </>
            ) : (
              <>
                {
                  <Link
                    href={`/${session?.user?.id}/events`}
                    className={buttonVariants({
                      variant: 'ghost',
                      size: 'sm',
                    })}>
                    My Events
                  </Link>}
                <Link className='cursor-pointer' href="/profile">{session?.user?.email}</Link>
                <SignOutButton />
              </>
            )}

          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
