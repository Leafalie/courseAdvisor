"use strict";

/**
 * Function: search()
 * Filters the courseList table based on the input in the searchBar
 * Filter works on both the courseName ("Data Structures") and courseCode ("CS341")
 */  
function search() {
    var input = document.getElementById("searchBar");
    var filter = input.value.toUpperCase();
    var table = document.getElementById("courseList");
    var tr = table.getElementsByTagName("tr");
    var courseCode, courseName;
    var allGone = true; 

    for (var i = 1; i < tr.length; i++) { // for each row
        courseCode = tr[i].getElementsByTagName("td")[1];  
        courseName = tr[i].getElementsByTagName("td")[2];
        if (courseName || courseCode) { 
            var txtValue1 = courseName.textContent || courseName.innerText;
            var txtValue2 = courseCode.textContent || courseCode.innerText;
            // if the code or name is found
            if (txtValue1.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                allGone = false;
            } else {
                tr[i].style.display = "none";
             }
        }
    }

    // if every class was filtered out, display message
    document.getElementById("emptyMessage").style.display = (allGone) ? "" : "none";
}

/**
 * Function: markPrerequsities(code)
 * code = the class code to find prerequisites for (eg. "CS341")
 * If the "automatically mark prerequisites" option is clicked,
 * it will automatically check all of the class's prerequisties, 
 * and then call this function again for each class.
 * @param code - the class to mark all prerequistes of
 */
function markPrerequisties(code){
    event.stopPropagation(); // stops clicking the checkbox from running this twice
    // runs whenever a row is clicked
    if(document.getElementById(code).checked){  // only if we checked, not UNchecked
        document.getElementById("headerCheckbox").firstChild.checked = true; // mark header checkbox
        if (document.getElementById("marker").checked){ // only if setting is checked
            // find which we just clicked
            var table = document.getElementById("courseList");
            var tr = table.getElementsByTagName("tr");
            var prereqs = "";
            // get prerequistes
            for (var i = 1; i < tr.length; i++) {
                if (tr[i].getElementsByTagName("td")[1].innerText == code){
                    prereqs = tr[i].getElementsByTagName("td")[3].innerText.replace(/,/g, '').split(" ");
                    break;
                }
            }
            // if none, end
            if (prereqs[0] != ""){
                for (var i = 0; i < prereqs.length; i++){
                    // find by id name
                    var box = document.getElementById(prereqs[i]);
                    if (box != null){
                        box.checked = true;
                        markPrerequisties(prereqs[i]);
                    }
                }
            }  
        } 
    }
}

/**
 * Function: findPossible()
 * Makes a new table with only courses that have all prerequisties checked
 */   
function findPossible(){
    var table = document.getElementById("courseList");
    var tr = table.getElementsByTagName("tr");
    for (var i = 1; i < tr.length; i++) { // for each class
        var prereqs = tr[i].getElementsByTagName("td")[3].innerText.replace(/,/g, '').split(" ");
        if (tr[i].getElementsByTagName("input")[0].checked){ // if the class is checked
            tr[i].style.display = "none";  // make invisible
        } else if(prereqs[0] == ""){ // if no prereqs
            tr[i].style.display = "";
        } else{
            tr[i].style.display = "";
            // loop through list
            for (var j = 1; j < tr.length; j++) { // for each row
                // if class is in prereqs
                var place = prereqs.indexOf(tr[j].getElementsByTagName("td")[1].innerText);
                if (place >= 0){ // if in array
                    if (tr[j].getElementsByTagName("input")[0].checked){
                        prereqs[place] = "Yes";
                    }
                } 
            }
            for (var j = 0; j < prereqs.length; j++){
                // if there was an or, check that there's a yes on at least one side
                if(prereqs[j] == "or"){
                    if (prereqs[j - 1] != "Yes" && prereqs[j + 1] != "Yes"){
                        tr[i].style.display = "None";
                    }
                } else if (prereqs[j] != "Yes" && prereqs[j - 1] != "or" && prereqs[j + 1] != "or"){
                    // if it's not "yes" AND it's not before or after an "or"
                    tr[i].style.display = "None";
                }
            }
        }
    }
}

/**
 * Function: back
 * Makes all table elements visible again
 */
function back(){
    var table = document.getElementById("courseList");
    var tr = table.getElementsByTagName("tr");
    for (var i = 1; i < tr.length; i++) { // for each class
        tr[i].style.display = "";  // make invisible
    }
}

/**
 * Function: toggleAll()
 * Checks or unchecks every row
 */
function toggleAll(){
    var setting = document.getElementById("headerCheckbox").firstChild.checked;
    var table = document.getElementById("courseList");
    var tr = table.getElementsByTagName("tr");
    for (var i = 1; i < tr.length; i++) { // for each row
        tr[i].getElementsByTagName("input")[0].checked = setting;
    }
}

/**
 * Function: selectRow()
 * Checks the box on the row clicked
 * @param row - the row to check
 */
function selectRow(row){
    var box = row.firstChild.firstChild; // first td, which had first input
    box.checked = (box.checked) ? false : true; // toggle checkbox
    markPrerequisties(box.id);
}