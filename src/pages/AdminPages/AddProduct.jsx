/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import app from "../../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { createAdminProduct } from "../../redux/api/adminCalls";
import {
  FaAngleDown,
  FaAngleUp,
  FaCircleCheck,
  FaCloudArrowUp,
  FaXmark,
  FaPlus,
} from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  MdTipsAndUpdates,
  MdOutlineCategory,
  MdOutlinePriceChange,
  MdOutlineDescription,
} from "react-icons/md";
import Swal from "sweetalert2";
import { FaPlusCircle } from "react-icons/fa";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState("");
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
  const [error, setError] = useState("");

  // Handle image upload
  const handleImageChange = async (e) => {
    if (e?.target?.files && e?.target?.files[0]) {
      const imageFile = e?.target?.files[0];
      try {
        setUploading(true);
        const storage = getStorage(app);
        const storageRef = ref(
          storage,
          "images/" + Date.now() + "_" + imageFile.name,
        );
        await uploadBytes(storageRef, imageFile);
        const downloadURL = await getDownloadURL(storageRef);

        setImage(downloadURL);
        setNewProduct((prev) => ({
          ...prev,
          image: downloadURL,
        }));
      } catch (error) {
        console.error("Error uploading image: ", error);
        Swal.fire("Error", "Cloud asset synchronization failed.", "error");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (newProduct?.title?.length < 3) {
      Swal.fire(
        "Validation Error",
        "Title should have at least 3 characters!",
        "warning",
      );
      setLoading(false);
      return;
    }
    if (newProduct?.title?.length > 80) {
      Swal.fire(
        "Validation Error",
        "Title should have a maximum of 80 characters!",
        "warning",
      );
      setLoading(false);
      return;
    }
    if (newProduct?.desc?.length < 10) {
      Swal.fire(
        "Validation Error",
        "Description should have at least 10 characters!",
        "warning",
      );
      setLoading(false);
      return;
    }
    if (newProduct?.color?.length === 0) {
      Swal.fire(
        "Validation Error",
        "Kindly select at least one available color!",
        "warning",
      );
      setLoading(false);
      return;
    }
    if (newProduct?.size?.length === 0) {
      Swal.fire(
        "Validation Error",
        "Kindly select at least one available size!",
        "warning",
      );
      setLoading(false);
      return;
    }
    if (newProduct?.price <= 0) {
      Swal.fire(
        "Validation Error",
        "Kindly enter product proper price!",
        "warning",
      );
      setLoading(false);
      return;
    }

    try {
      if (
        newProduct?.title &&
        newProduct?.desc &&
        image &&
        newProduct?.category &&
        newProduct?.subCategory &&
        newProduct?.occasion &&
        newProduct?.session &&
        newProduct?.size?.length > 0 &&
        newProduct?.color?.length > 0 &&
        newProduct?.price > 0 &&
        newProduct?.brand
      ) {
        const result = await dispatch(createAdminProduct(newProduct));
        if (result.success) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Product is added successfully!",
            showConfirmButton: false,
            timer: 3000,
          });
          navigate("/admin/products");
        } else {
          throw new Error("API Failure");
        }
      } else {
        Swal.fire(
          "Validation Error",
          "Kindly fill up the form correctly!",
          "warning",
        );
      }
    } catch (err) {
      console.error("Failed to create product:", err);
      setError("Failed to create product.");
      Swal.fire("Error", "Failed to deploy catalog item.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Color selection logic
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

  const [colorDropdownVisible, setColorDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleColorOptionToggle = (option) => {
    const isOptionSelected = newProduct.color.find(
      (c) => c?.colorName === option?.colorName,
    );
    let updatedSelectedColors;
    if (isOptionSelected) {
      updatedSelectedColors = newProduct.color.filter(
        (c) => c?.colorName !== option?.colorName,
      );
    } else {
      updatedSelectedColors = [
        ...newProduct.color,
        { colorName: option.colorName, colorValue: option.colorValue },
      ];
    }
    setNewProduct((prev) => ({ ...prev, color: updatedSelectedColors }));
  };

  const filteredColorOptions = colorOptions.filter((option) =>
    option?.colorName?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Size selection logic
  const [sizeOptions] = useState(["XS", "S", "M", "L", "XL", "2XL"]);
  const [sizeDropdownVisible, setSizeDropdownVisible] = useState(false);

  const handleSizeOptionToggle = (size) => {
    const isOptionSelected = newProduct.size.includes(size);
    let updatedSelectedSizes;
    if (isOptionSelected) {
      updatedSelectedSizes = newProduct.size.filter((s) => s !== size);
    } else {
      updatedSelectedSizes = [...newProduct.size, size];
    }
    setNewProduct((prev) => ({ ...prev, size: updatedSelectedSizes }));
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] py-12 lg:px-20 md:px-12 px-6 font-['Outfit']">
      {/* Elegant Header */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full">
            <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-[2px] text-indigo-600">
              Admin Inventory Portal
            </span>
          </div>
          <h1 className="text-5xl font-black text-gray-900 tracking-tighter italic">
            Create <span className="text-indigo-600">Product</span>
          </h1>
          <p className="text-gray-400 font-medium tracking-tight">
            Expand the global fashion registry with new high-end assets.
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/products")}
          className="px-8 py-4 bg-white border border-gray-100 text-gray-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm active:scale-95"
        >
          Discard Changes
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-12 gap-10"
      >
        {/* Visual Asset Management Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-gray-50 sticky top-10">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              Product Visuals
              <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
            </p>

            <div className="relative group transition-all duration-500 overflow-hidden rounded-[32px] aspect-[4/5] bg-gray-50/50 border-2 border-dashed border-indigo-100 flex flex-col items-center justify-center hover:border-indigo-400 hover:bg-indigo-50/20">
              {uploading && (
                <div className="absolute inset-0 z-20 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center gap-4 animate-in fade-in duration-300">
                  <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                  <p className="text-[10px] font-black text-indigo-800 uppercase animate-pulse">
                    Syncing Cloud Assets...
                  </p>
                </div>
              )}

              {image ? (
                <>
                  <img
                    src={image}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="Preview"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 z-10">
                    <label className="p-4 bg-white text-indigo-600 rounded-2xl shadow-xl cursor-pointer hover:bg-indigo-600 hover:text-white transition-all transform hover:-translate-y-1">
                      <FaPlus />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setImage("");
                        setNewProduct((p) => ({ ...p, image: "" }));
                      }}
                      className="p-4 bg-white text-rose-600 rounded-2xl shadow-xl hover:bg-rose-600 hover:text-white transition-all transform hover:-translate-y-1"
                    >
                      <FaXmark />
                    </button>
                  </div>
                </>
              ) : (
                <label className="flex flex-col items-center gap-6 cursor-pointer group/label p-8">
                  <div className="w-20 h-20 bg-white shadow-[0_10px_30px_rgba(79,70,229,0.1)] rounded-[30px] flex items-center justify-center transition-transform group-hover/label:rotate-12">
                    <FaCloudArrowUp className="text-3xl text-indigo-500" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-black text-gray-900 uppercase tracking-widest mb-1 italic">
                      Click to Upload
                    </p>
                    <p className="text-[10px] text-gray-400 font-medium">
                      PNG, JPG or WebP (Max 10MB)
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
            <div className="mt-8 p-6 bg-indigo-900 rounded-[30px] shadow-[0_20px_40px_rgba(30,27,75,0.2)] text-white relative overflow-hidden group">
              <div className="relative z-10 flex items-start gap-4">
                <div className="w-10 h-10 bg-indigo-500/30 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0">
                  <FaCircleCheck className="text-indigo-200" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200 mb-1">
                    Administrative Node
                  </p>
                  <p className="text-[11px] leading-relaxed font-medium opacity-80 italic">
                    Verified administrative uploads are prioritized across
                    global edge networks for lower latency.
                  </p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
            </div>
          </div>
        </div>

        {/* Main Configuration Hub */}
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-white p-12 rounded-[56px] shadow-[0_30px_60px_rgba(0,0,0,0.03)] border border-gray-50 space-y-12">
            {/* Section: Core Information */}
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-widest italic">
                  Core Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="md:col-span-2 relative group">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[3px] mb-4 block">
                    Product Title
                  </label>
                  <input
                    className="w-full h-16 px-8 bg-gray-50/50 border border-gray-100 rounded-[24px] outline-none text-gray-900 font-bold focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all placeholder:text-gray-300"
                    type="text"
                    name="title"
                    value={newProduct?.title}
                    onChange={handleInputChange}
                    placeholder="e.g. Midnight Onyx Blouson Jacket"
                    required
                  />
                  <MdTipsAndUpdates className="absolute right-8 top-[52px] text-gray-200 group-focus-within:text-indigo-600 text-xl transition-colors" />
                </div>

                <div className="group">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[3px] mb-4 block flex items-center gap-2">
                    Primary Category{" "}
                    <MdOutlineCategory className="text-gray-300" />
                  </label>
                  <div className="relative">
                    <select
                      className="w-full h-16 px-8 bg-gray-50/50 border border-gray-100 rounded-[24px] outline-none text-gray-900 font-black uppercase text-[11px] tracking-widest appearance-none focus:ring-4 focus:ring-indigo-100 transition-all cursor-pointer"
                      name="category"
                      value={newProduct?.category || ""}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Men">Men / Collective</option>
                      <option value="Women">Women / Studio</option>
                      <option value="Kids">Kids / Heritage</option>
                    </select>
                    <FaAngleDown className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none group-focus-within:rotate-180 transition-transform" />
                  </div>
                </div>

                <div className="group">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[3px] mb-4 block">
                    Archive Classification
                  </label>
                  <div className="relative">
                    <select
                      className="w-full h-16 px-8 bg-gray-50/50 border border-gray-100 rounded-[24px] outline-none text-gray-900 font-black uppercase text-[11px] tracking-widest appearance-none focus:ring-4 focus:ring-indigo-100 transition-all cursor-pointer"
                      name="subCategory"
                      value={newProduct?.subCategory || ""}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Sub-Category</option>
                      {[
                        "Cap",
                        "Coat",
                        "Hudi",
                        "Jacket",
                        "Pant",
                        "Shirt",
                        "Shorts",
                        "Suit",
                        "Tshirt",
                        "Frog",
                        "Plazzo",
                        "Bardot",
                        "Formal",
                        "Top",
                        "Skirt",
                        "TopSkirtSet",
                        "TopPantSet",
                        "TshirtPantSet",
                        "WinterDressSet",
                        "Other",
                      ].map((sub) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </select>
                    <FaAngleDown className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                  </div>
                </div>
              </div>
            </section>

            {/* Section: Logic & Pricing */}
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-widest italic">
                  Market Logic
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="group relative">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[3px] mb-4 block flex items-center gap-2">
                    Asset Valuation{" "}
                    <MdOutlinePriceChange className="text-gray-300" />
                  </label>
                  <div className="relative">
                    <span className="absolute left-8 top-1/2 -translate-y-1/2 text-emerald-600 font-black text-lg">
                      $
                    </span>
                    <input
                      className="w-full h-16 pl-14 pr-8 bg-gray-50/50 border border-gray-100 rounded-[24px] outline-none text-gray-900 font-black italic text-xl focus:ring-4 focus:ring-emerald-50/50 focus:border-emerald-400 transition-all"
                      type="number"
                      name="price"
                      value={newProduct?.price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[3px] mb-4 block">
                    Brand Lineage
                  </label>
                  <div className="relative">
                    <select
                      className="w-full h-16 px-8 bg-gray-50/50 border border-gray-100 rounded-[24px] outline-none text-gray-900 font-black uppercase text-[11px] tracking-widest appearance-none focus:ring-4 focus:ring-indigo-100 transition-all cursor-pointer"
                      name="brand"
                      value={newProduct?.brand || ""}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Brand</option>
                      {[
                        "Zara",
                        "Levls",
                        "Gucci",
                        "OshkoshBgosh",
                        "PoloRalphLauren",
                        "Nordstorm",
                        "H&M",
                        "BossHugoBoss",
                        "Gymboree",
                        "MiniBoden",
                        "Carters",
                        "Tea",
                        "UniQlo",
                        "TheChildrensPlace",
                        "TommyHilfighter",
                        "JCrew",
                        "Other",
                      ].map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                    <FaAngleDown className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                  </div>
                </div>

                <div className="relative group">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[3px] mb-4 block italic">
                    Color Swatches
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setColorDropdownVisible(!colorDropdownVisible)
                    }
                    className="w-full h-16 px-6 bg-gray-50/50 border border-gray-100 rounded-2xl flex items-center justify-between group transition-all hover:bg-white hover:shadow-lg outline-none"
                  >
                    <div className="flex -space-x-2">
                      {newProduct.color.length > 0 ? (
                        newProduct.color
                          .slice(0, 5)
                          .map((c) => (
                            <div
                              key={c.colorName}
                              style={{ backgroundColor: c.colorValue }}
                              className="w-7 h-7 rounded-lg border-2 border-white shadow-sm transition-transform group-hover:scale-110"
                            ></div>
                          ))
                      ) : (
                        <span className="text-[10px] font-black uppercase text-gray-300 tracking-[1px]">
                          Empty Spectrum
                        </span>
                      )}
                    </div>
                    {colorDropdownVisible ? <FaAngleUp /> : <FaAngleDown />}
                  </button>

                  {colorDropdownVisible && (
                    <div className="absolute z-50 top-full mt-4 left-0 w-full bg-white border border-indigo-50 shadow-[0_30px_70px_rgba(0,0,0,0.15)] rounded-[32px] p-8 animate-in zoom-in-95 duration-300 origin-top">
                      <input
                        type="text"
                        placeholder="Search Swatches..."
                        className="w-full h-12 px-6 mb-6 bg-gray-50 rounded-xl outline-none font-bold text-xs uppercase text-gray-400 placeholder:text-gray-300 italic"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                        {filteredColorOptions.map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => handleColorOptionToggle(opt)}
                            className={`flex flex-col items-center gap-2 group/swatch focus:outline-none`}
                          >
                            <div
                              className={`w-10 h-10 rounded-xl transition-all duration-300 p-1 ${newProduct.color.some((c) => c.colorName === opt.colorName) ? "ring-2 ring-indigo-500 ring-offset-2" : ""}`}
                            >
                              <div
                                style={{ backgroundColor: opt.colorValue }}
                                className="w-full h-full rounded-lg shadow-inner"
                              ></div>
                            </div>
                            <span className="text-[8px] font-black uppercase tracking-widest text-gray-400 group-hover/swatch:text-gray-900">
                              {opt.colorName}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative group">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[3px] mb-4 block italic">
                    Size Matrix
                  </label>
                  <button
                    type="button"
                    onClick={() => setSizeDropdownVisible(!sizeDropdownVisible)}
                    className="w-full h-16 px-6 bg-gray-50/50 border border-gray-100 rounded-2xl flex items-center justify-between hover:bg-white hover:shadow-lg transition-all outline-none"
                  >
                    <div className="flex gap-2">
                      {newProduct.size.length > 0 ? (
                        newProduct.size.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-1 bg-gray-900 text-white rounded-lg text-[8px] font-black uppercase"
                          >
                            {s}
                          </span>
                        ))
                      ) : (
                        <span className="text-[10px] font-black uppercase text-gray-300 tracking-[1px]">
                          None Selected
                        </span>
                      )}
                    </div>
                    {sizeDropdownVisible ? <FaAngleUp /> : <FaAngleDown />}
                  </button>

                  {sizeDropdownVisible && (
                    <div className="absolute z-50 top-full mt-4 left-0 w-full bg-white border border-indigo-50 shadow-[0_30px_70px_rgba(0,0,0,0.15)] rounded-[32px] p-8 animate-in zoom-in-95 duration-300 origin-top grid grid-cols-3 sm:grid-cols-6 gap-4">
                      {sizeOptions.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => handleSizeOptionToggle(size)}
                          className={`h-12 flex items-center justify-center rounded-xl border-2 transition-all font-black text-[10px] ${newProduct.size.includes(size) ? "bg-indigo-600 text-white border-indigo-600 shadow-xl shadow-indigo-100" : "bg-gray-50 border-transparent text-gray-400 hover:border-indigo-200"}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>

            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-6 bg-rose-500 rounded-full"></div>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-widest italic">
                  Temporal Scope
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="group">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[3px] mb-4 block">
                    Occasion Context
                  </label>
                  <div className="relative">
                    <select
                      className="w-full h-16 px-8 bg-gray-50/50 border border-gray-100 rounded-[24px] outline-none text-gray-900 font-black uppercase text-[11px] appearance-none focus:ring-4 focus:ring-rose-50 cursor-pointer"
                      name="occasion"
                      value={newProduct?.occasion || ""}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Setting</option>
                      {["Formal", "Casual", "Party", "Wedding", "Other"].map(
                        (oc) => (
                          <option key={oc} value={oc}>
                            {oc}
                          </option>
                        ),
                      )}
                    </select>
                    <FaAngleDown className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                  </div>
                </div>
                <div className="group">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[3px] mb-4 block">
                    Seasonal Target
                  </label>
                  <div className="relative">
                    <select
                      className="w-full h-16 px-8 bg-gray-50/50 border border-gray-100 rounded-[24px] outline-none text-gray-900 font-black uppercase text-[11px] appearance-none focus:ring-4 focus:ring-rose-50 cursor-pointer"
                      name="session"
                      value={newProduct?.session || ""}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Season</option>
                      {["Summer", "Rainy", "Autumn", "Winter", "Other"].map(
                        (se) => (
                          <option key={se} value={se}>
                            {se}
                          </option>
                        ),
                      )}
                    </select>
                    <FaAngleDown className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-6 bg-gray-900 rounded-full"></div>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-widest italic flex items-center gap-3">
                  Editorial Narrative{" "}
                  <MdOutlineDescription className="text-gray-300" />
                </h3>
              </div>
              <textarea
                className="w-full p-10 bg-gray-50/50 border border-gray-100 rounded-[40px] outline-none text-gray-900 font-medium text-lg min-h-[220px] focus:ring-4 focus:ring-gray-100 placeholder:text-gray-200 transition-all leading-relaxed shadow-inner italic"
                name="desc"
                value={newProduct?.desc}
                onChange={handleInputChange}
                placeholder="E.g., Meticulously crafted with a focus on silhouette and avant-garde craftsmanship..."
                required
              />
            </section>

            <div className="pt-8 border-t border-gray-50 flex items-center justify-between gap-6 flex-wrap">
              <button
                type="submit"
                disabled={loading || uploading}
                className="h-20 px-12 bg-indigo-600 text-white rounded-[32px] font-black uppercase tracking-[5px] text-[11px] hover:bg-black hover:shadow-2xl transition-all shadow-[0_20px_50px_rgba(79,70,229,0.2)] flex items-center gap-6 active:scale-95 disabled:opacity-50 group"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Adding New Product.....
                  </>
                ) : (
                  <>
                    Add Product
                    <FaPlusCircle className="text-xl group-hover:rotate-180 transition-transform duration-500" />
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

export default AddProduct;
