import { toast } from "react-toastify";

const cloudName = "dyphiefiy"; // Your Cloudinary cloud name
const uploadPreset = "social"; // Your Cloudinary upload preset

export const uploadCSVFileHandler = async (file) => {
  if (!file || file.type !== "text/csv") {
    toast.error("Please upload a valid CSV file.");
    return null;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`, // 'raw' for non-image files like CSV
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (data.secure_url) {
      toast.success("CSV uploaded successfully!");
      return data.secure_url;
    } else {
      toast.error("CSV upload failed.");
      return null;
    }
  } catch (error) {
    console.error("Error uploading CSV:", error);
    toast.error("An error occurred during CSV upload.");
    return null;
  }
};
