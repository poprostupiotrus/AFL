using AFL.Models;
using AFL.Services;
using AFL.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AFL.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class GamesController : ControllerBase
	{
		private readonly IGamesApiService _gamesApiService;
		public GamesController(IGamesApiService gamesApiService)
		{
			_gamesApiService = gamesApiService;
		}
		[HttpGet("{year:int}")]
		public async Task<IActionResult> GetGames([FromRoute] int year, [FromQuery] int? round, [FromQuery] int? teamId)
		{
			List<Game> games = await _gamesApiService.GetGames(year, round, teamId);
			return Ok(games);
		}
		[HttpGet("live")]
		public async Task<IActionResult> GetLiveGames()
		{
			List<Game> games = await _gamesApiService.GetLiveGames();
			return Ok(games);
		}
	}
}
