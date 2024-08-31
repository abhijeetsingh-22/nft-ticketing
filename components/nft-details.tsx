"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { RefreshCw, Copy, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getNftDetails, type NftDetails } from "@/lib/NFT/getNftInfo";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function NftDetails() {
	const searchParams = useSearchParams();

	const nftAddress = searchParams.get("nftAddress") || "";

	const [nftData, setNftData] = useState<NftDetails | null>(null);

	const fetchNftData = async (address: string) => {
		toast.promise(getNftDetails(address), {
			loading: "Fetching NFT data...",
			success: (data) => {
				setNftData(data);
				return "NFT data fetched successfully";
			},
			error: (error) => {
				console.error("Error fetching NFT data:", error);
				return "Failed to fetch NFT data";
			},
		});
	};

	useEffect(() => {
		fetchNftData(nftAddress);
	}, [nftAddress]);

	const searchRef = useRef<HTMLInputElement>(null);

	return (
		<div className='bg-gray-100 dark:bg-[#1C1C1C] p-4 min-h-screen text-gray-800 dark:text-gray-300'>
			<div className='mx-auto max-w-6xl'>
				<div className='flex justify-between items-center mb-6'>
					<Input
						ref={searchRef}
						className='border-gray-300 dark:border-[#3A3A3A] bg-white dark:bg-[#2D2D2D] w-[600px] text-gray-800 dark:text-gray-300'
						placeholder='Search for blocks, accounts, transactions, programs, and tokens'
						onChange={(e) => {
							const debounce = (func: Function, delay: number) => {
								let timeoutId: NodeJS.Timeout;
								return (...args: any[]) => {
									clearTimeout(timeoutId);
									timeoutId = setTimeout(() => func(...args), delay);
								};
							};

							const updateUrl = debounce((value: string) => {
								const searchParams = new URLSearchParams(
									window.location.search
								);
								searchParams.set("nftAddress", value);
								const newUrl = `${
									window.location.pathname
								}?${searchParams.toString()}`;
								window.history.pushState(null, "", newUrl);
							}, 3000);

							updateUrl(e.target.value);
						}}
					/>
					{/* <Button variant='outline' onClick={handleOnClickSearch}>
						<Search className='size-4' />
						Search
					</Button> */}
				</div>

				<div className='mb-6'>
					<div className='flex items-center space-x-2 mb-2'>
						<span className='text-lavender-500 text-sm'>METAPLEX NFT</span>
						<Badge
							variant='outline'
							className='dark:border-[#3A3A3A] bg-lavender-100 dark:bg-[#2D2D2D] border-lavender-300 text-lavender-800 dark:text-lavender-400'
						>
							Master Edition
						</Badge>
					</div>
					<div className='flex justify-between items-center'>
						<div>
							<h1 className='font-bold text-2xl text-gray-900 dark:text-white'>
								{nftData?.name}
							</h1>
							<p className='text-gray-600 dark:text-gray-400'>
								{nftData?.symbol}
							</p>
						</div>
						<div className='flex space-x-2'>
							<Badge
								variant='outline'
								className='dark:border-[#3A3A3A] bg-lavender-100 dark:bg-[#2D2D2D] border-lavender-300 text-lavender-800 dark:text-lavender-400'
							>
								Primary Market
							</Badge>
							<Badge
								variant='outline'
								className='dark:border-[#3A3A3A] bg-lavender-100 dark:bg-[#2D2D2D] border-lavender-300 text-lavender-800 dark:text-lavender-400'
							>
								Mutable
							</Badge>
							<Button
								variant='outline'
								className='dark:border-[#3A3A3A] bg-lavender-100 dark:bg-[#2D2D2D] border-lavender-300 text-lavender-800 dark:text-lavender-400'
							>
								Creators <span className='ml-1'>▼</span>
							</Button>
						</div>
					</div>
				</div>

				{nftAddress && nftData ? (
					<Tabs defaultValue='overview' className='space-y-4'>
						<TabsList className='border-gray-300 dark:border-[#3A3A3A] bg-white dark:bg-[#2D2D2D] border-b text-gray-600 dark:text-gray-400'>
							<TabsTrigger
								value='overview'
								className='data-[state=active]:border-b-2 data-[state=active]:border-lavender-500 data-[state=active]:text-lavender-500'
							>
								Overview
							</TabsTrigger>
							<TabsTrigger
								value='history'
								className='data-[state=active]:border-b-2 data-[state=active]:border-lavender-500 data-[state=active]:text-lavender-500'
							>
								History
							</TabsTrigger>
							<TabsTrigger
								value='transfers'
								className='data-[state=active]:border-b-2 data-[state=active]:border-lavender-500 data-[state=active]:text-lavender-500'
							>
								Transfers
							</TabsTrigger>
							<TabsTrigger
								value='instructions'
								className='data-[state=active]:border-b-2 data-[state=active]:border-lavender-500 data-[state=active]:text-lavender-500'
							>
								Instructions
							</TabsTrigger>
							<TabsTrigger
								value='metadata'
								className='data-[state=active]:border-b-2 data-[state=active]:border-lavender-500 data-[state=active]:text-lavender-500'
							>
								Metadata
							</TabsTrigger>
							<TabsTrigger
								value='attributes'
								className='data-[state=active]:border-b-2 data-[state=active]:border-lavender-500 data-[state=active]:text-lavender-500'
							>
								Attributes
							</TabsTrigger>
						</TabsList>
						<TabsContent value='overview'>
							<Card className='border-gray-200 dark:border-[#3A3A3A] bg-white dark:bg-[#2D2D2D]'>
								<CardHeader className='flex justify-between items-center'>
									<CardTitle className='text-gray-900 dark:text-white'>
										Overview
									</CardTitle>
									<Button
										variant='ghost'
										size='sm'
										className='text-lavender-500'
									>
										<RefreshCw className='mr-2 w-4 h-4' /> Refresh
									</Button>
								</CardHeader>
								<CardContent className='space-y-4'>
									<div className='gap-4 grid grid-cols-1'>
										<div>
											<p className='mb-1 text-gray-600 text-sm dark:text-gray-400'>
												Address
											</p>
											<div className='flex items-center'>
												<Input
													value={nftData?.mintAddress}
													readOnly
													className='border-gray-300 dark:border-[#3A3A3A] bg-gray-100 dark:bg-[#1C1C1C] text-gray-800 dark:text-gray-300'
												/>
												<Button variant='ghost' size='icon' className='ml-2'>
													<Copy className='w-4 h-4' />
												</Button>
											</div>
										</div>
										<div className='gap-4 grid grid-cols-2'>
											<div>
												<p className='mb-1 text-gray-600 text-sm dark:text-gray-400'>
													Max Total Supply
												</p>
												<Input
													value='1'
													readOnly
													className='border-gray-300 dark:border-[#3A3A3A] bg-gray-100 dark:bg-[#1C1C1C] text-gray-800 dark:text-gray-300'
												/>
											</div>
											<div>
												<p className='mb-1 text-gray-600 text-sm dark:text-gray-400'>
													Current Supply
												</p>
												<Input
													value='1'
													readOnly
													className='border-gray-300 dark:border-[#3A3A3A] bg-gray-100 dark:bg-[#1C1C1C] text-gray-800 dark:text-gray-300'
												/>
											</div>
										</div>
										<div>
											<p className='mb-1 text-gray-600 text-sm dark:text-gray-400'>
												Mint Authority
											</p>
											<div className='flex items-center'>
												<Input
													value={nftData?.owner}
													readOnly
													className='border-gray-300 dark:border-[#3A3A3A] bg-gray-100 dark:bg-[#1C1C1C] text-gray-800 dark:text-gray-300'
												/>
												<Button variant='ghost' size='icon' className='ml-2'>
													<Copy className='w-4 h-4' />
												</Button>
											</div>
										</div>
										<div>
											<p className='mb-1 text-gray-600 text-sm dark:text-gray-400'>
												Freeze Authority
											</p>
											<div className='flex items-center'>
												<Input
													value={nftData?.owner}
													readOnly
													className='border-gray-300 dark:border-[#3A3A3A] bg-gray-100 dark:bg-[#1C1C1C] text-gray-800 dark:text-gray-300'
												/>
												<Button variant='ghost' size='icon' className='ml-2'>
													<Copy className='w-4 h-4' />
												</Button>
											</div>
										</div>
										<div>
											<p className='mb-1 text-gray-600 text-sm dark:text-gray-400'>
												Update Authority
											</p>
											<div className='flex items-center'>
												<Input
													value={nftData?.updateAuthority}
													readOnly
													className='border-gray-300 dark:border-[#3A3A3A] bg-gray-100 dark:bg-[#1C1C1C] text-gray-800 dark:text-gray-300'
												/>
												<Button variant='ghost' size='icon' className='ml-2'>
													<Copy className='w-4 h-4' />
												</Button>
											</div>
										</div>
										<div>
											<p className='mb-1 text-gray-600 text-sm dark:text-gray-400'>
												Seller Fee
											</p>
											<Input
												value={`${
													(nftData?.sellerFeeBasisPoints as number) / 100
												}%`}
												readOnly
												className='border-gray-300 dark:border-[#3A3A3A] bg-gray-100 dark:bg-[#1C1C1C] text-gray-800 dark:text-gray-300'
											/>
										</div>
									</div>
								</CardContent>
							</Card>
						</TabsContent>
						<TabsContent value='history'>
							<Card className='border-gray-200 dark:border-[#3A3A3A] bg-white dark:bg-[#2D2D2D]'>
								<CardHeader className='flex justify-between items-center'>
									<CardTitle className='text-gray-900 dark:text-white'>
										Transaction History
									</CardTitle>
									<Button
										variant='ghost'
										size='sm'
										className='text-lavender-500'
									>
										<RefreshCw className='mr-2 w-4 h-4' /> Refresh
									</Button>
								</CardHeader>
								<CardContent>
									<p className='text-gray-600 dark:text-gray-400'>
										Transaction history would be displayed here.
									</p>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				) : (
					<Card className='border-gray-200 dark:border-[#3A3A3A] bg-white dark:bg-[#2D2D2D] min-h-[300px]'>
						<CardHeader className='flex justify-between items-center'>
							<CardTitle className='text-gray-900 dark:text-white'>
								No data found.
							</CardTitle>
							<Button variant='ghost' size='sm' className='text-lavender-500'>
								<RefreshCw className='mr-2 w-4 h-4' /> Refresh
							</Button>
						</CardHeader>
						<CardContent className='space-y-4 text-center'>
							Please enter a valid NFT address.
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	);
}
