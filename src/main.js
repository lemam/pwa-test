function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  document.getElementById(
    "location"
  ).innerHTML = `Latitude: ${latitude}<br>Longitude: ${longitude}`;
}

// Get location when the page loads
getLocation();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}

function startBackgroundTask() {
  if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      command: "startBackgroundTask",
    });
  }
}

// // Fetch the items from the JSON file
// function loadItems() {
//   return fetch("data/data.json")
//     .then((response) => response.json())
//     .then((json) => json.items);
// }

// // Update the list with the given items
// function displayItems(items) {
//   const container = document.querySelector(".items");
//   container.innerHTML = items.map((item) => createHTMLString(item)).join("");
// }

// // Create HTML list item from the given data item
// function createHTMLString(item) {
//   return `
//     <li class="item">
//         <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
//         <span class="item__description">${item.gender}, ${item.size}</span>
//     </li>
//     `;
// }

// function onButtonClick(event, items) {
//   const dataset = event.target.dataset;
//   const key = dataset.key;
//   const value = dataset.value;

//   if (key == null || value == null) {
//     return;
//   }

//   displayItems(items.filter((item) => item[key] === value));
// }

// function setEventListeners(items) {
//   const logo = document.querySelector(".logo");
//   const buttons = document.querySelector(".buttons");
//   logo.addEventListener("click", () => displayItems(items));
//   buttons.addEventListener("click", (event) => onButtonClick(event, items));
// }

// // main
// loadItems()
//   .then((items) => {
//     displayItems(items);
//     setEventListeners(items);
//   })
//   .catch(console.log);
