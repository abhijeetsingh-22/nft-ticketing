import Image from "next/image";


export default function Home() {
  return (
    <main className="flex flex-col justify-between items-center p-24 min-h-screen">
      <div className="z-10 lg:flex justify-between items-center w-full max-w-5xl font-mono text-sm">
        <p className="top-0 left-0 lg:static fixed flex justify-center border-gray-300 dark:border-neutral-800 lg:bg-gray-200 lg:dark:bg-zinc-800/30 dark:bg-zinc-800/30 bg-gradient-to-b from-zinc-200 dark:from-inherit backdrop-blur-2xl lg:p-4 pt-8 pb-6 lg:border border-b lg:rounded-xl w-full lg:w-auto">
          Get started by editing&nbsp;
          <code className="font-bold font-mono">app/page.tsx</code>
        </p>
        <div className="bottom-0 left-0 lg:static fixed flex justify-center items-end bg-gradient-to-t from-white dark:from-black via-white dark:via-black lg:bg-none w-full h-48 lg:size-auto">
          <a
            className="flex place-items-center gap-2 p-8 lg:p-0 pointer-events-none lg:pointer-events-auto"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative z-[-1] after:-z-20 before:absolute after:absolute flex place-items-center before:content-[''] after:content-[''] before:bg-gradient-radial before:dark:bg-gradient-to-br after:bg-gradient-conic before:from-white before:dark:from-transparent after:from-sky-200 after:dark:from-sky-900 after:via-blue-200 after:dark:via-[#0141ff] before:to-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:opacity-40 before:blur-2xl after:blur-2xl before:rounded-full sm:before:w-[480px] sm:after:w-[240px] before:w-full after:w-full before:lg:h-[360px] before:h-[300px] after:h-[180px] before:-translate-x-1/2 after:translate-x-1/3">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="grid lg:grid-cols-4 mb-32 lg:mb-0 lg:w-full lg:max-w-5xl text-center lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="hover:border-gray-300 hover:dark:border-neutral-700 hover:bg-gray-100 hover:dark:bg-neutral-800/30 px-5 py-4 border border-transparent rounded-lg transition-colors group"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 font-semibold text-2xl">
            Docs{" "}
            <span className="inline-block motion-reduce:transform-none transition-transform group-hover:translate-x-1">
              -&gt;
            </span>
          </h2>
          <p className="opacity-50 m-0 max-w-[30ch] text-sm">
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="hover:border-gray-300 hover:dark:border-neutral-700 hover:bg-gray-100 hover:dark:bg-neutral-800/30 px-5 py-4 border border-transparent rounded-lg transition-colors group"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 font-semibold text-2xl">
            Learn{" "}
            <span className="inline-block motion-reduce:transform-none transition-transform group-hover:translate-x-1">
              -&gt;
            </span>
          </h2>
          <p className="opacity-50 m-0 max-w-[30ch] text-sm">
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="hover:border-gray-300 hover:dark:border-neutral-700 hover:bg-gray-100 hover:dark:bg-neutral-800/30 px-5 py-4 border border-transparent rounded-lg transition-colors group"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 font-semibold text-2xl">
            Templates{" "}
            <span className="inline-block motion-reduce:transform-none transition-transform group-hover:translate-x-1">
              -&gt;
            </span>
          </h2>
          <p className="opacity-50 m-0 max-w-[30ch] text-sm">
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="hover:border-gray-300 hover:dark:border-neutral-700 hover:bg-gray-100 hover:dark:bg-neutral-800/30 px-5 py-4 border border-transparent rounded-lg transition-colors group"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 font-semibold text-2xl">
            Deploy{" "}
            <span className="inline-block motion-reduce:transform-none transition-transform group-hover:translate-x-1">
              -&gt;
            </span>
          </h2>
          <p className="opacity-50 m-0 max-w-[30ch] text-balance text-sm">
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
