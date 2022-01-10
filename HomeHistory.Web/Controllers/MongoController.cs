using Microsoft.AspNetCore.Mvc;
using HomeHistoryApi.Models;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace HomeHistory.Web.Controllers;

[ApiController]
[Route("[controller]")]
public class MongoController : ControllerBase
{
    private readonly MongoContext _context;

    public MongoController(MongoContext context)
    {
        _context = context;
    }

    // [HttpGet("{id}")]
    // public List<BsonDocument> GetMongoItem(long id)
    // {
    //     var settings = MongoClientSettings.FromConnectionString("mongodb+srv://homeHistoryWeb:hhWeb2424@hhmongocluster.xccmy.mongodb.net/ATTOM?retryWrites=true&w=majority");
    //     var client = new MongoClient(settings);
    //     var database = client.GetDatabase("ATTOM");
    //     var propCollection = database.GetCollection<BsonDocument>("Properties");

    //     return propCollection.Find<BsonDocument>(c => true).ToList();
    // }

}
