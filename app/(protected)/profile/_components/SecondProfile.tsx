'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Copy, Check, Loader2, Instagram, Twitter, Github } from 'lucide-react'
import { FaDiscord } from 'react-icons/fa'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  name: z.string().nonempty("Name is required"),
  bio: z.string().optional(),
  email: z.string().email("Invalid email address"),
  showEmail: z.boolean().optional(),
  instagram: z.string().optional(),
  discord: z.string().optional(),
  twitter: z.string().optional(),
  github: z.string().optional(),
  streetAddress: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  currency: z.string().optional()
})

export default function SecondProfile() {
  const [copiedWallet, setCopiedWallet] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      bio: '',
      email: '',
      showEmail: false,
      instagram: '',
      discord: '',
      twitter: '',
      github: '',
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      currency: ''
    }
  })

  const connectedWallets = [
    { name: 'Metamask', address: '0x1234...5678' },
    { name: 'WalletConnect', address: '0xabcd...efgh' },
  ]

  const handleCopyWallet = (address: string) => {
    navigator.clipboard.writeText(address)
    setCopiedWallet(address)
    setTimeout(() => setCopiedWallet(null), 2000)
  }

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    console.log("data", data);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white min-h-screen text-gray-900"
    >
      <main className="mx-auto px-4 py-8 max-w-6xl">
        {/* <motion.h2
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="mb-6 font-bold text-3xl"
        >
          Settings
        </motion.h2> */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <motion.div layout className="gap-6 grid grid-cols-1 md:grid-cols-3">
            <div className="md:col-span-1">
              <Label htmlFor="name" className="font-semibold text-lg">Name</Label>
              <p className="mt-1 text-gray-500 text-sm">This will be displayed on your public profile.</p>
            </div>
            <div className="md:col-span-2">
              <Input id="name" placeholder="Enter your name" className="w-full" {...register("name")} />
              {errors.name && <p className="text-red-500">{errors.name.message?.toString()}</p>}
            </div>
          </motion.div>

          <Separator className="my-8" />

          <motion.div layout className="gap-6 grid grid-cols-1 md:grid-cols-3">
            <div className="md:col-span-1">
              <Label htmlFor="bio" className="font-semibold text-lg">Bio</Label>
              <p className="mt-1 text-gray-500 text-sm">This will be displayed on your public profile. Maximum 240 characters.</p>
            </div>
            <div className="md:col-span-2">
              <Textarea id="bio" placeholder="Enter your bio" className="w-full min-h-[100px]" {...register("bio")} />
              {errors.bio && <p className="text-red-500">{errors.bio.message?.toString()}</p>}
            </div>
          </motion.div>

          <Separator className="my-8" />

          <motion.div layout className="gap-6 grid grid-cols-1 md:grid-cols-3">
            <div className="md:col-span-1">
              <Label htmlFor="email" className="font-semibold text-lg">Email</Label>
              <p className="mt-1 text-gray-500 text-sm">This is how people can contact you.</p>
            </div>
            <div className="space-y-4 md:col-span-2">
              <Input id="email" type="email" placeholder="Enter your email" className="w-full" {...register("email")} />
              {errors.email && <p className="text-red-500">{errors.email.message?.toString()}</p>}
              <div className="flex items-center space-x-2">
                <Controller
                  name="showEmail"
                  control={control}
                  render={({ field }) => (
                    <Switch id="showEmail" checked={field.value} onCheckedChange={field.onChange} />
                  )}
                />
                <Label htmlFor="showEmail">Show email on public profile</Label>
              </div>
            </div>
          </motion.div>

          <Separator className="my-8" />

          <motion.div layout className="gap-6 grid grid-cols-1 md:grid-cols-3">
            <div className="md:col-span-1">
              <Label className="font-semibold text-lg">Connected Web3 Wallets</Label>
              <p className="mt-1 text-gray-500 text-sm">Manage your connected Web3 wallets.</p>
            </div>
            <div className="space-y-4 md:col-span-2">
              <AnimatePresence>
                {connectedWallets.map((wallet, index) => (
                  <motion.div
                    key={wallet.address}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{wallet.name}</p>
                      <p className="text-gray-500 text-sm">{wallet.address}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyWallet(wallet.address)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {copiedWallet === wallet.address ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
              <Button variant="outline" className="w-full">Connect New Wallet</Button>
            </div>
          </motion.div>

          <Separator className="my-8" />

          <motion.div layout className="gap-6 grid grid-cols-1 md:grid-cols-3">
            <div className="md:col-span-1">
              <Label className="font-semibold text-lg">Connect Social Accounts</Label>
              <p className="mt-1 text-gray-500 text-sm">Link your social media accounts to your profile.</p>
            </div>
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:col-span-2">
              <div className="space-y-2">
                <Label htmlFor="instagram" className="font-medium text-sm">Instagram</Label>
                <div className="flex items-center space-x-2">
                  <Instagram className="w-5 h-5 text-pink-600" />
                  <Input id="instagram" placeholder="Username" className="flex-grow" {...register("instagram")} />
                </div>
                <Button variant="outline" className="border-pink-600 bg-white hover:bg-pink-50 w-full text-pink-600">
                  Connect Instagram
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="discord" className="font-medium text-sm">Discord</Label>
                <div className="flex items-center space-x-2">
                  <FaDiscord className="w-5 h-5 text-indigo-600" />
                  <Input id="discord" placeholder="Username" className="flex-grow" {...register("discord")} />
                </div>
                <Button variant="outline" className="border-indigo-600 bg-white hover:bg-indigo-50 w-full text-indigo-600">
                  Connect Discord
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter" className="font-medium text-sm">Twitter</Label>
                <div className="flex items-center space-x-2">
                  <Twitter className="w-5 h-5 text-blue-400" />
                  <Input id="twitter" placeholder="Username" className="flex-grow" {...register("twitter")} />
                </div>
                <Button variant="outline" className="bg-white hover:bg-blue-50 border-blue-400 w-full text-blue-400">
                  Connect Twitter
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="github" className="font-medium text-sm">GitHub</Label>
                <div className="flex items-center space-x-2">
                  <Github className="w-5 h-5 text-gray-900" />
                  <Input id="github" placeholder="Username" className="flex-grow" {...register("github")} />
                </div>
                <Button variant="outline" className="border-gray-900 bg-white hover:bg-gray-100 w-full text-gray-900">
                  Connect GitHub
                </Button>
              </div>
            </div>
          </motion.div>

          <Separator className="my-8" />

          <motion.div layout className="gap-6 grid grid-cols-1 md:grid-cols-3">
            <div className="md:col-span-1">
              <Label className="font-semibold text-lg">Address</Label>
              <p className="mt-1 text-gray-500 text-sm">This is your registered address.</p>
            </div>
            <div className="space-y-4 md:col-span-2">
              <Input placeholder="Street address" className="w-full" {...register("streetAddress")} />
              <Input placeholder="City" className="w-full" {...register("city")} />
              <div className="gap-4 grid grid-cols-2">
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="State/Province" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="on">Ontario</SelectItem>
                        <SelectItem value="qc">Quebec</SelectItem>
                        <SelectItem value="bc">British Columbia</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <Input placeholder="Postal code" {...register("postalCode")} />
              </div>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </motion.div>

          <Separator className="my-8" />

          <motion.div layout className="gap-6 grid grid-cols-1 md:grid-cols-3">
            <div className="md:col-span-1">
              <Label htmlFor="currency" className="font-semibold text-lg">Currency</Label>
              <p className="mt-1 text-gray-500 text-sm">The currency that you will be using.</p>
            </div>
            <div className="md:col-span-2">
              <Controller
                name="currency"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cad">CAD - Canadian Dollar</SelectItem>
                      <SelectItem value="usd">USD - US Dollar</SelectItem>
                      <SelectItem value="eur">EUR - Euro</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </motion.div>

          <Separator className="my-8" />

          <motion.div layout className="flex justify-end space-x-4 pt-6">
            <Button type="button" variant="outline" className="border-gray-300 bg-white hover:bg-gray-50 text-gray-600">
              Reset
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              ) : null}
              {isLoading ? 'Saving...' : 'Save changes'}
            </Button>
          </motion.div>
        </form>
      </main>
    </motion.div>
  )
}