'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Ticket, QrCode, X, Check, AlertCircle, Calendar, Clock, MapPin, User } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

// Mock function to simulate backend call
const validateTicket = async (code: string): Promise<{ valid: boolean; ticket?: TicketDetails }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Mock validation logic
  if (code === '123456' || code === 'qr-123456') {
    return {
      valid: true,
      ticket: {
        id: '1',
        eventName: 'Cosmic Beats Festival',
        date: '2023-08-15',
        time: '20:00',
        location: 'Neon Arena, New York',
        attendeeName: 'John Doe'
      }
    }
  }
  return { valid: false }
}

interface TicketDetails {
  id: string
  eventName: string
  date: string
  time: string
  location: string
  attendeeName: string
}

export function TicketValidation() {
  const [activeTab, setActiveTab] = useState<'manual' | 'qr'>('manual')
  const [manualCode, setManualCode] = useState('')
  const [isValidating, setIsValidating] = useState(false)
  const [validatedTicket, setValidatedTicket] = useState<TicketDetails | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const { toast } = useToast()

  const handleValidate = async (code: string) => {
    setIsValidating(true)
    try {
      const result = await validateTicket(code)
      if (result.valid && result.ticket) {
        setValidatedTicket(result.ticket)
        setShowDialog(true)
      } else {
        toast({
          title: "Invalid Ticket",
          description: "The ticket code is invalid or not found.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while validating the ticket.",
        variant: "destructive",
      })
    } finally {
      setIsValidating(false)
      setManualCode('')
    }
  }

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (manualCode.length === 6) {
      handleValidate(manualCode)
    }
  }

  const handleQRScan = () => {
    // In a real application, this would trigger the QR scanner
    // For this example, we'll simulate a successful QR scan
    handleValidate('qr-123456')
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Ticket Validation</CardTitle>
          <CardDescription className="text-center">Enter the 6-digit code or scan the QR code</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'manual' | 'qr')} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manual">Manual Entry</TabsTrigger>
              <TabsTrigger value="qr">QR Scan</TabsTrigger>
            </TabsList>
            <TabsContent value="manual">
              <form onSubmit={handleManualSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  maxLength={6}
                  className="text-center text-2xl tracking-widest"
                />
                <Button type="submit" className="w-full" disabled={manualCode.length !== 6 || isValidating}>
                  {isValidating ? 'Validating...' : 'Validate Ticket'}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="qr">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-64 h-64 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <QrCode size={100} className="text-gray-400 dark:text-gray-500" />
                </div>
                <Button onClick={handleQRScan} className="w-full" disabled={isValidating}>
                  {isValidating ? 'Scanning...' : 'Scan QR Code'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[600px] shadow-2xl dark:shadow-purple-900/20">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-center mb-4">Ticket Validated</DialogTitle>
            <DialogDescription className="text-center text-lg">
              The ticket has been successfully verified and marked as used.
            </DialogDescription>
          </DialogHeader>
          {validatedTicket && (
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-center mb-4">{validatedTicket.eventName}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                  <span>{validatedTicket.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                  <span>{validatedTicket.time}</span>
                </div>
                <div className="flex items-center col-span-2">
                  <MapPin className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                  <span>{validatedTicket.location}</span>
                </div>
                <div className="flex items-center col-span-2">
                  <User className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                  <span>{validatedTicket.attendeeName}</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="sm:justify-center">
            <Button onClick={() => setShowDialog(false)} className="w-full sm:w-auto">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}