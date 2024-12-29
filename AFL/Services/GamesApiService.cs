using AFL.Models;
using AFL.ResponseWrapper;
using AFL.Services.Interfaces;

namespace AFL.Services
{
	public class GamesApiService : IGamesApiService
	{
		private HttpClient httpClient;
		public GamesApiService()
		{
			httpClient = new HttpClient();
			httpClient.DefaultRequestHeaders.UserAgent.ParseAdd("AFL-Server-Application");
		}
		public async Task<List<Game>> GetGames(int year, int? round, int? teamId)
		{
			string url = $"https://api.squiggle.com.au/?q=games;year={year}";
			url = round.HasValue ? $"{url};round={round}" : url;
			url = teamId.HasValue ? $"{url};team={teamId}" : url;
			try
			{
				GameResponseWrapper gameResponseWrapper = await DataFetcher.FetchDataFromRequest<GameResponseWrapper>(httpClient, url);
				if(gameResponseWrapper != null)
				{
					return gameResponseWrapper.games;
				}
			}
			catch(Exception e)
			{
				Console.WriteLine(e.Message);
			}
			return new List<Game>();
		}
		public async Task<List<Game>> GetLiveGames()
		{
			string url = $"https://api.squiggle.com.au/?q=games;live=1";
			try
			{
				GameResponseWrapper gameResponseWrapper = await DataFetcher.FetchDataFromRequest<GameResponseWrapper>(httpClient, url);
				if (gameResponseWrapper != null)
				{
					return gameResponseWrapper.games;
				}
			}
			catch(Exception e)
			{
				Console.WriteLine(e.Message);
			}
			return new List<Game>();
		}
	}
}
