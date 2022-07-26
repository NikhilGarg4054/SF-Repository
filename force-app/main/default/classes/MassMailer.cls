public with sharing class MassMailer {
    @auraenabled(Cacheable=true)
    public static list<string> getlistviews(string obj){
        list<string> alist=new list<string>();
        list<listview> al=[select id,name from listview where sobjecttype=:obj];
        system.debug(obj);
        for(listview l:al){
            alist.add(l.name);
            system.Debug(l.Name);
        }
        return alist;
    }
    @AuraEnabled(cacheable=true)
    public static List<EntityDefinition> allObjects(){
        System.debug([SELECT  QualifiedApiName FROM EntityDefinition where isSearchable=true]);
        return [SELECT  QualifiedApiName FROM EntityDefinition where isSearchable=true order by QualifiedApiName asc ];
    }
}