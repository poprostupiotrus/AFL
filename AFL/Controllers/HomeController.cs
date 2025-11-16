using AFL.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace AFL.Controllers
{
	[Route("/")]
	public class HomeController : Controller
	{
		[HttpGet("")]
		public IActionResult Teams()
		{
			return View();
		}
        [HttpGet("tabela")]
        public IActionResult Standings()
		{
			return View();
		}
        [HttpGet("gry")]
        public IActionResult Games()
        {
            return View();
        }
        [HttpGet("druzyna")]
        public IActionResult Team([FromQuery] int? teamId)
        {
			if(!teamId.HasValue)
			{
				return RedirectToAction("Teams");
			}
            return View();
        }
        [HttpGet("nazywo")]
        public IActionResult Live()
		{
			return View();
		}
    }
}
