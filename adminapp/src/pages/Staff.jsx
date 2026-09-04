import React, { useEffect, useState } from "react";

function Staff() {
  const [staff, setStaff] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const emptyForm = {
    id: "",
    name: "",
    gender: "",
    phone: "",
    email: "",
    department: "",
    position: "",
    employmentDate: "",
    emergencyContact: "",
    status: "Active",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("staff"));

    if (saved) {
      setStaff(saved);
    } else {
      const demo = [
        {
          id: "STF001",
          name: "John Peter",
          gender: "Male",
          phone: "0712345678",
          email: "john@example.com",
          department: "IT",
          position: "Software Developer",
          employmentDate: "2024-01-10",
          emergencyContact: "0700000000",
          status: "Active",
        },
        {
          id: "STF002",
          name: "Asha Ali",
          gender: "Female",
          phone: "0755555555",
          email: "asha@example.com",
          department: "Finance",
          position: "Accountant",
          employmentDate: "2023-05-12",
          emergencyContact: "0711111111",
          status: "Active",
        },
      ];

      setStaff(demo);
      localStorage.setItem("staff", JSON.stringify(demo));
    }
  }, []);

  const saveStaff = (e) => {
    e.preventDefault();

    let updated;

    if (editing) {
      updated = staff.map((person) =>
        person.id === editing.id ? form : person
      );
    } else {
      const newStaff = {
        ...form,
        id: `STF${String(staff.length + 1).padStart(3, "0")}`,
      };

      updated = [...staff, newStaff];
    }

    setStaff(updated);
    localStorage.setItem("staff", JSON.stringify(updated));

    setForm(emptyForm);
    setEditing(null);
    setShowModal(false);
  };

  const deleteStaff = (id) => {
    if (!window.confirm("Are you sure you want to delete this staff member?")) {
      return;
    }

    const updated = staff.filter((person) => person.id !== id);

    setStaff(updated);
    localStorage.setItem("staff", JSON.stringify(updated));
  };

  const editStaff = (person) => {
    setEditing(person);
    setForm(person);
    setShowModal(true);
  };

  const filteredStaff = staff.filter((person) =>
    `${person.name} ${person.id} ${person.department}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Staff Management</h2>
          <p>Manage your organization's staff information.</p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => {
            setEditing(null);
            setForm(emptyForm);
            setShowModal(true);
          }}
        >
          <i className="bi bi-person-plus"></i> Add Staff
        </button>
      </div>

      <div className="card custom-card">
        <div className="card-body">
          <div className="search-box mb-4">
            <i className="bi bi-search"></i>

            <input
              type="text"
              placeholder="Search by name, ID or department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="table-responsive">
            <table className="table custom-table">
              <thead>
                <tr>
                  <th>Staff ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Position</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredStaff.map((person) => (
                  <tr key={person.id}>
                    <td>
                      <strong>{person.id}</strong>
                    </td>

                    <td>{person.name}</td>
                    <td>{person.department}</td>
                    <td>{person.position}</td>
                    <td>{person.phone}</td>

                    <td>
                      <span className="badge-status Present">
                        {person.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => editStaff(person)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteStaff(person.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredStaff.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No staff found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="custom-modal">
            <div className="modal-header">
              <h5>{editing ? "Edit Staff" : "Add New Staff"}</h5>

              <button
                className="btn-close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>

            <form onSubmit={saveStaff}>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label>Full Name</label>

                    <input
                      className="form-control"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <label>Gender</label>

                    <select
                      className="form-select"
                      value={form.gender}
                      onChange={(e) =>
                        setForm({ ...form, gender: e.target.value })
                      }
                    >
                      <option value="">Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label>Phone</label>

                    <input
                      className="form-control"
                      required
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <label>Email</label>

                    <input
                      type="email"
                      className="form-control"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <label>Department</label>

                    <select
                      className="form-select"
                      value={form.department}
                      onChange={(e) =>
                        setForm({ ...form, department: e.target.value })
                      }
                    >
                      <option value="">Select Department</option>
                      <option>IT</option>
                      <option>Finance</option>
                      <option>Human Resources</option>
                      <option>Administration</option>
                      <option>Marketing</option>
                      <option>Engineering</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label>Position</label>

                    <input
                      className="form-control"
                      value={form.position}
                      onChange={(e) =>
                        setForm({ ...form, position: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <label>Employment Date</label>

                    <input
                      type="date"
                      className="form-control"
                      value={form.employmentDate}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          employmentDate: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <label>Emergency Contact</label>

                    <input
                      className="form-control"
                      value={form.emergencyContact}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          emergencyContact: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-primary">
                  {editing ? "Update Staff" : "Save Staff"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Staff;