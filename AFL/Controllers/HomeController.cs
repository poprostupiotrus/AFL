using AFL.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace AFL.Controllers
{
	[Route("/")]
	public class HomeController : Controller
	{
		private readonly ILogger<HomeController> _logger;

		public HomeController(ILogger<HomeController> logger)
		{
			_logger = logger;
		}
		[HttpGet("")]
		public IActionResult Druzyny()
		{
			return View();
		}
        [HttpGet("tabela")]
        public IActionResult Tabela()
		{
			return View();
		}
        [HttpGet("gry")]
        public IActionResult Gry()
        {
            return View();
        }
        [HttpGet("druzyna")]
        public IActionResult Druzyna([FromQuery] int? teamId)
        {
			if(!teamId.HasValue)
			{
				return RedirectToAction("Druzyny");
			}
            return View();
        }
        [HttpGet("nazywo")]
        public IActionResult NaZywo()
		{
			return View();
		}
    }
}
