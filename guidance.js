window.onload = function () {
  const tableBody = document.querySelector(".result-table tbody");
  tableBody.innerHTML = ""; 

  const candidates = JSON.parse(sessionStorage.getItem("processedCandidates")) || [];

  if (!candidates.length) {
    tableBody.innerHTML = `<tr><td colspan="3" style="text-align:center;">No resume data found</td></tr>`;
    return;
  }

  const rejected = candidates.filter(c => c.score < 60);

  if (!rejected.length) {
    tableBody.innerHTML = `<tr><td colspan="3" style="text-align:center;">All candidates are shortlisted!</td></tr>`;
    return;
  }

  const generalAdvice = [
    "Consider doing an internship to gain practical experience",
    "Add personal projects to showcase your skills",
    "Improve resume by highlighting achievements",
    "Participate in coding competitions or hackathons",
    "Take online courses to strengthen skills"
  ];

  const deptGuidance = {
    CSE: ["Practice coding and algorithms", "Learn data structures thoroughly", "Build small projects in programming languages"],
    SD: ["Work on software projects", "Learn Git and version control", "Understand software development lifecycle"],
    WEB: ["Learn HTML, CSS, JavaScript", "Build personal website or portfolio", "Practice frontend projects"],
    AIML: ["Learn Python programming", "Work on ML/AI projects", "Participate in Kaggle competitions"],
    DATA: ["Learn SQL and data analysis", "Practice data visualization projects", "Understand statistics basics"],
    CLOUD: ["Learn cloud platforms (AWS, Azure, GCP)", "Understand deployment and DevOps concepts", "Build small cloud projects"],
    CYBER: ["Learn cybersecurity fundamentals", "Practice ethical hacking basics", "Work on security-related projects"],
    QA: ["Learn testing tools like Selenium", "Practice writing test cases", "Understand software testing lifecycle"],
    RD: ["Participate in research projects", "Read technical papers", "Work on innovative ideas"],
    TECH: ["Learn troubleshooting techniques", "Practice technical problem solving", "Understand system support basics"],
    BA: ["Learn business analysis fundamentals", "Practice requirement gathering", "Work on documentation skills"]
  };

  rejected.forEach((c, index) => {
    let suggestions = [];

   
    const deptList = deptGuidance[c.department] || [];
    if (deptList.length > 0) {
      suggestions.push(deptList[index % deptList.length]);
      if (deptList.length > 1) suggestions.push(deptList[(index + 1) % deptList.length]);
    }

   
    suggestions.push(generalAdvice[index % generalAdvice.length]);

    if (c.name.length < 50) suggestions.push("Add more details or highlight achievements");

    let candidateName = c.name.split("\n")[0].trim();

   
    if (candidateName.toLowerCase().startsWith("name:")) {
      candidateName = candidateName.substring(5).trim();
    }

    if (!candidateName) candidateName = "Candidate " + (index + 1);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${candidateName}</td>
      <td>${c.score}%</td>
      <td>${suggestions.join(", ")}</td>
    `;
    tableBody.appendChild(row);
  });
};
