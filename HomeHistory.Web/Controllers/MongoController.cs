using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Attributes;
using HomeHistory.AppLogic;

namespace HomeHistory.Web.Controllers;

[ApiController]
[Route("[controller]")]
public class MongoController : ControllerBase
{
    MongoClientSettings mSettings;
    MongoClient mClient;
    MongoApp mMongoApp;
    
    public MongoController()
    {
        string strMongoCon = "mongodb+srv://homeHistoryWeb:hhMongo2424@hhmongocluster.xccmy.mongodb.net/test?authSource=admin&replicaSet=atlas-nx3q95-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
        string strMongoDb = "ATTOM";

        // mSettings = MongoClientSettings.FromConnectionString("mongodb+srv://homeHistoryWeb:hhMongo2424@hhmongocluster.xccmy.mongodb.net/test?authSource=admin&replicaSet=atlas-nx3q95-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true");
        // mClient = new MongoClient(mSettings);

        mMongoApp = new MongoApp(strMongoCon, strMongoDb);
    }

    [HttpGet("Property/Get/{id}")]
    public Property GetMongoItem2(string id)
    {
        // IMongoCollection<Property> objMT;

        // var database = mClient.GetDatabase("ATTOM");
        // objMT = database.GetCollection<Property>("Properties");

        // return objMT.Find<Property>(s => s.Id == id).FirstOrDefault();

        return mMongoApp.GetProperty(id);
    }

    [HttpGet("Property/Remove/{id}")]
    public bool RemoveProperty(string id)
    {
        // IMongoCollection<Property> objMT;

        // var database = mClient.GetDatabase("ATTOM");
        // objMT = database.GetCollection<Property>("Properties");

        // objMT.DeleteOneAsync(s => s.Id == id);

        // return true;

        return mMongoApp.RemoveProperty(id);
    }

    [HttpGet("Properties/{emailAddress}")]
    public List<Property> GetAllAsync(string emailAddress)
    {
        // IMongoCollection<Property> objMT;

        // var database = mClient.GetDatabase("ATTOM");
        // objMT = database.GetCollection<Property>("Properties");

        // return objMT.Find(s => s.emailAddress == emailAddress).ToList();

        return mMongoApp.GetProperties(emailAddress);
    }

    [HttpPost("Property/Add")]
    public async Task<Property> CreateAsync(Property prop)
    {
        // IMongoCollection<Property> objMT;

        // var database = mClient.GetDatabase("ATTOM");
        // objMT = database.GetCollection<Property>("Properties");

        // await objMT.InsertOneAsync(prop);
        // return prop;

        return mMongoApp.AddProperty(prop);
    }

}
