import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import Image from 'next/image'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { auth } from '@/auth'

export default async function Home() {
  // const session = await auth()
  // console.log('session in home', session)
  return (
    <>
      <MaxWidthWrapper className='flex flex-col justify-center items-center mt-28 sm:mt-40 mb-12 text-center'>
        <div className='flex justify-center items-center space-x-2 border-gray-200 hover:border-gray-300 bg-white hover:bg-white/50 shadow-md backdrop-blur mx-auto mb-4 px-7 py-2 border rounded-full max-w-fit transition-all overflow-hidden'>
          <p className='font-semibold text-gray-700 text-sm'>
            BolTix is in Beta!
          </p>
        </div>
        <h1 className='max-w-4xl font-bold text-5xl md:text-6xl lg:text-7xl'>
          New, Fairer {' '}
          <span className='text-blue-600'>Ticketing</span>{' '}
          .
        </h1>
        <p className='mt-5 max-w-prose text-zinc-700 sm:text-lg'>
          Our NFT Ticketing System offers a secure, transparent, and hassle-free way to manage your event tickets.
        </p>

        <Link
          className={buttonVariants({
            size: 'lg',
            className: 'mt-5',
          })}
          href='/events'>
          Buy your ticket 🎟️{' '}
          <ArrowRight className='ml-2 w-5 h-5' />
        </Link>

        <Link
          className={buttonVariants({
            size: 'lg',
            className: 'mt-5',
          })}
          href='/organizer'>
          <ArrowLeft className='mr-2 ml-2 w-5 h-5' />
          Become an organizer{' '}
        </Link>
      </MaxWidthWrapper>

      {/* value proposition section */}
      <div>
        <div className='relative isolate'>
          <div
            aria-hidden='true'
            className='-top-40 sm:-top-80 -z-10 absolute inset-x-0 blur-3xl transform-gpu overflow-hidden pointer-events-none'>
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className='relative left-[calc(50%-11rem)] sm:left-[calc(50%-30rem)] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 w-[36.125rem] sm:w-[72.1875rem] -translate-x-1/2 aspect-[1155/678] rotate-[30deg]'
            />
          </div>

          <div>
            <div className='mx-auto px-6 lg:px-8 max-w-6xl'>
              <div className='mt-16 sm:mt-24 flow-root'>
                <div className='bg-gray-900/5 -m-2 lg:-m-4 p-2 lg:p-4 rounded-xl lg:rounded-2xl ring-1 ring-gray-900/10 ring-inset'>
                  <Image
                    src='/dashboard-preview.png'
                    alt='product preview'
                    width={1364}
                    height={866}
                    quality={100}
                    className='bg-white shadow-2xl p-2 sm:p-8 md:p-20 rounded-md ring-1 ring-gray-900/10'
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            aria-hidden='true'
            className='-top-40 sm:-top-80 -z-10 absolute inset-x-0 blur-3xl transform-gpu overflow-hidden pointer-events-none'>
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className='relative left-[calc(50%-13rem)] sm:left-[calc(50%-36rem)] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 w-[36.125rem] sm:w-[72.1875rem] -translate-x-1/2 aspect-[1155/678] rotate-[30deg]'
            />
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className='mx-auto mt-32 sm:mt-56 mb-32 max-w-5xl'>
        <div className='mb-12 px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl sm:text-center'>
            <h2 className='mt-2 font-bold text-4xl text-gray-900 sm:text-5xl'>
              Get, Set, Book!
            </h2>
            <p className='mt-4 text-gray-600 text-lg'>
              BolTix is a new, fairer ticketing system that allows you to buy and sell tickets for events in a more transparent and fair way.
            </p>
          </div>
        </div>

        {/* steps */}
        <ol className='md:flex md:space-x-12 space-y-4 md:space-y-0 my-8 pt-8'>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-zinc-300 py-2 md:pt-4 md:pb-0 pl-4 md:pl-0 md:border-t-2 border-l-4 md:border-l-0'>
              <span className='font-medium text-blue-600 text-sm'>
                Step 1
              </span>
              <span className='font-semibold text-xl'>
                Create an account
              </span>
              <span className='mt-2 text-zinc-700'>
                Add your wallets on our platform, which are{' '}
                <span

                  className='text-blue-700'>
                  secured and protected.
                </span>

              </span>
            </div>
          </li>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-zinc-300 py-2 md:pt-4 md:pb-0 pl-4 md:pl-0 md:border-t-2 border-l-4 md:border-l-0'>
              <span className='font-medium text-blue-600 text-sm'>
                Step 2
              </span>
              <span className='font-semibold text-xl'>
                Register your event
              </span>
              <span className='mt-2 text-zinc-700'>
                Add your event details and start selling tickets.
              </span>
            </div>
          </li>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-zinc-300 py-2 md:pt-4 md:pb-0 pl-4 md:pl-0 md:border-t-2 border-l-4 md:border-l-0'>
              <span className='font-medium text-blue-600 text-sm'>
                Step 3
              </span>
              <span className='font-semibold text-xl'>
                Verify your tickets
              </span>
              <span className='mt-2 text-zinc-700'>
                Use our smart contract to verify your tickets on events using unique QR Code.
              </span>
            </div>
          </li>
        </ol>

        <div className='mx-auto px-6 lg:px-8 max-w-6xl'>
          <div className='mt-16 sm:mt-24 flow-root'>
            <div className='bg-gray-900/5 -m-2 lg:-m-4 p-2 lg:p-4 rounded-xl lg:rounded-2xl ring-1 ring-gray-900/10 ring-inset'>
              <Image
                src='/dashboard-one.png'
                alt='uploading preview'
                width={1419}
                height={732}
                quality={100}
                className='bg-white shadow-2xl p-2 sm:p-8 md:p-20 rounded-md ring-1 ring-gray-900/10'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}