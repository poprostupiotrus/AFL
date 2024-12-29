using AFL.Models;
using System.Text.Json.Serialization;

namespace AFL.ResponseWrapper
{
	public class TeamStandingsWrapper
	{
		[JsonPropertyName("standings")]
		public List<TeamStanding> Standings { get; set; } = new List<TeamStanding>();
	}
}
