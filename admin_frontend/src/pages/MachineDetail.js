import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMachineById } from "../services/api";
import "./MachineDetail.css";

export default function MachineDetail() {
  const { id } = useParams();
  const [machine, setMachine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMachine() {
      try {
        const data = await getMachineById(id);
        setMachine(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMachine();
  }, [id]);

  if (loading) return <p>Loading machine details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!machine) return <p>No machine data found.</p>;

  return (
    <div className="main-content">
      <div>
        <h2>Machine Detail</h2>
        <p>
          <strong>Machine ID:</strong> {machine.machineId}
        </p>
        <p>
          <strong>OS Version:</strong> {machine.osVersion}
        </p>
        <p>
          <strong>Disk Encryption Enabled:</strong>{" "}
          {machine.encryption === "yes" ? "Yes" : "No"}
        </p>
        <p>
          <strong>Antivirus Installed:</strong>{" "}
          {machine.antivirus === "yes" ? "Yes" : "No"}
        </p>
        <p>
          <strong>Sleep Timeout ≤ 10 mins:</strong>{" "}
          {machine.sleep === "yes" ? "Yes" : "No"}
        </p>
        <p>
          <strong>Last Checked:</strong>{" "}
          {new Date(machine.lastChecked).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
