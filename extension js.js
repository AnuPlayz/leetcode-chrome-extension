async function getNonPremiumQuestions() {
    try {
      const response = await fetch('https://leetcode.com/api/problems/all/');
      const data = await response.json();
      let count = 0;
      for (let i = 0; i < data.stat_status_pairs.length && count < 3; i++) {
        if(!data.stat_status_pairs[i].paid_only){
          const question = document.createElement('div');
          question.innerHTML = `Title: ${data.stat_status_pairs[i].stat.question__title} <br> Difficulty: ${data.stat_status_pairs[i].difficulty.level} <br> Link: <a href='https://leetcode.com/problems/${data.stat_status_pairs[i].stat.question__title_slug}/'>https://leetcode.com/problems/${data.stat_status_pairs[i].stat.question__title_slug}/</a>`;
          document.body.appendChild(question);
          count++;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  getNonPremiumQuestions();
  