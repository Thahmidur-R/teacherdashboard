const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());


const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'database',
  password: 'password',
  port: 5432, 
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






     
