import * as fetchTeamData from './fetchdata/fetchTeamData.js';
import { renderSpinner, hideSpinner } from './spinner.js';
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const teamId = Number(params.get('teamId'));
const imageSourceDomain = 'https://squiggle.com.au';

const allInfoContainer = document.querySelector('.all-info-container');
const spinnerContainer = document.querySelector('.spinner-container');

init();
async function init() {
    renderSpinner(spinnerContainer);
    const teamDetails = await fetchTeamData.fetchTeamDataById(teamId);
    hideSpinner(spinnerContainer);
    renderTeamInfoContainer(teamDetails.team);
    renderTeamStatsContainer(teamDetails.teamStanding);
}
function renderTeamInfoContainer(team) {
    const teamInfoContainer = document.createElement('div');
    teamInfoContainer.classList.add('team-info-container');
    const imageUrl = `${imageSourceDomain}${team.logo}`;
    const html = `
        <img src="${imageUrl}"/>
        <div class="single-info">Nazwa: ${team.name}</div>
        <div class="single-info">Debiut: ${team.debut}</div>
    `
    teamInfoContainer.innerHTML = html;
    allInfoContainer.append(teamInfoContainer);
}
function renderTeamStatsContainer(teamStanding) {
    const teamStatsContainer = document.createElement('div');
    teamStatsContainer.classList.add('team-stats-container');

    const teamStatsHeader = document.createElement('div');
    teamStatsHeader.classList.add('team-stats-header');
    teamStatsHeader.innerText = 'statystki z aktualnego sezonu';

    const teamStatsDetailContainer = document.createElement('div');
    teamStatsDetailContainer.classList.add('team-stats-detail-container');
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

    teamStatsContainer.append(teamStatsHeader);
    teamStatsContainer.append(teamStatsDetailContainer);

    allInfoContainer.append(teamStatsContainer);
}