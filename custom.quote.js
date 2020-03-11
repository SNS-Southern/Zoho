var recordData={},seid,moduleName;
$(document).ready(function(){
ZOHO.embeddedApp.on("PageLoad",function(data){
    recordData={
        Entity:data.Entity,
        RecordID:data.EntityId
    };
    seid=recordData.RecordID;
    moduleName=recordData.Entity;
    initializewidget();
        })
        ZOHO.embeddedApp.init().then(function(){   	
       		ZOHO.CRM.UI.Resize({height:500,width:1300})
     });
});
function initializewidget(){
    var arr = [];  
    ZOHO.CRM.API.getRecord({Entity:"Quotes",RecordID:seid})
.then(function(resp){
ZOHO.CRM.API.getRelatedRecords({Entity:"Accounts",RecordID:resp.data[0].Account_Name['id'],RelatedList:"Addresses",page:1,per_page:200})
.then(function(resp){
    var addressTemplate =  $('#address-template').html();
    var addressCompliedTemplate = Handlebars.compile(addressTemplate);
    $('#table-container').html(addressCompliedTemplate(resp));
})
        }) 
    }

function closewidget(){
    ZOHO.CRM.UI.Popup.close().then(function(data){console.log(data)})
}
function associateaddress(){
    $('.ui.radio.checkbox input:radio').each(function(){
        if($(this).is(":checked")){
        var address_id = $(this).attr('id');
        var address_name = $(this).attr('data-value');
           var recordData = {
               "Address":{
                   "id": address_id.toString(),
                   "name": address_name.toString()
               }                
           }
            ZOHO.CRM.UI.Record.populate(recordData)
.then(function(data){
    console.log(data)
})
        }
    });
    closewidget();
}
