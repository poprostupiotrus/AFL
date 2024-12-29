using AFL.Models;

namespace AFL.Services.Interfaces
{
	public interface IGamesApiService
	{
		public Task<List<Game>> GetGames(int year, int? round, int? teamId);
		public Task<List<Game>> GetLiveGames();
	}
}
