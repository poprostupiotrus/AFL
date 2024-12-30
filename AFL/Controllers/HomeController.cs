using AFL.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace AFL.Controllers
{
	public class HomeController : Controller
	{
		private readonly ILogger<HomeController> _logger;

		public HomeController(ILogger<HomeController> logger)
		{
			_logger = logger;
		}

		public IActionResult Index()
		{
			return View();
		}
		public IActionResult Druzyny()
		{
			return View();
		}
		public IActionResult Tabela()
		{
			return View();
		}
	}
}
