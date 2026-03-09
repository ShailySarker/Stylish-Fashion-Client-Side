import { useEffect, useState, useMemo } from "react";
import { BiEdit } from "react-icons/bi";
import {
  FaAngleLeft,
  FaAngleRight,
  FaPlus,
  FaFilter,
  FaLayerGroup,
  FaTags,
  FaStore,
  FaAngleDown,
  FaEye,
  FaXmark,
} from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  deleteAdminProduct,
  fetchAllProducts,
} from "../../redux/api/adminCalls";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";

const ManageProducts = () => {
  const dispatch = useDispatch();
  const { products, isFetching } = useSelector((state) => state?.product);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [viewProduct, setViewProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleDeleteWork = (id) => {
    Swal.fire({
      title: "Confirm Deletion?",
      text: "This asset will be permanently removed from the catalog.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Remove Item",
      background: "#fff",
      customClass: {
        popup: "rounded-[32px] border-none shadow-2xl",
        confirmButton:
          "rounded-xl px-6 py-3 font-black uppercase tracking-widest text-[10px]",
        cancelButton:
          "rounded-xl px-6 py-3 font-black uppercase tracking-widest text-[10px]",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAdminProduct(id)).then(() => {
          Swal.fire("Success", "Catalog item has been purged.", "success");
        });
      }
    });
  };

  const filteredProducts = useMemo(() => {
    return (products || []).filter((p) => {
      const matchesSearch =
        p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        filterCategory === "All" || p.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, filterCategory]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  // Stats
  const inStockCount = (products || []).filter((p) => p.inStack).length;

  return (
    <>
      {viewProduct && (
        <ProductViewModal product={viewProduct} onClose={() => setViewProduct(null)} />
      )}
      <div className="lg:px-20 md:px-12 px-6 py-12 min-h-screen bg-[#FDFDFF] font-['Outfit']">
        {/* Header / Stats Section */}
        <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50/50 border border-indigo-100/50 backdrop-blur-xl rounded-full">
              <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(79,70,229,0.6)]"></span>
              <span className="text-[10px] font-black uppercase tracking-[3px] text-indigo-700/80">
                Global Inventory Node
              </span>
            </div>
            <h1 className="text-6xl font-black text-gray-900 tracking-tighter italic leading-none">
              Product{" "}
              <span className="text-indigo-600 underline decoration-indigo-200 decoration-8 underline-offset-8">
                Catalog
              </span>
            </h1>
            <p className="text-gray-400 font-medium tracking-tight text-lg">
              Management of high-end fashion assets and stock telemetry.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 items-center">
            <StatCard
              icon={<FaStore className="text-indigo-600" />}
              label="Total Matrix"
              value={(products || []).length}
              color="indigo"
            />
            <StatCard
              icon={<FaLayerGroup className="text-emerald-600" />}
              label="Available Stock"
              value={inStockCount}
              color="emerald"
            />
            <Link
              to="/admin/add-product"
              className="group h-20 bg-black hover:bg-indigo-600 text-white rounded-[32px] flex items-center justify-center gap-4 px-10 transition-all shadow-2xl shadow-indigo-200 active:scale-95 font-black uppercase text-[11px] tracking-[4px]"
            >
              <FaPlus className="text-sm group-hover:rotate-90 transition-transform duration-500" />
              New Entry
            </Link>
          </div>
        </div>

        {/* Filter/Search Bar */}
        <div className="mb-10 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-[400px] group">
              <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-indigo-300 group-focus-within:text-indigo-600 transition-colors" />
              <input
                type="text"
                placeholder="Query catalog items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-8 py-5 bg-white border border-gray-100 rounded-[32px] focus:ring-[15px] focus:ring-indigo-50/50 outline-none shadow-[0_15px_40px_rgba(0,0,0,0.02)] font-semibold text-gray-700"
              />
            </div>

            <div className="relative">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-8 py-5 bg-white border border-gray-100 rounded-[32px] focus:ring-[15px] focus:ring-indigo-50/50 outline-none shadow-sm font-black uppercase text-[10px] tracking-widest text-gray-500 appearance-none min-w-[200px] cursor-pointer"
              >
                <option value="All">All Sectors</option>
                <option value="Men">Men / Collective</option>
                <option value="Women">Women / Studio</option>
                <option value="Kids">Kids / Heritage</option>
              </select>
              <FaAngleDown className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex gap-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
            <span className="px-6 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center gap-3">
              <span className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse"></span>
              Telemetry Live
            </span>
          </div>
        </div>

        {isFetching ? (
          <div className="py-44 flex flex-col items-center justify-center gap-6">
            <div className="w-16 h-16 border-[6px] border-indigo-50 border-t-indigo-600 rounded-full animate-spin shadow-xl"></div>
            <p className="text-gray-400 font-black animate-pulse uppercase tracking-[5px] italic">
              Syncing Global Cache...
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-[56px] shadow-[0_40px_100px_rgba(0,0,0,0.03)] border border-gray-50/80 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#fcfcfd] border-b border-gray-50 text-gray-400 text-[10px] uppercase font-black tracking-[4px]">
                  <tr>
                    <th className="px-10 py-8">Asset Profile</th>
                    <th className="px-10 py-8 text-center">Sector</th>
                    <th className="px-10 py-8 text-center">Valuation</th>
                    <th className="px-10 py-8 text-center">Status</th>
                    <th className="px-10 py-8 text-right">Operations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50/60">
                  {currentItems.map((product) => (
                    <tr
                      key={product._id}
                      className="group hover:bg-slate-50/50 transition-all duration-500"
                    >
                      <td className="px-10 py-7">
                        <div className="flex items-center gap-6">
                          <div className="w-20 h-24 rounded-[28px] bg-gray-50 overflow-hidden shadow-md relative shrink-0 ring-4 ring-white group-hover:scale-105 transition-all duration-500">
                            <img
                              src={product.image}
                              className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all"
                              alt=""
                            />
                          </div>
                          <div>
                            <p className="text-lg font-black text-gray-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight line-clamp-1 italic">
                              {product.title}
                            </p>
                            <div className="flex items-center gap-3 mt-1.5">
                              <span className="text-[9px] font-black bg-indigo-50 text-indigo-500 px-2.5 py-1 rounded-lg uppercase tracking-widest">
                                {product.brand}
                              </span>
                              <span className="text-[9px] font-black text-gray-300 uppercase tracking-tighter">
                                SKU-{product._id?.slice(-8)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-7 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50/50 text-indigo-600 rounded-full border border-indigo-100/50">
                          <span className="text-[10px] font-black uppercase tracking-widest italic">
                            {product.category}
                          </span>
                        </div>
                        <p className="text-[9px] font-bold text-gray-300 mt-2 uppercase tracking-[3px] opacity-60">
                          {product.subCategory}
                        </p>
                      </td>
                      <td className="px-10 py-7 text-center">
                        <span className="text-2xl font-black text-gray-900 italic tracking-tighter">
                          ${product.price?.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-10 py-7 text-center">
                        <div
                          className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl ${product.inStack ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-rose-50 text-rose-600 border border-rose-100"}`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${product.inStack ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-rose-500 shadow-[0_0_10px_rgb(244,63,94)] animate-pulse"}`}
                          ></div>
                          <span className="text-[10px] font-black uppercase tracking-widest">
                            {product.inStack ? "Active" : "Depleted"}
                          </span>
                        </div>
                      </td>
                      <td className="px-10 py-7">
                        <div className="flex items-center justify-end gap-4">
                          <button
                            type="button"
                            onClick={() => setViewProduct(product)}
                            className="w-14 h-14 flex items-center justify-center rounded-[22px] bg-white border border-gray-100 text-gray-400 hover:text-violet-600 hover:border-violet-200 hover:shadow-xl hover:-translate-y-1 transition-all group/btn"
                          >
                            <FaEye className="text-xl group-hover/btn:scale-110 transition-transform" />
                          </button>
                          <Link
                            to={`/admin/edit-product/${product._id}`}
                            className="w-14 h-14 flex items-center justify-center rounded-[22px] bg-white border border-gray-100 text-gray-400 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-xl hover:-translate-y-1 transition-all group/btn"
                          >
                            <BiEdit className="text-2xl group-hover/btn:rotate-12 transition-transform" />
                          </Link>
                          <button
                            onClick={() => handleDeleteWork(product._id)}
                            className="w-14 h-14 flex items-center justify-center rounded-[22px] bg-white border border-gray-100 text-gray-400 hover:text-rose-600 hover:border-rose-200 hover:shadow-xl hover:-translate-y-1 transition-all group/btn"
                          >
                            <RiDeleteBin6Line className="text-2xl group-hover/btn:scale-110 transition-transform" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {(currentItems || []).length === 0 && (
                <div className="py-44 text-center flex flex-col items-center gap-6">
                  <FaStore className="text-9xl text-gray-50 animate-pulse" />
                  <div className="space-y-2">
                    <p className="text-2xl font-black text-gray-300 italic uppercase tracking-[6px]">
                      Catalog Empty
                    </p>
                    <p className="text-gray-400 font-medium tracking-tight">
                      No artifacts detected in the current scan parameters.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-between px-6">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[4px]">
              Scan Window{" "}
              <span className="text-gray-900 font-black">
                {indexOfFirstItem + 1}
              </span>{" "}
              to{" "}
              <span className="text-gray-900 font-black">
                {Math.min(indexOfLastItem, filteredProducts.length)}
              </span>{" "}
              of{" "}
              <span className="text-indigo-600 underline decoration-indigo-200 decoration-4 underline-offset-4">
                {filteredProducts.length}
              </span>{" "}
              artifacts
            </p>
            <nav className="flex items-center gap-3">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="w-14 h-14 rounded-[24px] bg-white border border-gray-100 text-gray-400 hover:text-indigo-600 hover:border-indigo-200 disabled:opacity-30 transition-all shadow-lg flex items-center justify-center text-xl shadow-black/5"
              >
                <FaAngleLeft />
              </button>

              <div className="flex gap-2 mx-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`w-14 h-14 rounded-[22px] font-black text-sm transition-all shadow-md active:scale-95 ${currentPage === i + 1 ? "bg-indigo-600 text-white shadow-indigo-200" : "bg-white border border-gray-100 text-gray-600 hover:bg-gray-50"}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="w-14 h-14 rounded-[24px] bg-white border border-gray-100 text-gray-400 hover:text-indigo-600 hover:border-indigo-200 disabled:opacity-30 transition-all shadow-lg flex items-center justify-center text-xl shadow-black/5"
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

const ProductViewModal = ({ product, onClose }) => (
  <div
    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
    onClick={onClose}
  >
    <div
      className="bg-white rounded-[56px] shadow-[0_60px_120px_rgba(0,0,0,0.2)] max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Modal Header */}
      <div className="flex items-center justify-between p-10 border-b border-gray-50">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50/50 border border-indigo-100/50 rounded-full">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-[3px] text-indigo-600/80">Product Dossier</span>
          </div>
          <h2 className="text-3xl font-black text-gray-900 italic tracking-tighter uppercase leading-tight line-clamp-1">
            {product.title}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="w-14 h-14 flex items-center justify-center rounded-[22px] bg-gray-50 text-gray-400 hover:bg-rose-50 hover:text-rose-500 hover:border hover:border-rose-100 transition-all text-xl shrink-0"
        >
          <FaXmark />
        </button>
      </div>

      {/* Modal Body */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Image */}
        <div className="p-10">
          <div className="aspect-[4/5] rounded-[40px] overflow-hidden bg-gray-50 shadow-inner">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Details */}
        <div className="p-10 space-y-8">
          {/* Price & Stock */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[4px] mb-1">Market Value</p>
              <p className="text-5xl font-black text-gray-900 italic tracking-tighter">${Number(product.price || 0).toFixed(2)}</p>
            </div>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl border ${product.inStack ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-rose-50 border-rose-100 text-rose-500'}`}>
              <div className={`w-2 h-2 rounded-full ${product.inStack ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]' : 'bg-rose-500 animate-pulse'}`}></div>
              <span className="text-[10px] font-black uppercase tracking-widest">{product.inStack ? 'Active' : 'Depleted'}</span>
            </div>
          </div>

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-5">
            <MetaChip label="Brand" value={product.brand} />
            <MetaChip label="Sector" value={product.category} />
            <MetaChip label="Type" value={product.subCategory} />
            <MetaChip label="Occasion" value={product.occasion || '—'} />
            <MetaChip label="Season" value={product.session || '—'} />
            <MetaChip label="SKU" value={product._id?.slice(-10)} mono />
          </div>

          {/* Colors */}
          {product.color?.length > 0 && (
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[4px] mb-4">Chromatic Spectrum</p>
              <div className="flex flex-wrap gap-3">
                {product.color.map(c => (
                  <div key={c.colorName} className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-2xl border border-gray-100">
                    <div style={{ backgroundColor: c.colorValue }} className="w-5 h-5 rounded-lg border-2 border-white shadow-sm"></div>
                    <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{c.colorName}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.size?.length > 0 && (
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[4px] mb-4">Volume Matrix</p>
              <div className="flex flex-wrap gap-3">
                {product.size.map(s => (
                  <span key={s} className="px-5 py-2 bg-gray-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-[4px]">{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {product.desc && (
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[4px] mb-3">Archive Narrative</p>
              <p className="text-sm text-gray-600 font-medium leading-relaxed italic line-clamp-4">{product.desc}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

const MetaChip = ({ label, value, mono }) => (
  <div className="p-4 bg-gray-50/50 rounded-[20px] border border-gray-100/80">
    <p className="text-[9px] font-black text-gray-400 uppercase tracking-[3px] mb-1">{label}</p>
    <p className={`text-sm font-black text-gray-900 uppercase truncate ${mono ? 'font-mono text-[11px]' : ''}`}>{value || '—'}</p>
  </div>
);

const StatCard = ({ icon, label, value, color }) => (
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
      <p className="text-4xl font-black text-gray-900 italic tracking-tighter leading-none">
        {value}
      </p>
    </div>
  </div>
);

export default ManageProducts;
