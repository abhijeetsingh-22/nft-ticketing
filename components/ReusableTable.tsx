import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	type ColumnDef,
	type ColumnFiltersState,
	type SortingState,
	type VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";

type Props<T> = {
	pagination?: boolean;
	styles?: {
		table?: string;
	};
	data: T[];
	columns: ColumnDef<T>[];
	onRowDoubleClick?: (row: T) => void;
};

export function ReusableTable<T>({
	pagination = true,
	styles,
	data,
	columns,
	onRowDoubleClick,
}: Readonly<Props<T>>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<div className='w-full'>
			<div className='border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 border rounded-md'>
				<Table
					className={cn("text-gray-900 dark:text-gray-300", styles?.table)}
				>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow
								key={headerGroup.id}
								className='border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 border-b'
							>
								{headerGroup.headers.map((header) => (
									<TableHead
										key={header.id}
										className='px-4 py-3 font-semibold text-gray-700 dark:text-gray-400'
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
											  )}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									className='border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 border-b cursor-pointer'
									onDoubleClick={() => onRowDoubleClick?.(row.original)}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id} className='px-4 py-3'>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center text-gray-500 dark:text-gray-400'
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			{pagination && (
				<div className='flex justify-end items-center space-x-2 py-4'>
					<div className='space-x-2'>
						<Button
							variant='outline'
							size='sm'
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
							className='bg-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 dark:bg-gray-800 text-gray-900 dark:text-gray-300'
						>
							Previous
						</Button>
						<Button
							variant='outline'
							size='sm'
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
							className='bg-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 dark:bg-gray-800 text-gray-900 dark:text-gray-300'
						>
							Next
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
