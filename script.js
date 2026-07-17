// Name Validation
function isValidName(name) {
  return /^[A-Za-z ]{3,}$/.test(name);
}

// Phone Validation
function isValidPhone(phone) {
  return /^[6-9]\d{9}$/.test(phone);
}

// Email Validation
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Positive Number Validation
function isPositiveNumber(value) {
  return Number(value) > 0;
}

// Address Validation
function isValidAddress(address) {
  return address.trim().length >= 10;
}

// Message Validation
function isValidMessage(message) {
  return message.trim().length >= 10;
}

// Date Validation
function isValidDate(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return new Date(date) >= today;
}

// ================= DONATE FORM =================

const donationForm = document.getElementById("donationForm");

if (donationForm) {

    donationForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();
        const foodType = document.getElementById("foodType").value;
        const quantity = document.getElementById("quantity").value;
        const address = document.getElementById("address").value.trim();
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const notes = document.getElementById("notes").value.trim();

        // Name Validation
        if (!/^[A-Za-z ]{3,}$/.test(name)) {
            alert("Please enter a valid name.");
            return;
        }

        // Phone Validation
        if (!/^[6-9]\d{9}$/.test(phone)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        // Email Validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Please enter a valid email.");
            return;
        }

        // Create Donation Object
        const donation = {
            name,
            phone,
            email,
            foodType,
            quantity,
            address,
            date,
            time,
            notes
        };

        // Get Existing Donations
        let donations = JSON.parse(localStorage.getItem("donations")) || [];

        // Add New Donation
        donations.push(donation);

        // Save Back to Local Storage
        localStorage.setItem("donations", JSON.stringify(donations));
        console.log(donations);

        alert("🎉 Donation Submitted Successfully!");

        donationForm.reset();

    });

}

// ================= REQUEST FORM =================

const requestForm = document.getElementById("requestForm");

if (requestForm) {

    requestForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("rname").value.trim();
        const phone = document.getElementById("rphone").value.trim();
        const email = document.getElementById("remail").value.trim();
        const people = document.getElementById("people").value;
        const foodNeeded = document.getElementById("foodNeeded").value;
        const address = document.getElementById("raddress").value.trim();
        const urgency = document.getElementById("urgency").value;
        const notes = document.getElementById("rnotes").value.trim();

        // Validation
        if (!/^[A-Za-z ]{3,}$/.test(name)) {
            alert("Please enter a valid name.");
            return;
        }

        if (!/^[6-9]\d{9}$/.test(phone)) {
            alert("Please enter a valid phone number.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Please enter a valid email.");
            return;
        }

        const request = {
            name,
            phone,
            email,
            people,
            foodNeeded,
            address,
            urgency,
            notes
        };

        let requests = JSON.parse(localStorage.getItem("requests")) || [];

        requests.push(request);

        localStorage.setItem("requests", JSON.stringify(requests));

        alert("✅ Food Request Submitted Successfully!");

        requestForm.reset();

    });

}

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector("textarea").value;

    if (!isValidName(name)) {
      alert("Enter a valid name.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Enter a valid email.");
      return;
    }

    if (!isValidMessage(message)) {
      alert("Message should contain at least 10 characters.");
      return;
    }

    alert("📩 Message Sent Successfully!");

    contactForm.reset();
  });
}

// ================= ADMIN DASHBOARD =================

const donationTable = document.getElementById("donationTable");
const totalDonations = document.getElementById("totalDonations");

if (donationTable && totalDonations) {

    let donations = JSON.parse(localStorage.getItem("donations")) || [];

    // Update Total Donations
    totalDonations.textContent = donations.length;

    // Clear the default row
    donationTable.innerHTML = "";

    // If no donations exist
    if (donations.length === 0) {

        donationTable.innerHTML =
        `<tr>
            <td colspan="4">No Donations Yet</td>
        </tr>`;

    } else {

        donations.forEach(function(donation,index){
             
            donationTable.innerHTML += `
                <tr>
                    <td>${donation.name}</td>
                    <td>${donation.foodType}</td>
                    <td>${donation.quantity}</td>
                    <td>${donation.phone}</td>
                    <td><button onclick="deleteDonation(${index})">Delete</button></td>

                </tr>
            `;

        });

    }

}

// ================= REQUEST DASHBOARD =================

const requestTable = document.getElementById("requestTable");
const totalRequests = document.getElementById("totalRequests");

if (requestTable && totalRequests) {

    let requests = JSON.parse(localStorage.getItem("requests")) || [];

    totalRequests.textContent = requests.length;

    requestTable.innerHTML = "";

    if (requests.length === 0) {

        requestTable.innerHTML = `
        <tr>
            <td colspan="4">No Requests Yet</td>
        </tr>
        `;

    } else {

        requests.forEach(function(request,index){

            requestTable.innerHTML += `
            <tr>
                <td>${request.name}</td>
                <td>${request.people}</td>
                <td>${request.foodNeeded}</td>
                <td>${request.phone}</td>
                <td><button onclick="deleteRequest(${index})">Delete</button></td>
            </tr>
            `;

        });

    }

}

function deleteDonation(index) {
  let donations = JSON.parse(localStorage.getItem("donations")) || [];

  donations.splice(index, 1);

  localStorage.setItem("donations", JSON.stringify(donations));

  alert("Donation Deleted Successfully!");

  location.reload();
}

function deleteRequest(index) {
  let requests = JSON.parse(localStorage.getItem("requests")) || [];

  requests.splice(index, 1);

  localStorage.setItem("requests", JSON.stringify(requests));

  alert("Request Deleted Successfully!");

  location.reload();
}
