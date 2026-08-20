import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function MonetizationAdminPage() {
    const session = await auth();
    if (session?.user?.role !== "PLATFORM_ADMIN") {
        redirect("/login");
    }

    const subscriptions = await db.subscription.findMany({
        include: {
            studentProfile: {
                include: {
                    user: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 50,
    });

    return (
        <div className="p-8 space-y-6">
            <h1 className="text-3xl font-bold">Monetization Dashboard</h1>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <h2 className="text-xl font-bold mb-4">Recent Subscriptions</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b dark:border-gray-700">
                                <th className="p-3">User</th>
                                <th className="p-3">Plan</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Start Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscriptions.map(sub => (
                                <tr key={sub.id} className="border-b dark:border-gray-700">
                                    <td className="p-3">{sub.studentProfile.user.name || sub.studentProfile.user.email}</td>
                                    <td className="p-3 font-medium">{sub.planName}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 text-xs rounded-full ${sub.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {sub.status}
                                        </span>
                                    </td>
                                    <td className="p-3 text-sm text-gray-500">{sub.startDate.toLocaleDateString()}</td>
                                </tr>
                            ))}
                            {subscriptions.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center text-gray-500">No subscriptions found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
