"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { RecentOrder } from "@/db/dashboard";
import { ReusableTable } from "@/components/ReusableTable";
import { ColumnDef } from "@tanstack/react-table";
import StatCards from "./StatusCard";

export interface Stat {
	title: string;
	value: string;
	change: string;
	icon: string;
}

interface DashboardProps {
	name: string;
	stats: Stat[];
	recentOrders: RecentOrder[];
}

const columns: ColumnDef<RecentOrder>[] = [
	{
		accessorKey: "id",
		header: "Order number",
	},
	{
		accessorKey: "date",
		header: "Purchase date",
	},
	{
		accessorKey: "customer",
		header: "Customer",
	},
	{
		accessorKey: "event",
		header: "Event",
		cell: ({ row }) => row.original.event,
	},
	{
		accessorKey: "amount",
		header: "Amount",
		cell: ({ getValue }) => getValue() as string,
	},
];

export default function Dashboard({
	name,
	stats,
	recentOrders,
}: DashboardProps) {
	const [timePeriod, setTimePeriod] = useState("Last week");

	return (
		<div className='mx-auto max-w-7xl'>
			<motion.header
				className='flex justify-between items-center mb-8'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<h1 className='font-bold text-3xl text-gray-900 dark:text-gray-100'>
					Good afternoon, {name}
				</h1>
				<Select value={timePeriod} onValueChange={setTimePeriod}>
					<SelectTrigger className='w-[180px]'>
						<SelectValue
							placeholder='Select time period'
							className='bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100'
						/>
					</SelectTrigger>
					<SelectContent className='bg-white dark:bg-gray-700'>
						<SelectItem
							value='Last week'
							className='text-gray-900 dark:text-gray-100'
						>
							Last week
						</SelectItem>
						<SelectItem
							value='Last month'
							className='text-gray-900 dark:text-gray-100'
						>
							Last month
						</SelectItem>
						<SelectItem
							value='Last year'
							className='text-gray-900 dark:text-gray-100'
						>
							Last year
						</SelectItem>
					</SelectContent>
				</Select>
			</motion.header>

			<StatCards stats={stats} />

			<h3 className='font-semibold text-gray-900 text-xl dark:text-gray-100'>
				Recent orders
			</h3>
			<ReusableTable data={recentOrders} columns={columns} />
		</div>
	);
}
