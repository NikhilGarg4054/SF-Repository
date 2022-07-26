public with sharing class calloutClass {
    public static List<sObject> getListviewFilters() {
        String ListName='New This Week';
        String objectName='Account';
        system.debug(ListName+' '+objectName);
        if(ListName!=null && objectName!=null){
             List<ListView> listId=[select id,Name from listview where Name=:ListName and sObjectType=:objectName];
            string filterId=listId[0].Id;
            System.debug(filterId);
            String query;
            HttpRequest req = new HttpRequest();
            String baseUrl = URL.getSalesforceBaseUrl().toExternalForm();
            String endPoinURL = baseUrl+'/services/data/v50.0/sobjects/'+ objectName +'/listviews/'+ filterId +'/describe';
            System.debug(endPoinURL);
            req.setEndpoint(endPoinURL);
            req.setMethod('GET');
           	//req.setHeader('Authorization', 'Bearer '+ UserInfo.getSessionId());
           	req.setHeader('Authorization', 'OAuth ' + UserInfo.getSessionId());
            System.debug(UserInfo.getSessionId());
            Http http = new Http();
            HttpResponse response = http.send(req);
            if( response.getStatusCode() == 200 ) {
                Map<String, Object> tokenResponse = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
                query = (String) tokenResponse.get('query');
                System.debug(query);
                System.debug('response :'+response.getBody());
            }
            List<sObject> accList=Database.query(query);
            set<Id> sObjectID=new set<Id>();
            system.debug(acclist);
            for(sObject a:accList){
                System.debug(a.id);
                sObjectId.add(a.id);
            }
            return accList;
        }
        else 
            return null;
	}

}