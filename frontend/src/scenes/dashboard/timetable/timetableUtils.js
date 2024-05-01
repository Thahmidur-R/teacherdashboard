const generateTimetable = (weeks) => {
    const timetable = [];

    for (let i = 0; i < weeks; i++) {
        const week = [];

        // Determine whether it's week 1 or week 2
        const isWeek1 = i % 2 === 0;
       
       
        // Week 1 - Monday to Friday
        for (let j = 0; j < 5; j++) {
            const date = new Date();
    
            // Find the nearest Monday
            date.setDate(date.getDate() - date.getDay() + 1); // Adjust to Monday of the current week
            date.setDate(date.getDate() + (7 * i) + j); // Set date to current Monday + (7 * i) + j days
            
            const events = [];
            
            // Monday
            if (j === 0) {
                
                events.push(
                    isWeek1
                        ? { title: 'y11_s1', startTime: '09:10', endTime: '10:50' }
                        : { title: 'y11_s3', startTime: '09:10', endTime: '10:50' },
                    isWeek1
                        ? { title: 'y11_s3', startTime: '11:10', endTime: '13:00' }
                        : { title: 'y10_s3', startTime: '11:10', endTime: '13:00' },
                    isWeek1
                        ? { title: 'y10_s3', startTime: '13:50', endTime: '15:30' }
                        : { title: 'y9_s2', startTime: '13:50', endTime: '15:30' }
                );
                
            }
            // Tuesday
            else if (j === 1) {
                events.push(
                    isWeek1
                        ? { title: 'y9_s2', startTime: '09:10', endTime: '10:50' }
                        : { title: 'y11_s1', startTime: '09:10', endTime: '10:50' },
                    isWeek1
                        ? { title: 'y11_s1', startTime: '11:10', endTime: '13:00' }
                        : { title: 'y11_s3', startTime: '11:10', endTime: '13:00' },
                    isWeek1
                        ? { title: 'y11_s3', startTime: '13:50', endTime: '15:30' }
                        : { title: 'y10_s3', startTime: '13:50', endTime: '15:30' }
                );
            }
            // Wednesday
            else if (j === 2) {
                events.push(
                    isWeek1
                        ? { title: 'y11_s1', startTime: '09:10', endTime: '10:50' }
                        : { title: 'y11_s3', startTime: '09:10', endTime: '10:50' },
                    isWeek1
                        ? { title: 'y11_s3', startTime: '11:10', endTime: '13:00' }
                        : { title: 'y10_s3', startTime: '11:10', endTime: '13:00' },
                    isWeek1
                        ? { title: 'y10_s3', startTime: '13:50', endTime: '15:30' }
                        : { title: 'y9_s2', startTime: '13:50', endTime: '15:30' }
                );
            }
            // Thursday
            else if (j === 3) {
                events.push(
                    isWeek1
                        ? { title: 'y10_s3', startTime: '09:10', endTime: '10:50' }
                        : { title: 'y9_s2', startTime: '09:10', endTime: '10:50' },
                    isWeek1
                        ? { title: 'y9_s2', startTime: '11:10', endTime: '13:00' }
                        : { title: 'y11_s1', startTime: '11:10', endTime: '13:00' },
                    isWeek1
                        ? { title: 'y11_s1', startTime: '13:50', endTime: '15:30' }
                        : { title: 'y11_s3', startTime: '13:50', endTime: '15:30' }
                );
            }
            // Friday
            else if (j === 4) {
                events.push(
                    isWeek1
                        ? { title: 'y11_s1', startTime: '09:10', endTime: '10:50' }
                        : { title: 'y10_s3', startTime: '09:10', endTime: '10:50' },
                    isWeek1
                        ? { title: 'y9_s2', startTime: '11:10', endTime: '13:00' }
                        : { title: 'y11_s1', startTime: '11:10', endTime: '13:00' },
                    isWeek1
                        ? { title: 'y11_s1', startTime: '13:50', endTime: '15:30' }
                        : { title: 'y11_s3', startTime: '13:50', endTime: '15:30' }
                );
            }
            
            week.push({ date, events });
        }

        timetable.push(week);
       
    }

    return timetable;
};

export default generateTimetable