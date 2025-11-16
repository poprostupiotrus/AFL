using AFL.Models;
using AFL.Services;
using AFL.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AFL.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class TeamsController : ControllerBase
	{
		private readonly ITeamsApiService _teamsApiService;
		public TeamsController(ITeamsApiService teamsApiService)
		{
			_teamsApiService = teamsApiService;
		}
		[HttpGet]
		public async Task<IActionResult> GetTeams()
		{
			List<Team> teams = await _teamsApiService.GetAllTeams();
			return Ok(teams);
		}
		[HttpGet("{id:int}")]
		public async Task<IActionResult> GetTeamDetailsByTeamId([FromRoute] int id, [FromQuery] int year)
		{
			TeamDetails teamDetails = year == 0 ? await _teamsApiService.GetTeamDetailsByTeamId(id) : await _teamsApiService.GetTeamDetailsByTeamId(id, year);
			return Ok(teamDetails);
		}
		[HttpGet("standings/{year:int}/{round:int?}")]
		public async Task<IActionResult> GetStandings([FromRoute] int year, [FromRoute] int? round)
		{
			List<TeamStanding> teamStandings;
			if (round.HasValue)
			{
				teamStandings = await _teamsApiService.GetStandings(year, round);
			} else {
				teamStandings = await _teamsApiService.GetStandings(year, 0);
			}
			return Ok(teamStandings);
		}
	}
}
