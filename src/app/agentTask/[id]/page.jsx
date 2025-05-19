"use client";

import { getUserLists } from "@/redux/actions/list";
import FormattedDate from "@/utility/FormattedDate";
import Loader from "@/utility/Loader";
// import { Loader } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function TaskListTable() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const { id } = useParams();
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const listData = await dispatch(getUserLists(id));
      setData(listData);
      console.log(listData, "Fetched Task Data");
    };
    fetchData();
  }, [dispatch, id]);
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (!profile) {
      router.push("/auth");
    }
  }, [router]);
  if (!data || data.length === 0) {
    // return <div className="w-full h-screen bg-white flex items-center justify-center "><Loader className="w-10 h-10"/> </div>;
    return (
      <div className="w-full h-screen bg-white flex items-center justify-center ">
        <Loader />{" "}
      </div>
    );
  }

  const assignedTo = data?.[0]?.assignedTo;

  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Assigned To: {assignedTo?.name}</h2>
        <p className="text-gray-600 text-md">
          Email: {assignedTo?.email}
          <br />
          Phone: {assignedTo?.phone}
        </p>
      </div>

      {[...data].reverse().map((taskGroup, groupIndex) => (
        <div key={taskGroup._id} className="space-y-2">
          <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-blue-700">
                Task Group #{groupIndex + 1}
              </h3>
              <p className="text-gray-700">
                📄 <span className="font-medium">File Name:</span>{" "}
                {taskGroup.fileName}
              </p>
              <p className="text-gray-700">
                🔗 <span className="font-medium">File Link:</span>{" "}
                <a
                  href={taskGroup.fileLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  View File
                </a>
              </p>
            </div>
            <div>
              <p className="text-gray-700">
                <FormattedDate dateString={taskGroup.createdAt} />
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl shadow">
            <table className="w-full bg-white text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 font-semibold">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Notes</th>
                </tr>
              </thead>
              <tbody>
                {taskGroup.taskList.map((task, index) => (
                  <tr key={index} className="border-b hover:bg-blue-50">
                    <td className="px-4 py-3">{task.FirstName}</td>
                    <td className="px-4 py-3">{task.Phone}</td>
                    <td className="px-4 py-3">{task.Notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
