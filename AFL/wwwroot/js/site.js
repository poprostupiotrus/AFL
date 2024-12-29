import * as fetchTeamData from './fetchdata/fetchTeamData.js'
import * as fetchGameData from './fetchdata/fetchGameData.js'
init()
async function init() {
    const teamData = await fetchGameData.fetchLiveGames();
    console.log(teamData);
}