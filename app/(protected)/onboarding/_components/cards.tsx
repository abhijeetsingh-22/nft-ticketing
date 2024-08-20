import { Button } from "@/components/ui/button"

export default function OnboardingCards() {
  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 min-h-screen">
      <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-4xl text-center">
        <header className="mb-8">
          <h1 className="font-bold text-4xl">What brings you to Eventify?</h1>
        </header>
        <div className="flex justify-center space-x-8">
          <div className="flex flex-col items-center bg-gray-100 shadow-md p-6 rounded-lg w-80">
            <img
              src="/placeholder.svg"
              alt="Organiser"
              className="mb-4"
              width="150"
              height="150"
              style={{ aspectRatio: "150/150", objectFit: "cover" }}
            />
            <h2 className="mb-2 font-semibold text-xl">I&apos;m an organiser</h2>
            <p className="mb-4 text-gray-600">Create and manage your events</p>
            <Button variant="default">Get Started</Button>
          </div>
          <div className="flex flex-col items-center bg-gray-100 shadow-md p-6 rounded-lg w-80">
            <img
              src="/placeholder.svg"
              alt="Book Tickets"
              className="mb-4"
              width="150"
              height="150"
              style={{ aspectRatio: "150/150", objectFit: "cover" }}
            />
            <h2 className="mb-2 font-semibold text-xl">I want to book tickets</h2>
            <p className="mb-4 text-gray-600">Find and book tickets for events</p>
            <Button variant="default">Browse Events</Button>
          </div>
        </div>
        <footer className="mt-8">
          <p className="text-gray-600">
            Already using Eventify?{" "}
            <a href="#" className="text-blue-600">
              Sign in
            </a>
          </p>
          <p className="mt-2 text-gray-500 text-sm">
            By continuing, you agree to Eventify&apos;s{" "}
            <a href="#" className="text-blue-600">
              Terms of Use
            </a>{" "}
            and confirm that you have read Eventify&apos;s{" "}
            <a href="#" className="text-blue-600">
              Privacy Policy
            </a>
            .
          </p>
        </footer>
      </div>
    </div>
  )
}