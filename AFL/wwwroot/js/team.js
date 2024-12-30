import * as fetchTeamData from './fetchdata/fetchTeamData.js';
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const teamId = Number(params.get('teamId'));
const imageSourceDomain = 'https://squiggle.com.au';

const teamInfoContainer = document.querySelector('.team-info-container');
const teamStatsDetailContainer = document.querySelector('.team-stats-detail-container');
init();
async function init() {
    const teamDetails = await fetchTeamData.fetchTeamDataById(teamId);
    console.log(teamDetails);
    renderTeamInfoContainer(teamDetails.team);
    renderTeamStatsDetailContainer(teamDetails.teamStanding);
}
function renderTeamInfoContainer(team) {
    const imageUrl = `${imageSourceDomain}${team.logo}`;
    const html = `
        <img src="${imageUrl}"/>
        <div class="single-info">Nazwa: ${team.name}</div>
        <div class="single-info">Debiut: ${team.debut}</div>
    `
    teamInfoContainer.innerHTML = html;
}
function renderTeamStatsDetailContainer(teamStanding) {
    const html = `
                <div class="single-info">Miejsce w tabeli: ${teamStanding.rank}</div>
                <div class="single-info">Punkty w lidze: ${teamStanding.pts}</div>
                <div class="single-info">Ilosc wygranych: ${teamStanding.wins}</div>
                <div class="single-info">ilosc remisów: ${teamStanding.draws}</div>
                <div class="single-info">ilosc przegranych: ${teamStanding.losses}</div>
                <div class="single-info">Liczba zdobytych goli: ${teamStanding.goalsFor}</div>
                <div class="single-info">Liczba bramek zdobytych przez behind: ${teamStanding.behindsFor}</div>
                <div class="single-info">Łączna liczba zdobytych punktów: ${teamStanding.for}</div>
                <div class="single-info">Liczba straconych goli: ${teamStanding.goalsAgainst}</div>
                <div class="single-info">Liczba bramek straconych przez behind: ${teamStanding.behindsAgainst}</div>
                <div class="single-info">Łączna liczba straconych punktów: ${teamStanding.against}</div>
    `
    teamStatsDetailContainer.innerHTML = html;
}