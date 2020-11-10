<!DOCTYPE html>
<html>
    <head>
        <title>Course Advisor</title>
        <meta charset="UTF-8"> 
        <meta name="author" content="Alissa Teigland">
        <script src="advisor.js"></script>
        <link rel="stylesheet" href="advisor.css"> 
    </head>
    <body>
        <?php
            $catalogLink = "https://catalog.winona.edu/content.php?catoid=21&navoid=2122";
            // get course data
            $filename = "courses.json";
            $contents = file_get_contents($filename);
            $courses = json_decode($contents, true);
        ?>
        <div id="Instructions">
            <h1>Course Advisor</h1>
            <p> Want to learn more about a particular course? Click <a target="_blank" href=https://catalog.winona.edu/content.php?filter%5B27%5D=CS&filter%5B29%5D=&filter%5Bcourse_type%5D=-1&filter%5Bkeyword%5D=&filter%5B32%5D=1&filter%5Bcpage%5D=1&cur_cat_oid=21&expand=&navoid=2125&search_database=Filter#acalog_template_course_filter">here</a>!</p>
            <p><b>Instructions: </b> First select all the courses you have taken, then hit "Submit" to show all the courses you can take!<br>To make selecting courses easier, you can search for courses, and you can choose to automatically select course prerequisites.<br><i>Tip! Hoping to take a specific course? Search for it to see what prerequisites you'll have to take first!</i> </p>
            <p>Courses in <i>italics</i> are part of the Computer Science Core are are required for all Computer Science majors.<br>Different major options have additional required courses, which you can view in the <a target="_blank" href=<?php echo $catalogLink ?>>catalog</a>.</p>
            <p>This site is not offical, and courses are subject to change at any time. For offical course listings, view the <a target="_blank" href=<?php echo $catalogLink ?>>catalog</a>.</p>
            <label for="marker">Automatically check prerequistes: </label> <input type=checkbox id="marker"><br>
            <input type="text" id="searchBar" onkeyup="search()" placeholder="Search for a class...">
            <input type="button" value="Submit" onclick="findPossible()">
            <input type="button" value="Back" onclick="back()"><br> 
        </div>
        <table id="courseList">
            <thead>
                <tr>
                    <th id="headerCheckbox"><input type="checkbox" onclick="toggleAll()"></th>
                    <th id="codeHeader">Course Code</th>
                    <th id="titleHeader">Title</th>
                    <th id="prereqHeader">Prerequisites</th>
                </tr>
            </thead>
            <tbody>
            <!-- Insert a new row per class -->
            <?php   
                foreach($courses as $key) {
                    if ($key[program] == "Core"){ // make core classes italics 
                        echo "<tr onclick=\"selectRow(this)\" style=\"font-style: italic;\">";
                    } else {
                        echo "<tr onclick=\"selectRow(this)\">";
                    }
                    // add row data
                    echo "<td><input type=\"checkbox\" onclick=\"markPrerequisties(this.id)\" id=" . $key[code] . "></td>";
                    echo "<td>" . $key[code] . "</td>";
                    echo "<td>" . $key[name] . "</td>";   
                    echo "<td>";
                    // add prereqs
                    for ($i = 0; $i < count($key[prerequisites]) - 1; $i++){
                        echo $key[prerequisites][$i] . ", ";
                    }
                    echo end($key[prerequisites]);
                    echo "</td>";
                    echo "</tr>";
                }
            ?>
            </tbody>
        </table>
        <p id="emptyMessage" style="display: none;">Looks like there's nothing here! Try a different search.</p>
    </body>
</html>
