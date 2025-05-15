"use client";

import { useEffect, useState } from "react";
import { Edit2, Trash2, PlusCircle } from "lucide-react";
import * as XLSX from "xlsx";
import { distributeTasks } from "@/utility/distributeTask";

export default function Home() {
  const [agents, setAgents] = useState([
    {
      id: 1,
      name: "John Doe",
      number: "123-456-7890",
      email: "john@example.com",
      tasks: 0,
    },
    {
      id: 2,
      name: "Jane Smith",
      number: "987-654-3210",
      email: "jane@example.com",
      tasks: 0,
    },
    {
      id: 3,
      name: "Bob Johnson",
      number: "456-789-1234",
      email: "bob@example.com",
      tasks: 0,
    },
    {
      id: 4,
      name: "Johnson",
      number: "456-789-1234",
      email: "bob@example.com",
      tasks: 0,
    },
  ]);

  const requiredFields = ["FirstName", "Phone", "Notes"];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file || !file.name.endsWith(".csv")) {
      alert("Please upload a valid CSV file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      const binaryStr = evt.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      // Step 1: Validate columns
      const columns = Object.keys(data[0] || {});
      const missingFields = requiredFields.filter((f) => !columns.includes(f));
      if (missingFields.length > 0) {
        alert(`Missing required columns: ${missingFields.join(", ")}`);
        return;
      }

      // Step 2: Warn about missing values
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

      // Step 3: Distribute tasks
      const taskResult = distributeTasks(data, agents);
      console.log("✅ Distributed Tasks:", taskResult);
      // const formattedResult = taskResult.map((agent) => ({
      //   id: agent.id,
      //   name: agent.name,
      //   number: agent.number,
      //   email: agent.email,
      //   taskList: agent.taskList,
      // }));

      // console.log(
      //   "✅ Final Formatted Distributed Tasks:",
      //   JSON.stringify(formattedResult, null, 2)
      // );
    };

    reader.readAsBinaryString(file);
  };

  const handleEdit = (id) => console.log("Editing agent with ID:", id);
  const handleDelete = (id) => setAgents((a) => a.filter((x) => x.id !== id));
  const handleCreateAgent = () => console.log("Creating a new agent");

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-extrabold">Agent List</h2>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleCreateAgent}
            className="inline-flex items-center bg-blue-400 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg shadow cursor-pointer"
          >
            <PlusCircle className="w-5 h-5 mr-2" /> Create Agent
          </button>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="block border-2 p-2 rounded-[10px] cursor-pointer"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["ID", "Name", "Phone", "Email", "Tasks", "Actions"].map(
                (col) => (
                  <th
                    key={col}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {agents.map((agent, idx) => (
              <tr
                key={agent.id}
                className={`${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition`}
              >
                <td className="px-6 py-4 text-sm text-gray-700">{agent.id}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {agent.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {agent.number}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {agent.email}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-500">
                    {agent.tasks}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm flex space-x-2">
                  <button
                    onClick={() => handleEdit(agent.id)}
                    className="inline-flex items-center px-3 py-1 bg-gray-400 hover:bg-gray-500 text-white rounded-md shadow-sm cursor-pointer"
                  >
                    <Edit2 className="w-4 h-4 mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(agent.id)}
                    className="inline-flex items-center px-3 py-1 bg-blue-300 hover:bg-blue-400 text-white rounded-md shadow-sm cursor-pointer"
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
