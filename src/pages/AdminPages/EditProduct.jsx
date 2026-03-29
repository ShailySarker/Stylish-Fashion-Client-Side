/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { fetchProductById, updateAdminProduct } from "../../redux/api/adminCalls";
import app from "../../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
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
                // Strip MongoDB internal fields
                setProduct({
                    title: data.title || "",
                    desc: data.desc || "",
                    image: data.image || "",
                    category: data.category || "",
                    subCategory: data.subCategory || "",
                    occasion: data.occasion || "",
                    session: data.session || "",
                    price: data.price || "",
                    brand: data.brand || "",
                    size: Array.isArray(data.size) ? data.size : [],
                    color: Array.isArray(data.color) ? data.color : [],
                    inStack: data.inStack !== undefined ? data.inStack : true,
                });
            } catch (err) {
                console.error("Failed to fetch product:", err);
                Swal.fire("Error", "Could not retrieve product data.", "error");
                navigate("/admin/products");
            } finally {
                setFetching(false);
            }
        };
        if (id) getProduct();
    }, [id, navigate]);

    const handleImageChange = async (e) => {
        if (e?.target?.files && e?.target?.files[0]) {
            const imageFile = e.target.files[0];

            // Validate file type
            const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
            if (!allowedTypes.includes(imageFile.type)) {
                return Swal.fire("Invalid File", "Please upload a valid image (JPG, PNG, WEBP).", "warning");
            }

            // Validate file size — max 10 MB
            const maxSizeMB = 10;
            if (imageFile.size > maxSizeMB * 1024 * 1024) {
                return Swal.fire("File Too Large", `Image must be under ${maxSizeMB}MB. Please compress and try again.`, "warning");
            }

            try {
                setUploading(true);
                const storage = getStorage(app);
                const storageRef = ref(storage, "products/" + Date.now() + "_" + imageFile.name);
                await uploadBytes(storageRef, imageFile);
                const downloadURL = await getDownloadURL(storageRef);
                setProduct((prev) => ({ ...prev, image: downloadURL }));
            } catch (error) {
                console.error("Firebase upload error:", error?.message, error);
                Swal.fire("Upload Error", error?.message || "Cloud asset synchronization failed.", "error");
            } finally {
                setUploading(false);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (checked === true) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!product.title || product.title.length < 3)
            return Swal.fire("Validation Error", "Title should have at least 3 characters!", "warning");
        if (product.desc.length < 10)
            return Swal.fire("Validation Error", "Description should have at least 10 characters!", "warning");
        if (product.size.length === 0)
            return Swal.fire("Validation Error", "Please select at least one available size.", "warning");
        if (product.color.length === 0)
            return Swal.fire("Validation Error", "Please select at least one available color.", "warning");
        if (!product.price || Number(product.price) <= 0)
            return Swal.fire("Validation Error", "Please enter a valid product price.", "warning");

        setLoading(true);
        try {
            // Build a clean payload without MongoDB internals
            const payload = {
                title: product.title,
                desc: product.desc,
                image: product.image,
                category: product.category,
                subCategory: product.subCategory,
                occasion: product.occasion,
                session: product.session,
                price: Number(product.price),
                brand: product.brand,
                size: product.size,
                color: product.color,
                inStack: product.inStack,
            };

            const result = await dispatch(updateAdminProduct(id, payload));

            if (result && result.success) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Product info is updated successfully!",
                    showConfirmButton: false,
                    timer: 2500,
                });
                navigate("/admin/products");
            } else {
                const errMsg = result?.error?.response?.data?.message
                    || result?.error?.message
                    || "Failed to update catalog item. Please try again.";
                Swal.fire("Update Failed", errMsg, "error");
            }
        } catch (err) {
            console.error("EditProduct handleSubmit error:", err);
            Swal.fire("Error", "An unexpected error occurred. Please try again.", "error");
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
            <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#FBFCFF] font-['Outfit']">
                <div className="w-20 h-20 border-[6px] border-indigo-50 border-t-indigo-500 rounded-full animate-spin shadow-2xl shadow-indigo-100"></div>
                <div className="text-center space-y-2">
                    <p className="text-indigo-900 font-black uppercase tracking-[6px] text-xs">
                        Synchronizing
                    </p>
                    <p className="text-gray-400 font-medium text-sm">Retrieving asset data from global vault...</p>
                </div>
            </div>
        );

    return (
        <div className="min-h-screen bg-[#FBFCFF] py-16 lg:px-24 md:px-16 px-8 font-['Outfit'] selection:bg-indigo-100 selection:text-indigo-900">
            {/* Header Section */}
            <div className="max-w-[1400px] mx-auto mb-16 space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div className="flex items-center gap-8">
                        <button
                            onClick={() => navigate("/admin/products")}
                            className="bg-white hover:bg-indigo-50 text-indigo-500 w-16 h-16 rounded-3xl flex items-center justify-center border border-indigo-50 transition-all shadow-[0_10px_30px_rgba(79,70,229,0.08)] active:scale-90 group"
                            title="Return to Catalog"
                        >
                            <FaArrowLeft className="text-xl group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <div className="space-y-1">
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black uppercase tracking-[4px] text-gray-400">Inventory Management</span>
                                <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                                <span className="text-[10px] font-black uppercase tracking-[4px] text-indigo-500">Edit Archive</span>
                            </div>
                            <h1 className="text-5xl font-black text-gray-900 tracking-tighter italic">
                                Update <span className="text-indigo-600">Product</span>
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white p-3 rounded-[32px] border border-indigo-50 shadow-sm px-6">
                        <div className={`w-3 h-3 rounded-full ${product.inStack ? "bg-emerald-500" : "bg-rose-500"} shadow-lg`}></div>
                        <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest leading-none">
                            Asset ID: <span className="text-indigo-600 ml-2 font-mono">{id?.slice(-8).toUpperCase()}</span>
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Panel: Visual Assets */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-white p-12 rounded-[56px] shadow-[0_50px_100px_rgba(0,0,0,0.03)] border border-indigo-50/50 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/30 rounded-full -mr-32 -mt-32 blur-3xl transition-all group-hover:bg-indigo-100/40"></div>
                        
                        <div className="relative z-10">
                            <h4 className="text-[11px] font-black text-indigo-400 uppercase tracking-[4px] mb-8">Asset Visualization</h4>
                            
                            <div className="relative aspect-[4/5] rounded-[44px] overflow-hidden bg-slate-50 border-2 border-dashed border-indigo-50 group/image group-hover:border-indigo-200 transition-all shadow-inner">
                                {uploading && (
                                    <div className="absolute inset-0 z-20 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center gap-6">
                                        <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                                        <p className="text-[10px] font-black text-indigo-900 uppercase tracking-[4px]">Syncing Image</p>
                                    </div>
                                )}

                                {product.image ? (
                                    <>
                                        <img
                                            src={product.image}
                                            className="w-full h-full object-cover transition-all duration-1000 group-hover/image:scale-110"
                                            alt="Preview"
                                        />
                                        <div className="absolute inset-0 bg-indigo-950/40 opacity-0 group-hover/image:opacity-100 transition-all duration-500 flex items-center justify-center gap-5 backdrop-blur-[2px]">
                                            <label className="w-14 h-14 bg-white text-indigo-600 rounded-2xl flex items-center justify-center text-xl cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-2xl hover:bg-indigo-600 hover:text-white">
                                                <FaCloudArrowUp />
                                                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => setProduct((p) => ({ ...p, image: "" }))}
                                                className="w-14 h-14 bg-white/20 backdrop-blur-xl border border-white/30 text-white rounded-2xl flex items-center justify-center text-xl hover:bg-rose-600 hover:border-rose-500 transition-all shadow-2xl"
                                            >
                                                <FaXmark />
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <label className="flex flex-col items-center justify-center h-full cursor-pointer group/label">
                                        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-indigo-500 shadow-xl group-hover/label:scale-110 group-hover/label:-rotate-12 transition-all">
                                            <FaCloudArrowUp className="text-3xl" />
                                        </div>
                                        <div className="mt-8 text-center px-8">
                                            <p className="text-sm font-black text-slate-800 uppercase tracking-widest italic">New Asset</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-1">High-Res PNG or JPG</p>
                                        </div>
                                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                    </label>
                                )}
                            </div>

                            <div className="mt-12 p-8 bg-indigo-50/40 rounded-[36px] border border-indigo-100/50 border-dashed">
                                <div className="flex items-center justify-between">
                                    <label htmlFor="inStack" className="cursor-pointer">
                                        <p className="text-[11px] font-black text-slate-900 uppercase tracking-[4px]">Inventory</p>
                                        <p className={`text-[10px] font-bold uppercase mt-1 tracking-tight ${product.inStack ? "text-emerald-600" : "text-rose-500"}`}>
                                            {product.inStack ? "Available in store ●" : "Archived / Hidden"}
                                        </p>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            name="inStack"
                                            id="inStack"
                                            checked={product.inStack === true || product.inStack === "true"}
                                            onChange={handleInputChange}
                                            className="peer h-8 w-14 cursor-pointer appearance-none rounded-full bg-slate-200 transition-colors checked:bg-indigo-600"
                                        />
                                        <div className="pointer-events-none absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition-all peer-checked:translate-x-6"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Form hub */}
                <div className="lg:col-span-8 space-y-12">
                    <div className="bg-white p-14 rounded-[72px] shadow-[0_50px_100px_rgba(0,0,0,0.03)] border border-indigo-50/50 space-y-16 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-50/20 rounded-full -mr-48 -mt-48 blur-3xl opacity-50"></div>
                        
                        {/* Section: Core DNA */}
                        <section className="space-y-12 relative z-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-5">
                                    <div className="w-2 h-8 bg-indigo-600 rounded-full"></div>
                                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-[6px] italic">Identity</h3>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                <div className="md:col-span-2 space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[5px] block">Product Title</label>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            name="title"
                                            value={product.title}
                                            onChange={handleInputChange}
                                            className="w-full h-20 px-10 bg-slate-50 border-2 border-transparent rounded-[32px] outline-none text-slate-900 text-xl font-bold focus:bg-white focus:border-indigo-100 transition-all placeholder:text-slate-300"
                                            placeholder="e.g. Signature Silk Bomber"
                                            required
                                        />
                                        <MdTipsAndUpdates className="absolute right-10 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within:text-indigo-500 text-2xl transition-all" />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[5px] block">Gender Sector</label>
                                    <div className="relative">
                                        <select
                                            name="category"
                                            value={product.category}
                                            onChange={handleInputChange}
                                            className="w-full h-20 px-10 bg-slate-50 border-2 border-transparent rounded-[32px] outline-none text-slate-900 font-black uppercase text-[12px] tracking-[3px] appearance-none focus:bg-white focus:border-indigo-100 transition-all cursor-pointer"
                                            required
                                        >
                                            <option value="">Choose Domain</option>
                                            <option value="Men">Men / collective</option>
                                            <option value="Women">Women / Studio</option>
                                            <option value="Kids">Kids / Heritage</option>
                                        </select>
                                        <FaAngleDown className="absolute right-10 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[5px] block">Global Classification</label>
                                    <div className="relative">
                                        <select
                                            name="subCategory"
                                            value={product.subCategory}
                                            onChange={handleInputChange}
                                            className="w-full h-20 px-10 bg-slate-50 border-2 border-transparent rounded-[32px] outline-none text-slate-900 font-black uppercase text-[12px] tracking-[3px] appearance-none focus:bg-white focus:border-indigo-100 transition-all cursor-pointer"
                                            required
                                        >
                                            <option value="">Choose Architype</option>
                                            {["Cap", "Coat", "Hudi", "Jacket", "Pant", "Shirt", "Shorts", "Suit", "Tshirt", "Frog", "Plazzo", "Bardot", "Formal", "Top", "Skirt", "TopSkirtSet", "TopPantSet", "TshirtPantSet", "WinterDressSet", "Other"].map((s) => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                        <FaAngleDown className="absolute right-10 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section: Market Values */}
                        <section className="space-y-12 relative z-10">
                            <div className="flex items-center gap-5">
                                <div className="w-2 h-8 bg-emerald-500 rounded-full"></div>
                                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-[6px] italic">Market Value</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[5px] block">Currency Valuation</label>
                                    <div className="relative">
                                        <span className="absolute left-10 top-1/2 -translate-y-1/2 text-emerald-600 font-black text-2xl">$</span>
                                        <input
                                            type="number"
                                            name="price"
                                            value={product.price}
                                            onChange={handleInputChange}
                                            className="w-full h-20 pl-16 pr-10 bg-slate-50 border-2 border-transparent rounded-[32px] outline-none text-slate-900 font-black text-3xl focus:bg-white focus:border-emerald-100 transition-all italic"
                                            placeholder="0.00"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[5px] block">Heritage Brand</label>
                                    <div className="relative">
                                        <select
                                            name="brand"
                                            value={product.brand}
                                            onChange={handleInputChange}
                                            className="w-full h-20 px-10 bg-slate-50 border-2 border-transparent rounded-[32px] outline-none text-slate-900 font-black uppercase text-[12px] tracking-[3px] appearance-none focus:bg-white focus:border-indigo-100 transition-all cursor-pointer"
                                            required
                                        >
                                            <option value="">Select Lineage</option>
                                            {["Zara", "Levls", "Gucci", "OshkoshBgosh", "PoloRalphLauren", "Nordstorm", "H&M", "BossHugoBoss", "Gymboree", "MiniBoden", "Carters", "Tea", "UniQlo", "TheChildrensPlace", "TommyHilfighter", "JCrew", "Other"].map((b) => (
                                                <option key={b} value={b}>{b}</option>
                                            ))}
                                        </select>
                                        <FaAngleDown className="absolute right-10 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Chromatic Spectrum */}
                                <div className="space-y-4 relative">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[5px] block">Spectrum</label>
                                    <button
                                        type="button"
                                        onClick={() => setColorDropdownVisible(!colorDropdownVisible)}
                                        className={`w-full h-20 px-8 bg-slate-50 border-2 rounded-[32px] flex items-center justify-between transition-all outline-none ${colorDropdownVisible ? "border-indigo-100 bg-white" : "border-transparent"}`}
                                    >
                                        <div className="flex -space-x-3">
                                            {product.color.length > 0 ? (
                                                product.color.slice(0, 6).map((c) => (
                                                    <div key={c.colorName} style={{ backgroundColor: c.colorValue }} className="w-10 h-10 rounded-2xl border-4 border-white shadow-md"></div>
                                                ))
                                            ) : (
                                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none">Choose Spectrum</span>
                                            )}
                                        </div>
                                        <FaAngleDown className={`text-indigo-400 transition-transform duration-500 ${colorDropdownVisible ? "rotate-180" : ""}`} />
                                    </button>

                                    {colorDropdownVisible && (
                                        <div className="absolute z-50 top-full mt-6 left-0 w-[400px] bg-white border border-indigo-50 shadow-[0_40px_100px_rgba(0,0,0,0.1)] rounded-[48px] p-10 animate-in fade-in zoom-in-95 duration-300">
                                            <div className="relative mb-6">
                                                <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-indigo-300" />
                                                <input
                                                    type="text"
                                                    placeholder="Search Spectrum..."
                                                    className="w-full h-14 pl-14 pr-8 bg-slate-50 rounded-2xl outline-none font-black text-[10px] uppercase text-indigo-900 border border-transparent focus:border-indigo-100"
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 gap-6 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                                                {filteredColorOptions.map((opt) => (
                                                    <button
                                                        key={opt.id}
                                                        type="button"
                                                        onClick={() => toggleColor(opt)}
                                                        className={`flex flex-col items-center gap-2 transition-all group ${product.color.some((c) => c.colorName === opt.colorName) ? "scale-105" : "opacity-40 hover:opacity-100"}`}
                                                    >
                                                        <div className={`w-12 h-12 rounded-2xl p-1 ${product.color.some((c) => c.colorName === opt.colorName) ? "ring-2 ring-indigo-500 ring-offset-2" : ""}`}>
                                                            <div style={{ backgroundColor: opt.colorValue }} className="w-full h-full rounded-xl shadow-inner border border-black/5"></div>
                                                        </div>
                                                        <span className="text-[8px] font-black uppercase text-slate-400 group-hover:text-indigo-600 truncate w-full text-center tracking-tighter">
                                                            {opt.colorName}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Volume Matrix */}
                                <div className="space-y-4 relative">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[5px] block">Volume Matrix</label>
                                    <button
                                        type="button"
                                        onClick={() => setSizeDropdownVisible(!sizeDropdownVisible)}
                                        className={`w-full h-20 px-8 bg-slate-50 border-2 rounded-[32px] flex items-center justify-between transition-all outline-none ${sizeDropdownVisible ? "border-indigo-100 bg-white" : "border-transparent"}`}
                                    >
                                        <div className="flex gap-3">
                                            {product.size.length > 0 ? (
                                                product.size.map((s) => (
                                                    <span key={s} className="px-4 py-2 bg-indigo-950 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">{s}</span>
                                                ))
                                            ) : (
                                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Select Sizes</span>
                                            )}
                                        </div>
                                        <FaAngleDown className={`text-indigo-400 transition-transform duration-500 ${sizeDropdownVisible ? "rotate-180" : ""}`} />
                                    </button>

                                    {sizeDropdownVisible && (
                                        <div className="absolute z-40 top-full mt-6 left-0 w-full bg-white border border-indigo-50 shadow-[0_40px_100px_rgba(0,0,0,0.1)] rounded-[48px] p-8 flex flex-wrap gap-4 animate-in fade-in zoom-in-95 duration-300">
                                            {sizeOptions.map((size) => (
                                                <button
                                                    key={size}
                                                    type="button"
                                                    onClick={() => toggleSize(size)}
                                                    className={`flex-1 min-w-[100px] h-14 flex items-center justify-center rounded-2xl border-2 transition-all font-black text-[11px] tracking-widest ${product.size.includes(size) ? "bg-indigo-600 border-indigo-600 text-white shadow-lg -translate-y-1" : "bg-slate-50 border-transparent text-slate-400 hover:bg-white hover:border-indigo-100 hover:text-indigo-600"}`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* Section: Narrative */}
                        <section className="space-y-10 relative z-10">
                            <div className="flex items-center gap-5">
                                <div className="w-2 h-8 bg-slate-900 rounded-full"></div>
                                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-[6px] italic">Narrative</h3>
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[5px] block italic">Public Exposition</label>
                                <textarea
                                    name="desc"
                                    value={product.desc}
                                    onChange={handleInputChange}
                                    className="w-full p-12 bg-slate-50 border-2 border-transparent rounded-[48px] outline-none text-slate-900 font-medium text-lg min-h-[300px] focus:bg-white focus:border-indigo-100 transition-all leading-relaxed shadow-inner italic"
                                    placeholder="Describe the silhouette, materials, and artisan craftsmanship..."
                                    required
                                />
                            </div>
                        </section>

                        <div className="pt-16 border-t border-slate-50 flex justify-center">
                            <button
                                type="submit"
                                disabled={loading || uploading}
                                className="h-24 px-20 bg-indigo-600 text-white rounded-[40px] font-black uppercase tracking-[10px] text-[13px] hover:bg-black hover:shadow-2xl active:scale-95 transition-all flex items-center gap-8 disabled:opacity-50 group"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Saving</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Update Asset</span>
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


