import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ArrowDownIcon,
	ArrowUpIcon,
	DollarSignIcon,
	TrendingUpIcon,
	TicketIcon,
	EyeIcon,
} from "lucide-react";
import { Stat } from "./Dashboard";

const iconMap = {
	DollarSignIcon: DollarSignIcon,
	TrendingUpIcon: TrendingUpIcon,
	TicketIcon: TicketIcon,
	EyeIcon: EyeIcon,
};

interface StatCardsProps {
	stats: Stat[];
}

export default function StatCards({ stats }: StatCardsProps) {
	return (
		<motion.div
			className='gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8'
			initial='hidden'
			animate='visible'
			variants={{
				visible: {
					transition: {
						staggerChildren: 0.1,
					},
				},
			}}
		>
			{stats.map((stat, index) => {
				const IconComponent = iconMap[stat.icon as keyof typeof iconMap];
				return (
					<motion.div
						key={index}
						variants={{
							hidden: { opacity: 0, y: 20 },
							visible: { opacity: 1, y: 0 },
						}}
						transition={{ duration: 0.5 }}
					>
						<Card className='bg-white dark:bg-gray-800'>
							<CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
								<CardTitle className='font-medium text-gray-500 text-sm dark:text-gray-400'>
									{stat.title}
								</CardTitle>
								<IconComponent className='w-4 h-4 text-gray-500 dark:text-gray-400' />
							</CardHeader>
							<CardContent>
								<div className='font-bold text-2xl text-gray-900 dark:text-gray-100'>
									{stat.value}
								</div>
								{/* <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                  {stat.change.startsWith('+') ? <ArrowUpIcon className="mr-1 w-3 h-3" /> : <ArrowDownIcon className="mr-1 w-3 h-3" />}
                  {stat.change} from last week
                </p> */}
							</CardContent>
						</Card>
					</motion.div>
				);
			})}
		</motion.div>
	);
}
