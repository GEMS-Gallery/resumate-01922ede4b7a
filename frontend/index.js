import { backend } from 'declarations/backend';

document.getElementById('aboutMeForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const bio = document.getElementById('bio').value;
    const cvFile = document.getElementById('cv').files[0];

    if (!cvFile) {
        alert("Please upload a CV file.");
        return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
        const cvData = e.target.result;
        try {
            const result = await backend.uploadCV(name, bio, cvData);
            displayResult(result);
        } catch (error) {
            console.error("Error uploading CV:", error);
            alert("There was an error uploading your CV. Please try again.");
        }
    };
    reader.readAsArrayBuffer(cvFile);
});

function displayResult(result) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<h2>Parsed Information</h2>
                           <p><strong>Name:</strong> ${result.name}</p>
                           <p><strong>Biography:</strong> ${result.bio}</p>
                           <p><strong>Skills:</strong> ${result.skills.join(', ')}</p>`;
}
