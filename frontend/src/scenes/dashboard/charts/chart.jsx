import ScoresBar from "./scorebar";
import ScoreAttendanceScatter from "./scoreAttendanceScatter";


const Chart =({classInfo, chartType})=>{
    let chartInfo;
    
    
    if(chartType==="scores"){
     chartInfo=countStudentsByScoreRange(classInfo);
     return(
        <ScoresBar data={chartInfo} />
     )
    }
   
    else if(chartType==="scoreAttendance"){
return(
    <ScoreAttendanceScatter data={classInfo}/>
)
    }
  
return(
   <>

   </>
    
    
)
}



const countStudentsByScoreRange = (data) => {
    // Initialize arrays to hold the count of students for each score range
    const scoreRanges = Array.from({ length: 10 }, (_, i) => `${i * 10 + 1}-${(i + 1) * 10}`);
    const scoreCounts = {
        autumnScores: Array(10).fill(0),
        springScores: Array(10).fill(0),
        summerScores: Array(10).fill(0)
    };

    // Function to update score counts for a given score type
    const updateScoreCounts = (scoreType, score) => {
        if (!isNaN(score) && score >= 0 && score < 100) {
            const scoreIndex = Math.floor(score / 10);
            scoreCounts[scoreType][scoreIndex]++;
        }
    };

    // Iterate over the data to categorize the scores
    data.forEach((student) => {
        const autumnScore = parseFloat(student.autumn_score);
        const springScore = parseFloat(student.spring_score);
        const summerScore = parseFloat(student.summer_score);

        updateScoreCounts('autumnScores', autumnScore);
        updateScoreCounts('springScores', springScore);
        updateScoreCounts('summerScores', summerScore);
    });

    return { scoreRanges, ...scoreCounts };
};

export default Chart