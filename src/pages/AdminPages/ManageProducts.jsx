import { useEffect, useState, useMemo } from 'react';
import { BiEdit } from 'react-icons/bi';
import { FaAngleLeft, FaAngleRight, FaPlus, FaFilter, FaLayerGroup, FaTags, FaStore } from 'react-icons/fa6';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteAdminProduct, fetchAllProducts } from '../../redux/api/adminCalls';
import { useDispatch, useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';

const ManageProducts = () => {
    const dispatch = useDispatch();
    const { products, isLoading } = useSelector((state) => state.products);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("All");

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    const handleDeleteWork = (id) => {
        Swal.fire({
            title: 'Delete Product?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1e1b4b',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteAdminProduct(id)).then(() => {
                    Swal.fire('Deleted!', 'User has been removed.', 'success');
                });
            }
        });
    };

    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const matchesSearch = p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.brand?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = filterCategory === "All" || p.category === filterCategory;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchTerm, filterCategory]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    // Stats
    const inStockCount = products.filter(p => p.inStack).length;
    const outOfStockCount = products.length - inStockCount;

    return (
        <div className="lg:px-20 md:px-12 px-6 py-10 min-h-screen bg-gray-50/50">
            {/* Header / Stats Section */}
            <div className="mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Product Catalog</h1>
                    <p className="text-gray-500 mt-2 text-lg">Inventory management and item tracking.</p>
                </div>

                <div className="flex flex-wrap gap-4">
                    <StatCard
                        icon={<FaStore className="text-purple-600" />}
                        label="Total Inventory"
                        value={products.length}
                    />
                    <StatCard
                        icon={<FaLayerGroup className="text-emerald-600" />}
                        label="In Stock"
                        value={inStockCount}
                    />
                    <Link to="/admin/add-product" className="group h-16 bg-purple-800 hover:bg-purple-900 text-white rounded-3xl flex items-center justify-center gap-3 px-8 transition-all shadow-lg active:scale-95 font-bold">
                        <FaPlus className="text-sm group-hover:rotate-90 transition-transform duration-300" />
                        Add New Item
                    </Link>
                </div>
            </div>

            {/* Filter/Search Bar */}
            <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-80">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search inventory..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none shadow-sm font-semibold"
                        />
                    </div>

                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none shadow-sm font-bold text-gray-600"
                    >
                        <option value="All">All Categories</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>

                <div className="flex gap-4 text-sm font-black text-gray-400">
                    <span className="px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                        Status Live
                    </span>
                </div>
            </div>

            {isLoading ? (
                <div className="py-32 flex flex-col items-center justify-center gap-5">
                    <div className="w-14 h-14 border-4 border-purple-100 border-t-purple-600 rounded-full animate-spin"></div>
                    <p className="text-gray-400 font-black animate-pulse uppercase tracking-[4px]">Syncing Catalog...</p>
                </div>
            ) : (
                <div className="bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-gray-100/80 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#fcfcfd] border-b border-gray-50 text-gray-400 text-[10px] uppercase font-black tracking-widest">
                                <tr>
                                    <th className="px-10 py-6">Product Details</th>
                                    <th className="px-10 py-6 text-center">Category</th>
                                    <th className="px-10 py-6 text-center">Unit Price</th>
                                    <th className="px-10 py-6 text-center">Inventory</th>
                                    <th className="px-10 py-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50/60">
                                {currentItems.map((product) => (
                                    <tr key={product._id} className="group hover:bg-gray-50/80 transition-all duration-300">
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-5">
                                                <div className="w-16 h-20 rounded-2xl bg-gray-100 overflow-hidden shadow-sm relative shrink-0">
                                                    <img src={product.image} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all scale-100 group-hover:scale-110 duration-500" alt="" />
                                                </div>
                                                <div>
                                                    <p className="font-extrabold text-gray-900 group-hover:text-purple-700 transition-colors uppercase tracking-tight line-clamp-1">{product.title}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-[10px] font-black bg-gray-100 text-gray-500 px-2 py-0.5 rounded-lg uppercase">{product.brand}</span>
                                                        <span className="text-[10px] font-black text-gray-300">#INV-{product._id?.slice(-6)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6 text-center">
                                            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-700 rounded-full">
                                                <span className="text-[10px] font-black uppercase tracking-tighter">{product.category}</span>
                                            </div>
                                            <p className="text-[9px] font-bold text-gray-300 mt-1 uppercase tracking-widest italic">{product.subCategory}</p>
                                        </td>
                                        <td className="px-10 py-6 text-center">
                                            <span className="text-lg font-black text-gray-900 italic">${product.price?.toFixed(2)}</span>
                                        </td>
                                        <td className="px-10 py-6 text-center">
                                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl ${product.inStack ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                                <div className={`w-2 h-2 rounded-full ${product.inStack ? 'bg-emerald-500' : 'bg-rose-500 shadow-[0_0_10px_rgb(244,63,94)] animate-pulse'}`}></div>
                                                <span className="text-[10px] font-black uppercase tracking-widest">{product.inStack ? 'In Stock' : 'Out of Stock'}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <div className="flex items-center justify-end gap-3 text-2xl">
                                                <Link to={`/admin/edit-product/${product._id}`} className="w-11 h-11 flex items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm active:scale-95">
                                                    <BiEdit />
                                                </Link>
                                                <button onClick={() => handleDeleteWork(product._id)} className="w-11 h-11 flex items-center justify-center rounded-2xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-all shadow-sm active:scale-95">
                                                    <RiDeleteBin6Line />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {currentItems.length === 0 && (
                            <div className="py-40 text-center flex flex-col items-center gap-5">
                                <FaStore className="text-8xl text-gray-100" />
                                <div className="space-y-1">
                                    <p className="text-xl font-black text-gray-800 italic uppercase">Catalog is empty</p>
                                    <p className="text-gray-400 font-medium">No results found for your active filters</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-between px-4">
                    <p className="text-sm font-bold text-gray-400">
                        Page <span className="text-gray-900">{currentPage}</span> of <span className="text-gray-900 font-black">{totalPages}</span>
                        <span className="ml-4 text-[10px] uppercase opacity-50">Filtered from {products.length} units</span>
                    </p>
                    <nav className="flex items-center gap-2">
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className="w-12 h-12 rounded-2xl bg-white border border-gray-100 text-gray-400 hover:text-purple-600 hover:border-purple-200 disabled:opacity-30 transition-all shadow-sm flex items-center justify-center"
                        >
                            <FaAngleLeft className="text-lg" />
                        </button>

                        <div className="flex gap-2">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => paginate(i + 1)}
                                    className={`w-12 h-12 rounded-2xl font-black text-sm transition-all shadow-md active:scale-90 ${currentPage === i + 1 ? 'bg-purple-800 text-white shadow-purple-200' : 'bg-white border border-gray-100 text-gray-500 hover:bg-gray-50'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className="w-12 h-12 rounded-2xl bg-white border border-gray-100 text-gray-400 hover:text-purple-600 hover:border-purple-200 disabled:opacity-30 transition-all shadow-sm flex items-center justify-center"
                        >
                            <FaAngleRight className="text-lg" />
                        </button>
                    </nav>
                </div>
            )}
        </div>
    );
};

const StatCard = ({ icon, label, value }) => (
    <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex items-center gap-5 min-w-[220px] group hover:border-purple-100 transition-all">
        <div className="w-16 h-16 rounded-[20px] bg-purple-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
            <p className="text-3xl font-black text-gray-900 italic tracking-tighter">{value}</p>
        </div>
    </div>
);

export default ManageProducts;
