namespace AFL.Models
{
	public class Team
	{
		public string Name { get; set; } = string.Empty;
		public int Debut { get; set; }
		public int Id { get; set; }
		public string Abbrev { get; set; } = string.Empty;
		public string Logo { get; set; } = string.Empty;
		public int Retirement { get; set; }
	}
}
