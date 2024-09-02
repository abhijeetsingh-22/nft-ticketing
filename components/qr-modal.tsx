import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";
import { TicketWithEvent } from "@/db/types";
import {QRCodeSVG} from "qrcode.react";
import { generateEntryCode } from "@/server-actions/entry";
import { useWallet } from "@solana/wallet-adapter-react";

export default function QRCodeModal({ ticket }: { ticket: TicketWithEvent }) {
  const [isOpen, setIsOpen] = useState(false);
  const { publicKey } = useWallet();
  const [timeLeft, setTimeLeft] = useState(0);

  const {
    data: qrCodeData,
    isLoading,
    isFetching,
    error,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["qrCode", ticket.id],
    queryFn: () => generateEntryCode(publicKey?.toString() ?? "", ticket),
    enabled: isOpen,
    refetchInterval: (data: any) => {
      if (data) {
        const expiresAt = new Date(data.expiresAt);
        const now = new Date();
        return expiresAt > now ? expiresAt.getTime() - now.getTime() : 0;
      }
      return false;
    },
    
  });

  useEffect(() => {
    if (isOpen) {
      refetch();
    }
  }, [isOpen, refetch]);

  useEffect(() => {
    if (qrCodeData?.entryCode?.expiresAt) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const expiresAt = new Date(qrCodeData.entryCode.expiresAt).getTime();
        const timeRemaining = Math.max(0, expiresAt - now);
        setTimeLeft(timeRemaining);

        if (timeRemaining === 0) {
          clearInterval(interval);
          refetch();
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [qrCodeData, refetch]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <QrCode className="mr-2 w-4 h-4" />
          View QR Code
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>QR Code for {ticket.event.name}</DialogTitle>
        </DialogHeader>
        <div className="py-4 flex flex-col items-center">
          {isLoading || isFetching && (
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
            </div>
          )}
          {isError && <p>Error loading QR code. Please try again.</p>}
          {qrCodeData?.entryCode?.code && !isFetching && (
            <>
              <QRCodeSVG value={qrCodeData.entryCode.code} size={200} />
              <p className="mt-4 text-2xl font-bold">{qrCodeData.entryCode.code}</p>
              <div className="w-full mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-linear"
                    style={{ width: `${(timeLeft / (30*1000)) * 100}%`}}
                  ></div>
                </div>
                <p className="text-sm text-center mt-1">
                  {Math.floor(timeLeft / 1000)} seconds left
                </p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}