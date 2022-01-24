using Microsoft.AspNetCore.Mvc;
using HomeHistoryApi.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace HomeHistory.Web.Controllers;

[ApiController]
[Route("[controller]")]
public class HomeHistoryItemsController : ControllerBase
{
    private readonly HomeHistoryContext _context;

    public HomeHistoryItemsController(HomeHistoryContext context)
    {
        _context = context;
    }

}
