using MongoDB;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.IO;

public class GoogleContact {

    public string OwnerEmailAddress  { get; set; } = "";
    public string Id { get; set; } = "";
    public string FirstName  { get; set; } = "";
    public string LastName  { get; set; } = "";
    public string ContactType  { get; set; } = "";    
    public List<GPhoneNumber> PhoneNumbers  { get; set; } = new List<GPhoneNumber>();
    public List<GEmailAddress> EmailAddresses  { get; set; } = new List<GEmailAddress>();

}

public class GEmailAddress {
    public string Type  { get; set; } = "";
    public string EmailAddress  { get; set; } = "";
}

public class GPhoneNumber {
    public string Type  { get; set; } = "";
    public string Number  { get; set; } = "";
}