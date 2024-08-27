'use client'
import { Calendar, Users, ChevronRight, Wallet } from "lucide-react"
import Link from "next/link"

import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useState } from "react"
import { Routes } from "@/routes"
import { cn } from "@/lib/utils"
import { useRouter } from "next/router"

export default function Onboarding() {
  const router = useRouter()
  const updateUserOnboardingStatus = async () => {
    try {

      // await updateUserById(user.id, { isOnboarded: true })
    } catch (error) {
      console.error('Error updating onboarding status:', error);
    }
  };
  const handleGetStarted = (userRole: "organizer" | "attendee") => {


    updateUserOnboardingStatus();
    if (userRole === "organizer") {
      router.push(Routes.DASHBOARD)
    } else {
      router.push(Routes.EVENTS)
    }
  }
  // const [isWalletDialogOpen, setIsWalletDialogOpen] = useState(false)

  // const handleConnectWallet = () => {
  //   // Here you would typically integrate with a Solana wallet provider
  //   console.log("Connecting to Solana wallet...")
  //   // For demonstration, we'll just close the dialog after a delay
  //   setTimeout(() => setIsWalletDialogOpen(false), 2000)
  // }
  return (
    <>
      {/* <Dialog open={isWalletDialogOpen} onOpenChange={setIsWalletDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect Your Solana Wallet</DialogTitle>
            <DialogDescription>
              To use EventHub, you need to connect your Solana wallet. This allows you to securely manage tickets and payments.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <Wallet className="w-16 h-16 text-purple-500" />
          </div>
          <Button onClick={handleConnectWallet} className="w-full">
            Connect Wallet
          </Button>
        </DialogContent>
      </Dialog> */}
      <div className="flex justify-center items-center bg-white p-4 min-h-screen">
        <Card className="shadow-lg w-full max-w-4xl overflow-hidden">
          <CardContent className="p-8 sm:p-12">
            <div className="flex justify-between items-center mb-8">
              <h1 className="font-bold text-2xl sm:text-3xl tracking-tight">Mintix</h1>
              <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-full w-8 h-8" />
            </div>
            <div className="space-y-2 mb-10">
              <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight">What brings you to Mintix?</h2>
              <p className="text-lg text-muted-foreground">Choose your path and let&apos;s get started.</p>
            </div>
            <div className="gap-6 grid sm:grid-cols-2">
              <Card className="relative hover:shadow-md transition-all duration-300 overflow-hidden group">
                <CardContent className="p-6">
                  <div className="z-10 absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-20 space-y-4">
                    <div className="flex justify-between items-center">
                      <Calendar className="w-10 h-10 text-purple-500" strokeWidth={1.5} />
                      <ChevronRight className="w-5 h-5 text-muted-foreground transition-transform group-hover:translate-x-1 duration-300" />
                    </div>
                    <h3 className="font-semibold text-xl">I&apos;m an event organizer</h3>
                    <p className="text-muted-foreground text-sm">Create and manage events, sell tickets, and grow your audience.</p>
                    <Button onClick={() => handleGetStarted("organizer")} className={cn(buttonVariants({ variant: "outline" }), "group-hover:bg-purple-500 group-hover:text-white w-full transition-colors duration-300")}>
                      Get Started
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="relative hover:shadow-md transition-all duration-300 overflow-hidden group">
                <CardContent className="p-6">
                  <div className="z-10 absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-20 space-y-4">
                    <div className="flex justify-between items-center">
                      <Users className="w-10 h-10 text-blue-500" strokeWidth={1.5} />
                      <ChevronRight className="w-5 h-5 text-muted-foreground transition-transform group-hover:translate-x-1 duration-300" />
                    </div>
                    <h3 className="font-semibold text-xl">I&apos;m an attendee</h3>
                    <p className="text-muted-foreground text-sm">Discover exciting events, purchase tickets, and connect with others.</p>
                    <Button onClick={() => handleGetStarted("attendee")} className={cn(buttonVariants({ variant: "outline" }), "group-hover:bg-purple-500 group-hover:text-white w-full transition-colors duration-300")}>
                      Get Started
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* <div className="space-y-4 mt-10 text-center">
            <p className="text-muted-foreground text-sm">
              Already using Mintix?{" "}
              <Link className="font-medium text-primary hover:text-primary/80 transition-colors" href="#">
                Sign in
              </Link>
            </p>
            <p className="text-muted-foreground/60 text-xs">
              By continuing, you agree to Mintix&apos;s{" "}
              <Link className="hover:text-primary underline transition-colors" href="#">
                Terms of Use
              </Link>{" "}
              and confirm that you have read Mintix&apos;s{" "}
              <Link className="hover:text-primary underline transition-colors" href="#">
                Privacy Policy
              </Link>
              .
            </p>
          </div> */}
          </CardContent>
        </Card>
      </div>
    </>

  )
}