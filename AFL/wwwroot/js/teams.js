import * as fetchTeamData from './fetchdata/fetchTeamData.js'
const columns = 3;
const teamsForColumn = 6;
const teamColumnContainer = document.querySelector('.team-column-container');
init();
async function init() {
    const teamArray = await fetchTeamData.fetchTeamsData();
    const team2DArray = convertInto2DArray(teamArray);
    renderTeams(team2DArray);
}
function convertInto2DArray(teamArray) {
    const team2DArray = [];
    for (let i = 0; i < columns; i++) {
        if (!team2DArray[i]) {
            team2DArray[i] = [];
        }
        for (let j = 0; j < teamsForColumn; j++) {
            team2DArray[i][j] = teamArray[i * teamsForColumn + j];
        }
    }
    return team2DArray;
}
function renderTeams(teams2DArray) {
    teams2DArray.forEach((teams) => {
        const teamColumn = document.createElement('div');
        teamColumn.classList.add('team-column');
        teams.forEach(team => {
            const teamLogo = document.createElement('div');
            teamLogo.classList.add('team-logo');
            const img = document.createElement('img')
            img.src = `https://squiggle.com.au${team.logo}`;
            teamLogo.append(img);

            const teamNameContainer = document.createElement('div');
            teamNameContainer.classList.add('team');
            const a = document.createElement('a');
            a.href = '';
            a.innerText = team.name;
            teamNameContainer.append(a);

            teamColumn.append(teamLogo);
            teamColumn.append(teamNameContainer);
        });
        teamColumnContainer.append(teamColumn);
    })
}
/*
    <div class="team-column">
        <div class="team-logo">
            <img src="~/img/logo.png">
        </div>
        <div class="team"> 
            <a href="">Bosston Celtics</a>
        </div>
    </div>
*/