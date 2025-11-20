"use client";
import { useEffect, useState } from "react";

export default function LoggedDataForm({ portfolioId }: { portfolioId: number }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:8080/forms");
      const portfolios = await res.json();
      const portfolio = portfolios.find((p: any) => p.id === portfolioId);
      setData(portfolio);
    }
    fetchData();
  }, [portfolioId]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-6">Confirm Your Portfolio</h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Full Name</h3>
        <p className="text-gray-700">{data.name}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Bio</h3>
        <p className="text-gray-700">{data.bio}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Email</h3>
        <p className="text-gray-700">{data.email}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">GitHub</h3>
        <p className="text-gray-700">{data.github}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Skills</h3>
        <p className="text-gray-700">{data.skills.join(", ")}</p>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Projects</h3>
        <ul className="list-disc list-inside text-gray-700">
          {data.projects.map((proj: string, i: number) => (
            <li key={i}>{proj}</li>
          ))}
        </ul>
      </div>
      <div className="flex justify-end gap-4">
        <button className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 transition">Edit</button>
        <a href={`http://localhost:8080/pdf/${data.id}`} target="_blank" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">Download PDF</a>
      </div>
    </div>
  );
}
