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

        mMongoApp = new MongoApp(strMongoCon, strMongoDb);
    }

    [HttpGet("Property/Get/{id}")]
    public Property GetMongoItem2(string id)
    {
        return mMongoApp.GetProperty(id);
    }

    [HttpGet("Property/Remove/{id}")]
    public bool RemoveProperty(string id)
    {
        return mMongoApp.RemoveProperty(id);
    }

    [HttpGet("Properties/{emailAddress}")]
    public List<Property> GetProperties(string emailAddress)
    {
        return mMongoApp.GetProperties(emailAddress);
    }

    [HttpPost("Property/Add")]
    public async Task<Property> AddProperty(Property prop)
    {
        return mMongoApp.AddProperty(prop);
    }

    [HttpGet("Contacts/{emailAddress}")]
    public List<GoogleContact> GetContacts(string emailAddress)
    {
        return mMongoApp.GetContacts(emailAddress);
    }
}
