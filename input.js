document.getElementById("processBtn").addEventListener("click", function () {

  let resumes = [
    document.getElementById("input1").value.trim(),
    document.getElementById("input2").value.trim(),
    document.getElementById("input3").value.trim(),
    document.getElementById("input4").value.trim(),
    document.getElementById("input5").value.trim()
  ];

  let department = document.getElementById("department").value;

  let filledCount = resumes.filter(r => r !== "").length;

  if (filledCount < 3 || department === "" || department === "disabled selected") {
    alert("Please fill minimum 3 resumes and select department");
    return;
  }

 
  localStorage.setItem("resumes", JSON.stringify(resumes));
  localStorage.setItem("department", JSON.stringify([department]));

  
  let existingScores = JSON.parse(localStorage.getItem("scores"));

  if (!existingScores) {
    let scores = resumes.map(r => r ? 50 + Math.floor(Math.random() * 31) : 0); // 50–80
    localStorage.setItem("scores", JSON.stringify(scores));
  }

  window.location.href = "result.html";
});
