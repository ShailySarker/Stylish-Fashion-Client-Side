import { useEffect, useState } from "react";
import app from "../../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { fetchProductById, updateAdminProduct } from "../../redux/api/adminCalls";
import {
    FaAngleDown,
    FaCircleCheck,
    FaCloudArrowUp,
    FaXmark,
    FaArrowLeft,
} from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    MdTipsAndUpdates,
    MdOutlineCategory,
    MdOutlinePriceChange,
    MdOutlineDescription,
} from "react-icons/md";
import Swal from "sweetalert2";
import { FaSearch } from "react-icons/fa";

const EditProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [colorDropdownVisible, setColorDropdownVisible] = useState(false);
    const [sizeDropdownVisible, setSizeDropdownVisible] = useState(false);

    const [product, setProduct] = useState({
        title: "",
        desc: "",
        image: "",
        category: "",
        subCategory: "",
        occasion: "",
        session: "",
        price: "",
        brand: "",
        size: [],
        color: [],
        inStack: true,
    });

    const [colorOptions] = useState([
        { id: "1", colorName: "Red", colorValue: "#dc2626" },
        { id: "2", colorName: "Green", colorValue: "#16a34a" },
        { id: "3", colorName: "Blue", colorValue: "#1d4ed8" },
        { id: "4", colorName: "Pink", colorValue: "#db2777" },
        { id: "5", colorName: "Purple", colorValue: "#9333ea" },
        { id: "6", colorName: "Black", colorValue: "#000000" },
        { id: "7", colorName: "White", colorValue: "#ffffff" },
        { id: "8", colorName: "Indigo", colorValue: "#4f46e5" },
        { id: "9", colorName: "Teal", colorValue: "#14b8a6" },
        { id: "10", colorName: "Gray", colorValue: "#9ca3af" },
        { id: "11", colorName: "Peach", colorValue: "#fecdd3" },
        { id: "12", colorName: "Yellow", colorValue: "#facc15" },
        { id: "13", colorName: "Orange", colorValue: "#f97316" },
        { id: "14", colorName: "Sky", colorValue: "#38bdf8" },
        { id: "15", colorName: "Brown", colorValue: "#78350f" },
        { id: "16", colorName: "Olive", colorValue: "#3f6212" },
        { id: "17", colorName: "Amber", colorValue: "#d97706" },
    ]);

    const [sizeOptions] = useState(["XS", "S", "M", "L", "XL", "2XL"]);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const data = await fetchProductById(id);
                setProduct({
                    ...data,
                    size: data.size || [],
                    color: data.color || [],
                });
            } catch (err) {
                Swal.fire("Error", "Could not retrieve product data.", "error");
                navigate("/admin/products");
            } finally {
                setFetching(false);
            }
        };
        getProduct();
    }, [id, navigate]);

    const handleImageChange = async (e) => {
        if (e?.target?.files && e?.target?.files[0]) {
            const imageFile = e.target.files[0];
            try {
                setUploading(true);
                const storage = getStorage(app);
                const storageRef = ref(storage, "images/" + Date.now() + "_" + imageFile.name);
                await uploadBytes(storageRef, imageFile);
                const downloadURL = await getDownloadURL(storageRef);
                setProduct((prev) => ({ ...prev, image: downloadURL }));
            } catch (error) {
                Swal.fire("Error", "Cloud asset synchronization failed.", "error");
            } finally {
                setUploading(false);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (product.size.length === 0)
            return Swal.fire("Validation Error", "Please select at least one size.", "warning");
        if (product.color.length === 0)
            return Swal.fire("Validation Error", "Please select at least one color.", "warning");
        if (!product.price || Number(product.price) <= 0)
            return Swal.fire("Validation Error", "Please enter a valid price.", "warning");

        setLoading(true);
        try {
            const result = await dispatch(
                updateAdminProduct(id, { ...product, price: Number(product.price) })
            );
            if (result.success) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Catalog item synchronized.",
                    showConfirmButton: false,
                    timer: 2500,
                });
                navigate("/admin/products");
            } else {
                throw new Error("Update failed");
            }
        } catch (err) {
            Swal.fire("Error", "Failed to update catalog item. Please try again.", "error");
        } finally {
            setLoading(false);
        }
    };

    const toggleColor = (option) => {
        const exists = product.color.find((c) => c.colorName === option.colorName);
        const updatedColors = exists
            ? product.color.filter((c) => c.colorName !== option.colorName)
            : [...product.color, { colorName: option.colorName, colorValue: option.colorValue }];
        setProduct((prev) => ({ ...prev, color: updatedColors }));
    };

    const toggleSize = (size) => {
        const exists = product.size.includes(size);
        const updatedSizes = exists
            ? product.size.filter((s) => s !== size)
            : [...product.size, size];
        setProduct((prev) => ({ ...prev, size: updatedSizes }));
    };

    const filteredColorOptions = colorOptions.filter((opt) =>
        opt.colorName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (fetching)
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#FDFDFF] font-['Outfit']">
                <div className="w-16 h-16 border-[6px] border-indigo-50 border-t-indigo-600 rounded-full animate-spin shadow-xl"></div>
                <p className="text-gray-400 font-black animate-pulse uppercase tracking-[5px] italic">
                    Fetching Asset Data...
                </p>
            </div>
        );

    return (
        <div className="min-h-screen bg-[#FDFDFF] py-12 lg:px-20 md:px-12 px-6 font-['Outfit']">
            {/* Header */}
            <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50/50 border border-amber-100/50 backdrop-blur-xl rounded-full">
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.6)]"></span>
                        <span className="text-[10px] font-black uppercase tracking-[3px] text-amber-700/80">
                            Catalog Edit Mode
                        </span>
                    </div>
                    <h1 className="text-6xl font-black text-gray-900 tracking-tighter italic leading-none">
                        Edit{" "}
                        <span className="text-amber-500 underline decoration-amber-200 decoration-8 underline-offset-8">
                            Artifact
                        </span>
                    </h1>
                    <p className="text-gray-400 font-medium tracking-tight text-sm uppercase tracking-[3px]">
                        Object ID:{" "}
                        <span className="text-gray-600 font-black">{id?.toUpperCase()}</span>
                    </p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => navigate("/admin/products")}
                        className="flex items-center gap-3 px-8 py-4 bg-white border border-gray-100 text-gray-400 rounded-[28px] text-[10px] font-black uppercase tracking-[2px] hover:bg-gray-50 hover:text-gray-900 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.02)] active:scale-95"
                    >
                        <FaArrowLeft />
                        Discard
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left: Image Panel */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-white p-10 rounded-[48px] shadow-[0_40px_80px_rgba(0,0,0,0.03)] border border-gray-100/50 sticky top-10">
                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-[4px] mb-8 flex items-center gap-3">
                            Asset Visualization
                            <div className="flex-1 h-[1px] bg-gradient-to-r from-gray-100 to-transparent"></div>
                        </p>

                        <div className="relative group transition-all duration-700 overflow-hidden rounded-[40px] aspect-[4/5] bg-gray-50 border-2 border-dashed border-amber-100 flex flex-col items-center justify-center hover:border-amber-300 shadow-inner">
                            {uploading && (
                                <div className="absolute inset-0 z-20 bg-white/90 backdrop-blur-xl flex flex-col items-center justify-center gap-6">
                                    <div className="w-14 h-14 border-[5px] border-amber-50 border-t-amber-500 rounded-full animate-spin shadow-lg"></div>
                                    <p className="text-[10px] font-black text-amber-900 uppercase tracking-[5px] animate-pulse">
                                        Syncing Cloud Storage
                                    </p>
                                </div>
                            )}

                            {product.image ? (
                                <>
                                    <img
                                        src={product.image}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        alt="Preview"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-6 z-10 backdrop-blur-sm">
                                        <label className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-3xl shadow-2xl cursor-pointer hover:bg-white hover:text-amber-600 transition-all transform hover:-translate-y-2 flex items-center justify-center text-xl">
                                            <FaCloudArrowUp />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => setProduct((p) => ({ ...p, image: "" }))}
                                            className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-3xl shadow-2xl hover:bg-rose-600 hover:border-rose-500 transition-all transform hover:-translate-y-2 flex items-center justify-center text-xl"
                                        >
                                            <FaXmark />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <label className="flex flex-col items-center gap-8 cursor-pointer group/label p-10 w-full h-full justify-center">
                                    <div className="w-24 h-24 bg-white shadow-[0_20px_50px_rgba(245,158,11,0.12)] rounded-[40px] flex items-center justify-center transition-all duration-500 group-hover/label:rotate-[15deg] group-hover/label:scale-110">
                                        <FaCloudArrowUp className="text-4xl text-amber-500" />
                                    </div>
                                    <div className="text-center space-y-2">
                                        <p className="text-sm font-black text-gray-900 uppercase tracking-[4px] italic">
                                            Upload New Asset
                                        </p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[2px]">
                                            Studio Assets (PNG, JPG)
                                        </p>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>

                        {/* Status Toggle */}
                        <div className="mt-8 p-6 bg-gray-50/50 rounded-[32px] border border-gray-100">
                            <div className="flex items-center gap-5">
                                <div className="relative shrink-0">
                                    <input
                                        type="checkbox"
                                        name="inStack"
                                        id="inStack"
                                        checked={product.inStack}
                                        onChange={handleInputChange}
                                        className="peer h-8 w-14 cursor-pointer appearance-none rounded-full bg-gray-200 transition-colors checked:bg-emerald-500 outline-none"
                                    />
                                    <div className="pointer-events-none absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition-all peer-checked:translate-x-6 shadow-md"></div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="inStack"
                                        className="text-[11px] font-black text-gray-900 uppercase tracking-[3px] cursor-pointer block"
                                    >
                                        Marketplace Status
                                    </label>
                                    <p
                                        className={`text-[10px] font-bold uppercase mt-1 tracking-widest ${product.inStack ? "text-emerald-500" : "text-rose-400"}`}
                                    >
                                        {product.inStack ? "Live Inventory ●" : "Archive / Out of Stock"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Security badge */}
                        <div className="mt-6 p-8 bg-gradient-to-br from-gray-900 via-gray-950 to-black rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.2)] text-white relative overflow-hidden group">
                            <div className="relative z-10 flex items-start gap-5">
                                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 border border-white/10">
                                    <FaCircleCheck className="text-amber-300 text-xl" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-black uppercase tracking-[3px] text-amber-300 mb-2">
                                        Edit Certificate
                                    </p>
                                    <p className="text-[12px] leading-relaxed font-medium opacity-70 italic">
                                        All changes are committed to the global matrix and reflected instantly.
                                    </p>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-1000"></div>
                        </div>
                    </div>
                </div>

                {/* Right: Form Panel */}
                <div className="lg:col-span-8 space-y-12">
                    <div className="bg-white p-14 rounded-[64px] shadow-[0_50px_100px_rgba(0,0,0,0.03)] border border-gray-100/50 space-y-16">
                        {/* Product DNA Section */}
                        <section className="space-y-10">
                            <div className="flex items-center gap-5">
                                <div className="w-2 h-8 bg-amber-500 rounded-full shadow-[0_4px_12px_rgba(245,158,11,0.3)]"></div>
                                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-[5px] italic">
                                    Product DNA
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="md:col-span-2 relative group">
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-[5px] mb-5 block flex items-center gap-3">
                                        Identity Assignment
                                        <div className="flex-1 h-[1px] bg-gray-50"></div>
                                    </label>
                                    <input
                                        className="w-full h-20 px-10 bg-gray-50/30 border-2 border-transparent rounded-[32px] outline-none text-gray-900 text-xl font-bold focus:bg-white focus:border-amber-100 focus:ring-[15px] focus:ring-amber-50/30 transition-all placeholder:text-gray-300 placeholder:italic"
                                        type="text"
                                        name="title"
                                        value={product.title}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Midnight Onyx Blouson Jacket"
                                        required
                                    />
                                    <MdTipsAndUpdates className="absolute right-10 top-[68px] text-gray-200 group-focus-within:text-amber-500 text-2xl transition-all group-focus-within:rotate-12" />
                                </div>

                                <div className="group">
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-[4px] mb-5 block flex items-center gap-3">
                                        Sector <MdOutlineCategory className="text-gray-300" />
                                    </label>
                                    <div className="relative">
                                        <select
                                            className="w-full h-20 px-10 bg-gray-50/30 border-2 border-transparent rounded-[32px] outline-none text-gray-900 font-black uppercase text-[12px] tracking-[3px] appearance-none focus:bg-white focus:border-amber-100 focus:ring-[15px] focus:ring-amber-50/30 transition-all cursor-pointer"
                                            name="category"
                                            value={product.category}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Domain</option>
                                            <option value="Men">Men / Collective</option>
                                            <option value="Women">Women / Studio</option>
                                            <option value="Kids">Kids / Heritage</option>
                                        </select>
                                        <FaAngleDown className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-[4px] mb-5 block">
                                        Classification
                                    </label>
                                    <div className="relative">
                                        <select
                                            className="w-full h-20 px-10 bg-gray-50/30 border-2 border-transparent rounded-[32px] outline-none text-gray-900 font-black uppercase text-[12px] tracking-[3px] appearance-none focus:bg-white focus:border-amber-100 focus:ring-[15px] focus:ring-amber-50/30 transition-all cursor-pointer"
                                            name="subCategory"
                                            value={product.subCategory}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Architype</option>
                                            {["Cap", "Coat", "Hudi", "Jacket", "Pant", "Shirt", "Shorts", "Suit", "Tshirt", "Frog", "Plazzo", "Bardot", "Formal", "Top", "Skirt", "TopSkirtSet", "TopPantSet", "TshirtPantSet", "WinterDressSet", "Other"].map(
                                                (sub) => (
                                                    <option key={sub} value={sub}>
                                                        {sub}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                        <FaAngleDown className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Market Dynamics Section */}
                        <section className="space-y-10">
                            <div className="flex items-center gap-5">
                                <div className="w-2 h-8 bg-emerald-500 rounded-full shadow-[0_4px_12px_rgba(16,185,129,0.3)]"></div>
                                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-[5px] italic">
                                    Market Dynamics
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="group relative">
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-[4px] mb-5 block flex items-center gap-3">
                                        Asset Worth <MdOutlinePriceChange className="text-gray-300" />
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-10 top-1/2 -translate-y-1/2 text-emerald-600 font-black text-2xl">
                                            $
                                        </span>
                                        <input
                                            className="w-full h-20 pl-16 pr-10 bg-gray-50/30 border-2 border-transparent rounded-[32px] outline-none text-gray-900 font-black italic text-3xl focus:bg-white focus:border-emerald-100 focus:ring-[15px] focus:ring-emerald-50/30 transition-all"
                                            type="number"
                                            name="price"
                                            value={product.price}
                                            onChange={handleInputChange}
                                            placeholder="0.00"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-[4px] mb-5 block">
                                        Heritage Brand
                                    </label>
                                    <div className="relative">
                                        <select
                                            className="w-full h-20 px-10 bg-gray-50/30 border-2 border-transparent rounded-[32px] outline-none text-gray-900 font-black uppercase text-[12px] tracking-[3px] appearance-none focus:bg-white focus:border-amber-100 focus:ring-[15px] focus:ring-amber-50/30 transition-all cursor-pointer"
                                            name="brand"
                                            value={product.brand}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Lineage</option>
                                            {["Zara", "Levls", "Gucci", "OshkoshBgosh", "PoloRalphLauren", "Nordstorm", "H&M", "BossHugoBoss", "Gymboree", "MiniBoden", "Carters", "Tea", "UniQlo", "TheChildrensPlace", "TommyHilfighter", "JCrew", "Other"].map(
                                                (b) => (
                                                    <option key={b} value={b}>
                                                        {b}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                        <FaAngleDown className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Color Picker */}
                                <div className="relative group">
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-[4px] mb-5 block italic">
                                        Chromatic Spectrum
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setColorDropdownVisible(!colorDropdownVisible)}
                                        className="w-full h-20 px-8 bg-gray-50/30 border-2 border-transparent rounded-[32px] flex items-center justify-between group transition-all hover:bg-white hover:border-amber-100 hover:shadow-xl outline-none"
                                    >
                                        <div className="flex -space-x-3">
                                            {product.color.length > 0 ? (
                                                product.color.slice(0, 6).map((c) => (
                                                    <div
                                                        key={c.colorName}
                                                        style={{ backgroundColor: c.colorValue }}
                                                        className="w-10 h-10 rounded-2xl border-4 border-white shadow-lg transition-transform group-hover:scale-110"
                                                    ></div>
                                                ))
                                            ) : (
                                                <span className="text-[10px] font-black uppercase text-gray-300 tracking-[3px]">
                                                    Void Spectrum
                                                </span>
                                            )}
                                        </div>
                                        <div
                                            className={`p-3 rounded-2xl bg-white shadow-sm transition-transform duration-500 ${colorDropdownVisible ? "rotate-180" : ""}`}
                                        >
                                            <FaAngleDown className="text-amber-400" />
                                        </div>
                                    </button>

                                    {colorDropdownVisible && (
                                        <div className="absolute z-50 top-full mt-6 left-0 w-full bg-white/95 backdrop-blur-xl border border-amber-50 shadow-[0_40px_100px_rgba(0,0,0,0.18)] rounded-[48px] p-10 origin-top">
                                            <div className="relative mb-8">
                                                <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-amber-300" />
                                                <input
                                                    type="text"
                                                    placeholder="Search Spectrum..."
                                                    className="w-full h-14 pl-14 pr-8 bg-gray-50 rounded-2xl outline-none font-black text-[10px] uppercase text-gray-700 placeholder:text-gray-300 tracking-widest border border-transparent focus:border-amber-100 transition-all"
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 sm:grid-cols-6 gap-8 max-h-[350px] overflow-y-auto pr-4">
                                                {filteredColorOptions.map((opt) => (
                                                    <button
                                                        key={opt.id}
                                                        type="button"
                                                        onClick={() => toggleColor(opt)}
                                                        className={`flex flex-col items-center gap-3 group/swatch focus:outline-none transition-all ${product.color.some((c) => c.colorName === opt.colorName) ? "scale-110" : "hover:scale-105 opacity-60 hover:opacity-100"}`}
                                                    >
                                                        <div
                                                            className={`w-14 h-14 rounded-3xl transition-all duration-500 p-1.5 ${product.color.some((c) => c.colorName === opt.colorName) ? "ring-4 ring-amber-500 ring-offset-4 shadow-2xl" : "shadow-sm"}`}
                                                        >
                                                            <div
                                                                style={{ backgroundColor: opt.colorValue }}
                                                                className="w-full h-full rounded-2xl shadow-inner border border-black/5"
                                                            ></div>
                                                        </div>
                                                        <span
                                                            className={`text-[9px] font-black uppercase tracking-widest ${product.color.some((c) => c.colorName === opt.colorName) ? "text-amber-600" : "text-gray-400"}`}
                                                        >
                                                            {opt.colorName}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Size Picker */}
                                <div className="relative group">
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-[4px] mb-5 block italic">
                                        Volume Matrix
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setSizeDropdownVisible(!sizeDropdownVisible)}
                                        className="w-full h-20 px-8 bg-gray-50/30 border-2 border-transparent rounded-[32px] flex items-center justify-between hover:bg-white hover:border-amber-100 hover:shadow-xl transition-all outline-none"
                                    >
                                        <div className="flex gap-3">
                                            {product.size.length > 0 ? (
                                                product.size.map((s) => (
                                                    <span
                                                        key={s}
                                                        className="px-4 py-1.5 bg-gray-950 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md"
                                                    >
                                                        {s}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-[10px] font-black uppercase text-gray-300 tracking-[3px]">
                                                    Undefined Matrix
                                                </span>
                                            )}
                                        </div>
                                        <div
                                            className={`p-3 rounded-2xl bg-white shadow-sm transition-transform duration-500 ${sizeDropdownVisible ? "rotate-180" : ""}`}
                                        >
                                            <FaAngleDown className="text-amber-400" />
                                        </div>
                                    </button>

                                    {sizeDropdownVisible && (
                                        <div className="absolute z-40 top-full mt-6 left-0 w-full bg-white/95 backdrop-blur-xl border border-amber-50 shadow-[0_40px_100px_rgba(0,0,0,0.18)] rounded-[48px] p-10 flex flex-wrap gap-4">
                                            {sizeOptions.map((size) => (
                                                <button
                                                    key={size}
                                                    type="button"
                                                    onClick={() => toggleSize(size)}
                                                    className={`flex-1 min-w-[100px] h-16 flex items-center justify-center rounded-[24px] border-2 transition-all font-black text-[12px] tracking-[4px] ${product.size.includes(size) ? "bg-amber-500 text-white border-amber-500 shadow-2xl shadow-amber-200 -translate-y-1" : "bg-gray-50 border-transparent text-gray-400 hover:border-amber-100 hover:bg-white"}`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* Temporal Section */}
                        <section className="space-y-10">
                            <div className="flex items-center gap-5">
                                <div className="w-2 h-8 bg-rose-500 rounded-full shadow-[0_4px_12px_rgba(244,63,94,0.3)]"></div>
                                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-[5px] italic">
                                    Temporal Deployment
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="group">
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-[4px] mb-5 block">
                                        Lifestyle Cluster
                                    </label>
                                    <div className="relative">
                                        <select
                                            className="w-full h-20 px-10 bg-gray-50/30 border-2 border-transparent rounded-[32px] outline-none text-gray-900 font-black uppercase text-[12px] tracking-[3px] appearance-none focus:bg-white focus:border-rose-100 focus:ring-[15px] focus:ring-rose-50/30 cursor-pointer transition-all"
                                            name="occasion"
                                            value={product.occasion || ""}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select Cluster</option>
                                            {["Formal", "Casual", "Party", "Wedding", "Other"].map((oc) => (
                                                <option key={oc} value={oc}>
                                                    {oc}
                                                </option>
                                            ))}
                                        </select>
                                        <FaAngleDown className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                                    </div>
                                </div>
                                <div className="group">
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-[4px] mb-5 block">
                                        Seasonal Anchor
                                    </label>
                                    <div className="relative">
                                        <select
                                            className="w-full h-20 px-10 bg-gray-50/30 border-2 border-transparent rounded-[32px] outline-none text-gray-900 font-black uppercase text-[12px] tracking-[3px] appearance-none focus:bg-white focus:border-rose-100 focus:ring-[15px] focus:ring-rose-50/30 cursor-pointer transition-all"
                                            name="session"
                                            value={product.session || ""}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select Period</option>
                                            {["Summer", "Rainy", "Autumn", "Winter", "Other"].map((se) => (
                                                <option key={se} value={se}>
                                                    {se}
                                                </option>
                                            ))}
                                        </select>
                                        <FaAngleDown className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Description Section */}
                        <section className="space-y-10">
                            <div className="flex items-center gap-5">
                                <div className="w-2 h-8 bg-gray-900 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)]"></div>
                                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-[5px] italic flex items-center gap-4">
                                    Archive Narrative
                                    <MdOutlineDescription className="text-gray-300" />
                                </h3>
                            </div>
                            <textarea
                                className="w-full p-12 bg-gray-50/30 border-2 border-transparent rounded-[48px] outline-none text-gray-900 font-medium text-xl min-h-[280px] focus:bg-white focus:border-amber-100 focus:ring-[20px] focus:ring-amber-50/20 placeholder:text-gray-300 transition-all leading-relaxed shadow-inner italic"
                                name="desc"
                                value={product.desc}
                                onChange={handleInputChange}
                                placeholder="Meticulously crafted with a focus on silhouette and avant-garde craftsmanship..."
                                required
                            />
                        </section>

                        {/* Submit */}
                        <div className="pt-12 border-t border-gray-100 flex items-center justify-center gap-8 flex-wrap">
                            <button
                                type="submit"
                                disabled={loading || uploading}
                                className="h-24 px-16 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-[40px] font-black uppercase tracking-[8px] text-[13px] hover:from-black hover:to-black hover:shadow-[0_30px_70px_rgba(0,0,0,0.2)] transition-all flex items-center gap-8 active:scale-95 disabled:opacity-50 disabled:grayscale group shadow-[0_25px_60px_rgba(245,158,11,0.3)]"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-6 h-6 border-[3px] border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Committing Changes...
                                    </>
                                ) : (
                                    <>
                                        Commit Production Update
                                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center group-hover:rotate-180 transition-transform duration-700">
                                            <FaCircleCheck className="text-2xl" />
                                        </div>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;
