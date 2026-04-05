import { useEffect, useState, useMemo } from "react";
import { fetchUsersWithOrders } from "../../redux/api/adminCalls";
import {
  FaAngleLeft,
  FaAngleRight,
  FaUsers,
  FaArrowTrendUp,
  FaChartPie,
  FaXmark,
  FaEye,
  FaBox,
} from "react-icons/fa6";
import {
  FaUserAlt,
  FaSearch,
  FaEnvelope,
  FaShieldAlt,
  FaCalendarAlt,
  FaCreditCard,
} from "react-icons/fa";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

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
    return users.filter((user) => {
      const matchesSearch =
        user?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?._id?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });
  }, [users, searchTerm]);

  console.log(users);
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const goToPreviousPage = () =>
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));

  // Stats calculations
  const totalSpending = users.reduce(
    (acc, user) => acc + (Number(user?.totalAmount) || 0),
    0,
  );
  const averageLTV =
    users.length > 0 ? (totalSpending / users.length).toFixed(2) : 0;

  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 text-4xl shadow-lg ring-4 ring-rose-100 animate-bounce">
          !
        </div>
        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-widest italic">
          System Fault
        </h2>
        <p className="text-gray-500 font-medium">Exception: {error}</p>
      </div>
    );

  return (
    <>
      {selectedUser && (
        <UserViewModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
      <div className="lg:px-20 md:px-12 px-6 py-12 min-h-screen bg-[#FDFDFF] font-['Outfit']">
        {/* Header section with Stats */}
        <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-50/50 border border-purple-100/50 backdrop-blur-xl rounded-full">
              <span className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(147,51,234,0.6)]"></span>
              <span className="text-[10px] font-black uppercase tracking-[3px] text-purple-700/80">
                User Registry Node
              </span>
            </div>
            <h1 className="text-6xl font-black text-gray-900 tracking-tighter italic leading-none">
              Personnel{" "}
              <span className="text-purple-600 underline decoration-purple-200 decoration-8 underline-offset-8">
                Metrics
              </span>
            </h1>
            <p className="text-gray-400 font-medium tracking-tight text-lg">
              Real-time telemetry and acquisition analysis for platform members.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 items-center">
            <StatCard
              icon={<FaUsers className="text-purple-600" />}
              label="Total Cohort"
              value={users.length}
              trend="+12%"
              color="purple"
            />
            <StatCard
              icon={<FaArrowTrendUp className="text-emerald-600" />}
              label="Cumulative LTVA"
              value={`$${totalSpending.toLocaleString()}`}
              subLabel={`$${averageLTV} Avg / User`}
              color="emerald"
            />
            <button
              onClick={() => {
                setLoading(true);
                fetchUsersWithOrders().then((data) => {
                  setUsers(data || []);
                  setLoading(false);
                });
              }}
              className="h-20 w-20 bg-black hover:bg-purple-600 text-white rounded-[32px] flex items-center justify-center transition-all shadow-2xl active:scale-95 group/sync"
              title="Synchronize Database"
            >
              <div className="group-hover/sync:rotate-[360deg] transition-transform duration-1000">
                <FaChartPie className="text-xl" />
              </div>
            </button>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="mb-10 flex flex-col lg:flex-row gap-6 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-[450px] group">
              <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-purple-300 group-focus-within:text-purple-600 transition-colors" />
              <input
                type="text"
                placeholder="Scan registry by name, email or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-8 py-5 bg-white border border-gray-100 rounded-[32px] focus:ring-[15px] focus:ring-purple-50/50 focus:border-purple-200 transition-all outline-none shadow-[0_15px_40px_rgba(0,0,0,0.02)] text-gray-700 font-semibold"
              />
            </div>

            <div className="flex gap-4 text-[10px] font-black text-gray-400 uppercase tracking-widest items-center">
              <span className="px-6 py-4 bg-white border border-gray-100 rounded-[28px] shadow-sm flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                Registry Matches: {filteredUsers.length}
              </span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="py-44 flex flex-col items-center justify-center gap-6">
            <div className="w-16 h-16 border-[6px] border-purple-50 border-t-purple-600 rounded-full animate-spin shadow-xl"></div>
            <p className="text-gray-400 font-black uppercase tracking-[5px] animate-pulse italic">
              Synchronizing Database...
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-[56px] shadow-[0_30px_90px_rgba(0,0,0,0.03)] border border-gray-50/80 overflow-hidden group">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#fcfcfd] text-gray-400 text-[10px] uppercase font-black tracking-[4px]">
                    <th className="px-10 py-8">User Profile</th>
                    <th className="px-10 py-8">Contact & Authority</th>
                    <th className="px-10 py-8 text-center">Engagement</th>
                    <th className="px-10 py-8 text-right">Acquisition Value</th>
                    <th className="px-10 py-8 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {currentItems.map((user, idx) => (
                    <tr
                      key={user?._id || idx}
                      className="group/row hover:bg-purple-50/40 transition-all duration-500"
                    >
                      <td className="px-10 py-7">
                        <div className="flex items-center gap-6">
                          <div className="relative shrink-0">
                            {user?.profilePhoto ? (
                              <img
                                src={user.profilePhoto}
                                className="w-16 h-16 rounded-[24px] object-cover ring-4 ring-white shadow-xl group-hover/row:scale-105 transition-transform"
                                alt=""
                              />
                            ) : (
                              <div className="w-16 h-16 rounded-[24px] bg-gradient-to-br from-purple-500 via-indigo-600 to-indigo-700 flex items-center justify-center text-white text-2xl shadow-lg ring-4 ring-white group-hover/row:rotate-6 transition-all">
                                <FaUserAlt />
                              </div>
                            )}
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full shadow-sm animate-pulse"></div>
                          </div>
                          <div>
                            <p className="text-lg font-black text-gray-900 group-hover/row:text-purple-700 transition-colors italic uppercase leading-tight">
                              {user?.username || "Anonymous"}
                            </p>
                            <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-1 italic">
                              ID: {user?._id?.slice(-10) || "Unknown"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-7">
                        <p className="text-sm font-black text-gray-700 group-hover/row:text-gray-900 transition-colors flex items-center gap-2">
                          <FaEnvelope className="text-[10px] text-purple-300" />
                          {user?.email}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span
                            className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                              user?.isAdmin
                                ? "bg-purple-50 text-purple-600 border-purple-100"
                                : "bg-indigo-50 text-indigo-600 border-indigo-100"
                            }`}
                          >
                            {user?.isAdmin
                              ? "Administrative Personnel"
                              : "Platform Member"}
                          </span>
                        </div>
                      </td>
                      <td className="px-10 py-7 text-center">
                        <div className="inline-flex flex-col items-center px-4 py-2 bg-gray-50 rounded-2xl border border-gray-100/50 min-w-[80px]">
                          <span className="text-lg font-black text-gray-900">
                            {user?.orders?.length || 0}
                          </span>
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                            Transactions
                          </span>
                        </div>
                      </td>
                      <td className="px-10 py-7 text-right">
                        <div className="flex flex-col items-end">
                          <p className="text-2xl font-black text-gray-900 italic tracking-tighter">
                            ${(Number(user?.totalAmount) || 0).toLocaleString()}
                          </p>
                          <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg uppercase tracking-widest">
                            Lifetime Spend
                          </span>
                        </div>
                      </td>
                      <td className="px-10 py-7 text-center">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="px-5 py-2 bg-emerald-100/50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100 hover:bg-emerald-200 hover:scale-105 transition-all shadow-sm flex items-center gap-2 group/btn mx-auto"
                        >
                          <FaEye className="text-sm group-hover/btn:rotate-12" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {currentItems.length === 0 && (
                <div className="py-44 flex flex-col items-center justify-center text-gray-400 gap-6">
                  <FaChartPie className="text-9xl opacity-5 animate-pulse" />
                  <div className="text-center space-y-2">
                    <p className="text-2xl font-black italic uppercase text-gray-300 tracking-[5px]">
                      Zero Results Found
                    </p>
                    <p className="text-gray-400 font-medium">
                      No matching personnel records in current sector scan.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Premium Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-between px-6">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[3px]">
              Scan window{" "}
              <span className="text-gray-900">{indexOfFirstItem + 1}</span> to{" "}
              <span className="text-gray-900">
                {Math.min(indexOfLastItem, filteredUsers.length)}
              </span>{" "}
              of{" "}
              <span className="text-purple-600 underline font-black">
                {filteredUsers.length}
              </span>{" "}
              personnel artifacts
            </p>
            <nav className="flex items-center gap-3">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="w-14 h-14 rounded-[24px] bg-white border border-gray-100 text-gray-400 hover:text-purple-600 hover:border-purple-200 disabled:opacity-30 transition-all shadow-lg shadow-black/5 flex items-center justify-center text-xl"
              >
                <FaAngleLeft />
              </button>
              <div className="flex gap-2 mx-4">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`w-14 h-14 rounded-[22px] font-black text-sm transition-all shadow-md active:scale-90 ${currentPage === i + 1 ? "bg-purple-800 text-white shadow-purple-200" : "bg-white border border-gray-100 text-gray-600 hover:bg-gray-50"}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="w-14 h-14 rounded-[24px] bg-white border border-gray-100 text-gray-400 hover:text-purple-600 hover:border-purple-200 disabled:opacity-30 transition-all shadow-lg shadow-black/5 flex items-center justify-center text-xl"
              >
                <FaAngleRight />
              </button>
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

const StatCard = ({ icon, label, value, trend, subLabel, color }) => (
  <div
    className={`bg-white p-8 rounded-[40px] border border-gray-100/80 shadow-[0_20px_50px_rgba(0,0,0,0.02)] flex items-center gap-6 min-w-[280px] group transition-all hover:border-${color}-200 hover:shadow-xl hover:-translate-y-2`}
  >
    <div
      className={`w-20 h-20 rounded-[32px] bg-${color}-50 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-500`}
    >
      {icon}
    </div>
    <div className="space-y-1">
      <p className="text-[11px] font-black text-gray-400 uppercase tracking-[4px]">
        {label}
      </p>
      <div className="flex items-center gap-3">
        <p className="text-4xl font-black text-gray-900 italic tracking-tighter leading-none">
          {value}
        </p>
        {trend && (
          <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-xl shadow-inner">
            {trend}
          </span>
        )}
      </div>
      {subLabel && (
        <p className="text-[10px] font-bold text-gray-400 mt-2 italic">
          {subLabel}
        </p>
      )}
    </div>
  </div>
);

const UserViewModal = ({ user, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[56px] shadow-[0_60px_120px_rgba(0,0,0,0.2)] xl:max-w-4xl lg:max-w-3xl max-w-2xl w-full xl:max-h-[75vh] lg:max-h-[60vh] max-h-[80vh] overflow-y-auto relative animate-in zoom-in-95 duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-8 top-8 w-14 h-14 flex items-center justify-center rounded-[22px] bg-gray-50 text-gray-400 hover:bg-rose-50 hover:text-rose-500 hover:border hover:border-rose-100 transition-all text-xl z-10"
        >
          <FaXmark />
        </button>

        {/* Modal Header/Profile */}
        <div className="p-12 border-b border-gray-50 bg-gradient-to-br from-gray-50/50 to-white">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="relative group/avatar">
              {user?.profilePhoto ? (
                <img
                  src={user.profilePhoto}
                  className="w-44 h-44 rounded-[48px] object-cover ring-8 ring-white shadow-2xl group-hover/avatar:scale-105 transition-transform duration-500"
                  alt=""
                />
              ) : (
                <div className="w-44 h-44 rounded-[48px] bg-gradient-to-br from-purple-500 via-indigo-600 to-indigo-700 flex items-center justify-center text-white text-6xl shadow-2xl ring-8 ring-white group-hover/avatar:rotate-6 transition-all duration-500">
                  <FaUserAlt />
                </div>
              )}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 border-4 border-white rounded-full shadow-lg"></div>
            </div>

            <div className="text-center md:text-left space-y-4">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-purple-50 text-purple-600 rounded-2xl border border-purple-100">
                <FaShieldAlt className="text-sm" />
                <span className="text-[10px] font-black uppercase tracking-[3px]">
                  {user?.isAdmin
                    ? "Administrative Personnel"
                    : "Platform Member"}
                </span>
              </div>
              <h2 className="text-5xl font-black text-gray-900 tracking-tighter italic uppercase leading-none">
                {user?.username || "Anonymous User"}
              </h2>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[4px] italic">
                System Registry ID: {user?._id}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-12 space-y-12">
          {/* Core Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              icon={<FaEnvelope className="text-purple-600" />}
              label="Contact node"
              value={user?.email || "Unknown"}
              subLabel="Primary Communication"
            />
            <MetricCard
              icon={<FaCalendarAlt className="text-indigo-600" />}
              label="Registry Date"
              value={
                user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "Historical Record"
              }
              subLabel="Acquisition Timestamp"
            />
            <MetricCard
              icon={<FaCreditCard className="text-emerald-600" />}
              label="Asset Lifecycle"
              value={`$${(Number(user?.totalAmount) || 0).toLocaleString()}`}
              subLabel="Total Platform Spend"
            />
          </div>

          {/* New: Strategic Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-10 bg-slate-50 rounded-[40px] border border-slate-100 flex items-center justify-between group hover:bg-white hover:border-purple-200 transition-all duration-500 shadow-inner hover:shadow-xl">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[4px]">
                    Product Portfolio
                  </h4>
                </div>
                <p className="text-4xl font-black text-gray-900 italic tracking-tighter">
                  {user?.orders?.reduce(
                    (acc, o) => acc + (o.products?.length || 0),
                    0,
                  ) || 0}
                  <span className="text-sm font-bold text-gray-400 ml-2 uppercase not-italic tracking-widest">
                    Artifacts
                  </span>
                </p>
                <p className="text-[10px] text-gray-400 font-medium">
                  Total volume across all acquisition cycles
                </p>
              </div>
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-2xl text-purple-600 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm">
                <FaBox />
              </div>
            </div>

            <div className="p-10 bg-slate-50 rounded-[40px] border border-slate-100 flex items-center justify-between group hover:bg-white hover:border-emerald-200 transition-all duration-500 shadow-inner hover:shadow-xl">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></div>
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[4px]">
                    Success Ratio
                  </h4>
                </div>
                <p className="text-4xl font-black text-gray-900 italic tracking-tighter">
                  {user?.orders?.length > 0
                    ? `${Math.round((user.orders.filter((o) => o.status === "delivered").length / user.orders.length) * 100)}%`
                    : "0%"}
                </p>
                <p className="text-[10px] text-gray-400 font-medium">
                  Fulfillment reliability index
                </p>
              </div>
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-2xl text-emerald-600 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm">
                <FaArrowTrendUp />
              </div>
            </div>
          </div>

          {/* Activity Logs (Orders) */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-[4px] italic">
                Transaction Archive
              </h3>
              <span className="px-4 py-1.5 bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-gray-100">
                {user?.orders?.length || 0} Records Detected
              </span>
            </div>

            <div className="bg-gray-50/50 rounded-[40px] border border-gray-100 p-2 overflow-hidden">
              {user?.orders?.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic opacity-60">
                        <th className="px-8 py-5">Order Reference</th>
                        <th className="px-8 py-5">Timestamp</th>
                        <th className="px-8 py-5 text-center">Status</th>
                        <th className="px-8 py-5 text-right">Valuation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100/50">
                      {user.orders.map((order) => (
                        <tr
                          key={order._id}
                          className="group/order hover:bg-white transition-all duration-300"
                        >
                          <td className="px-8 py-5">
                            <p className="text-xs font-black text-gray-900 tracking-widest uppercase">
                              TX#{order._id?.slice(-12)}
                            </p>
                          </td>
                          <td className="px-8 py-5">
                            <p className="text-xs font-bold text-gray-400">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </td>
                          <td className="px-8 py-5 text-center">
                            <span
                              className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${
                                order.status === "delivered" &&
                                "bg-emerald-50 text-emerald-600 border-emerald-100"
                              } ${
                                order.status === "pending" &&
                                "bg-amber-50 text-amber-600 border-amber-100"
                              } ${
                                order.status === "processing" &&
                                "bg-sky-50 text-sky-600 border-sky-100"
                              } `}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-8 py-5 text-right font-black text-gray-900 italic tracking-tighter">
                            ${order.amount?.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-24 text-center flex flex-col items-center gap-4">
                  <FaChartPie className="text-7xl opacity-5 animate-pulse text-gray-400" />
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-[4px]">
                    No transactions artifacts detected.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ icon, label, value, subLabel }) => (
  <div className="p-8 bg-white border border-gray-100 rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-500 group">
    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div className="space-y-1">
      <p className="text-[9px] font-black text-gray-400 uppercase tracking-[3px]">
        {label}
      </p>
      <p className="text-xl font-black text-gray-900 truncate tracking-tight">
        {value}
      </p>
      {subLabel && (
        <p className="text-[9px] font-bold text-gray-400 italic">{subLabel}</p>
      )}
    </div>
  </div>
);

export default ManageUsers;
