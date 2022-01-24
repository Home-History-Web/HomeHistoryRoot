using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using MongoDB.Driver;
using Google.Apis.Discovery.v1;
using Google.Apis.Discovery.v1.Data;
using Google.Apis.Services;
using Newtonsoft.Json.Linq;
using HomeHistory.AppLogic;

namespace HomeHistory.Web.Controllers;

[ApiController]
[Route("[controller]")]
public class GoogleController : ControllerBase
{
    MongoClientSettings mSettings;
    MongoClient mClient;

    public GoogleController()
    { 
        mSettings = MongoClientSettings.FromConnectionString("mongodb+srv://homeHistoryWeb:hhMongo2424@hhmongocluster.xccmy.mongodb.net/test?authSource=admin&replicaSet=atlas-nx3q95-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true");
        mClient = new MongoClient(mSettings);
    }

    [HttpGet("DecodeJWT/{id_token}")]
    public JwtSecurityToken DecodeJWT(string id_token)
    {
        var handler = new JwtSecurityTokenHandler();
        var token = handler.ReadJwtToken(id_token);

        return token;
    }

    [HttpGet("GetUser/{id_token}")]
    public string GetUser(string id_token)
    {
        Uri geturi = new Uri("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + id_token); 
        System.Net.Http.HttpClient client = new System.Net.Http.HttpClient();  
        System.Net.Http.HttpResponseMessage responseGet = client.GetAsync(geturi).Result;  
        string response = responseGet.Content.ReadAsStringAsync().Result; 

        return response;
    }

    [HttpGet("GoogleContacts/{accessToken}")]
    public List<GoogleContact> GoogleContacts(string accessToken)
    {
        JArray jaContacts = GoogleApp.GetContacts(accessToken);
        
        return GoogleApp.ConvertGoogleContacts("test", jaContacts);
    }

    [HttpGet("LoadGoogleContacts/{ownerEmail}/{accessToken}")]
    public List<GoogleContact> LoadGoogleContacts(string ownerEmail, string accessToken)
    {
        JArray jaContacts = GoogleApp.GetContacts(accessToken);
        List<GoogleContact> lstContacts = GoogleApp.ConvertGoogleContacts(ownerEmail, jaContacts);

        IMongoCollection<GoogleContact> objMT;

        var database = mClient.GetDatabase("ATTOM");
        objMT = database.GetCollection<GoogleContact>("Contacts");

        foreach (GoogleContact objContact in lstContacts) {
            objMT.InsertOneAsync(objContact);
        }

        return lstContacts;
    }

    [HttpGet("GoogleApis")]
    public DirectoryList GoogleApis() {
        // Create the service.
        var service = new DiscoveryService(new BaseClientService.Initializer
            {
                ApplicationName = "Discovery Sample",
                ApiKey="AIzaSyCjK5YY2eSQnJBocsTyqryOS0iLiyQwulU",
            });

        // Run the request.
        Console.WriteLine("Executing a list request...");
        var result = service.Apis.List().ExecuteAsync().Result;

        // Display the results.
        if (result.Items != null)
        {
            foreach (DirectoryList.ItemsData api in result.Items)
            {
                Console.WriteLine(api.Id + " - " + api.Title);
            }
        }

        return result;
    }

}
