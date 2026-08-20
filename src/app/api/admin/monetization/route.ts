import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await auth();
        if (session?.user?.role !== "PLATFORM_ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const stats = await db.subscription.groupBy({
            by: ['planName', 'status'],
            _count: {
                id: true
            }
        });

        const mrr = stats.reduce((acc, curr) => {
            if (curr.status === "ACTIVE") {
                if (curr.planName === "STUDENT_PRO") acc += 299;
                // Add more custom logic here
            }
            return acc;
        }, 0);

        return NextResponse.json({
            stats,
            monthlyRecurringRevenue: `₹${mrr}`
        });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}
