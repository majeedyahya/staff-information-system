import React, { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000/api";

function Staff() {
  const [staff, setStaff] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRegistrations = async () => {
      try {
        const response = await fetch(`${API_URL}/registrations/`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        });
        if (!response.ok) throw new Error();
        setStaff(await response.json());
      } catch {
        setError("Unable to load registrations. Log in as an administrator and ensure Django is running.");
      }
    };
    loadRegistrations();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(`${API_URL}/registrations/${id}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        body: JSON.stringify({ status: status.toLowerCase() }),
      });
      if (!response.ok) throw new Error();
      const updatedPerson = await response.json();
      setStaff(staff.map((person) => person.id === id ? updatedPerson : person));
    } catch {
      setError("Unable to save the decision.");
    }
  };

  const filteredStaff = staff.filter((person) =>
    `${person.full_name} ${person.username} ${person.email}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Staff Requests</h2>
          <p>Review staff registrations and accept or reject each request.</p>
        </div>
      </div>

      <div className="card custom-card">
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="search-box mb-4">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search by name, username or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="table-responsive">
            <table className="table custom-table">
              <thead>
                <tr>
                  <th>Username</th><th>Name</th><th>Gender</th><th>Email</th>
                  <th>Phone</th><th>Status</th><th>Decision</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.map((person) => (
                  <tr key={person.id}>
                    <td><strong>{person.username}</strong></td>
                    <td>{person.full_name}</td>
                    <td>{person.gender}</td>
                    <td>{person.email}</td>
                    <td>{person.phone_number}</td>
                    <td>
                      <span className={`badge-status ${person.status === "accepted" ? "Accepted" : person.status === "rejected" ? "Rejected" : "Pending"}`}>
                        {person.status || "pending"}
                      </span>
                    </td>
                    <td>
                      {person.status === "pending" ? (
                        <>
                          <button className="btn btn-sm btn-success me-2" onClick={() => updateStatus(person.id, "Accepted")}>
                            <i className="bi bi-check-lg"></i> Accept
                          </button>
                          <button className="btn btn-sm btn-danger" onClick={() => updateStatus(person.id, "Rejected")}>
                            <i className="bi bi-x-lg"></i> Reject
                          </button>
                        </>
                      ) : <span className="text-muted">Decision recorded</span>}
                    </td>
                  </tr>
                ))}
                {filteredStaff.length === 0 && (
                  <tr><td colSpan="7" className="text-center py-4">No staff requests found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Staff;
