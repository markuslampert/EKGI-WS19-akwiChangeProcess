
// Fuseki Server
var fusekiUrlConfig = "http://localhost:3030/akwi-latest-graph";

// Formular Meta Data
var validFormularConfig = 
{
    "modi":[
        {
            "modus": "UpdatePerson",
            "id_fields": ["id_familyName", "id_givenName"],
            "fields": ["familyName", "givenName", "honorificPrefix", "telephone", "eMail"]
        },
        {
            "modus": "UpdateDepartmentOrFaculty",
            "id_fields": ["id_legalName", "id_name"],
            "fields": ["name"]
        },
        {
            "modus": "UpdateCourse",
            "id_fields": ["id_legalName", "id_name", "id_targetName"],
            "fields": ["name","newEnrollments","totalEnrollments"]
        },
        {
            "modus": "UpdateCollegeOrUniversity",
            "id_fields": ["id_legalName"],
            "fields": ["legalName","url","addressCountry","addressLocality","addressRegion","postalCode","streetAddress"]
        },
        {
            "modus": "InsertCollegeOrUniversity",
            "id_fields": ["legalName","url","addressCountry","addressLocality","addressRegion","postalCode","streetAddress"],
            "fields": ["legalName","url","addressCountry","addressLocality","addressRegion","postalCode","streetAddress"]
        }
    ]
}
;
