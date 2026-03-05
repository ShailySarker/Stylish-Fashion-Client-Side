import { useEffect, useState, useMemo } from "react";
import { fetchAllOrders, updateOrderStatus } from "../../redux/api/adminCalls";
import { useDispatch, useSelector } from "react-redux";
import { FaAngleLeft, FaAngleRight, FaReceipt, FaMoneyCheckDollar, FaTruckFast, FaClockRotateLeft } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";

const Transactions = () => {
    const dispatch = useDispatch();
    const { orders, isLoading, error } = useSelector((state) => state?.order || { orders: [], isLoading: false, error: null });
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(fetchAllOrders());
    }, [dispatch]);

    const handleStatusChange = (orderId, newStatus) => {
        dispatch(updateOrderStatus(orderId, newStatus)).then(() => {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Order status updated',
                showConfirmButton: false,
                timer: 2000
            });
        });
    };

    const filteredOrders = useMemo(() => {
        return (orders || []).filter(o =>
            o?._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            o?.email?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [orders, searchTerm]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    const goToPreviousPage = () => setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    const goToNextPage = () => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));

    // Stats
    const totalVolume = orders.reduce((acc, o) => acc + (o.amount || 0), 0);
    const pendingOrders = orders.filter(o => o.status === 'pending').length;

    return (
        <div className="lg:px-20 md:px-12 px-6 py-10 min-h-screen bg-gray-50/50">
            {/* Header / Stats */}
            <div className="mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Financial Ledger</h1>
                    <p className="text-gray-500 mt-2 text-lg">Detailed record of all platform transactions.</p>
                </div>

                <div className="flex flex-wrap gap-4">
                    <StatCard
                        icon={<FaMoneyCheckDollar className="text-emerald-600" />}
                        label="Gross Volume"
                        value={`$${totalVolume.toLocaleString()}`}
                    />
                    <StatCard
                        icon={<FaClockRotateLeft className="text-amber-600" />}
                        label="Awaiting Processing"
                        value={pendingOrders}
                    />
                </div>
            </div>

            {/* Controls */}
            <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search IDs or emails..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none shadow-sm font-bold"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
                    <span className="text-sm font-black text-gray-400 uppercase tracking-widest">Real-time Stream</span>
                </div>
            </div>

            {error ? (
                <div className="py-32 text-center text-red-500 font-bold bg-red-50 rounded-3xl border border-red-100 italic">
                    Critical Error: {error}
                </div>
            ) : isLoading ? (
                <div className="py-32 flex flex-col items-center justify-center gap-6">
                    <div className="w-16 h-16 border-4 border-gray-100 border-t-purple-600 rounded-full animate-spin"></div>
                    <p className="font-black text-gray-300 uppercase tracking-[6px] text-xs">Loading Ledger...</p>
                </div>
            ) : (
                <div className="bg-white rounded-[40px] shadow-[0_32px_64px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#fcfcfd] border-b border-gray-50 text-gray-400 text-[10px] uppercase font-black tracking-widest">
                                <tr>
                                    <th className="px-10 py-6">Reference ID</th>
                                    <th className="px-10 py-6">Timestamp</th>
                                    <th className="px-10 py-6">Recipient</th>
                                    <th className="px-10 py-6 text-center">Net Amount</th>
                                    <th className="px-10 py-6 text-center">Status</th>
                                    <th className="px-10 py-6 text-right">Fulfillment</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50/50">
                                {currentItems.map((order) => (
                                    <tr key={order._id} className="group hover:bg-purple-50/20 transition-all duration-300">
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-sm">
                                                    <FaReceipt />
                                                </div>
                                                <span className="font-mono text-xs font-black text-gray-400 group-hover:text-gray-900 transition-colors uppercase">TX-{order._id?.slice(-8)}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <p className="text-sm font-extrabold text-gray-900 tracking-tight">
                                                {new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit" })}
                                            </p>
                                            <p className="text-[10px] font-bold text-gray-300 uppercase">
                                                {new Date(order.createdAt).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </td>
                                        <td className="px-10 py-6">
                                            <p className="text-sm font-bold text-gray-700 italic lowercase">{order.email || "guest@client.temp"}</p>
                                        </td>
                                        <td className="px-10 py-6 text-center">
                                            <span className="text-lg font-black text-gray-900 tracking-tighter">${order.amount?.toLocaleString()}</span>
                                        </td>
                                        <td className="px-10 py-6 text-center">
                                            <StatusBadge status={order.status} />
                                        </td>
                                        <td className="px-10 py-6 text-right">
                                            <select
                                                disabled={order.status === 'delivered'}
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                className={`pl-4 pr-10 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest outline-none border transition-all cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23CBD5E0%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat ${order.status === 'delivered' ? 'bg-gray-50 border-gray-100 text-gray-300' : 'bg-white border-purple-100 text-purple-700 hover:border-purple-300 shadow-sm'}`}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="processing">Processing</option>
                                                <option value="delivered">Delivered</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {currentItems.length === 0 && (
                            <div className="py-40 text-center flex flex-col items-center gap-4">
                                <FaReceipt className="text-8xl text-gray-50" />
                                <p className="text-xl font-black text-gray-900 italic tracking-widest uppercase">No Records Found</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Pagination Component */}
            {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-6">
                    <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className="w-14 h-14 rounded-3xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-purple-600 hover:border-purple-200 shadow-sm disabled:opacity-20 transition-all active:scale-90"
                    >
                        <FaAngleLeft className="text-xl" />
                    </button>

                    <div className="flex items-center gap-3">
                        <span className="text-sm font-black text-gray-900">{currentPage}</span>
                        <div className="h-4 w-px bg-gray-200"></div>
                        <span className="text-sm font-bold text-gray-400">{totalPages}</span>
                    </div>

                    <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className="w-14 h-14 rounded-3xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-purple-600 hover:border-purple-200 shadow-sm disabled:opacity-20 transition-all active:scale-90"
                    >
                        <FaAngleRight className="text-xl" />
                    </button>
                </div>
            )}
        </div>
    );
};

const StatCard = ({ icon, label, value }) => (
    <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-6 min-w-[240px] group transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/5">
        <div className="w-16 h-16 rounded-[24px] bg-gray-50 flex items-center justify-center text-2xl group-hover:bg-purple-50 group-hover:text-purple-600 transition-all duration-500">
            {icon}
        </div>
        <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[2px]">{label}</p>
            <p className="text-3xl font-black text-gray-900 italic tracking-tighter">{value}</p>
        </div>
    </div>
);

const StatusBadge = ({ status }) => {
    const configs = {
        pending: "bg-amber-50 text-amber-600 border-amber-100",
        processing: "bg-indigo-50 text-indigo-600 border-indigo-100",
        delivered: "bg-emerald-50 text-emerald-600 border-emerald-100 font-black",
    };
    return (
        <span className={`inline-flex px-3 py-1.5 rounded-2xl border text-[10px] font-extrabold uppercase tracking-widest ${configs[status] || "bg-gray-50 text-gray-400"}`}>
            {status}
        </span>
    );
}

export default Transactions;
