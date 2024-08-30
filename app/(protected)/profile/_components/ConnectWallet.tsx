import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Wallet } from 'lucide-react'
import ConnectWalletButton from '@/components/ConnectWalletButton'

const ConnectWallet = () => {
  const [isWalletDialogOpen, setIsWalletDialogOpen] = useState(false)

  const handleConnectWallet = () => {
    setIsWalletDialogOpen(true)
  }

  return (
    <>
      <Dialog open={isWalletDialogOpen} onOpenChange={setIsWalletDialogOpen}>
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
          <ConnectWalletButton />
        </DialogContent>
      </Dialog>
      <Button type='button' onClick={handleConnectWallet} className="w-full">
        Connect Wallet
      </Button>
    </>

  )
}

export default ConnectWallet