const sheetdb = 'https://sheetdb.io/api/v1/sqb92qg1v8gfy';
const credentials = [{username: "Luke",password: "!@#$%^&*()"},
                     {username: "Shas",password: "QWERTY"},
                     {username: "Tharun",password: "hdjdhf"},
                     {username: "Eli", password: "idhdft"}];
let trys = 0;


function obtain_os() {
    if (navigator.appVersion.indexOf("Win") != -1) {
        return ("Windows");
    }
    else if (navigator.appVersion.indexOf("Mac") != -1) {
        return ("MacOS");
    }
    else if (navigator.appVersion.indexOf("X11") != -1) {
        return ("Unix OS");
    }
    else if (navigator.appVersion.indexOf("Linux") != -1) {
        return ("Linux OS");
    }
    else {
        return ("Unknown OS");
    }
}


function browser_type() {
    if (navigator.userAgent.includes("Chrome")) {
        return ("Chrome");
    }
    if (navigator.userAgent.includes("Edge")) {
        return ("Microsoft_edge");
    }
    if (navigator.userAgent.includes("Firefox")) {
        return ("Firefox");
    }
    if (navigator.userAgent.includes("Safari")) {
        return ("Safari");
    }
    if (navigator.userAgent.includes("Opera")) {
        return ("Opera");
    }
    else {
        return ("Unknown Browser type");
    }
}


function staff_access(username,password) {
    const staff = credentials.find(cred => cred.username === username && cred.password === password);
    
    if (staff) {
        window.location.href = "(staff)STAFF_WEBSITE.html";
    }
    else {
        alert("Error wrong password and or username");
        document.getElementById("Incorrect").innerHTML="Incorrect password please try again";
    }
    
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}


function save_data() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const date_and_time = Date();
    const browser = browser_type();
    const OS = obtain_os();
    const correct_password = ("!@#$%^&*()");
    const correct_username = ("Luke");

    
    
    const passed_data = { username: username, 
                         password: password, 
                         browser:  browser,
                         OS: OS,
                         time: date_and_time};
    
    
    if (username === "" || password === "") {
        alert("Error: Please fill out both fields.");
        return false; 
    }
    fetch(sheetdb, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passed_data)
    })
    .then(response => response.json())
    .then(data => {
        alert("Data saved");
        
        staff_access(username,password);
    });
    
    return false;
}
 


function check_credentails_backend() {
    alert("function running");
    const username = document.getElementById("username_backend").value;
    const password = document.getElementById("password_backend").value;
    
    const master_username = "Luke";
    const master_password = "Reilly";

    if (username === master_username && password === master_password) {
        alert("If statment running");
        trys = 0;
        window.location.href = "https://docs.google.com/spreadsheets/d/1vvC2gncwu_QpH10UazBSnRUK2MSQ4v3H6cNxcw4dYQY/edit?usp=sharing";
    } 

    else if(trys >= 3) {
        alert("If statment running 22222222");
        alert("Too many failed attempts. Access denied.");
        document.getElementById("username_backend").value = ""; 
        document.getElementById("password_backend").value = ""; 
        return false; 
    } else {
        trys++;
        alert(`Wrong credentials. ${3 - trys} attempts remaining.`);
    }

    return false;
}




