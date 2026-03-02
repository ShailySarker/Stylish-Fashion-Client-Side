import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../redux/api/orderCalls";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar, Cell, PieChart, Pie
} from "recharts";
import { FaBagShopping, FaHeart, FaUser, FaWallet, FaChartLine, FaUsers, FaMoneyBillTrendUp } from "react-icons/fa6";
import { userRequest } from "../../helpers/axios/requestMethod";
import Loader from "../../components/LazyLoader";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const { orders, isLoading: ordersLoading } = useSelector((state) => state.order);
    const { wishlist } = useSelector((state) => state.wishlist);
    const isAdmin = currentUser?.isAdmin;

    const [adminStats, setAdminStats] = useState({
        totalUsers: 0,
        totalOrders: 0,
        totalRevenue: 0,
        userStats: [],
        salesStats: []
    });
    const [loadingAdmin, setLoadingAdmin] = useState(false);

    useEffect(() => {
        if (currentUser) {
            dispatch(fetchOrders(currentUser._id));
        }

        if (isAdmin) {
            const fetchAdminDashboardData = async () => {
                setLoadingAdmin(true);
                try {
                    const [usersRes, ordersRes, userStatsRes, salesRes] = await Promise.all([
                        userRequest.get("/users"),
                        userRequest.get("/orders"),
                        userRequest.get("/users/stats"),
                        userRequest.get("/orders/salesComparison")
                    ]);

                    const totalRevenue = ordersRes.data.reduce((acc, curr) => acc + curr.amount, 0);

                    setAdminStats({
                        totalUsers: usersRes.data.length,
                        totalOrders: ordersRes.data.length,
                        totalRevenue: totalRevenue,
                        userStats: userStatsRes.data,
                        salesStats: salesRes.data
                    });
                } catch (error) {
                    console.error("Failed to fetch admin stats:", error);
                } finally {
                    setLoadingAdmin(false);
                }
            };
            fetchAdminDashboardData();
        }
    }, [dispatch, currentUser, isAdmin]);

    // Data processing for User charts
    const userOrderData = useMemo(() => {
        if (!orders || orders.length === 0) return [];

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthlyData = {};

        orders.forEach(order => {
            const date = new Date(order.createdAt);
            const month = months[date.getMonth()];
            if (!monthlyData[month]) {
                monthlyData[month] = { name: month, orders: 0, spend: 0 };
            }
            monthlyData[month].orders += 1;
            monthlyData[month].spend += order.amount;
        });

        return Object.values(monthlyData);
    }, [orders]);

    // Data processing for Admin charts
    const formattedUserStats = useMemo(() => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return adminStats.userStats.map(item => ({
            name: months[item._id - 1],
            "New Users": item.total
        }));
    }, [adminStats.userStats]);

    const formattedSalesStats = useMemo(() => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return adminStats.salesStats.map(item => ({
            name: months[item.month - 1],
            "Revenue": item.totalSales,
            "Profit": item.revenue
        }));
    }, [adminStats.salesStats]);

    if (ordersLoading || loadingAdmin) return <Loader />;

    return (
        <div className="lg:px-20 md:px-12 px-6 py-10 min-h-screen bg-gray-50">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-800">
                    {isAdmin ? "Admin Overview" : "My Dashboard"}
                </h1>
                <p className="text-gray-500 mt-2">Welcome back, <span className="font-semibold text-purple-700 capitalize">{currentUser?.username}</span>! Here's what's happening.</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {isAdmin ? (
                    <>
                        <StatCard icon={<FaUsers className="text-blue-600" />} label="Total Users" value={adminStats.totalUsers} color="bg-blue-50" />
                        <StatCard icon={<FaBagShopping className="text-purple-600" />} label="Total Orders" value={adminStats.totalOrders} color="bg-purple-50" />
                        <StatCard icon={<FaMoneyBillTrendUp className="text-green-600" />} label="Total Revenue" value={`$${adminStats.totalRevenue.toFixed(2)}`} color="bg-green-50" />
                        <StatCard icon={<FaChartLine className="text-orange-600" />} label="Avg. Order" value={`$${(adminStats.totalRevenue / (adminStats.totalOrders || 1)).toFixed(2)}`} color="bg-orange-50" />
                    </>
                ) : (
                    <>
                        <StatCard icon={<FaBagShopping className="text-purple-600" />} label="Total Orders" value={orders.length} color="bg-purple-50" />
                        <StatCard icon={<FaHeart className="text-rose-600" />} label="Wishlist Items" value={wishlist.length} color="bg-rose-50" />
                        <StatCard icon={<FaWallet className="text-green-600" />} label="Total Spent" value={`$${orders.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2)}`} color="bg-green-50" />
                        <StatCard icon={<FaUser className="text-blue-600" />} label="Account Status" value="Active" color="bg-blue-50" />
                    </>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                {/* Chart 1: Activity */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">{isAdmin ? "User Registration Growth" : "Order Activity"}</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={isAdmin ? formattedUserStats : userOrderData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Legend verticalAlign="top" align="right" iconType="circle" />
                                <Line
                                    type="monotone"
                                    dataKey={isAdmin ? "New Users" : "orders"}
                                    stroke="#8b5cf6"
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Chart 2: Financials */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">{isAdmin ? "Revenue vs Profit" : "Monthly Spending"}</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={isAdmin ? formattedSalesStats : userOrderData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Legend verticalAlign="top" align="right" iconType="circle" />
                                <Bar dataKey={isAdmin ? "Revenue" : "spend"} fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={isAdmin ? 30 : 40} />
                                {isAdmin && <Bar dataKey="Profit" fill="#10b981" radius={[4, 4, 0, 0]} barSize={30} />}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Recent Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-800">{isAdmin ? "Recent Platform Transactions" : "My Recent Orders"}</h3>
                    <button className="text-purple-700 font-semibold text-sm hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-bold">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {(isAdmin ? adminStats.salesStats : orders).slice(0, 5).map((order, idx) => (
                                <tr key={order._id || idx} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">#{order._id?.slice(-6) || "N/A"}</td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : `Month ${order.month}`}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                                order.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {order.status || 'Success'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-gray-900">${(order.amount || order.totalSales).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {(isAdmin ? adminStats.salesStats : orders).length === 0 && (
                        <div className="py-20 text-center text-gray-400">No data found.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value, color }) => (
    <div className={`p-6 rounded-2xl border border-gray-100 shadow-sm ${color} flex items-center gap-4`}>
        <div className="p-4 bg-white rounded-xl shadow-inner">
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <h4 className="text-xl font-bold text-gray-800">{value}</h4>
        </div>
    </div>
);

export default Dashboard;
