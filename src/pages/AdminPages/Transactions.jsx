import { useEffect, useState, useMemo } from "react";
import { fetchAllOrders, updateOrderStatus } from "../../redux/api/adminCalls";
import { useDispatch, useSelector } from "react-redux";
import {
    FaAngleLeft,
    FaAngleRight,
    FaReceipt,
    FaMoneyCheckDollar,
    FaTruckFast,
    FaClockRotateLeft,
    FaXmark,
    FaEye,
    FaBox,
} from "react-icons/fa6";
import { FaSearch, FaUser, FaEnvelope, FaCreditCard, FaCalendarAlt, FaLocationArrow } from "react-icons/fa";
import Swal from "sweetalert2";

const Transactions = () => {
    const dispatch = useDispatch();
    const { orders, isLoading, error } = useSelector((state) => state?.order || { orders: [], isLoading: false, error: null });
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(null);

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
        <>
            {selectedOrder && (
                <TransactionViewModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                />
            )}
            <div className="lg:px-20 md:px-12 px-6 py-12 min-h-screen bg-[#FDFDFF] font-['Outfit']">
                {/* Header / Stats */}
                <div className="mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50/50 border border-emerald-100/50 backdrop-blur-xl rounded-full">
                            <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
                            <span className="text-[10px] font-black uppercase tracking-[3px] text-emerald-700/80">
                                Financial Ledger Node
                            </span>
                        </div>
                        <h1 className="text-6xl font-black text-gray-900 tracking-tighter italic leading-none">
                            Revenue{" "}
                            <span className="text-emerald-600 underline decoration-emerald-200 decoration-8 underline-offset-8">
                                Telemetry
                            </span>
                        </h1>
                        <p className="text-gray-400 font-medium tracking-tight text-lg">
                            Detailed record of all platform acquisition artifacts.
                        </p>
                        <button
                            onClick={() => dispatch(fetchAllOrders())}
                            className="mt-4 flex items-center gap-3 px-6 py-2.5 bg-white border border-emerald-100/50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:bg-emerald-50 hover:border-emerald-200 transition-all shadow-sm group active:scale-95"
                        >
                            <span className="w-5 h-5 rounded-full border-2 border-emerald-100 border-t-emerald-600 animate-[spin_3s_linear_infinite]"></span>
                            Sync Ledger
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-6 items-center">
                        <StatCard
                            icon={<FaMoneyCheckDollar className="text-emerald-600" />}
                            label="Gross Volume"
                            value={`$${totalVolume.toLocaleString()}`}
                            color="emerald"
                        />
                        <StatCard
                            icon={<FaClockRotateLeft className="text-amber-600" />}
                            label="Awaiting Processing"
                            value={pendingOrders}
                            color="amber"
                        />
                    </div>
                </div>

                {/* Controls */}
                <div className="mb-10 flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="relative w-full md:w-[450px] group">
                        <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-300 group-focus-within:text-emerald-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Scan ledger by ID or email signature..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-14 pr-8 py-5 bg-white border border-gray-100 rounded-[32px] focus:ring-[15px] focus:ring-emerald-50/50 outline-none shadow-[0_15px_40px_rgba(0,0,0,0.02)] text-gray-700 font-semibold transition-all"
                        />
                    </div>

                    <div className="flex gap-4 text-[10px] font-black text-gray-400 uppercase tracking-widest items-center">
                        <span className="px-5 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm italic">
                            Stream: Real-time
                        </span>
                        <span className="px-5 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm">
                            {filteredOrders.length} Artifacts detected
                        </span>
                    </div>
                </div>

                {error ? (
                    <div className="py-32 text-center text-red-500 font-bold bg-red-50 rounded-3xl border border-red-100 italic">
                        Critical Error: {error}
                    </div>
                ) : isLoading ? (
                    <div className="py-32 flex flex-col items-center justify-center gap-6">
                        <div className="w-16 h-16 border-4 border-purple-50 border-t-purple-600 rounded-full animate-spin shadow-xl"></div>
                        <p className="font-black text-gray-300 uppercase tracking-[6px] text-xs">Loading Ledger...</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-[40px] shadow-[0_32px_64px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[#fcfcfd] border-b border-gray-50 text-gray-400 text-[10px] uppercase font-black tracking-widest">
                                    <tr>
                                        <th className="px-10 py-8">Reference Artifact</th>
                                        <th className="px-10 py-8">Acquisition Date</th>
                                        <th className="px-10 py-8">Recipient Signature</th>
                                        <th className="px-10 py-8 text-center">Net Valuation</th>
                                        <th className="px-10 py-8 text-center">Status</th>
                                        <th className="px-10 py-8 text-right">Operations</th>
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
                                                <div className="flex items-center justify-end gap-4">
                                                    <button
                                                        onClick={() => setSelectedOrder(order)}
                                                        className="w-12 h-12 flex items-center justify-center rounded-[18px] bg-white border border-gray-100 text-gray-400 hover:text-emerald-600 hover:border-emerald-200 transition-all hover:scale-110 shadow-sm"
                                                        title="View Artifact"
                                                    >
                                                        <FaEye />
                                                    </button>
                                                    <select
                                                        disabled={['delivered', 'cancelled'].includes(order.status)}
                                                        value={order.status}
                                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                        className={`pl-4 pr-10 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none border transition-all cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23CBD5E0%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat ${['delivered', 'cancelled'].includes(order.status) ? 'bg-gray-50 border-gray-100 text-gray-300' : 'bg-white border-emerald-100 text-emerald-700 hover:border-emerald-300 shadow-sm'}`}
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="processing">Processing</option>
                                                        <option value="shipped">Shipped</option>
                                                        <option value="delivered">Delivered</option>
                                                        <option value="cancelled">Cancelled</option>
                                                    </select>
                                                </div>
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
        </>
    );
};

const StatCard = ({ icon, label, value, color }) => (
    <div className={`bg-white p-8 rounded-[40px] border border-gray-100/80 shadow-[0_20px_50px_rgba(0,0,0,0.02)] flex items-center gap-6 min-w-[280px] group transition-all hover:border-${color}-200 hover:shadow-xl hover:-translate-y-2`}>
        <div className={`w-20 h-20 rounded-[32px] bg-${color === 'emerald' ? 'emerald' : 'amber'}-50 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-500`}>
            {icon}
        </div>
        <div className="space-y-1">
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-[4px]">{label}</p>
            <p className="text-4xl font-black text-gray-900 italic tracking-tighter leading-none">{value}</p>
        </div>
    </div>
);

const TransactionViewModal = ({ order, onClose }) => {
    return (
        <div
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-[56px] shadow-[0_60px_120px_rgba(0,0,0,0.2)] lg:max-w-4xl max-w-2xl w-full max-h-[85vh] overflow-y-auto relative animate-in zoom-in-95 duration-500 flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100">
                            <FaReceipt className="text-sm" />
                            <span className="text-[10px] font-black uppercase tracking-[3px]">Financial Artifact Voucher</span>
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 tracking-tighter italic uppercase leading-tight">
                            Order #{order._id?.slice(-12)}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-14 h-14 flex items-center justify-center rounded-[22px] bg-white text-gray-400 hover:bg-rose-50 hover:text-rose-500 hover:border hover:border-rose-100 shadow-sm transition-all text-xl"
                    >
                        <FaXmark />
                    </button>
                </div>

                {/* Body */}
                <div className="p-10 space-y-12">
                    {/* User & Meta */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 text-xl">
                                    <FaUser />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Customer Dossier</p>
                                    <p className="text-lg font-black text-gray-900 italic tracking-tight">{order.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 text-xl">
                                    <FaCalendarAlt />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Acquisition Timestamp</p>
                                    <p className="text-lg font-black text-gray-900 italic tracking-tight">
                                        {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 text-xl">
                                    <FaCreditCard />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Revenue Impact</p>
                                    <p className="text-4xl font-black text-emerald-600 italic tracking-tighter leading-none mt-1">
                                        ${order.amount?.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 text-xl">
                                    <FaBox />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Fulfillment Status</p>
                                    <div className="inline-flex mt-1">
                                        <StatusBadge status={order.status} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address if available */}
                    {order.address && (
                        <div className="p-8 bg-gray-50 rounded-[32px] border border-gray-100 flex items-start gap-6">
                            <div className="w-12 h-12 bg-white rounded-[18px] flex items-center justify-center text-emerald-500 shadow-sm shrink-0">
                                <FaLocationArrow />
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-[3px] mb-2">Primary Logistics Point</p>
                                <p className="text-sm font-bold text-gray-600 leading-relaxed max-w-md italic">
                                    {order.address.address}, {order.address.city}, {order.address.country}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Products List Placeholder / Expansion */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-[4px] italic">Artifact Break-down</h3>
                        <div className="grid grid-cols-1 gap-4">
                            {order.products?.map((item, idx) => (
                                <div key={idx} className="p-6 bg-white border border-gray-100 rounded-[28px] shadow-sm flex items-center gap-6 group hover:border-emerald-200 transition-all">
                                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-emerald-300 text-2xl group-hover:scale-110 transition-transform">
                                        <FaBox />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Entry Signature</p>
                                        <p className="text-sm font-black text-gray-900 uppercase tracking-tight">#{item.productId?.slice(-12) || "PROD-ARTIFACT-ID"}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Volume</p>
                                        <p className="text-xl font-black text-gray-900 italic tracking-tighter leading-none mt-1">x{item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                            {(!order.products || order.products.length === 0) && (
                                <div className="py-12 px-6 bg-gray-50/50 border border-dashed border-gray-200 rounded-[32px] text-center">
                                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Specific product lineage metadata not currently synchronized in this scan.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatusBadge = ({ status }) => {
    const configs = {
        pending: "bg-amber-50 text-amber-600 border-amber-100",
        processing: "bg-blue-50 text-blue-600 border-blue-100",
        shipped: "bg-indigo-50 text-indigo-600 border-indigo-100",
        delivered: "bg-emerald-50 text-emerald-600 border-emerald-100 font-black",
        cancelled: "bg-rose-50 text-rose-600 border-rose-100",
    };
    return (
        <span className={`inline-flex px-3 py-1.5 rounded-2xl border text-[10px] font-extrabold uppercase tracking-widest ${configs[status] || "bg-gray-50 text-gray-400"}`}>
            {status}
        </span>
    );
};

export default Transactions;
