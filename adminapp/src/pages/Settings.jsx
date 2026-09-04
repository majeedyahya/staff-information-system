import React, { useState } from "react";

function Settings() {
  const [settings, setSettings] = useState({
    organization: "My Organization",
    startTime: "08:00",
    endTime: "17:00",
  });

  const saveSettings = () => {
    localStorage.setItem(
      "settings",
      JSON.stringify(settings)
    );

    alert("Settings saved successfully.");
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Settings</h2>
          <p>Configure your staff management system.</p>
        </div>
      </div>

      <div className="card custom-card">
        <div className="card-body">
          <h5>Organization Settings</h5>

          <div className="row g-4 mt-2">
            <div className="col-md-6">
              <label>Organization Name</label>

              <input
                className="form-control"
                value={settings.organization}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    organization: e.target.value,
                  })
                }
              />
            </div>

            <div className="col-md-3">
              <label>Working Start Time</label>

              <input
                type="time"
                className="form-control"
                value={settings.startTime}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    startTime: e.target.value,
                  })
                }
              />
            </div>

            <div className="col-md-3">
              <label>Working End Time</label>

              <input
                type="time"
                className="form-control"
                value={settings.endTime}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    endTime: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <button
            className="btn btn-primary mt-4"
            onClick={saveSettings}
          >
            <i className="bi bi-save"></i> Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;