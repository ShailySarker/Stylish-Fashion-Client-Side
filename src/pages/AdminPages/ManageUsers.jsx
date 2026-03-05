import { useEffect, useState, useMemo } from "react";
import { fetchUsersWithOrders } from "../../redux/api/adminCalls";
import { FaAngleLeft, FaAngleRight, FaUsers, FaArrowTrendUp, FaChartPie } from "react-icons/fa6";
import { FaUserAlt, FaSearch } from "react-icons/fa";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const getUsers = async () => {
            try {
                setLoading(true);
                const data = await fetchUsersWithOrders();
                setUsers(data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getUsers();
    }, []);

    // Filtered users based on search
    const filteredUsers = useMemo(() => {
        return users.filter(user =>
            user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    const goToPreviousPage = () => setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    const goToNextPage = () => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));

    // Stats calculations
    const totalSpending = users.reduce((acc, user) => acc + (user.totalAmount || 0), 0);
    const topSpender = users.length > 0 ? [...users].sort((a, b) => b.totalAmount - a.totalAmount)[0] : null;

    if (error) return <div className="min-h-screen flex items-center justify-center font-bold text-red-500">Error: {error}</div>;

    return (
        <div className="lg:px-20 md:px-12 px-6 py-10 min-h-screen bg-gray-50/50">
            {/* Header section with Stats */}
            <div className="mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">User Management</h1>
                    <p className="text-gray-500 mt-2 text-lg">Monitor platform activity and customer spending.</p>
                </div>

                <div className="flex flex-wrap gap-4">
                    <StatCard
                        icon={<FaUsers className="text-purple-600" />}
                        label="Total Users"
                        value={users.length}
                        trend="+12%"
                    />
                    <StatCard
                        icon={<FaArrowTrendUp className="text-emerald-600" />}
                        label="Total Revenue"
                        value={`$${totalSpending.toLocaleString()}`}
                    />
                </div>
            </div>

            {/* Actions Bar */}
            <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none shadow-sm"
                    />
                </div>

                <div className="flex gap-2 text-sm font-semibold text-gray-500">
                    <span className="px-3 py-1 bg-white border border-gray-200 rounded-lg shadow-sm">Showing {filteredUsers.length} Users</span>
                </div>
            </div>

            {loading ? (
                <div className="py-32 flex flex-col items-center justify-center gap-4">
                    <div className="w-12 h-12 border-4 border-purple-100 border-t-purple-600 rounded-full animate-spin"></div>
                    <p className="text-gray-400 font-medium animate-pulse">Fetching user records...</p>
                </div>
            ) : (
                <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 text-gray-500 text-[11px] uppercase tracking-widest font-bold">
                                    <th className="px-8 py-5">Profile</th>
                                    <th className="px-8 py-5">Contact Details</th>
                                    <th className="px-8 py-5 text-center">Activity</th>
                                    <th className="px-8 py-5 text-right">Lifetime Value</th>
                                    <th className="px-8 py-5 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {currentItems.map((user, idx) => (
                                    <tr key={user._id} className="group hover:bg-purple-50/30 transition-all duration-300">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="relative">
                                                    {user?.profilePhoto ? (
                                                        <img src={user.profilePhoto} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white shadow-md" alt="" />
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xl shadow-lg shadow-purple-200">
                                                            <FaUserAlt />
                                                        </div>
                                                    )}
                                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors capitalize">{user.username}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">ID: {user._id?.slice(-8)}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <p className="text-sm font-semibold text-gray-700">{user.email}</p>
                                            <p className="text-xs text-gray-400">Regular Customer</p>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <div className="inline-flex flex-col items-center px-3 py-1 bg-gray-50 rounded-xl">
                                                <span className="text-sm font-black text-gray-900">{user.orders?.length || 0}</span>
                                                <span className="text-[9px] font-bold text-gray-400 uppercase">Orders</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <p className="text-lg font-black text-gray-900">${(user.totalAmount || 0).toLocaleString()}</p>
                                            <p className="text-[10px] font-bold text-emerald-600 uppercase">Paid Total</p>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase rounded-full">Active</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {currentItems.length === 0 && (
                            <div className="py-32 flex flex-col items-center justify-center text-gray-400">
                                <FaChartPie className="text-6xl mb-4 opacity-20" />
                                <p className="text-xl font-bold italic">No matching user profiles found</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Premium Pagination */}
            {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-between px-2">
                    <p className="text-sm font-bold text-gray-400">
                        Showing <span className="text-gray-900">{indexOfFirstItem + 1}</span> to <span className="text-gray-900">{Math.min(indexOfLastItem, filteredUsers.length)}</span> of <span className="text-gray-900">{filteredUsers.length}</span> entries
                    </p>
                    <nav className="flex items-center gap-1">
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className="p-3 rounded-2xl bg-white border border-gray-200 text-gray-400 hover:text-purple-600 hover:border-purple-200 disabled:opacity-30 disabled:hover:text-gray-400 transition-all shadow-sm"
                        >
                            <FaAngleLeft />
                        </button>
                        <div className="flex gap-1 mx-2">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => paginate(i + 1)}
                                    className={`w-11 h-11 rounded-2xl font-black text-sm transition-all shadow-sm ${currentPage === i + 1 ? 'bg-purple-800 text-white shadow-purple-200' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className="p-3 rounded-2xl bg-white border border-gray-200 text-gray-400 hover:text-purple-600 hover:border-purple-200 disabled:opacity-30 transition-all shadow-sm"
                        >
                            <FaAngleRight />
                        </button>
                    </nav>
                </div>
            )}
        </div>
    );
};

const StatCard = ({ icon, label, value, trend }) => (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5 min-w-[200px]">
        <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl">
            {icon}
        </div>
        <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</p>
            <div className="flex items-center gap-2">
                <p className="text-2xl font-black text-gray-900">{value}</p>
                {trend && <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded-lg">{trend}</span>}
            </div>
        </div>
    </div>
);

export default ManageUsers;
