export async function fetchTeamsData() {
    const url = `/api/teams`;
    const teamsData = await fetch(url, { method: 'GET' }
    ).then(response => {
        return response.json();
    });
    return teamsData;
}
export async function fetchTeamsDataByYear(year) {
    const url = `https://api.squiggle.com.au/?q=teams;year=${year}`;
    const teamsData = await fetch(url, { method: 'GET' }
    ).then(response => {
        return response.json();
    });
    return teamsData;
}
export async function fetchTeamDataById(id) {
    const url = `/api/teams/${id}`;
    const teamData = await fetch(url, { method: 'GET' }
    ).then(response => {
        return response.json();
    });
    return teamData;
}
export async function fetchTeamDataByIdAndYear(id,year) {
    const url = `/api/teams/${id}?year=${year}`;
    const teamData = await fetch(url, { method: 'GET' }
    ).then(response => {
        return response.json();
    });
    return teamData;
}
export async function fetchTeamStandings(year, round) {
    let url = `/api/teams/standings/${year}`;
    url = round == undefined ? url : `${url}/${round}`;
    const teamData = await fetch(url, { method: 'GET' }
    ).then(response => {
        return response.json();
    });
    return teamData;
}