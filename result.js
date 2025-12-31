window.onload = function () {
  const resumes = JSON.parse(localStorage.getItem("resumes")) || [];
  const scores = JSON.parse(localStorage.getItem("scores")) || [];

  const table = document.querySelector(".result-table tbody");
  table.innerHTML = "";

  resumes.forEach((resume, i) => {
    if (!resume) return;
    const row = document.createElement("tr");
    let status = scores[i] >= 60 ? "SHORTLISTED" : "REJECTED";
    let remark = scores[i] >= 60 ? "Good profile" : "Needs improvement";

    let candidateName = resume.split("\n")[0].trim();
    if (candidateName.toLowerCase().startsWith("name:")) {
      candidateName = candidateName.substring(5).trim();
    }
    if (!candidateName) candidateName = "Candidate " + (i + 1);

    row.innerHTML = `
      <td>${candidateName}</td>
      <td>${scores[i]}%</td>
      <td>${status}</td>
      <td>${remark}</td>
    `;
    table.appendChild(row);
  });


  const processedCandidates = resumes.map((resume, i) => ({
    name: resume,
    score: scores[i],
    department: JSON.parse(localStorage.getItem("department"))[0] || ""
  }));
  sessionStorage.setItem("processedCandidates", JSON.stringify(processedCandidates));
};
