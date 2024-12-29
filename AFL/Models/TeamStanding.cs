using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace AFL.Models
{
	public class TeamStanding
	{
		[JsonProperty("id")]
		public int Id { get; set; }

		[JsonProperty("rank")]
		public int Rank { get; set; }

		[JsonProperty("played")]
		public int Played { get; set; }

		[JsonProperty("for")]
		public int For { get; set; }

		[JsonProperty("name")]
		public string Name { get; set; } = string.Empty;

		[JsonProperty("percentage")]
		public double Percentage { get; set; }

		[JsonProperty("goals_for")]
		public int GoalsFor { get; set; }

		[JsonProperty("against")]
		public int Against { get; set; }

		[JsonProperty("behinds_for")]
		public int BehindsFor { get; set; }

		[JsonProperty("behinds_against")]
		public int BehindsAgainst { get; set; }

		[JsonProperty("losses")]
		public int Losses { get; set; }

		[JsonProperty("goals_against")]
		public int GoalsAgainst { get; set; }

		[JsonProperty("draws")]
		public int Draws { get; set; }

		[JsonProperty("wins")]
		public int Wins { get; set; }

		[JsonProperty("pts")]
		public int Pts { get; set; }
	}
}
