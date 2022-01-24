using System.Net.Http;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Attributes;

namespace HomeHistory.AppLogic;

/*
This class will be used for all Mongo based app logic and access
*/
public class MongoApp {

    MongoClientSettings mSettings;
    MongoClient mClient;
    IMongoDatabase mDb;

    public MongoApp(string connectionString, string database) {    
        mSettings = MongoClientSettings.FromConnectionString(connectionString);
        mClient = new MongoClient(mSettings);   
        mDb = mClient.GetDatabase(database);  // ATTOM
    }

    public List<Property> GetProperties(string emailAddress)
    {
        IMongoCollection<Property> objMT;

        objMT = mDb.GetCollection<Property>("Properties");

        return objMT.Find(s => s.emailAddress == emailAddress).ToList();
    }

    public Property AddProperty(Property prop) {
        IMongoCollection<Property> objMT;

        objMT = mDb.GetCollection<Property>("Properties");

        objMT.InsertOneAsync(prop);

        return prop;
    }

    public bool RemoveProperty(string id) {
        IMongoCollection<Property> objMT;

        objMT = mDb.GetCollection<Property>("Properties");

        objMT.DeleteOneAsync(s => s.Id == id);

        return true;
    }

    public Property GetProperty(string id) {
        IMongoCollection<Property> objMT;

        objMT = mDb.GetCollection<Property>("Properties");

        return objMT.Find<Property>(s => s.Id == id).FirstOrDefault();
    }

    public List<GoogleContact> GetContacts(string emailAddress)
    {
        IMongoCollection<GoogleContact> objMT;

        objMT = mDb.GetCollection<GoogleContact>("Contacts");

        return objMT.Find(s => s.OwnerEmailAddress == emailAddress).ToList();
    }
}