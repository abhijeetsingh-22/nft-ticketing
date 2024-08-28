'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"


export const FiltersSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="w-3/4 h-8" />
    <Skeleton className="w-full h-10" />
    <Skeleton className="w-full h-10" />
    <Skeleton className="w-full h-16" />
    <Skeleton className="w-full h-20" />
    <div className="flex space-x-2">
      <Skeleton className="w-1/2 h-10" />
      <Skeleton className="w-1/2 h-10" />
    </div>
  </div>
)

interface FiltersProps {
  minPrice: string;
  maxPrice: string;
  handlePriceChange: (value: string, setter: (value: string) => void) => void;
  setMinPrice: (value: string) => void;
  setMaxPrice: (value: string) => void;
  setSelectedOrganizers: (value: string[]) => void;
}

export const Filters = ({ minPrice, maxPrice, handlePriceChange, setMinPrice, setMaxPrice, setSelectedOrganizers }: FiltersProps) => (
  <Card>
    <CardContent className="space-y-6 p-6">
      <div>
        <h2 className="mb-2 font-semibold text-lg">Filters</h2>
        <div className="flex justify-between items-center">
          <span className="text-sm">Verified only</span>
          <Switch />
        </div>
      </div>

      <div>
        <h3 className="mb-2 font-semibold text-sm">Price Range</h3>
        <div className="flex items-center space-x-2">
          <Input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => handlePriceChange(e.target.value, setMinPrice)}
            className="w-1/2"
          />
          <span>-</span>
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => handlePriceChange(e.target.value, setMaxPrice)}
            className="w-1/2"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-2 font-semibold text-sm">Dates</h3>
        <div className="space-y-2">
          <Input placeholder="From" type="date" />
          <Input placeholder="To" type="date" />
        </div>
      </div>

      {/* <div>
              <h3 className="mb-2 font-semibold text-sm">Organisers</h3>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start w-full">
                    {selectedOrganizers.length > 0
                      ? `${selectedOrganizers.length} selected`
                      : "Select organizers"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-[200px]">
                  <Command>
                    <CommandInput placeholder="Search organizers..." />
                    <CommandEmpty>No organizer found.</CommandEmpty>
                    <CommandGroup>
                      {organizers.map((organizer) => (
                        <CommandItem
                          key={organizer.value}
                          onSelect={() => {
                            setSelectedOrganizers((prev) =>
                              prev.includes(organizer.value)
                                ? prev.filter((item) => item !== organizer.value)
                                : [...prev, organizer.value]
                            )
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedOrganizers.includes(organizer.value)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {organizer.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div> */}

      <div className="flex space-x-2">
        <Button className="flex-1">Apply</Button>
        <Button variant="outline" className="flex-1" onClick={() => {
          setMinPrice("0");
          setMaxPrice("500");
          setSelectedOrganizers([]);
        }}>Reset</Button>
      </div>
    </CardContent>
  </Card>
)
