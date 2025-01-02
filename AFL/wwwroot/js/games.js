import * as fetchGameData from './fetchdata/fetchGameData.js';
import * as fetchTeamData from './fetchdata/fetchTeamData.js';
import { renderSpinner, hideSpinner } from './spinner.js';

const rounds = 23;
const currentYear = new Date().getFullYear();
const firstSeasonYear = 1897;
const imageSourceDomain = 'https://squiggle.com.au';

const yearSelect = document.querySelector('#year-select');
const roundSelect = document.querySelector('#round-select');
const teamSelect = document.querySelector('#team-select');
const gamesContainer = document.querySelector('.games-container');
const spinnerContainer = document.querySelector('.spinner-container');
const notFoundContainer = document.querySelector('.not-found-container');

let chosenRound = undefined;
let chosenYear = currentYear;
let chosenTeamId = undefined;

const notFoundText = "Nie znaleziono żadnych gier.";

yearSelect.addEventListener('change', (event) => {
    chosenYear = Number(event.target.value);
    fetchDataAndRender();
});
roundSelect.addEventListener('change', (event) => {
    const round = Number(event.target.value)
    chosenRound = round == 0 ? undefined : round;
    fetchDataAndRender();
})
teamSelect.addEventListener('change', (event) => {
    const teamId = Number(event.target.value)
    chosenTeamId = teamId == 0 ? undefined : teamId;
    fetchDataAndRender();
})
init();

async function init() {
    addOptionsToYearSelect();
    addOptionsToRoundSelect();
    const teams = await fetchTeamData.fetchTeamsData();
    addTeamsToTeamSelect(teams);
    fetchDataAndRender();
}

async function fetchDataAndRender() {
    notFoundContainer.innerText = ''
    gamesContainer.innerHTML = '';
    spinnerContainer.innerHTML = '';
    renderSpinner(spinnerContainer);
    let [games, teamData] = await Promise.all([fetchGameData.fetchGames(chosenYear, chosenRound, chosenTeamId), fetchTeamData.fetchTeamsDataByYear(chosenYear)]);
    games = games.filter(game => game.complete !== 0);
    hideSpinner(spinnerContainer);
    if (games.length === 0) {
        notFoundContainer.innerText = notFoundText;
    }
    else {
        const teams = teamData.teams;
        addLogoUrlToGames(games, teams);
        renderGames(games);
    }
}
function renderGames(games) {
    let html = ''
    games.forEach(game => {
            let homeTeamColor = 'black';
            let ariveTeamColor = 'black';
            if (game.winnerteamid == game.hteamid) {
                homeTeamColor = 'green';
                ariveTeamColor = 'red';
            } else if (game.winnerteamid == game.ateamid) {
                homeTeamColor = 'red';
                ariveTeamColor = 'green';
            }
            const gameHtml = `
            <div class="game-container">

        <div class="stadium-and-date-container">${game.venue}, ${game.date}</div>

        <div class="game-result-container">

            <div class="team-container">

                <img src="${game.hteamlogo}">

                <div class="team-name-container">
                    ${game.hteam}
                </div>

            </div>

            <div class="score-container">
                <span style="color: ${homeTeamColor}">${game.hscore}</span> - <span style="color: ${ariveTeamColor}">${game.ascore}</span>

            </div>

            <div class="team-container">

                <img src="${game.ateamlogo}">

                <div class="team-name-container">
                    ${game.ateam}
                </div>

            </div>

        </div>

    </div>
        `
            html += gameHtml;
    });
    gamesContainer.innerHTML = html;
}
function addLogoUrlToGames(games, teamData) {
    games.forEach(game => {
        teamData.forEach(team => {
            if (game.hteamid === team.id) {
                game.hteamlogo = `${imageSourceDomain}${team.logo}`;
            }
            if (game.ateamid === team.id) {
                game.ateamlogo = `${imageSourceDomain}${team.logo}`;
            }
        });
    });
}

function addTeamsToTeamSelect(teams) {
    teams.forEach(team => {
        const teamOption = document.createElement('option');
        teamOption.innerText = team.name;
        teamOption.value = team.id;
        teamSelect.append(teamOption);
    })
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
 