using AFL.Models;

namespace AFL.Services.Interfaces
{
	public interface ITeamsApiService
	{
		public Task<List<Team>> GetAllTeams();
		public Task<TeamDetails> GetTeamDetailsByTeamId(int teamId, int year = -1);
		public Task<List<TeamStanding>> GetStandings(int year, int? round);
	}
}
