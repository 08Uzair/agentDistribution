"use client";

import { useEffect, useState } from "react";
import {
  Edit2,
  Trash2,
  PlusCircle,
  User,
  Mail,
  Phone,
  Lock,
  X,
  Eye,
} from "lucide-react";
import * as XLSX from "xlsx";
import { distributeTasks } from "@/utility/distributeTask";
import { useDispatch, useSelector } from "react-redux";
import {
  createAgent,
  deleteAgent,
  getAgents,
  updateAgent,
} from "@/redux/actions/agent";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { createList, getLists } from "@/redux/actions/list";
import { uploadCSVFileHandler } from "@/utility/uploadToCloud";

export default function Home() {
  const agents = useSelector((state) => state?.agent?.agent?.agents);
  const dispatch = useDispatch();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [localData, setLocalData] = useState(null);
  const [taskResult, setTaskResult] = useState([]);
  // State for creating new agent
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  // State for editing existing agent
  const [editingAgentId, setEditingAgentId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const requiredFields = ["FirstName", "Phone", "Notes"];

  useEffect(() => {
    dispatch(getAgents());
    setLocalData(JSON.parse(localStorage.getItem("profile")));
  }, [dispatch]);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (!profile) {
      router.push("/auth");
    }
  }, [router]);

  // Handle input changes for creating new agent
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      agentAdmin: localData?.result?._id,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle input changes for editing existing agent
  const handleEditChange = (e) => {
    setEditFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submit for both create and update
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAgentId) {
      // Update existing agent
      dispatch(updateAgent(editingAgentId, editFormData));
      toast.success("Agent updated successfully!");
      dispatch(getAgents());
    } else {
      // Create new agent
      dispatch(createAgent(formData));
      toast.success("Agent created successfully!");
      dispatch(getAgents());
    }
    // Reset states and close modal
    setFormData({ name: "", email: "", phone: "", password: "" });
    setEditFormData({ name: "", email: "", phone: "", password: "" });
    setIsOpen(false);
    dispatch(getAgents());
    setEditingAgentId(null);
  };
  const handleSingleTaskView = (id) => {
    router.push(`/agentTask/${id}`);
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (!file || !file.name.endsWith(".csv")) {
      alert("Please upload a valid CSV file.");
      return;
    }

    const originalFileName = file.name;

    // Upload to Cloudinary first and get the file URL
    const fileUrl = await uploadCSVFileHandler(file);
    if (!fileUrl) {
      alert("Failed to upload file to Cloudinary.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      const binaryStr = evt.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      const columns = Object.keys(data[0] || {});
      const missingFields = requiredFields.filter((f) => !columns.includes(f));
      if (missingFields.length > 0) {
        alert(`Missing required columns: ${missingFields.join(", ")}`);
        return;
      }

      const warnings = [];
      data.forEach((row, index) => {
        requiredFields.forEach((field) => {
          if (row[field] === "") {
            warnings.push(`Row ${index + 2} - Missing value in "${field}"`);
          }
        });
      });

      if (warnings.length > 0) {
        console.warn("⚠️ Data Warnings:");
        warnings.forEach((w) => console.warn(w));
        alert("Some cells have missing values. They will be treated as empty.");
      }

      const taskResult = distributeTasks(data, agents);
      console.log("✅ Distributed Tasks:", taskResult);

      // Dispatching with both fileName and fileLink
      dispatch(
        createList({
          dataArray: taskResult,
          fileName: originalFileName,
          fileLink: fileUrl,
        })
      );

      toast.success("Tasks distributed successfully!");
      if (taskResult) {
        setTaskResult(taskResult);
      }
    };

    reader.readAsBinaryString(file);
    dispatch(getLists());
  };

  // Open modal for editing, populate form with agent data
  const handleEdit = (agent) => {
    setEditingAgentId(agent._id);
    setEditFormData({
      name: agent.name || "",
      email: agent.email || "",
      phone: agent.phone || "",
      password: "", // Typically password is not prefilled for security
    });
    setIsOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteAgent(id));
    toast.success("Agent deleted successfully!");
    dispatch(getAgents());
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold">Agent List</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => {
              setEditingAgentId(null);
              setFormData({ name: "", email: "", phone: "", password: "" });
              setIsOpen(true);
            }}
            className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow"
          >
            <PlusCircle className="w-5 h-5 mr-2" /> Create Agent
          </button>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="border-2 px-3 py-2 rounded-lg cursor-pointer w-full sm:w-auto"
          />
        </div>
      </div>

      {/* Modal Form */}
      {isOpen && (
        <div className="fixed inset-0 z-10 bg-[#00000085] flex justify-center items-center">
          <div className="relative w-[90%] sm:w-[70%] md:w-[50%] lg:w-[35%] p-6 bg-white rounded-2xl shadow-lg">
            <button
              onClick={() => {
                setIsOpen(false);
                setEditingAgentId(null);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
              {editingAgentId ? "Edit Agent" : "Register Agent"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Name
                </label>
                <div className="flex items-center border rounded-lg p-2">
                  <User className="w-5 h-5 text-gray-500 mr-2" />
                  <input
                    type="text"
                    name="name"
                    value={editingAgentId ? editFormData.name : formData.name}
                    onChange={editingAgentId ? handleEditChange : handleChange}
                    required
                    placeholder="Enter full name"
                    className="w-full outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Email
                </label>
                <div className="flex items-center border rounded-lg p-2">
                  <Mail className="w-5 h-5 text-gray-500 mr-2" />
                  <input
                    type="email"
                    name="email"
                    value={editingAgentId ? editFormData.email : formData.email}
                    onChange={editingAgentId ? handleEditChange : handleChange}
                    required
                    placeholder="Enter email"
                    className="w-full outline-none"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Phone
                </label>
                <div className="flex items-center border rounded-lg p-2">
                  <Phone className="w-5 h-5 text-gray-500 mr-2" />
                  <input
                    type="text"
                    name="phone"
                    value={editingAgentId ? editFormData.phone : formData.phone}
                    onChange={editingAgentId ? handleEditChange : handleChange}
                    required
                    placeholder="Enter phone number"
                    className="w-full outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Password
                </label>
                <div className="flex items-center border rounded-lg p-2">
                  <Lock className="w-5 h-5 text-gray-500 mr-2" />
                  <input
                    type="password"
                    name="password"
                    value={
                      editingAgentId ? editFormData.password : formData.password
                    }
                    onChange={editingAgentId ? handleEditChange : handleChange}
                    required={!editingAgentId} // Password required only when creating
                    placeholder={
                      editingAgentId
                        ? "Enter new password (optional)"
                        : "Enter password"
                    }
                    className="w-full outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
              >
                {editingAgentId ? "Update Agent" : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg w-full">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "ID",
                "Name",
                "Phone",
                "Email",
                // "Tasks",
                "View Task",
                "Actions",
              ].map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {agents?.map((agent, idx) => (
              <tr
                key={agent._id}
                className={`${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100`}
              >
                <td className="px-4 py-3 text-sm text-gray-700">{agent._id}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {agent.name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {agent.phone || agent.number}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {agent.email}
                </td>
                {/* <td className="px-4 py-3">
                  {taskResult.length > 0 ? (
                    <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-500">
                      {
                        // Find the taskResult for this agent by ID (or use 0 if not found)
                        data?.find(
                          (item) => item?.assignedTo?._id === agent?._id
                        )?.taskList?.length || 0
                      }
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-500">
                      0
                    </span>
                  )}
                </td> */}
                <td className="px-4 py-3">
                  <span
                    onClick={() => handleSingleTaskView(agent._id)}
                    className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-500 cursor-pointer"
                  >
                    <Eye className="w-3 h-3 " />
                  </span>
                </td>

                <td className="px-4 py-3 text-sm flex flex-wrap gap-2">
                  <button
                    onClick={() => handleEdit(agent)}
                    className="flex items-center px-3 py-1 bg-gray-400 hover:bg-gray-500 text-white rounded-md shadow cursor-pointer"
                  >
                    <Edit2 className="w-4 h-4 mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(agent._id)}
                    className="flex items-center px-3 py-1 bg-blue-400 hover:bg-blue-500 text-white rounded-md shadow cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
