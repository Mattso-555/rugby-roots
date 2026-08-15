// Saves everything to a file the coach keeps, and reads it back in.
// This is the backup, and it's also how you move to a new phone.

const STAMP = () => new Date().toISOString().slice(0, 10);

export function exportSeason(data) {
  const payload = {
    app: "rugby-roots",
    version: 1,
    exportedAt: new Date().toISOString(),
    data,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const squad = (data.team && data.team.name ? data.team.name : "squad")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  a.href = url;
  a.download = `rugby-roots-${squad}-${STAMP()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Reads a file the coach picks. Resolves with the saved data, or throws
// a message that is safe to show on screen.
export function importSeason(file) {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error("No file chosen."));
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("That file could not be read."));
    reader.onload = () => {
      let parsed;
      try {
        parsed = JSON.parse(String(reader.result));
      } catch {
        return reject(new Error("That doesn't look like a Rugby Roots backup file."));
      }
      const data = parsed && parsed.app === "rugby-roots" ? parsed.data : parsed;
      if (!data || typeof data !== "object" || !Array.isArray(data.players)) {
        return reject(new Error("That backup is missing its squad list."));
      }
      resolve(data);
    };
    reader.readAsText(file);
  });
}
