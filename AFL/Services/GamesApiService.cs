using AFL.Models;
using AFL.ResponseWrapper;
using AFL.Services.Interfaces;

namespace AFL.Services
{
	public class GamesApiService : IGamesApiService
	{
		private readonly IConfiguration _config;
		private readonly HttpClient _httpClient;
		public GamesApiService(HttpClient httpClient, IConfiguration config)
		{
			_httpClient = httpClient;
			_config = config;
			string agentName = _config["ServerAgentName"];
			_httpClient.DefaultRequestHeaders.UserAgent.ParseAdd(agentName);
		}
		public async Task<List<Game>> GetGames(int year, int? round, int? teamId)
		{
			string url = $"https://api.squiggle.com.au/?q=games;year={year}";
			url = round.HasValue ? $"{url};round={round}" : url;
			url = teamId.HasValue ? $"{url};team={teamId}" : url;
			try
			{
				GameResponseWrapper gameResponseWrapper = await DataFetcher.FetchDataFromRequest<GameResponseWrapper>(_httpClient, url);
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
				GameResponseWrapper gameResponseWrapper = await DataFetcher.FetchDataFromRequest<GameResponseWrapper>(_httpClient, url);
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
