namespace AFL.Models
{
	public class Game
	{
		public string venue { get; set; } = string.Empty;
		public int is_final { get; set; }
		public int ascore { get; set; }
		public int agoals { get; set; }
		public int abehinds { get; set; }
		public string hteam { get; set; } = string.Empty;
		public string localtime { get; set; } = string.Empty;
		public int ateamid { get; set; }
		public int hscore { get; set; }
		public string ateam { get; set; } = string.Empty;
		public int hbehinds { get; set; }
		public int? winnerteamid { get; set; }
		public int hgoals { get; set; }
		public int hteamid { get; set; }
		public string tz { get; set; } = string.Empty;
		public int year { get; set; }
		public string updated { get; set; } = string.Empty;
		public int is_grand_final { get; set; }
		public int round { get; set; }
		public int id { get; set; }
		public string winner { get; set; }
		public object timestr { get; set; }
		public int unixtime { get; set; }
		public int complete { get; set; }
		public string date { get; set; }
		public string roundname { get; set; }
	}
}
