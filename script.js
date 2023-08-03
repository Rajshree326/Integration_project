let bearerToken = null;

function authenticateUser() {
const login_id = document.getElementById("email").value;
const password = document.getElementById("password").value;

fetch("https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp", {
    method: "POST",
    body: JSON.stringify({ "login_id": login_id, "password": password }),
    headers: {
        "Content-Type": "application/json"
    }
})
.then(response => response.json())
.then(data => {
    if (data.token) {
        bearerToken = data.token;
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("customerForm").style.display = "block";
    } else {
        document.getElementById("result").innerText = "Authentication failed.";
    }
})
.catch(error => {
    document.getElementById("result").innerText = "Error occurred during authentication.";
});
}

function createCustomer() {
const firstName = document.getElementById("firstName").value;
const lastName = document.getElementById("lastName").value;
const street = document.getElementById("street").value;
const address = document.getElementById("address").value;
const city = document.getElementById("city").value;
const state = document.getElementById("state").value;
const email = document.getElementById("email").value;
const phone = document.getElementById("phone").value;

const data = {
    "first_name": firstName,
    "last_name": lastName,
    "street": street,
    "address": address,
    "city": city,
    "state": state,
    "email": email,
    "phone": phone
};

fetch("https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=create", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + bearerToken
    }
})
.then(response => {
    if (response.status === 201) {
        document.getElementById("result").innerText = "Successfully Created";
    } else if (response.status === 400) {
        document.getElementById("result").innerText = "First Name or Last Name is missing";
    } else {
        document.getElementById("result").innerText = "Error occurred while creating the customer.";
    }
})
.catch(error => {
    document.getElementById("result").innerText = "Error occurred while creating the customer.";
});
}

function getCustomerList() {
fetch("https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list", {
    method: "GET",
    headers: {
        "Authorization": "Bearer " + bearerToken
    }
})
.then(response => response.json())
.then(data => {
    let customerList = JSON.stringify(data);
    document.getElementById("result").innerText = customerList;
})
.catch(error => {
    document.getElementById("result").innerText = "Error occurred while getting the customer list.";
});
}

function deleteCustomer() {
const uuid = prompt("Enter the UUID of the customer to delete:");

if (!uuid) {
    document.getElementById("result").innerText = "UUID not found.";
    return;
}

const data = {
    "cmd": "delete",
    "uuid": uuid
};

fetch("https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + bearerToken
    }
})
.then(response => {
    if (response.status === 200) {
        document.getElementById("result").innerText = "Successfully deleted";
    } else if (response.status === 400) {
        document.getElementById("result").innerText = "UUID not found";
    } else {
        document.getElementById("result").innerText = "Error occurred while deleting the customer.";
    }
})
.catch(error => {
    document.getElementById("result").innerText = "Error occurred while deleting the customer.";
});
}

function updateCustomer() {
const uuid = prompt("Enter the UUID of the customer to update:");

if (!uuid) {
    document.getElementById("result").innerText = "UUID not found.";
    return;
}

const firstName = document.getElementById("firstName").value;
const lastName = document.getElementById("lastName").value;
const street = document.getElementById("street").value;
const address = document.getElementById("address").value;
const city = document.getElementById("city").value;
const state = document.getElementById("state").value;
const email = document.getElementById("email").value;
const phone = document.getElementById("phone").value;

const data = {
    "cmd": "update",
    "uuid": uuid,
    "first_name": firstName,
    "last_name": lastName,
    "street": street,
    "address": address,
    "city": city,
    "state": state,
    "email": email,
    "phone": phone
};

fetch("https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + bearerToken
    }
})
.then(response => {
    if (response.status === 200) {
        document.getElementById("result").innerText = "Successfully Updated";
    } else if (response.status === 400) {
        document.getElementById("result").innerText = "Body is Empty";
    } else if (response.status === 500) {
        document.getElementById("result").innerText = "UUID not found";
    } else {
        document.getElementById("result").innerText = "Error occurred while updating the customer.";
    }
})
.catch(error => {
    document.getElementById("result").innerText = "Error occurred while updating the customer.";
});
}