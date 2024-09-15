const axios = require('axios');
const primeNumber = require('prime-number');

axios.get('https://bachood.beit.co.id/api/Test/TestBEIT')
  .then(response => {
        const names = response.data.listNama;
        const scores = response.data.listNilai;

        // Special Class (name contains C or O)
        const isSpecialClass = (name) => name.includes('C') && name.includes('O');

        // Class Division
        const classDivision = (score) => {
            if (score >= 50 && score < 60) return 5;
            if (score >= 60 && score < 70) return 6;
            if (score >= 70 && score < 80) return 7;
            if (score >= 80 && score < 90) return 8;
            if (score >= 90 && score <= 100) return 9;
            return null;
        };

        // Will Marry (score divisible by 7)
        const willMarry = (score) => score % 7 === 0;

        const willDie = (score) => primeNumber(score);
        
        const getDeathMonth = (score) => score % 10

        let classes = { 5: [], 6: [], 7: [], 8: [], 9: [], 10: [] };
        let marryStudents = [];
        let dyingStudents = [];

        names.forEach((name, index) => {
            const score = scores[index];

            if (isSpecialClass(name)) {
                classes[10].push({ name, score });
                if (willMarry(score)) {
                    marryStudents.push({ name, score, year: 2025 });
                  }
            } else {
                const classNum = classDivision(score);
                if (classNum) classes[classNum].push({ name, score });
            }

            if (willDie(score)) {
                const deathMonth = getDeathMonth(score);
                dyingStudents.push({ name, score, month: deathMonth, year: 2025 });
            }
        });


        // Output the results
        Object.keys(classes).forEach(cls => {
            console.log(`Class ${cls}:`, classes[cls]);
        });

        console.log("\nStudents who will marry in 2025:");
        marryStudents.forEach(student => {
            console.log(`${student.name} (Score: ${student.score}) will marry in ${student.year}`);
        });

        console.log("\nStudents who will die:");
        dyingStudents.forEach(student => {
            console.log(`${student.name} (Score: ${student.score}) will die in month ${student.month} ${student.year}`);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });