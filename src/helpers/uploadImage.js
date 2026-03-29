/**
 * uploadImageToCloudinary
 * -----------------------
 * Uploads an image file to Cloudinary using an unsigned upload preset.
 * No secret key is exposed — only the cloud name and preset name are needed.
 *
 * Setup (one-time):
 *  1. Sign up free at https://cloudinary.com
 *  2. Go to Settings → Upload → Add upload preset → set "Signing Mode" to "Unsigned"
 *  3. Copy your Cloud Name and the preset name into your .env file:
 *       VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
 *       VITE_CLOUDINARY_UPLOAD_PRESET=your_preset_name
 *
 * @param {File} file - The image File object from an <input type="file">
 * @returns {Promise<string>} - Resolves to the secure public URL of the uploaded image
 * @throws {Error} - Throws with a descriptive message on failure
 */
export const uploadImageToCloudinary = async (file) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
        throw new Error(
            "Cloudinary is not configured. Add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to your .env file."
        );
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", "stylish-fashion"); // optional: organise in a folder

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: formData }
    );

    if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData?.error?.message || `Upload failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.secure_url; // always HTTPS
};
