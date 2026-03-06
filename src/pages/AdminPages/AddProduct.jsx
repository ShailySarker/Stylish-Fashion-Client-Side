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
import { FaPlusCircle, FaSearch } from "react-icons/fa";

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
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50/50 border border-indigo-100/50 backdrop-blur-xl rounded-full">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.6)]"></span>
            <span className="text-[10px] font-black uppercase tracking-[3px] text-indigo-600/80">
              Admin Inventory Vault
            </span>
          </div>
          <h1 className="text-6xl font-black text-gray-900 tracking-tighter italic leading-none">
            New{" "}
            <span className="text-indigo-600 underline decoration-indigo-200 decoration-8 underline-offset-8">
              Artifact
            </span>
          </h1>
          <p className="text-gray-400 font-medium tracking-tight text-lg">
            Register high-performance assets into the global fashion database.
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/admin/products")}
            className="px-10 py-5 bg-white border border-gray-100 text-gray-400 rounded-[28px] text-[10px] font-black uppercase tracking-[2px] hover:bg-gray-50 hover:text-gray-900 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.02)] active:scale-95"
          >
            Discard Session
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12"
      >
        {/* Visual Asset Management Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-10 rounded-[48px] shadow-[0_40px_80px_rgba(0,0,0,0.03)] border border-gray-100/50 sticky top-10">
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-[4px] mb-8 flex items-center gap-3">
              Asset Visualization
              <div className="flex-1 h-[1px] bg-gradient-to-r from-gray-100 to-transparent"></div>
            </p>

            <div
              className={`relative group transition-all duration-700 overflow-hidden rounded-[40px] aspect-[4/5] bg-gray-50 border-2 border-dashed ${image ? "border-transparent" : "border-indigo-100"} flex flex-col items-center justify-center hover:border-indigo-400 hover:bg-indigo-50/30 shadow-inner`}
            >
              {uploading && (
                <div className="absolute inset-0 z-20 bg-white/90 backdrop-blur-xl flex flex-col items-center justify-center gap-6 animate-in fade-in duration-500">
                  <div className="w-14 h-14 border-[5px] border-indigo-50 border-t-indigo-600 rounded-full animate-spin shadow-lg"></div>
                  <p className="text-[10px] font-black text-indigo-900 uppercase tracking-[5px] animate-pulse">
                    Syncing Cloud Storage
                  </p>
                </div>
              )}

              {image ? (
                <>
                  <img
                    src={image}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    alt="Preview"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-6 z-10 backdrop-blur-sm">
                    <label className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-3xl shadow-2xl cursor-pointer hover:bg-white hover:text-indigo-600 transition-all transform hover:-translate-y-2 flex items-center justify-center text-xl">
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
                      className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-3xl shadow-2xl hover:bg-rose-600 hover:border-rose-500 transition-all transform hover:-translate-y-2 flex items-center justify-center text-xl"
                    >
                      <FaXmark />
                    </button>
                  </div>
                </>
              ) : (
                <label className="flex flex-col items-center gap-8 cursor-pointer group/label p-10 w-full h-full justify-center">
                  <div className="w-24 h-24 bg-white shadow-[0_20px_50px_rgba(79,70,229,0.12)] rounded-[40px] flex items-center justify-center transition-all duration-500 group-hover/label:rotate-[15deg] group-hover/label:scale-110">
                    <FaCloudArrowUp className="text-4xl text-indigo-500" />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-sm font-black text-gray-900 uppercase tracking-[4px] italic">
                      Upload High-Res
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

            <div className="mt-10 p-8 bg-gradient-to-br from-indigo-900 via-indigo-950 to-black rounded-[40px] shadow-[0_30px_60px_rgba(30,27,75,0.25)] text-white relative overflow-hidden group">
              <div className="relative z-10 flex items-start gap-5">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 border border-white/10">
                  <FaCircleCheck className="text-indigo-300 text-xl" />
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[3px] text-indigo-300 mb-2">
                    Security Certificate
                  </p>
                  <p className="text-[12px] leading-relaxed font-medium opacity-70 italic">
                    Administrative credentials verified. All asset deployments
                    are logged across the global matrix.
                  </p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-1000"></div>
            </div>
          </div>
        </div>

        {/* Main Configuration Hub */}
        <div className="lg:col-span-8 space-y-12">
          <div className="bg-white p-14 rounded-[64px] shadow-[0_50px_100px_rgba(0,0,0,0.03)] border border-gray-100/50 space-y-16">
            {/* Section: Core Information */}
            <section className="space-y-10">
              <div className="flex items-center gap-5">
                <div className="w-2 h-8 bg-indigo-600 rounded-full shadow-[0_4px_12px_rgba(79,70,229,0.3)]"></div>
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
                    className="w-full h-20 px-10 bg-gray-50/30 border-2 border-transparent rounded-[32px] outline-none text-gray-900 text-xl font-bold focus:bg-white focus:border-indigo-100 focus:ring-[15px] focus:ring-indigo-50/30 transition-all placeholder:text-gray-300 placeholder:italic"
                    type="text"
                    name="title"
                    value={newProduct?.title}
                    onChange={handleInputChange}
                    placeholder="e.g. Midnight Onyx Blouson Jacket"
                    required
                  />
                  <MdTipsAndUpdates className="absolute right-10 top-[68px] text-gray-200 group-focus-within:text-indigo-600 text-2xl transition-all group-focus-within:rotate-12" />
                </div>

                <div className="group">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-[4px] mb-5 block flex items-center gap-3">
                    Sector <MdOutlineCategory className="text-gray-300" />
                  </label>
                  <div className="relative">
                    <select
                      className="w-full h-20 px-10 bg-gray-50/30 border-2 border-transparent rounded-[32px] outline-none text-gray-900 font-black uppercase text-[12px] tracking-[3px] appearance-none focus:bg-white focus:border-indigo-100 focus:ring-[15px] focus:ring-indigo-50/30 transition-all cursor-pointer"
                      name="category"
                      value={newProduct?.category || ""}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Domain</option>
                      <option value="Men">Men / Collective</option>
                      <option value="Women">Women / Studio</option>
                      <option value="Kids">Kids / Heritage</option>
                    </select>
                    <FaAngleDown className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none group-focus-within:rotate-180 transition-transform duration-500" />
                  </div>
                </div>

                <div className="group">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-[4px] mb-5 block flex items-center gap-3">
                    Classification
                  </label>
                  <div className="relative">
                    <select
                      className="w-full h-20 px-10 bg-gray-50/30 border-2 border-transparent rounded-[32px] outline-none text-gray-900 font-black uppercase text-[12px] tracking-[3px] appearance-none focus:bg-white focus:border-indigo-100 focus:ring-[15px] focus:ring-indigo-50/30 transition-all cursor-pointer"
                      name="subCategory"
                      value={newProduct?.subCategory || ""}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Architype</option>
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
                    <FaAngleDown className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none group-focus-within:rotate-180 transition-transform duration-500" />
                  </div>
                </div>
              </div>
            </section>

            {/* Section: Logic & Pricing */}
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
                    Asset Worth{" "}
                    <MdOutlinePriceChange className="text-gray-300" />
                  </label>
                  <div className="relative">
                    <span className="absolute left-10 top-1/2 -translate-y-1/2 text-emerald-600 font-black text-2xl">
                      $
                    </span>
                    <input
                      className="w-full h-20 pl-16 pr-10 bg-gray-50/30 border-2 border-transparent rounded-[32px] outline-none text-gray-900 font-black italic text-3xl focus:bg-white focus:border-emerald-100 focus:ring-[15px] focus:ring-emerald-50/30 transition-all"
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
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-[4px] mb-5 block">
                    Heritage Brand
                  </label>
                  <div className="relative">
                    <select
                      className="w-full h-20 px-10 bg-gray-50/30 border-2 border-transparent rounded-[32px] outline-none text-gray-900 font-black uppercase text-[12px] tracking-[3px] appearance-none focus:bg-white focus:border-indigo-100 focus:ring-[15px] focus:ring-indigo-50/30 transition-all cursor-pointer"
                      name="brand"
                      value={newProduct?.brand || ""}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Lineage</option>
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
                    <FaAngleDown className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                  </div>
                </div>

                <div className="relative group">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-[4px] mb-5 block italic">
                    Chromatic Spectrum
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setColorDropdownVisible(!colorDropdownVisible)
                    }
                    className="w-full h-20 px-8 bg-gray-50/30 border-2 border-transparent rounded-[32px] flex items-center justify-between group transition-all hover:bg-white hover:border-indigo-100 hover:shadow-xl outline-none"
                  >
                    <div className="flex -space-x-3">
                      {newProduct.color.length > 0 ? (
                        newProduct.color
                          .slice(0, 6)
                          .map((c) => (
                            <div
                              key={c.colorName}
                              style={{ backgroundColor: c.colorValue }}
                              className="w-10 h-10 rounded-2xl border-4 border-white shadow-lg transition-transform group-hover:scale-110 group-hover:-translate-y-1"
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
                      <FaAngleDown className="text-indigo-400" />
                    </div>
                  </button>

                  {colorDropdownVisible && (
                    <div className="absolute z-50 top-full mt-6 left-0 w-full bg-white/95 backdrop-blur-xl border border-indigo-50 shadow-[0_40px_100px_rgba(0,0,0,0.18)] rounded-[48px] p-10 animate-in zoom-in-95 fade-in duration-500 origin-top">
                      <div className="relative mb-8">
                        <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-indigo-300" />
                        <input
                          type="text"
                          placeholder="Search Spectrum..."
                          className="w-full h-14 pl-14 pr-8 bg-gray-50 rounded-2xl outline-none font-black text-[10px] uppercase text-gray-700 placeholder:text-gray-300 tracking-widest border border-transparent focus:border-indigo-100 transition-all"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-8 max-h-[350px] overflow-y-auto pr-4 custom-scrollbar">
                        {filteredColorOptions.map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => handleColorOptionToggle(opt)}
                            className={`flex flex-col items-center gap-3 group/swatch focus:outline-none transition-all ${newProduct.color.some((c) => c.colorName === opt.colorName) ? "scale-110" : "hover:scale-105 opacity-60 hover:opacity-100"}`}
                          >
                            <div
                              className={`w-14 h-14 rounded-3xl transition-all duration-500 p-1.5 ${newProduct.color.some((c) => c.colorName === opt.colorName) ? "ring-4 ring-indigo-500 ring-offset-4 shadow-2xl" : "shadow-sm"}`}
                            >
                              <div
                                style={{ backgroundColor: opt.colorValue }}
                                className="w-full h-full rounded-2xl shadow-inner border border-black/5"
                              ></div>
                            </div>
                            <span
                              className={`text-[9px] font-black uppercase tracking-widest ${newProduct.color.some((c) => c.colorName === opt.colorName) ? "text-indigo-600" : "text-gray-400"}`}
                            >
                              {opt.colorName}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative group">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-[4px] mb-5 block italic">
                    Volume Matrix
                  </label>
                  <button
                    type="button"
                    onClick={() => setSizeDropdownVisible(!sizeDropdownVisible)}
                    className="w-full h-20 px-8 bg-gray-50/30 border-2 border-transparent rounded-[32px] flex items-center justify-between hover:bg-white hover:border-indigo-100 hover:shadow-xl transition-all outline-none"
                  >
                    <div className="flex gap-3">
                      {newProduct.size.length > 0 ? (
                        newProduct.size.map((s) => (
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
                      <FaAngleDown className="text-indigo-400" />
                    </div>
                  </button>

                  {sizeDropdownVisible && (
                    <div className="absolute z-40 top-full mt-6 left-0 w-full bg-white/95 backdrop-blur-xl border border-indigo-50 shadow-[0_40px_100px_rgba(0,0,0,0.18)] rounded-[48px] p-10 animate-in zoom-in-95 fade-in duration-500 origin-top flex flex-wrap gap-4">
                      {sizeOptions.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => handleSizeOptionToggle(size)}
                          className={`flex-1 min-w-[100px] h-16 flex items-center justify-center rounded-[24px] border-2 transition-all font-black text-[12px] tracking-[4px] ${newProduct.size.includes(size) ? "bg-indigo-600 text-white border-indigo-600 shadow-2xl shadow-indigo-200 -translate-y-1" : "bg-gray-50 border-transparent text-gray-400 hover:border-indigo-100 hover:bg-white"}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>

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
                      value={newProduct?.occasion || ""}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Cluster</option>
                      {["Formal", "Casual", "Party", "Wedding", "Other"].map(
                        (oc) => (
                          <option key={oc} value={oc}>
                            {oc}
                          </option>
                        ),
                      )}
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
                      value={newProduct?.session || ""}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Period</option>
                      {["Summer", "Rainy", "Autumn", "Winter", "Other"].map(
                        (se) => (
                          <option key={se} value={se}>
                            {se}
                          </option>
                        ),
                      )}
                    </select>
                    <FaAngleDown className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-10">
              <div className="flex items-center gap-5">
                <div className="w-2 h-8 bg-gray-900 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)]"></div>
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-[5px] italic flex items-center gap-4">
                  Archive Narrative
                  <MdOutlineDescription className="text-gray-300" />
                </h3>
              </div>
              <textarea
                className="w-full p-12 bg-gray-50/30 border-2 border-transparent rounded-[48px] outline-none text-gray-900 font-medium text-xl min-h-[280px] focus:bg-white focus:border-indigo-100 focus:ring-[20px] focus:ring-indigo-50/20 placeholder:text-gray-300 transition-all leading-relaxed shadow-inner italic"
                name="desc"
                value={newProduct?.desc}
                onChange={handleInputChange}
                placeholder="Meticulously crafted with a focus on silhouette and avant-garde craftsmanship..."
                required
              />
            </section>

            <div className="pt-12 border-t border-gray-100 flex items-center justify-center gap-8 flex-wrap">
              <button
                type="submit"
                disabled={loading || uploading}
                className="h-24 px-16 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-[40px] font-black uppercase tracking-[8px] text-[13px] hover:from-black hover:to-black hover:shadow-[0_30px_70px_rgba(0,0,0,0.2)] transition-all flex items-center gap-8 active:scale-95 disabled:opacity-50 disabled:grayscale group shadow-[0_25px_60px_rgba(79,70,229,0.3)]"
              >
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-[3px] border-white/30 border-t-white rounded-full animate-spin"></div>
                    Deploying Asset...
                  </>
                ) : (
                  <>
                    Initialize Product
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center group-hover:rotate-180 transition-transform duration-700">
                      <FaPlusCircle className="text-2xl" />
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

export default AddProduct;
