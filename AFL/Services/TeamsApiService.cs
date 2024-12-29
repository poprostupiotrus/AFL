using AFL.Models;
using AFL.ResponseWrapper;
using AFL.Services.Interfaces;
using Newtonsoft.Json;
using System;
using System.Net;
using static System.Net.WebRequestMethods;

namespace AFL.Services
{
	public class TeamsApiService : ITeamsApiService
	{
		private HttpClient httpClient;
		public TeamsApiService()
		{
			httpClient = new HttpClient();
			httpClient.DefaultRequestHeaders.UserAgent.ParseAdd("AFL-Server-Application");
		}
		public async Task<List<Team>> GetAllTeams()
		{
			string url = $"https://api.squiggle.com.au/?q=teams;year={DateTime.Now.Year}";
			try
			{
				TeamResponseWrapper teamResponseWrapper = await DataFetcher.FetchDataFromRequest<TeamResponseWrapper>(httpClient, url);
				List<Team> teams = teamResponseWrapper.Teams;
				return teams;
			}
			catch(Exception e)
			{
				Console.WriteLine(e.Message);
			}
			return new List<Team>();
		}
		public async Task<TeamDetails> GetTeamDetailsByTeamId(int teamId, int year = -1)
		{
			string teamUrl = year == -1 ? $"https://api.squiggle.com.au/?q=teams;team={teamId}" : $"https://api.squiggle.com.au/?q=teams;year={year};team={teamId}";
			string teamStandingsUrl = $"https://api.squiggle.com.au/?q=standings;year={DateTime.Now.Year}";
			try
			{
				TeamResponseWrapper teamResponse = await DataFetcher.FetchDataFromRequest<TeamResponseWrapper>(httpClient, teamUrl);
				TeamStandingsWrapper teamStandingsWrapper = await DataFetcher.FetchDataFromRequest<TeamStandingsWrapper>(httpClient, teamStandingsUrl);
				if(teamResponse.Teams.Count != 0)
				{
					TeamDetails teamDetails = new TeamDetails()
					{
						Team = teamResponse.Teams[0],
						TeamStanding = teamStandingsWrapper.Standings.Find(team => team.Id == teamId)
					};
					return teamDetails;
				}
			}
			catch(Exception e)
			{
				Console.WriteLine(e.Message);
			}
			return new TeamDetails();
		}
		public async Task<List<TeamStanding>> GetStandings(int year, int? round)
		{
			string url = $"https://api.squiggle.com.au/?q=standings;year={year}";
			url = round > 0 ? $"{url};round={round}" : url;
			try
			{
				TeamStandingsWrapper teamStandingsWrapper = await DataFetcher.FetchDataFromRequest<TeamStandingsWrapper>(httpClient, url);
				if(teamStandingsWrapper.Standings.Count != 0)
				{
					return teamStandingsWrapper.Standings;
				}
			}
			catch(Exception e)
			{
				Console.WriteLine(e.Message);
			}
			return new List<TeamStanding>();
		}
	}
}
