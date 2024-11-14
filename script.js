document.getElementById("resume-form").addEventListener("submit",(event) =>{
    event.preventDefault();
    updateResume();
})

document.getElementById("add-experience").addEventListener("click",()=>{
    addExperienceField();
})

document.getElementById("add-education").addEventListener("click",()=>{
    addEducationField();
})

function updateResume(){
    const name = document.getElementById("name").value;
    const contact = document.getElementById("contact").value;
    const summary = document.getElementById("summary").value;

    let previewHTML= ` <div class="resume-header">
      <div class="initials-circle">${name[0]}</div>
      <div class="contact-info">
        <h1>${name}</h1>
        <p><span>${contact}</span></p>
      </div>
    </div>
    <section class="resume-section">
      <h2>Summary Statement</h2>
      <p>${summary}</p>
    </section>
    <hr>`;



     // Experience Section
  const experienceEntries = document.querySelectorAll('.experience-entry');
  previewHTML += '<h3>Experience</h3><ul>';
  experienceEntries.forEach(entry => {
    const jobTitle = entry.querySelector('.job-title').value;
    const company = entry.querySelector('.company').value;
    const startDate = formatDate(entry.querySelector('.start-date').value);
    const endDate = formatDate(entry.querySelector('.end-date').value);

    if (jobTitle && company && startDate && endDate) {
      previewHTML += `
        <div class="work-entry">
          <strong>${jobTitle}</strong> | ${company} <span>${startDate} to ${endDate}</span>
        </div>`;
    }
  });
  previewHTML += '</ul>';
  previewHTML += '<hr>';
  
  // Education Section
  const educationEntries = document.querySelectorAll('.education-entry');
  previewHTML += '<h3>Education</h3><ul>';
  educationEntries.forEach(entry => {
    const degree = entry.querySelector('.degree').value;
    const school = entry.querySelector('.school').value;
    const startDate = formatDate(entry.querySelector('.education-start-date').value);
    const endDate = formatDate(entry.querySelector('.education-end-date').value);

    if (degree && school && startDate && endDate) {
      previewHTML += `<p><strong>${degree}</strong> | ${school} <span>${startDate} to ${endDate}</span></p>`;
    }
  });
  previewHTML += `</section> 
   <button type="button" id="downloadpdf">Download PDF</button>
   `;
  
  document.getElementById('resume-preview').innerHTML = previewHTML;
  document.getElementById("downloadpdf").addEventListener('click',function(){
    const resumepreview = document.getElementById("resume-preview");
    const options = {
     margin: 0.5,
     filename: 'Resume.pdf',
     image: { type: 'jpeg', quality: 0.98 },
     html2canvas: { scale: 2 },
     jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
   };
   html2pdf().set(options).from(resumepreview).save();
   });

}
  function formatDate(dateString) {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

function addExperienceField() {
  const experienceSection = document.getElementById('experience-section');
  const newEntry = document.createElement('div');
  newEntry.classList.add('experience-entry');
  newEntry.innerHTML = `
    <input type="text" placeholder="Job Title" class="job-title">
    <input type="text" placeholder="Company" class="company">
    <input type="date" placeholder="Start Date" class="start-date">
    <input type="date" placeholder="End Date" class="end-date">
  `;
  experienceSection.appendChild(newEntry);
}

function addEducationField() {
  const educationSection = document.getElementById('education-section');
  const newEntry = document.createElement('div');
  newEntry.classList.add('education-entry');
  newEntry.innerHTML = `
    <input type="text" placeholder="Degree" class="degree">
    <input type="text" placeholder="School" class="school">
     <input type="date" placeholder="Start Date" class="education-start-date">
    <input type="date" placeholder="End Date" class="education-end-date">
  `;
  educationSection.appendChild(newEntry);
}

