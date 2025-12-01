"use client";
import { useEffect, useState } from "react";


export default function TargetCompanies() {
    
  return (
    <section className="w-full space-y-4">
      {/* Title */}
      <h2 className="text-xl font-semibold">Target Companies</h2>

      {/* Input + Actions */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Company email / careers email / HR email"
          className="flex-1 border rounded-md px-3 py-2"
        />
        <button className="px-4 py-2 rounded-md border">
          Add
        </button>
        <button className="px-4 py-2 rounded-md border">
          Upload CSV
        </button>
        <button className="px-4 py-2 rounded-md border">
          Paste Multiple
        </button>
      </div>

      {/* Table */}
      <div className="border rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Company Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Role</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {/* Rows will be injected dynamically later */}
            <tr>
              <td className="p-2 opacity-50">—</td>
              <td className="p-2 opacity-50">Add entries above</td>
              <td className="p-2 opacity-50">—</td>
              <td className="p-2 opacity-50">—</td>
              <td className="p-2 opacity-50"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
