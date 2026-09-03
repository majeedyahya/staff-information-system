import React, { useState } from "react";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);

  const [form, setForm] = useState({
    title: "",
    message: "",
  });

  const publish = (e) => {
    e.preventDefault();

    const announcement = {
      id: Date.now(),
      title: form.title,
      message: form.message,
      date: new Date().toISOString().split("T")[0],
    };

    setAnnouncements([...announcements, announcement]);

    setForm({
      title: "",
      message: "",
    });
  };

  const deleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter((item) => item.id !== id));
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Announcements</h2>

          <p>Publish important information to staff.</p>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-5">
          <div className="custom-card">
            <div className="card-body">
              <h5>Create Announcement</h5>

              <form onSubmit={publish} className="mt-3">
                <label>Title</label>

                <input
                  className="form-control mb-3"
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: e.target.value,
                    })
                  }
                />

                <label>Message</label>

                <textarea
                  className="form-control mb-3"
                  rows="5"
                  required
                  value={form.message}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      message: e.target.value,
                    })
                  }
                ></textarea>

                <button className="btn btn-primary">
                  <i className="bi bi-megaphone"></i> Publish
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          {announcements.map((item) => (
            <div className="custom-card mb-3" key={item.id}>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5>
                    <i className="bi bi-megaphone me-2"></i>
                    {item.title}
                  </h5>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteAnnouncement(item.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>

                <small className="text-muted">{item.date}</small>

                <p className="mt-3">{item.message}</p>
              </div>
            </div>
          ))}

          {announcements.length === 0 && (
            <div className="custom-card">
              <div className="card-body text-center py-5">
                <i className="bi bi-megaphone display-5"></i>

                <p className="mt-3">No announcements yet.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Announcements;
