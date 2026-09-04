import React, { useState, useEffect } from "react";

function Departments() {
  const [departments, setDepartments] = useState([
    "IT",
    "Finance",
    "Human Resources",
    "Administration",
    "Marketing",
    "Engineering",
  ]);

  const [newDepartment, setNewDepartment] = useState("");

  // Load departments from localStorage on mount
  useEffect(() => {
    const savedDepartments = JSON.parse(localStorage.getItem("departments"));
    if (savedDepartments && Array.isArray(savedDepartments)) {
      setDepartments(savedDepartments);
    } else {
      // Save default departments to localStorage
      localStorage.setItem("departments", JSON.stringify(departments));
    }
  }, []);

  // Save departments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("departments", JSON.stringify(departments));
  }, [departments]);

  const addDepartment = () => {
    if (!newDepartment.trim()) return;

    if (departments.includes(newDepartment.trim())) {
      alert("Department already exists.");
      return;
    }

    setDepartments([...departments, newDepartment.trim()]);

    setNewDepartment("");
  };

  const deleteDepartment = (department) => {
    if (!window.confirm(`Delete ${department}?`)) return;

    setDepartments(departments.filter((item) => item !== department));
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Departments</h2>
          <p>Manage organization departments.</p>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-5">
          <div className="card custom-card">
            <div className="card-body">
              <h5>Add Department</h5>

              <div className="input-group mt-3">
                <input
                  className="form-control"
                  placeholder="Department name"
                  value={newDepartment}
                  onChange={(e) => setNewDepartment(e.target.value)}
                />

                <button className="btn btn-primary" onClick={addDepartment}>
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-7">
          <div className="card custom-card">
            <div className="card-body">
              <h5>Departments</h5>

              <div className="department-list mt-3">
                {departments.map((department, index) => (
                  <div className="department-item" key={department}>
                    <div>
                      <div className="department-icon">
                        <i className="bi bi-building"></i>
                      </div>

                      <strong>{department}</strong>
                    </div>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deleteDepartment(department)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Departments;
