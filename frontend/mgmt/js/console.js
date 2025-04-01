// firebase initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import {
  setDoc,
  doc,
  addDoc,
  deleteDoc,
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyBdtXeJeeT0ooE8yHsbMpUDVeXuDwkGAKk",
  authDomain: "agrilife-96ce0.firebaseapp.com",
  projectId: "agrilife-96ce0",
  storageBucket: "agrilife-96ce0.firebasestorage.app",
  messagingSenderId: "843694801338",
  appId: "1:843694801338:web:eaac054371ac115316dd83",
  measurementId: "G-Z9P0Q4RQ0H",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
populateTable();

// newCrop button logic
document.getElementById("newCrop").addEventListener("click", (e) => {
  e.preventDefault();
  const newCropForm = document.getElementById("newCropForm");

  if (!newCropForm.classList.contains("visible")) {
    newCropForm.classList.add("visible");
    overlay.classList.add("visible");

    const rainfall = localStorage.getItem("rainfall");
    localStorage.removeItem("rainfall", rainfall);
    const name = localStorage.getItem("cropName");
    localStorage.removeItem("cropName", name);
    document.getElementById("cropName").value = name;
    document.getElementById("rainfall").value = rainfall;
  }
});

// closing newCrop form if the close button got clicked
document.getElementById("close").addEventListener("click", (e) => {
  e.preventDefault();
  const newCropForm = document.getElementById("newCropForm");
  const overlay = document.getElementById("overlay");
  newCropForm.classList.remove("visible");
  overlay.classList.remove("visible");
});

// crop registering logic
document.getElementById("submit").addEventListener("click", async (e) => {
  e.preventDefault();
  const newCropForm = document.getElementById("newCropForm");
  const overlay = document.getElementById("overlay");
  const crop = document.getElementById("cropName").value;
  const rainfall = document.getElementById("rainfall").value;
  const acres = document.getElementById("acres").value;
  const loc = document.getElementById("geoloc").value;
  const lat = loc.split(",")[0];
  const lon = loc.split(",")[1];

  if (localStorage.getItem("updatedName") === null) {
    console.log("create");
    const q = collection(db, localStorage.getItem("docname"));

  const docRef = await addDoc(q, {
    acresPlanted: acres,
    cropName: crop,
    rainfall: rainfall,
    lat: lat,
    lon: lon,
    rainfall: rainfall,
  });

  alert("Crop registered successfully.");
  console.log("Registered new crop with name (" + crop + ")");
  }
  else {

    console.log("update");

  const docRef = await setDoc(doc(db, localStorage.getItem("docname"), localStorage.getItem("updatedName")), {
    acresPlanted: acres,
    cropName: crop,
    rainfall: rainfall,
    lat: lat,
    lon: lon,
    rainfall: rainfall,
  });

  alert("Crop updated successfully.");
  console.log("Updated crop with name (" + crop + ")");
  localStorage.removeItem("updatedName");
  }
  newCropForm.classList.remove("visible");
  overlay.classList.remove("visible");
  formyformform.reset();
  populateTable();
});

// logout button logic
document.getElementById("logout").addEventListener("click", (e) => {
  e.preventDefault();
  alert("Logged out successfully.");
  localStorage.removeItem("docname");
  window.location.replace("auth.html");
});

// populating the crops table
async function populateTable() {
  const cropsDiv = document.getElementById("crops");
  cropsDiv.innerHTML = "";

  document.getElementById("noCrops").style.display = "none";
  document.getElementById("noCropsDown").style.display = "none";
  document.getElementById("crops").style.display = "flex";

  try {
    const cropsCollection = collection(db, localStorage.getItem("docname")); // Reference to the Firestore collection
    const querySnapshot = await getDocs(cropsCollection); // Fetch all documents in the collection
    if (querySnapshot.size === 1) {
      document.getElementById("crops").style.display = "none";
      document.getElementById("noCropsDown").style.display = "flex";
      document.getElementById("noCrops").style.display = "flex";
      return;
    } else {
      document.getElementById("noCrops").style.display = "none";
      document.getElementById("noCropsDown").style.display = "none";
      document.getElementById("crops").style.display = "flex";
    }

    querySnapshot.forEach((doc) => {
      if (doc.id === "start") {
        return;
      }
      const cropData = doc.data(); // Get the document data
      const cropName = cropData.cropName || "Unknown Crop"; // Use the "cropName" field or a default value
      const acresPlanted = cropData.acresPlanted || "N/A"; // Use the "acresPlanted" field or a default value
      const rainfall = cropData.rainfall || "N/A"; // Use the "rainfall" field or a default value

      const details = cropData.details;
      document.getElementById("pCrop").innerHTML = "Crop name: " + cropName;
      document.getElementById("pAcres").innerHTML = "Acres planted: ";
      document.getElementById("pRain").innerHTML = "Current rainfall in area: " + cropName;
      document.getElementById("pDesc").innerHTML = "Description of crop: " + cropName;

      // Create a new div for each crop
      const cropBox = document.createElement("div");
      cropBox.classList.add("cropBox"); // Add a class for styling
      cropBox.setAttribute("id", doc.id);
      cropBox.innerHTML = `
        <h3 id="cropBox">${cropName}</h3>
        <p><strong>Acres Planted:</strong> ${acresPlanted}</p>
        <p><strong>Rainfall:</strong> ${rainfall}</p>
        <p><strong>Location:</strong> ${cropData.lat}, ${cropData.lon}</p>
        <button id="updateCrop">Update</button>
        <button id="deleteCrop">Delete</button>
      `;

      // Append the crop box to the parent div
      cropsDiv.appendChild(cropBox);
    });

    // Add event listeners for the buttons and stuff
    const updateCrop = document.querySelectorAll("updateCrop");
    const deleteCrop = document.querySelectorAll("deleteCrop");
    const cropBoxes = document.querySelectorAll(".cropBox");
    const cropDetails = document.getElementById("cropDetails");
    const closeDetails = document.getElementById("closeDetails");
    const overlay = document.getElementById("overlay");

    cropBoxes.forEach((cropBox, index) => {

      cropBox.addEventListener("click", (e) => {
        if (e.target === cropBox.querySelector("#updateCrop") || e.target === cropBox.querySelector("#deleteCrop")) {
          return;
        }
        e.preventDefault();
        cropDetails.classList.add("visible");
        overlay.classList.add("visible");
        console.log("Opened crop " + cropBox.id + " details.");
      });
      cropBox.querySelector("#updateCrop").addEventListener("click", (e) => {
        e.preventDefault();
        const newCropForm = document.getElementById("newCropForm");
        const overlay = document.getElementById("overlay");
        newCropForm.classList.add("visible");
        overlay.classList.add("visible");
      });
      cropBox.querySelector("#deleteCrop").addEventListener("click", async (e) => {
        e.preventDefault();
        const docRef = doc(db, localStorage.getItem("docname"), cropBox.id);
        await deleteDoc(docRef);
        alert("Crop deleted successfully.");
        console.log("Deleted crop with name (" + cropBox.id + ")");
        populateTable();
      });

    });
    closeDetails.addEventListener("click", (e) => {
      e.preventDefault();
      cropDetails.classList.remove("visible");
      overlay.classList.remove("visible");
    });
  } catch (error) {
    console.error("Error fetching crops:", error);
    cropsDiv.innerHTML = "<p>Error loading crops. Please try again later.</p>";
  }
}
