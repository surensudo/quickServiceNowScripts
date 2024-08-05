// Statics
var tableName = "your_custom_table";

// Utilities
function fetchValue(argV){
    return "Value of "+argV;
}

function fetchString(iter){
	return "Created from Script "+iter;
}

// Table modification to support this
// Whereever you wish to use Dynamic Attribute Schema
// 1.) Create a field of reference/list which referes to Dynamic Attribute Group..Like example below has "dag_list"
// 2.) Create another field which will hold the Dynamic Attribute Object .. type will be "Dynamic Attribute Store"

// Configuration Requirements.
// Create Dynamic Attribute Group record and keep the sys_id handy... for example below "cd545ece1bb30254c4972f02b24bcb87" and name is "customappj24_dag1"
var createdDAGUniqueID = "cd545ece1bb30254c4972f02b24bcb87";
// Optionally create Dynamic Attributes too if you know what keys that would be.. for example below da1 and da2 
// --> We can define keys dynamically too along with the dynamic Attribute group , like we do in example Script 2 "dynamicKey->da4", "dynamicKey->da3".

//  Script 1 Setting DS
var grCustom = new GlideRecord(tableName);
grCustom.initialize();
grCustom.setValue("dag_list",createdDAGUniqueID);
grCustom.setValue('das->customappj24_dag1->customappj24_da1',fetchValue("da1"));
grCustom.setValue('das->customappj24_dag1->customappj24_da2',fetchValue("da2"));
grCustom.insert();


//  Script 1.1 Getting DS
var grCustom = new GlideRecord(tableName);
grCustom.addQuery('das->customappj24_dag1->customappj24_da2', fetchValue("da2"));
grCustom.query();
while(grCustom._next()){
  gs.addInfoMessage(grCustom.getUniqueValue());
  grCustom.getDisplayValue('das');
}

//  Script 2
//  User of GlideDynamicAttributeStore
var das = new GlideDynamicAttributeStore();
das.setDynamicAttributeValue("dynamicKey->da3",fetchValue("da3"));
das.setDynamicAttributeValue("dynamicKey->da4",fetchValue("da4"));
var grCustom = new GlideRecord(tableName);
grCustom.initialize();
grCustom.setValue("dag_list",createdDAGUniqueID);
grCustom.setValue('das',das);
grCustom.insert();