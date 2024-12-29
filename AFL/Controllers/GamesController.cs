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
		[HttpGet("{year}")]
		public async Task<ActionResult<List<Game>>> GetGames(int year, [FromQuery] int? round, [FromQuery] int? teamId)
		{
			List<Game> games = await _gamesApiService.GetGames(year, round, teamId);
			return Ok(games);
		}
		[HttpGet("live")]
		public async Task<ActionResult<List<Game>>> GetLiveGames()
		{
			List<Game> games = await _gamesApiService.GetLiveGames();
			return Ok(games);
		}
	}
}
