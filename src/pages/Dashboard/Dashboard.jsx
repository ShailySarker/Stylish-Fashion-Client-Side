import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../redux/api/orderCalls";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area, BarChart, Bar
} from "recharts";
import {
    FaBagShopping, FaHeart, FaWallet, FaChartLine,
    FaUsers, FaMoneyBillTrendUp, FaArrowTrendUp,
    FaArrowTrendDown, FaBoxOpen, FaUserSecret
} from "react-icons/fa6";
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

    // Data processing
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const userOrderData = useMemo(() => {
        if (!orders || orders.length === 0) return months.map(m => ({ name: m, orders: 0, spend: 0 }));
        const monthlyData = {};
        orders.forEach(order => {
            const date = new Date(order.createdAt);
            const month = months[date.getMonth()];
            if (!monthlyData[month]) monthlyData[month] = { name: month, orders: 0, spend: 0 };
            monthlyData[month].orders += 1;
            monthlyData[month].spend += order.amount;
        });
        return months.map(m => monthlyData[m] || { name: m, orders: 0, spend: 0 });
    }, [orders]);

    const formattedUserStats = useMemo(() => {
        return adminStats.userStats.map(item => ({
            name: months[item._id - 1],
            users: item.total
        }));
    }, [adminStats.userStats]);

    const formattedSalesStats = useMemo(() => {
        return adminStats.salesStats.map(item => ({
            name: months[item.month - 1],
            revenue: item.totalSales,
            profit: item.revenue
        }));
    }, [adminStats.salesStats]);

    if (ordersLoading || loadingAdmin) return <Loader />;

    return (
        <div className="lg:px-20 md:px-12 px-6 py-10 min-h-screen bg-[#fcfcfd]">
            {/* Header section with Glassmorphism */}
            <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center p-8 bg-white/40 backdrop-blur-md rounded-[40px] border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.03)]">
                <div>
                    <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-[10px] font-black uppercase tracking-widest rounded-full">
                            {isAdmin ? "Admin Workspace" : "Customer Portal"}
                        </span>
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900 mt-2 tracking-tight italic">
                        Hello, {currentUser?.username?.split(' ')[0]}
                    </h1>
                    <p className="text-gray-400 font-medium mt-1">Here is a summary of your platform pulse today.</p>
                </div>

                <div className="mt-6 md:mt-0 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-purple-50 flex items-center justify-center text-purple-600 shadow-sm">
                        <FaBagShopping />
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Orders</p>
                        <p className="text-lg font-black text-gray-900">{isAdmin ? adminStats.totalOrders : orders.length}</p>
                    </div>
                </div>
            </div>

            {/* Premium Stat Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {isAdmin ? (
                    <>
                        <PremiumStatCard icon={<FaUsers />} label="Community Size" value={adminStats.totalUsers} trend="+8% vs LY" color="purple" />
                        <PremiumStatCard icon={<FaMoneyBillTrendUp />} label="Gross Revenue" value={`$${adminStats.totalRevenue.toLocaleString()}`} trend="+24%" color="emerald" />
                        <PremiumStatCard icon={<FaBoxOpen />} label="Total Sales" value={adminStats.totalOrders} trend="+15%" color="blue" />
                        <PremiumStatCard icon={<FaUserSecret />} label="Avg. Ticket" value={`$${(adminStats.totalRevenue / (adminStats.totalOrders || 1)).toFixed(0)}`} color="amber" />
                    </>
                ) : (
                    <>
                        <PremiumStatCard icon={<FaBagShopping />} label="My Orders" value={orders.length} color="indigo" />
                        <PremiumStatCard icon={<FaHeart />} label="Wishlist Items" value={wishlist.length} color="rose" />
                        <PremiumStatCard icon={<FaWallet />} label="Total Investment" value={`$${orders.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}`} color="emerald" />
                        <PremiumStatCard icon={<FaChartLine />} label="Account Tier" value="Diamond" color="blue" />
                    </>
                )}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
                {/* Registration Chart / Order Volume */}
                <div className="bg-white p-10 rounded-[48px] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] group hover:shadow-xl transition-all duration-700">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h3 className="text-xl font-black text-gray-900 tracking-tight">{isAdmin ? "Growth Velocity" : "Shopping History"}</h3>
                            <p className="text-xs text-gray-400 font-bold uppercase mt-1 tracking-widest">{isAdmin ? "User registration analytics" : "Your order frequency over time"}</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 transition-transform group-hover:rotate-12">
                            <FaChartLine />
                        </div>
                    </div>

                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={isAdmin ? formattedUserStats : userOrderData}>
                                <defs>
                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 700 }} dy={15} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 700 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', padding: '15px' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey={isAdmin ? "users" : "orders"}
                                    stroke="#8b5cf6"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorUsers)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Revenue Chart / Spend Chart */}
                <div className="bg-white p-10 rounded-[48px] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] group hover:shadow-xl transition-all duration-700">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h3 className="text-xl font-black text-gray-900 tracking-tight">{isAdmin ? "Financial Performance" : "Investment Analysis"}</h3>
                            <p className="text-xs text-gray-400 font-bold uppercase mt-1 tracking-widest">{isAdmin ? "Revenue & Net Profit stream" : "Monthly spending breakdown"}</p>
                        </div>
                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 transition-transform group-hover:scale-110">
                            <FaMoneyBillTrendUp />
                        </div>
                    </div>

                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={isAdmin ? formattedSalesStats : userOrderData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 700 }} dy={15} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 700 }} />
                                <Tooltip
                                    cursor={{ fill: '#fcfcfd' }}
                                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey={isAdmin ? "revenue" : "spend"} fill="#3b82f6" radius={[12, 12, 12, 12]} barSize={isAdmin ? 12 : 24} />
                                {isAdmin && <Bar dataKey="profit" fill="#10b981" radius={[12, 12, 12, 12]} barSize={12} />}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Late Transactions Table */}
            <div className="bg-white rounded-[40px] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden">
                <div className="p-10 flex justify-between items-center border-b border-gray-50/50">
                    <div>
                        <h3 className="text-xl font-black text-gray-900 tracking-tight">{isAdmin ? "Live Platform Pulse" : "Recent Order Log"}</h3>
                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mt-1 italic">Real-time update stream enabled</p>
                    </div>
                    <button className="px-6 py-2.5 bg-gray-50 hover:bg-purple-800 hover:text-white transition-all rounded-2xl text-xs font-black uppercase tracking-widest border border-gray-100">
                        Extract Report
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#fcfcfd] text-gray-400 text-[10px] font-black uppercase tracking-widest">
                            <tr>
                                <th className="px-10 py-6">Identity</th>
                                <th className="px-10 py-6">Timestamp</th>
                                <th className="px-10 py-6 text-center">Status</th>
                                <th className="px-10 py-6 text-right">Value</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50/50">
                            {(isAdmin ? adminStats.salesStats : orders).slice(0, 5).map((order, idx) => (
                                <tr key={order._id || idx} className="group hover:bg-gray-50/50 transition-all">
                                    <td className="px-10 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-black italic">#</div>
                                            <span className="text-sm font-black text-gray-900 italic">TX-{order._id?.slice(-6) || "SYS001"}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-6 font-bold text-gray-400 text-sm">
                                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : `Cycle ${order.month}`}
                                    </td>
                                    <td className="px-10 py-6 text-center">
                                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                order.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                    'bg-indigo-50 text-indigo-600 border-indigo-100'
                                            }`}>
                                            {order.status || 'Verified'}
                                        </span>
                                    </td>
                                    <td className="px-10 py-6 text-right text-lg font-black text-gray-900 italic">
                                        ${(order.amount || order.totalSales).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const PremiumStatCard = ({ icon, label, value, trend, color }) => {
    const colors = {
        purple: "text-purple-600 bg-purple-50 hover:bg-purple-100 border-purple-100",
        emerald: "text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border-emerald-100",
        blue: "text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-100",
        rose: "text-rose-600 bg-rose-50 hover:bg-rose-100 border-rose-100",
        amber: "text-amber-600 bg-amber-50 hover:bg-amber-100 border-amber-100",
        indigo: "text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border-indigo-100",
    }
    const colorClass = colors[color] || colors.purple;

    return (
        <div className={`p-8 rounded-[40px] border bg-white shadow-sm flex flex-col gap-6 group hover:shadow-2xl hover:shadow-purple-500/5 transition-all duration-500`}>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 ${colorClass}`}>
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
                <div className="flex items-end justify-between">
                    <h4 className="text-3xl font-black text-gray-900 italic tracking-tighter">{value}</h4>
                    {trend && (
                        <div className="flex items-center gap-1 text-[10px] font-black text-emerald-500 mb-1">
                            <FaArrowTrendUp />
                            {trend}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
