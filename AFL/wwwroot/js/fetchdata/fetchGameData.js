export async function fetchGames(year, round, teamId) {
    let url = `/api/games/${year}`;
    url = round == undefined ? url : `${url}?round=${round}`;
    if (teamId != undefined) {
        url = round == undefined ? `${url}?teamId=${teamId}` : `${url}&teamId=${teamId}`;
    }
    const gameData = await fetch(url, { method: 'GET' }
    ).then(response => {
        return response.json();
    });
    return gameData;
}
export async function fetchLiveGames() {
    let url = `/api/games/live`;
    const gameData = await fetch(url, { method: 'GET' }
    ).then(response => {
        return response.json();
    });
    return gameData;
}