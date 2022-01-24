using System.Net.Http;
using Newtonsoft.Json.Linq;

namespace HomeHistory.AppLogic;

public static class GoogleApp {
    /*
    {
        "resourceName": "people/c4649341506570907445",
        "etag": "%EgkBAgkLLjc9Pj8aBAECBQciDGc4VktXRDFteXJzPQ==",
        "names": [
            {
            "metadata": {
                "primary": true,
                "source": {
                "type": "CONTACT",
                "id": "4085c7778aa36f35"
                }
            },
            "displayName": "Kyle Higgins",
            "familyName": "Higgins",
            "givenName": "Kyle",
            "displayNameLastFirst": "Higgins, Kyle",
            "unstructuredName": "Kyle Higgins"
            }
        ],
        "phoneNumbers": [
            {
            "metadata": {
                "primary": true,
                "source": {
                "type": "CONTACT",
                "id": "4085c7778aa36f35"
                }
            },
            "value": "(303) 828-8765",
            "canonicalForm": "+13038288765",
            "type": "mobile",
            "formattedType": "Mobile"
            }
        ]
    }
    */
    public static JArray GetContacts (string accessToken) {

        JArray jaConnections = new JArray();
        bool hasPages = true;
        string strPageToken = "";

        // if the results contain a "nextPageToken" key, we have another page to fetch
        do {
            JObject joContacts = GoogleContactPage(strPageToken, accessToken);

            if(joContacts["nextPageToken"] != null) {
                strPageToken = joContacts["nextPageToken"].ToString();
                JArray jaNewContacts = (JArray)joContacts["connections"];

                jaConnections.Merge(jaNewContacts);
                //jaConnections = new JArray(jaConnections.Union(jaNewContacts));
            } else {
                // This is the last page!
                JArray jaNewContacts = (JArray)joContacts["connections"];

                jaConnections.Merge(jaNewContacts);

                hasPages = false;
            }

        } while(hasPages);

        return jaConnections;
    }

    private static JObject GoogleContactPage(string pageToken, string accessToken) {        
        HttpClient client = new HttpClient();  
        Uri geturi = null;

        if(pageToken.Trim().Length > 0) {
            geturi = new Uri("https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses,phoneNumbers&access_token=" + accessToken + "&pageToken=" + pageToken); 
        } else {
            geturi = new Uri("https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses,phoneNumbers&access_token=" + accessToken); 
        }

        HttpResponseMessage responseGet = client.GetAsync(geturi).Result;  
        string response = responseGet.Content.ReadAsStringAsync().Result; 

        return JObject.Parse(response);
    }

    public static List<GoogleContact> ConvertGoogleContacts(string OwnerEmail, JArray GoogleContacts) {
        List<GoogleContact> lstContacts = new List<GoogleContact>();

        foreach (JObject joContact in GoogleContacts) {

            if(joContact["names"] != null) {
                List<GPhoneNumber> lstPhoneNumbers = new List<GPhoneNumber>();
                List<GEmailAddress> lstEmailAddresses = new List<GEmailAddress>();

                if(joContact["phoneNumbers"] != null) {
                    JArray jaPhoneNumbers = (JArray)joContact["phoneNumbers"];

                    foreach (JObject joPhone in jaPhoneNumbers){
                        lstPhoneNumbers.Add(new GPhoneNumber {
                            Type = joPhone["type"].ToString(),
                            Number = joPhone["value"].ToString()
                        });
                    }
                }

                if(joContact["emailAddresses"] != null) {
                    JArray jaEmailAddresses = (JArray)joContact["emailAddresses"];

                    foreach (JObject joEmail in jaEmailAddresses){
                        lstEmailAddresses.Add(new GEmailAddress {
                            Type = joEmail["type"] != null ? joEmail["type"].ToString() : "primary",
                            EmailAddress = joEmail["value"].ToString()
                        });
                    }
                }

                GoogleContact objContact = new GoogleContact {
                    OwnerEmailAddress = OwnerEmail,
                    ContactType = "Google",
                    Id = joContact["resourceName"].ToString(),
                    FirstName = joContact["names"][0]["givenName"] != null ? joContact["names"][0]["givenName"].ToString() : "",
                    LastName = joContact["names"][0]["familyName"] != null ? joContact["names"][0]["familyName"].ToString() : "",
                    EmailAddresses = lstEmailAddresses,
                    PhoneNumbers = lstPhoneNumbers
                };

                lstContacts.Add(objContact);
            }  

        }

        return lstContacts;
    }
}