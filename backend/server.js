const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

/*queries
Select class_name FROM classes c join teachers t on c.teacher_id = t.teacher_id where t.teacher_id=1; this returns the class names of all of teacher 1 classes,
 i also want num students in each class
 SELECT 
        c.class_name,
        COUNT(sc.student_id) AS num_students
      FROM 
        classes c 
      JOIN 
        teachers t ON c.teacher_id = t.teacher_id 
      LEFT JOIN 
        student_classes sc ON c.class_id = sc.class_id
      WHERE 
        t.teacher_id = 1
      GROUP BY 
        c.class_name;;;;;;;;;;;;;;;;;;;
        this returns the class name and num students in that class of every class teacher_id 1 teaches
which is what i want to initially display in classtable;/////////////////
SELECT s.student_id, 
       s.first_name, 
       s.last_name, 
       sc.autumn_score, 
       sc.spring_score, 
       sc.summer_score
FROM Students s
JOIN Scores sc ON s.student_id = sc.student_id
WHERE sc.class_id = 1; 
this returns the scores of all the students in class 1 in this case as well as their names.
change sc.class_id to get a different class
*/
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Teacher Dashboard',
  password: 'Thahmid9999',
  port: 5432, // Default PostgreSQL port
});

app.get("/classdropdown",(req, res)=>{
pool.query(
  `SELECT 
  c.class_id, c.class_name
FROM classes c 
JOIN 
  teachers t ON c.teacher_id = t.teacher_id 

WHERE 
  t.teacher_id = 1;`,
  (err, result) => {
    if (err) {
      console.error('Error fetching class information:', err);
      res.status(500).json({ error: 'Error fetching class information' });
    } else {
     
      res.json(result.rows);
    }
  }
)
})

app.get("/classes", (req, res) => {
  
    // Query to get class information
    pool.query(
      
        `SELECT 
        c.class_id, c.class_name,
        COUNT(DISTINCT sc.student_id) AS num_students
      FROM 
        classes c 
      JOIN 
        teachers t ON c.teacher_id = t.teacher_id 
      LEFT JOIN 
        student_classes sc ON c.class_id = sc.class_id
      WHERE 
        t.teacher_id = 1
      GROUP BY 
      c.class_id, c.class_name;`,
        (err, classesResult) => {
          if (err) {
            console.error('Error fetching class information:', err);
            res.status(500).json({ error: 'Error fetching class information' });
          } else {
           
            res.json(classesResult.rows);
          }
        }
      
    
    )
  });

  app.get("/classes/:classId", (req, res) => {
    const classId = req.params.classId;

    pool.query(
        `SELECT s.student_id, 
                s.first_name, 
                s.last_name,
                scs.attendance, 
                sc.autumn_score, 
                sc.spring_score, 
                sc.summer_score
        FROM Students s
        JOIN Scores sc ON s.student_id = sc.student_id
        JOIN student_classes scs ON s.student_id = scs.student_id
        WHERE sc.class_id = $1
        AND scs.class_id = $1;`,
        [classId],
        (err, scoresResult) => {
            if (err) {
                console.error('Error fetching scores:', err);
                res.status(500).json({ error: 'Error fetching scores' });
            } else {
                console.log('Scores:', scoresResult.rows);
                res.json(scoresResult.rows);
            }
        }
    );
});

app.listen(8081, () => {
  console.log("Server is listening on port 8081");
});




/*
// Query to get the current timestamp
  pool.query('SELECT NOW()', (err, nowResult) => {
    if (err) {
      console.error('Error fetching current timestamp:', err);
      data.now = null;
    } else {
      data.now = nowResult.rows[0].now;
    }

    // Query to get teachers
    pool.query('SELECT * FROM Teachers', (err, teachersResult) => {
      if (err) {
        console.error('Error fetching teachers:', err);
        data.teachers = [];
      } else {
        data.teachers = teachersResult.rows;
      }

      // Query to get classes
      pool.query('SELECT * FROM Classes', (err, classesResult) => {
        if (err) {
          console.error('Error fetching classes:', err);
          data.classes = [];
        } else {
          data.classes = classesResult.rows;
        }

        // Query to get students
        pool.query('SELECT * FROM Students', (err, studentsResult) => {
          if (err) {
            console.error('Error fetching students:', err);
            data.students = [];
          } else {
            data.students = studentsResult.rows;
          }

          // Query to get scores
          pool.query('SELECT * FROM Scores', (err, scoresResult) => {
            if (err) {
              console.error('Error fetching scores:', err);
              data.scores = [];
            } else {
              data.scores = scoresResult.rows;
            }

            // Send the JSON response with all the data
            res.json(data);
          });
        });
      });
    });
  });
*/