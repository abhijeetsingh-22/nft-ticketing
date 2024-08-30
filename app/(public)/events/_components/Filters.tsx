"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const FiltersSkeleton = () => (
	<div className='space-y-6'>
		<Skeleton className='w-3/4 h-8' />
		<Skeleton className='w-full h-10' />
		<Skeleton className='w-full h-10' />
		<Skeleton className='w-full h-16' />
		<Skeleton className='w-full h-20' />
		<div className='flex space-x-2'>
			<Skeleton className='w-1/2 h-10' />
			<Skeleton className='w-1/2 h-10' />
		</div>
	</div>
);

interface FiltersProps {
	minPrice: string;
	maxPrice: string;
	handlePriceChange: (value: string, setter: (value: string) => void) => void;
	setMinPrice: (value: string) => void;
	setMaxPrice: (value: string) => void;
	setSelectedOrganizers: (value: string[]) => void;
}

export const Filters = ({
	minPrice,
	maxPrice,
	handlePriceChange,
	setMinPrice,
	setMaxPrice,
	setSelectedOrganizers,
}: FiltersProps) => (
	<Card className='bg-white dark:bg-gray-800'>
		<CardContent className='space-y-6 p-6'>
			<div>
				<h2 className='mb-2 font-semibold text-gray-900 text-lg dark:text-gray-100'>
					Filters
				</h2>
				<div className='flex justify-between items-center'>
					<span className='text-gray-700 text-sm dark:text-gray-300'>
						Verified only
					</span>
					<Switch />
				</div>
			</div>

			<div>
				<h3 className='mb-2 font-semibold text-gray-900 text-sm dark:text-gray-100'>
					Price Range
				</h3>
				<div className='flex items-center space-x-2'>
					<Input
						type='number'
						placeholder='Min'
						value={minPrice}
						onChange={(e) => handlePriceChange(e.target.value, setMinPrice)}
						className='bg-white dark:bg-gray-700 w-1/2 text-gray-900 dark:text-gray-100'
					/>
					<span className='text-gray-700 dark:text-gray-300'>-</span>
					<Input
						type='number'
						placeholder='Max'
						value={maxPrice}
						onChange={(e) => handlePriceChange(e.target.value, setMaxPrice)}
						className='bg-white dark:bg-gray-700 w-1/2 text-gray-900 dark:text-gray-100'
					/>
				</div>
			</div>

			<div>
				<h3 className='mb-2 font-semibold text-gray-900 text-sm dark:text-gray-100'>
					Dates
				</h3>
				<div className='space-y-2'>
					<Input
						placeholder='From'
						type='date'
						className='bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100'
					/>
					<Input
						placeholder='To'
						type='date'
						className='bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100'
					/>
				</div>
			</div>

			<div className='flex space-x-2'>
				<Button className='flex-1 bg-purple-600 hover:bg-purple-700 text-white'>
					Apply
				</Button>
				<Button
					variant='outline'
					className='flex-1 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
					onClick={() => {
						setMinPrice("0");
						setMaxPrice("500");
						setSelectedOrganizers([]);
					}}
				>
					Reset
				</Button>
			</div>
		</CardContent>
	</Card>
);
