import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function TicketValidationSkeleton() {
  return (
    <div className='flex justify-center items-center dark:bg-gray-900 p-4 min-h-[100vh]'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='font-bold text-2xl text-center'>
            <Skeleton className="h-8 w-48 mx-auto" />
          </CardTitle>
          <CardDescription className='text-center'>
            <Skeleton className="h-4 w-64 mx-auto mt-2" />
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" /> {/* Event selector */}
          
          <Tabs defaultValue="manual" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manual">
                <Skeleton className="h-5 w-24" />
              </TabsTrigger>
              <TabsTrigger value="qr">
                <Skeleton className="h-5 w-16" />
              </TabsTrigger>
            </TabsList>
            <TabsContent value="manual" className="space-y-4">
              <Skeleton className="h-12 w-full" /> {/* Input field */}
              <Skeleton className="h-10 w-full" /> {/* Validate button */}
            </TabsContent>
            <TabsContent value="qr">
              <div className="flex flex-col items-center space-y-4">
                <Skeleton className="h-64 w-64" /> {/* QR scanner area */}
                <Skeleton className="h-4 w-48" /> {/* Scanner text */}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
  </div>
  )}