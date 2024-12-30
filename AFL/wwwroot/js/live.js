import * as fetchGameData from './fetchdata/fetchGameData.js';
import * as fetchTeamData from './fetchdata/fetchTeamData.js';
const imageSourceDomain = 'https://squiggle.com.au';
const gamesContainer = document.querySelector('.games-container');
const currentYear = new Date().getFullYear();
init();
function init() {
    fetchDataAndRender();
}
async function fetchDataAndRender() {
    const [games, teamData] = await Promise.all([fetchGameData.fetchLiveGames(), fetchTeamData.fetchTeamsDataByYear(currentYear)]);
    const teams = teamData.teams;
    addLogoUrlToGames(games, teams);
    renderGames(games);
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