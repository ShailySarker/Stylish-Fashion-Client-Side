import { useState } from "react";
import app from "../../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { createAdminProduct } from "../../redux/api/adminCalls";
import { FaAngleDown, FaAngleUp, FaCloudArrowUp, FaCircleCheck } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";
import Swal from "sweetalert2";

const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [uploading, setUploading] = useState(false);
    const [image, setImage] = useState('');
    const [newProduct, setNewProduct] = useState({
        title: "",
        desc: "",
        image: "",
        category: "",
        subCategory: "",
        occasion: "",
        session: "",
        size: [],
        color: [],
        brand: "",
        price: "",
        inStack: true,
    });
    const [loading, setLoading] = useState(false);

    const handleImageChange = async (e) => {
        if (e?.target?.files && e?.target?.files[0]) {
            const imageFile = e?.target?.files[0];
            try {
                setUploading(true);
                const storage = getStorage(app);
                const storageRef = ref(storage, "products/" + Date.now() + "_" + imageFile.name);
                await uploadBytes(storageRef, imageFile);
                const downloadURL = await getDownloadURL(storageRef);
                setImage(downloadURL);
                setNewProduct((prev) => ({ ...prev, image: downloadURL }));
            } catch (error) {
                Swal.fire("Error", "Failed to upload image", "error");
            } finally {
                setUploading(false);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewProduct((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) return Swal.fire("Error", "Please upload a product image", "error");
        if (newProduct.size.length === 0) return Swal.fire("Error", "Please select at least one size", "error");
        if (newProduct.color.length === 0) return Swal.fire("Error", "Please select at least one color", "error");

        setLoading(true);
        try {
            const result = await dispatch(createAdminProduct({
                ...newProduct,
                price: Number(newProduct.price)
            }));

            if (result.success) {
                Swal.fire({
                    title: "Success",
                    text: "Product catalog entry synchronized.",
                    icon: "success",
                    confirmButtonColor: "#1e1b4b"
                });
                navigate('/admin/products');
            } else {
                throw new Error("Failed to create product");
            }
        } catch (err) {
            Swal.fire("Error", "Failed to add product. Please try again.", "error");
        } finally {
            setLoading(false);
        }
    };

    const [colorOptions] = useState([
        { id: '1', colorName: 'Red', colorValue: '#dc2626' },
        { id: '2', colorName: 'Green', colorValue: '#16a34a' },
        { id: '3', colorName: 'Blue', colorValue: '#1d4ed8' },
        { id: '4', colorName: 'Pink', colorValue: '#db2777' },
        { id: '5', colorName: 'Purple', colorValue: '#9333ea' },
        { id: '6', colorName: 'Black', colorValue: '#000000' },
        { id: '7', colorName: 'White', colorValue: '#ffffff' },
        { id: '10', colorName: 'Gray', colorValue: '#9ca3af' },
    ]);
    const [sizeOptions] = useState(['XS', 'S', 'M', 'L', 'XL', '2XL']);
    const [colorDropdownVisible, setColorDropdownVisible] = useState(false);
    const [sizeDropdownVisible, setSizeDropdownVisible] = useState(false);

    const toggleColor = (option) => {
        const exists = newProduct.color.find(c => c.colorName === option.colorName);
        const updatedColors = exists
            ? newProduct.color.filter(c => c.colorName !== option.colorName)
            : [...newProduct.color, { colorName: option.colorName, colorValue: option.colorValue }];
        setNewProduct(prev => ({ ...prev, color: updatedColors }));
    };

    const toggleSize = (size) => {
        const exists = newProduct.size.includes(size);
        const updatedSizes = exists
            ? newProduct.size.filter(s => s !== size)
            : [...newProduct.size, size];
        setNewProduct(prev => ({ ...prev, size: updatedSizes }));
    };

    return (
        <div className="lg:px-20 md:px-12 px-6 py-10 min-h-screen bg-gray-50/50">
            <div className="mb-10 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tighter italic">Create Catalog Entry</h1>
                    <p className="text-gray-400 font-bold mt-2 uppercase text-xs tracking-[4px]">New Object Instance</p>
                </div>
                <button
                    onClick={() => navigate('/admin/products')}
                    className="px-6 py-2.5 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-gray-50 transition-all"
                >
                    Cancel Creation
                </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Visual Asset Initialization */}
                <div className="lg:col-span-4">
                    <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 sticky top-10">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Visual Assets</p>
                        <div className="relative group overflow-hidden rounded-[32px] aspect-[3/4] bg-gray-50 border-2 border-dashed border-purple-100 flex flex-col items-center justify-center transition-all hover:border-purple-300">
                            {uploading ? (
                                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center gap-3">
                                    <div className="w-8 h-8 border-2 border-purple-100 border-t-purple-600 rounded-full animate-spin"></div>
                                    <p className="text-[9px] font-black text-purple-800 uppercase animate-pulse">Uploading to Cloud...</p>
                                </div>
                            ) : null}

                            {image ? (
                                <img src={image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Preview" />
                            ) : (
                                <div className="text-center p-8">
                                    <div className="w-20 h-20 bg-purple-50 rounded-[24px] flex items-center justify-center mx-auto mb-6 shadow-sm shadow-purple-200">
                                        <MdAddShoppingCart className="text-4xl text-purple-600" />
                                    </div>
                                    <p className="text-sm font-black text-gray-900 uppercase tracking-widest">Asset Required</p>
                                    <p className="text-[10px] text-gray-400 font-bold mt-2 uppercase">Click to browse locale</p>
                                </div>
                            )}

                            <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />

                            {image && (
                                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform flex flex-col gap-3">
                                    <p className="text-[10px] py-3 bg-white text-gray-900 rounded-2xl font-black uppercase text-center">Replace Visual</p>
                                </div>
                            )}
                        </div>
                        <div className="mt-6 p-4 bg-purple-50 rounded-2xl border border-purple-100 flex items-start gap-3">
                            <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-purple-600 shrink-0 shadow-sm">
                                <FaCircleCheck />
                            </div>
                            <p className="text-[10px] font-bold text-purple-800/70 leading-relaxed italic">Catalogue entries are indexed in real-time. Please ensure all mandatory fields are validated before submission.</p>
                        </div>
                    </div>
                </div>

                {/* Formal Specifications */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="bg-white p-10 rounded-[48px] shadow-sm border border-gray-100 space-y-10">
                        <section>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-8 border-b border-gray-50 pb-4">Core Metadata</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="md:col-span-2">
                                    <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-3 block">Product Label</label>
                                    <input
                                        type="text"
                                        name="title"
                                        required
                                        value={newProduct.title}
                                        onChange={handleInputChange}
                                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 text-gray-900 font-extrabold focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all placeholder:text-gray-300"
                                        placeholder="e.g. Signature Arctic Parka..."
                                    />
                                </div>

                                <div>
                                    <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-3 block">Category</label>
                                    <div className="relative">
                                        <select
                                            name="category"
                                            required
                                            value={newProduct.category}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 text-gray-900 font-black uppercase text-xs appearance-none outline-none focus:ring-2 focus:ring-purple-500/20"
                                        >
                                            <option value="">Select Category</option>
                                            <option value="Men">Men</option>
                                            <option value="Women">Women</option>
                                            <option value="Kids">Kids</option>
                                        </select>
                                        <FaAngleDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-3 block">Segment</label>
                                    <div className="relative">
                                        <select
                                            name="subCategory"
                                            required
                                            value={newProduct.subCategory}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 text-gray-900 font-black uppercase text-xs appearance-none outline-none focus:ring-2 focus:ring-purple-500/20"
                                        >
                                            <option value="">Select Segment</option>
                                            <option value="Tshirt">Tshirt</option>
                                            <option value="Shirt">Shirt</option>
                                            <option value="Pant">Pant</option>
                                            <option value="Jacket">Jacket</option>
                                            <option value="Dress">Dress</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <FaAngleDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-8 border-b border-gray-50 pb-4">Price & Parameters</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-3 block">Market Value ($)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        required
                                        value={newProduct.price}
                                        onChange={handleInputChange}
                                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 text-gray-900 font-black italic text-lg outline-none focus:ring-2 focus:ring-emerald-500/20"
                                        placeholder="0.00"
                                    />
                                </div>

                                <div>
                                    <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-3 block">Brand House</label>
                                    <input
                                        type="text"
                                        name="brand"
                                        required
                                        value={newProduct.brand}
                                        onChange={handleInputChange}
                                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 text-gray-900 font-black uppercase text-xs outline-none focus:ring-2 focus:ring-purple-500/20"
                                        placeholder="Enter Brand"
                                    />
                                </div>

                                <div className="relative">
                                    <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-3 block">Color Spectrum</label>
                                    <div
                                        onClick={() => setColorDropdownVisible(!colorDropdownVisible)}
                                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 flex justify-between items-center cursor-pointer transition-all hover:bg-gray-100"
                                    >
                                        <div className="flex flex-wrap gap-2 text-[10px] font-black text-gray-400 uppercase">
                                            {newProduct.color.length > 0 ? newProduct.color.map(c => (
                                                <span key={c.colorName} className="w-5 h-5 rounded-lg border-2 border-white shadow-sm" style={{ backgroundColor: c.colorValue }}></span>
                                            )) : "Define Spectrum"}
                                        </div>
                                        {colorDropdownVisible ? <FaAngleUp /> : <FaAngleDown />}
                                    </div>
                                    {colorDropdownVisible && (
                                        <div className="absolute z-30 mt-4 w-full bg-white border border-gray-100 shadow-2xl rounded-3xl p-5 grid grid-cols-2 gap-3">
                                            {colorOptions.map(opt => (
                                                <div
                                                    key={opt.id}
                                                    onClick={() => toggleColor(opt)}
                                                    className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all ${newProduct.color.some(c => c.colorName === opt.colorName) ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' : 'bg-gray-50 hover:bg-gray-100'}`}
                                                >
                                                    <span className="w-4 h-4 rounded-md border border-white/20" style={{ backgroundColor: opt.colorValue }}></span>
                                                    <span className="text-[10px] font-black uppercase tracking-widest">{opt.colorName}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="relative">
                                    <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-3 block">Size Matrix</label>
                                    <div
                                        onClick={() => setSizeDropdownVisible(!sizeDropdownVisible)}
                                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 flex justify-between items-center cursor-pointer transition-all hover:bg-gray-100"
                                    >
                                        <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">{newProduct.size.length > 0 ? newProduct.size.join(' · ') : 'Assign Sizes'}</span>
                                        {sizeDropdownVisible ? <FaAngleUp /> : <FaAngleDown />}
                                    </div>
                                    {sizeDropdownVisible && (
                                        <div className="absolute z-30 mt-4 w-full bg-white border border-gray-100 shadow-2xl rounded-3xl p-5 grid grid-cols-3 gap-3">
                                            {sizeOptions.map(size => (
                                                <div
                                                    key={size}
                                                    onClick={() => toggleSize(size)}
                                                    className={`h-12 flex items-center justify-center rounded-2xl cursor-pointer border-2 font-black text-[10px] ${newProduct.size.includes(size) ? 'bg-gray-900 text-white border-gray-900 shadow-lg' : 'text-gray-400 border-gray-50 uppercase tracking-widest transition-all hover:border-gray-200'}`}
                                                >
                                                    {size}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>

                        <section>
                            <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-3 block">Full Editorial Content</label>
                            <textarea
                                name="desc"
                                required
                                rows="5"
                                value={newProduct.desc}
                                onChange={handleInputChange}
                                className="w-full px-6 py-4 rounded-[32px] bg-gray-50 border border-gray-100 text-gray-900 font-medium text-sm focus:ring-2 focus:ring-purple-500/20 outline-none resize-none leading-relaxed transition-all"
                                placeholder="Formal product description..."
                            ></textarea>
                        </section>

                        <div className="flex items-center gap-4 p-6 bg-gray-50/50 rounded-3xl border border-gray-100">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    name="inStack"
                                    id="inStack"
                                    checked={newProduct.inStack}
                                    onChange={handleInputChange}
                                    className="peer h-6 w-11 cursor-pointer appearance-none rounded-full bg-gray-200 transition-colors checked:bg-emerald-500"
                                />
                                <div className="pointer-events-none absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-all peer-checked:translate-x-5 shadow-sm"></div>
                            </div>
                            <div>
                                <label htmlFor="inStack" className="text-[11px] font-black text-gray-900 uppercase tracking-widest cursor-pointer block">Global Availability</label>
                                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Status: Ready for immediate marketplace deployment</p>
                            </div>
                        </div>

                        <div className="pt-10">
                            <button
                                type="submit"
                                disabled={loading || uploading}
                                className="w-full h-20 bg-gray-900 text-white rounded-[32px] font-black uppercase tracking-[5px] text-xs hover:bg-purple-800 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center justify-center gap-4 active:scale-[0.98] disabled:opacity-50"
                            >
                                {loading ? "Initializing..." : "Commit Creation to Catalog"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
