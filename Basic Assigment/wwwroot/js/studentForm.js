﻿var rowIndex =-1;
function onFormSubmit() {
    debugger
    if (!validate()) {
        return false;
    }
    else {
        readFormData();
    }   
}
function readFormData() {
    
    var obj = {};
    obj["fullName"] = document.getElementById("fullName").value;
    obj["FthName"] = document.getElementById("FthName").value;
    obj["CNIC"] = document.getElementById("CNIC").value;
    obj["phone"] = document.getElementById("phone").value;
    obj["course"] = document.getElementById("course").value;
    obj["gender"];
    obj["condition"];
    var male = document.getElementById("male").checked
    if (male == true) {
        obj["gender"] = "male";
    } else {
        obj["gender"] = "female";
    }
    var active = document.getElementById("active").checked
    if (active == true) {
        obj["condition"] = "active";
    } else {
        obj["condition"] = "inactive";
    }
    var dataList = new Array();
    var arrayList = JSON.parse(localStorage.getItem("studentRecord"));
    if (arrayList !== null) {
        dataList = arrayList
    }
    if (rowIndex == -1) {

        dataList.push(obj)
    }
    else {
        dataList[rowIndex] = obj;
    }
    localStorage.setItem('studentRecord', JSON.stringify(dataList));
    PopulateDate();
    resetForm();
    
}
function PopulateDate() {
    
    var arraylist = JSON.parse(localStorage.getItem("studentRecord"));
    document.getElementById("tblStudent").innerHTML = '';
    var table = document.getElementById("tblStudent");
    for (var key in arraylist) {
        var data = arraylist[key];
        var newRow = table.insertRow(key);
        cell1 = newRow.insertCell(0);
        cell1.innerHTML = data.fullName;
        cell2 = newRow.insertCell(1);
        cell2.innerHTML = data.FthName;
        cell3 = newRow.insertCell(2);
        cell3.innerHTML = data.CNIC;
        cell4 = newRow.insertCell(3);
        cell4.innerHTML = data.phone;
        cell5 = newRow.insertCell(4);
        cell5.innerHTML = data.course;
        cell6 = newRow.insertCell(5);
        cell6.innerHTML = data.gender;
        cell7 = newRow.insertCell(6);
        cell7.innerHTML = data.condition;
        cell8 = newRow.insertCell(7);
        cell8.innerHTML = `<button class= "btn btn-primary" onClick="onEdit(this)">Edit</button>
                       <button class= "btn btn-danger" onClick="onDelete(this)">Delete</button>`;
    }

}


function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("FthName").value = "";
    document.getElementById("CNIC").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("course").value = "";
    rowIndex = -1;
}

function onEdit(td) {
    rowIndex = td.parentNode.parentNode.rowIndex - 1;
    var arraylist = JSON.parse(localStorage.getItem("studentRecord"));
    var obj = arraylist[rowIndex];
    document.getElementById("fullName").value = obj.fullName;
    document.getElementById("FthName").value = obj.FthName;
    document.getElementById("CNIC").value = obj.CNIC;
    document.getElementById("phone").value = obj.phone;
    document.getElementById("course").value = obj.course;
    document.getElementById("condition").value = obj.condition;
    resetForm();    
    
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fullName;
    selectedRow.cells[1].innerHTML = formData.FthName;
    selectedRow.cells[2].innerHTML = formData.CNIC;
    selectedRow.cells[3].innerHTML = formData.phone;
    selectedRow.cells[4].innerHTML = formData.course;
    selectedRow.cells[5].innerHTML = formData.condition;

}

function onDelete(td){
    if (confirm('Are you sure to delete this record ?')) {
        rowIndex = td.parentNode.parentNode.rowIndex - 1;
        var arraylist = JSON.parse(localStorage.getItem("studentRecord"));
        arraylist.splice(rowIndex, 1);
        localStorage.setItem('studentRecord', JSON.stringify(arraylist));
        PopulateDate();
    }
}
function validate() {
    isValid = true;
    var fullName = document.getElementById("fullName").value;
    var fthName = document.getElementById("FthName").value;
    var CNIC = document.getElementById("CNIC").value;
    var phone = document.getElementById("phone").value;
    var course = document.getElementById("course").value;

    var pjoneRejex = /^\d{11}$/;
   // cnicno.match(/^\d{5}-\d{7}-\d{1}$/)
    var CNICRejex = /^\d{5}-\d{7}-\d{1}$/;
    if (fullName.trim() == "") {
        document.getElementById("fullNameValidationError").style.display = "block";

    } else {
        document.getElementById("fullNameValidationError").style.display = "none";
    }
    if (fthName.trim() == "") {
        document.getElementById("fthNameValidationError").style.display = "block";

    } else {
        document.getElementById("fthNameValidationError").style.display = "none";
    }
    //if (CNIC == "") {
    //    document.getElementById("CNICnovalidationError").style.display = "block";

    //} else {
    //    document.getElementById("CNICnovalidationError").style.display = "none";
    //}
    if (CNIC == "") {
        document.getElementById("CNICnovalidationError").style.display = "block";
    }
    
    if (CNICRejex.test(CNIC)) {
        document.getElementById("CNICnovalidationError").style.display = "none";
    } else {
        document.getElementById("CNICnovalidationError").style.display = "block";
}

    if (phone == "") {

        document.getElementById("phonevalidationError").style.display = "block";

    }
    if (pjoneRejex.test(phone)) {
        document.getElementById("phonevalidationError").style.display = "none";

    } else
    {
        document.getElementById("phonevalidationError").style.display = "block";
    }
   
    //} else {
    //    document.getElementById("phonevalidationError").style.display = "none";
    //}

    if (fullName == "" || fthName == "" || CNIC == "" || phone == "" ) {
        return false;
    }
    if (!CNICRejex.test(CNIC)) {
        return false
    }
    //else {return false}
    if (!pjoneRejex.test(phone)) {
        return false;
    } 

    

    
    //    if (document.getElementById("fullName").value == "") {
    //        document.getElementById("fullNameValidationError").classList.remove("hide");
    //        isValid = false;
    //    } else {
    //        isValid = true;
    //        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
    //            document.getElementById("fullNameValidationError").classList.add("hide");
    //    } if (document.getElementById("FthName").value == "") {
    //        document.getElementById("fthNameValidationError").classList.remove("hide");
    //        isValid = false;
    //    } else {
    //        isValid = true;
    //        if(!document.getElementById("fthNameValidationError").classList.contains("hide"))
    //            document.getElementById("fthNameValidationError").classList.add("hide");

    //    } if(document.getElementById("CNIC").value == "") {
    //        document.getElementById("CNICvalidationError").classList.remove("hide");
    //        isValid = false;
    //    } else{
    //        isValid = true;
    //        if(!document.getElementById("CNICvalidationError").classList.contains("hide"))
    //            document.getElementById("CNICvalidationError").classList.add("hide");

    //    } if(document.getElementById("phone").value == "") {
    //        document.getElementById("phonevalidationError").classList.remove("hide");
    //        isValid = false;}
    //else {
    //    isValid = true;
    //    if (!document.getElementById("phonevalidationError").classList.contains("hide"))
    //        document.getElementById("phonevalidationError").classList.add("hide");
    //}
        //    //} if (document.getElementById("course").value == "select") {
        //    //    document.getElementById("courseValidationError").classList.remove("hide");
        //    //    isValid = false;

    return isValid;
    
    alert();
}

