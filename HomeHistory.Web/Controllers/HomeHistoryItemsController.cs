using Microsoft.AspNetCore.Mvc;
using HomeHistoryApi.Models;

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

    [HttpPost]
    public async Task<ActionResult<HomeHistoryApi.Models.HomeHistoryItem>> PostHomeHistoryItem(HomeHistoryApi.Models.HomeHistoryItem homeHistoryItem)
    {
        _context.HomeHistoryItems.Add(homeHistoryItem);
        await _context.SaveChangesAsync();

        //return CreatedAtAction("GetTodoItem", new { id = todoItem.Id }, todoItem);
        return CreatedAtAction(nameof(GetHomeHistoryItem), new { id = homeHistoryItem.Id }, homeHistoryItem);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<HomeHistoryItem>> GetHomeHistoryItem(long id)
    {
        var homeHistoryItem = await _context.HomeHistoryItems.FindAsync(id);

        if (homeHistoryItem == null)
        {
            return NotFound();
        }

        return homeHistoryItem;
    }

    // [HttpPut("{id}")]
    // public async Task<IActionResult> PutTodoItem(long id, HomeHistoryItem homeHistoryItem)
    // {
    //     if (id != homeHistoryItem.Id)
    //     {
    //         return BadRequest();
    //     }

    //     _context.Entry(homeHistoryItem).State = EntityState.Modified;

    //     try
    //     {
    //         await _context.SaveChangesAsync();
    //     }
    //     catch (DbUpdateConcurrencyException)
    //     {
    //         if (!HomeHistoryExists(id))
    //         {
    //             return NotFound();
    //         }
    //         else
    //         {
    //             throw;
    //         }
    //     }

    //     return NoContent();
    // }
}
