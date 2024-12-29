using Newtonsoft.Json;
using System.Net.Http;
using System.Net;

namespace AFL
{
	public class DataFetcher
	{
		public static async Task<T> FetchDataFromRequest<T>(HttpClient httpClient, string url)
		{
			HttpResponseMessage response = await httpClient.GetAsync(url);
			if (response.StatusCode == HttpStatusCode.NoContent)
			{
				throw new Exception("Serwer API nie zwrocil zadnej zawartosci.");
			}
			else
			{
				response.EnsureSuccessStatusCode();
				string content = await response.Content.ReadAsStringAsync();
				T? dataResponse = JsonConvert.DeserializeObject<T>(content);
				return dataResponse;
			}
		}
	}
}
