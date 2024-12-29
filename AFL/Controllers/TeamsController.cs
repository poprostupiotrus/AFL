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
		public async Task<ActionResult<List<Team>>> GetTeams()
		{
			List<Team> teams = await _teamsApiService.GetAllTeams();
			return Ok(teams);
		}
		[HttpGet("{id}")]
		public async Task<ActionResult<TeamDetails>> GetTeamDetailsByTeamId(int id, [FromQuery] int year)
		{
			TeamDetails teamDetails = year == 0 ? await _teamsApiService.GetTeamDetailsByTeamId(id) : await _teamsApiService.GetTeamDetailsByTeamId(id, year);
			return Ok(teamDetails);
		}
		[HttpGet("standings/{year}/{round?}")]
		public async Task<ActionResult<List<TeamStanding>>> GetStandings(int year, int? round)
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
