import { useEffect, useState, useMemo } from "react";
import { fetchUsersWithOrders } from "../../redux/api/adminCalls";
import {
  FaAngleLeft,
  FaAngleRight,
  FaUsers,
  FaArrowTrendUp,
  FaChartPie,
} from "react-icons/fa6";
import { FaUserAlt, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

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
    return users.filter(
      (user) =>
        user?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.email?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
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

        <div className="flex flex-wrap gap-6">
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
        </div>
      </div>

      {/* Actions Bar */}
      <div className="mb-10 flex flex-col md:flex-row gap-6 items-center justify-between">
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
          <span className="px-5 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm italic">
            Active Filters: None
          </span>
          <span className="px-5 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm">
            Showing {filteredUsers.length} Entries
          </span>
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
                      <p className="text-sm font-black text-gray-700 group-hover/row:text-gray-900 transition-colors">
                        {user?.email}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="w-2 h-2 bg-indigo-200 rounded-full"></span>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">
                          {user?.isAdmin ? "Admin Access" : "Market Member"}
                        </p>
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
                      {/* <span className="px-5 py-2 bg-emerald-100/50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100">
                        {user?.isActive ? "Active" : "Inactive"}
                        {user?.}
                      </span> */}
                      <Link to="/user/user.id">
                        <button className="px-5 py-2 bg-emerald-100/50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100">
                          View
                        </button>
                      </Link>
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

export default ManageUsers;
