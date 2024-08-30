import React from 'react'
import { Instagram, Twitter, Github } from 'lucide-react'
import { FaDiscord } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const SocialConnector = () => {
  return (
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
            <Input id="instagram" placeholder="Username" className="flex-grow" />
          </div>
          <Button type="button" variant="outline" className="border-pink-600 bg-white hover:bg-pink-50 w-full text-pink-600">
            Connect Instagram
          </Button>
        </div>
        <div className="space-y-2">
          <Label htmlFor="discord" className="font-medium text-sm">Discord</Label>
          <div className="flex items-center space-x-2">
            <FaDiscord className="w-5 h-5 text-indigo-600" />
            <Input id="discord" placeholder="Username" className="flex-grow" />
          </div>
          <Button type="button" variant="outline" className="border-indigo-600 bg-white hover:bg-indigo-50 w-full text-indigo-600">
            Connect Discord
          </Button>
        </div>
        <div className="space-y-2">
          <Label htmlFor="twitter" className="font-medium text-sm">Twitter</Label>
          <div className="flex items-center space-x-2">
            <Twitter className="w-5 h-5 text-blue-400" />
            <Input id="twitter" placeholder="Username" className="flex-grow" />
          </div>
          <Button type="button" variant="outline" className="bg-white hover:bg-blue-50 border-blue-400 w-full text-blue-400">
            Connect Twitter
          </Button>
        </div>
        <div className="space-y-2">
          <Label htmlFor="github" className="font-medium text-sm">GitHub</Label>
          <div className="flex items-center space-x-2">
            <Github className="w-5 h-5 text-gray-900" />
            <Input id="github" placeholder="Username" className="flex-grow" />
          </div>
          <Button type="button" variant="outline" className="border-gray-900 bg-white hover:bg-gray-100 w-full text-gray-900">
            Connect GitHub
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default SocialConnector