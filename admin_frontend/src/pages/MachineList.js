import React, { useEffect, useState } from "react";
import { fetchMachines } from "../services/api";
import { Link } from "react-router-dom";
import "./MachineList.css";

export default function MachineList() {
  const [machines, setMachines] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // machines per page

  useEffect(() => {
    const loadMachines = async () => {
      try {
        const data = await fetchMachines({ page, limit });
        setMachines(data.machines);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error("Error fetching machines:", err);
      }
    };
    loadMachines();
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="machine-list-container">
      <h2>
        Machine List (Page {page} of {totalPages})
      </h2>
      <ul className="machine-list">
        {machines.map((machine) => (
          <li key={machine._id}>
            <Link to={`/machines/${machine._id}`}>
              {machine.machineId} - {machine.osVersion}
            </Link>
          </li>
        ))}
      </ul>
      <div className="pagination-buttons">
        <button onClick={handlePrev} disabled={page === 1}>
          Prev
        </button>
        <button onClick={handleNext} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
