using Microsoft.AspNetCore.Mvc;
using HomeHistoryApi.Models;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Attributes;

namespace HomeHistory.Web.Controllers;

[ApiController]
[Route("[controller]")]
public class MongoController : ControllerBase
{
    public MongoController()
    {

    }

    [HttpGet("Property/{id}")]
    public Property GetMongoItem2(string id)
    {
        IMongoCollection<Property> objMT;

        var settings = MongoClientSettings.FromConnectionString("mongodb+srv://homeHistoryWeb:hhMongo2424@hhmongocluster.xccmy.mongodb.net/test?authSource=admin&replicaSet=atlas-nx3q95-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true");
        var client = new MongoClient(settings);
        var database = client.GetDatabase("ATTOM");
        objMT = database.GetCollection<Property>("Properties");

        return objMT.Find<Property>(s => s.Id == id).FirstOrDefault();
    }

    [HttpGet("Property/Remove/{id}")]
    public bool RemoveProperty(string id)
    {
        IMongoCollection<Property> objMT;

        var settings = MongoClientSettings.FromConnectionString("mongodb+srv://homeHistoryWeb:hhMongo2424@hhmongocluster.xccmy.mongodb.net/test?authSource=admin&replicaSet=atlas-nx3q95-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true");
        var client = new MongoClient(settings);
        var database = client.GetDatabase("ATTOM");
        objMT = database.GetCollection<Property>("Properties");

        objMT.DeleteOneAsync(s => s.Id == id);

        return true;
    }

    [HttpGet("Properties")]
    public List<Property> GetAllAsync()
    {
        IMongoCollection<Property> objMT;

        var settings = MongoClientSettings.FromConnectionString("mongodb+srv://homeHistoryWeb:hhMongo2424@hhmongocluster.xccmy.mongodb.net/test?authSource=admin&replicaSet=atlas-nx3q95-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true");
        var client = new MongoClient(settings);
        var database = client.GetDatabase("ATTOM");
        objMT = database.GetCollection<Property>("Properties");

        return objMT.Find(s => true).ToList();
    }

    [HttpPost("Property/Add")]
    public async Task<Property> CreateAsync(Property prop)
    {
        IMongoCollection<Property> objMT;

        var settings = MongoClientSettings.FromConnectionString("mongodb+srv://homeHistoryWeb:hhMongo2424@hhmongocluster.xccmy.mongodb.net/test?authSource=admin&replicaSet=atlas-nx3q95-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true");
        var client = new MongoClient(settings);
        var database = client.GetDatabase("ATTOM");
        objMT = database.GetCollection<Property>("Properties");

        await objMT.InsertOneAsync(prop);
        return prop;
    }

}
