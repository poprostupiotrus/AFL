import * as fetchTeamData from './fetchdata/fetchTeamData.js'
const rounds = 23;
const currentYear = new Date().getFullYear();
const firstSeasonYear = 1897;
const yearSelect = document.querySelector('#year-select');
const roundSelect = document.querySelector('#round-select');
const imageSourceDomain = 'https://squiggle.com.au';
const tBody = document.querySelector('tbody');
let chosenRound = undefined;
let chosenYear = currentYear;
yearSelect.addEventListener('change', (event) => {
    chosenYear = Number(event.target.value);
    fetchDataAndRender()
});
roundSelect.addEventListener('change', (event) => {
    const round = Number(event.target.value)
    chosenRound = round == 0 ? undefined : round;
    fetchDataAndRender()
})
init();
function init() {
    addOptionsToYearSelect();
    addOptionsToRoundSelect();
    fetchDataAndRender()
}

function addOptionsToYearSelect() {
    for (let i = currentYear; i >= firstSeasonYear; i--) {
        const yearOption = document.createElement('option');
        yearOption.value = i;
        yearOption.innerText = i;
        yearSelect.append(yearOption);
    }
}
function addOptionsToRoundSelect() {
    for (let i = 1; i <= rounds; i++) {
        const roundOption = document.createElement('option');
        roundOption.value = i;
        roundOption.innerText = i;
        roundSelect.append(roundOption);
    }
}
async function fetchDataAndRender() {
    const [standings, teamData] = await Promise.all([fetchTeamData.fetchTeamStandings(chosenYear, chosenRound), fetchTeamData.fetchTeamsDataByYear(chosenYear)]);
    const teams = teamData.teams;
    addLogoUrlToStandings(standings, teams);
    tBody.innerHTML = '';
    renderStandings(standings);
}
function addLogoUrlToStandings(standings, teamData) {
    standings.forEach((standing) => {
        teamData.forEach((team) => {
            if (standing.id === team.id) {
                standing.logo = `${imageSourceDomain}${team.logo}`;
            }
        })
    })
}
function renderStandings(standings) {
    let rank = 1;
    standings.forEach((standing) => {
        const html = `
            <tr class="team-row">
            <td>
                <div class="table-standings-team-cell">
                    <div class="rank-number-container">${rank}</div>
                    <img class="team-image" src="${standing.logo}" />
                    <div class="team-name">${standing.name}</div>
                </div>
            </td>
            <td>${standing.pts}</td>
            <td>${standing.wins}</td>
            <td>${standing.losses}</td >
            <td>${standing.draws}</td>
        </tr>`
        tBody.innerHTML += html;
        rank++;
    });
}