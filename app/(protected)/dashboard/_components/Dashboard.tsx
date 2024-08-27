'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowDownIcon, ArrowUpIcon, TicketIcon, EyeIcon, DollarSignIcon, TrendingUpIcon } from 'lucide-react'

export default function Dashboard({ name }: { name: string }) {
  const [timePeriod, setTimePeriod] = useState('Last week')

  const stats = [
    { title: "Total revenue", value: "$2.6M", change: "+4.5%", icon: DollarSignIcon },
    { title: "Average order value", value: "$455", change: "-0.5%", icon: TrendingUpIcon },
    { title: "Tickets sold", value: "5,888", change: "+4.5%", icon: TicketIcon },
    { title: "Pageviews", value: "823,067", change: "+21.2%", icon: EyeIcon },
  ]

  const recentOrders = [
    { id: 3000, date: "May 9, 2024", customer: "Leslie Alexander", event: "Bear Hug: Live in Concert", amount: "US$80.00" },
    { id: 3001, date: "May 5, 2024", customer: "Michael Foster", event: "Six Fingers — DJ Set", amount: "US$299.00" },
    { id: 3002, date: "Apr 28, 2024", customer: "Dries Vincent", event: "We All Look The Same", amount: "US$150.00" },
    { id: 3003, date: "Apr 23, 2024", customer: "Lindsay Walton", event: "Bear Hug: Live in Concert", amount: "US$80.00" },
    { id: 3004, date: "Apr 18, 2024", customer: "Courtney Henry", event: "Viking People", amount: "US$114.99" },
  ]

  return (
    <div className="mx-auto max-w-7xl">
      <motion.header
        className="flex justify-between items-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-bold text-3xl text-gray-900">Good afternoon, {name}</h1>
        <Select value={timePeriod} onValueChange={setTimePeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Last week">Last week</SelectItem>
            <SelectItem value="Last month">Last month</SelectItem>
            <SelectItem value="Last year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </motion.header>

      <motion.div
        className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
                <CardTitle className="font-medium text-gray-500 text-sm">{stat.title}</CardTitle>
                <stat.icon className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="font-bold text-2xl text-gray-900">{stat.value}</div>
                <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                  {stat.change.startsWith('+') ? <ArrowUpIcon className="mr-1 w-3 h-3" /> : <ArrowDownIcon className="mr-1 w-3 h-3" />}
                  {stat.change} from last week
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle className="font-semibold text-gray-900 text-xl">Recent orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order number</TableHead>
                <TableHead>Purchase date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Event</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order, index) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {order.id}
                    </motion.div>
                  </TableCell>
                  <TableCell>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {order.date}
                    </motion.div>
                  </TableCell>
                  <TableCell>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {order.customer}
                    </motion.div>
                  </TableCell>
                  <TableCell>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center"
                    >
                      <span className="flex justify-center items-center bg-gray-200 mr-2 rounded-full w-8 h-8 text-gray-500">NFT</span>
                      {order.event}
                    </motion.div>
                  </TableCell>
                  <TableCell className="text-right">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {order.amount}
                    </motion.div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}