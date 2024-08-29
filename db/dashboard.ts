'use server'

import prisma from "@/db";

export async function getDashboardStats(userId: string) {
  const events = await prisma.event.findMany({
    where: { organizerId: userId },
    include: { tickets: true }
  });

  const totalRevenue = events.reduce((acc: number, event: any) => {
    const eventRevenue = event.tickets.reduce((sum: number, ticket: any) => sum + ticket.price, 0);
    return acc + eventRevenue;
  }, 0);

  const totalTicketsSold = events.reduce((acc: number, event: any) => acc + event.tickets.length, 0);

  const averageOrderValue = totalTicketsSold ? (totalRevenue / totalTicketsSold).toFixed(2) : 0;

  return [
    { title: "Total revenue", value: `$${totalRevenue.toFixed(2)}`, change: "+4.5%", icon: "DollarSignIcon" },
    { title: "Average order value", value: `$${averageOrderValue}`, change: "-0.5%", icon: "TrendingUpIcon" },
    { title: "Tickets sold", value: totalTicketsSold.toString(), change: "+4.5%", icon: "TicketIcon" },
  ]
}

export interface RecentOrder {
  id: string;
  date: string;
  customer: string;
  event: string;
  amount: string;
}

export async function getRecentOrders(organizerId: string): Promise<RecentOrder[]> {
  const orders = await prisma.order.findMany({
    where: { event: { organizerId } },
    include: {
      customer: {
        select: {
          name: true
        }
      },
      event: {
        select: {
          name: true
        }
      },
    },
  });

  return orders.map(order => ({
    id: order.id,
    date: order.createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    customer: order.customer.name ?? 'Unknown',
    event: order.event.name,
    amount: `US$${order.price.toFixed(2)}`,
  }));
}