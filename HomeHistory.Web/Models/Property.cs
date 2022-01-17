using MongoDB;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.IO;

public class Property {

    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = "";
    public string line1  { get; set; } = "";
    public string line2  { get; set; } = "";
    public string city  { get; set; } = "";
    public string state  { get; set; } = "";
    public string zip  { get; set; } = "";
    public string formattedAddress  { get; set; } = "";

}