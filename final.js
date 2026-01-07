window.onload = function () {
  const candidates = JSON.parse(sessionStorage.getItem("processedCandidates")) || [];
  const table = document.querySelector(".result-table tbody");
  table.innerHTML = "";

  const shortlisted = candidates.filter(c => c.score >= 60);

  if (!shortlisted.length) {
    table.innerHTML = `<tr>
        <td colspan="2" style="text-align:center;">
          No candidates shortlisted
        </td>
      </tr>`;
    return;
  }

  shortlisted.forEach((c) => {

    let candidateName = c.name.split("\n")[0].trim();
    if (candidateName.toLowerCase().startsWith("name:")) {
      candidateName = candidateName.substring(5).trim();
    }

    if (!candidateName) return;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${candidateName}</td>
      <td>${c.score}%</td>
    `;
    table.appendChild(row);
  });
};
