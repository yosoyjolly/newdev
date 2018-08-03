({
    getChildValues : function(component, event, helper){
        var objChild = component.find('AssignGeneralValuesAudi');
        component.set('v.jsonGeneralValues',objChild.get('v.jsonGeneralValues'));
        component.set('v.jsonSegmentValues',objChild.get('v.jsonSegmentValues'));
        component.set('v.acceptSegments', objChild.get('v.showButtonSegment'));
        component.set('v.metaList', objChild.get('v.metaList'));
        component.set('v.giftValues', objChild.get('v.selectedGifts'));
        
        var objChild2 = component.find('ModelListAudi');
        component.set('v.productValues', objChild2.get('v.childrenValues'));
    },
    
    onClickListener : function(component, event, helper){
        switch(event.getSource().getLocalId()){
            case "continuar":
                component.set("v.isOpen",true);
                break;
            case "cerrar":
                component.set("v.isOpen",false);
                break;
            case "checkboxAccept":
                if(event.getSource().get("v.value")==true)
                    var button = component.find("botonGuardar").set("v.disabled",false);
                else 
                    var button = component.find('botonGuardar').set("v.disabled",true);
                break;
            default:
                console.log("default");
        }
    },
    
    save : function(component, event, helper){
        var action = component.get("c.doSave");
        //Transformamos los datos de los regalos en un formato correto para luego parsearlo a jSon
        var toJsonGifts = [];
        var gifts = component.get('v.giftValues');
        for(var key in gifts){
            toJsonGifts.push({
                Label: key,
                Name: gifts[key]
            });
        }
        ////////////////////////////////////////////////////////////////////////////////////////////
        action.setParams({
            dealerCampaignId: component.get("v.recordId"),
            jSonGeneral: component.get("v.jsonGeneralValues"),
            jSonSegments: component.get("v.jsonSegmentValues"),
            jSonProducts: component.get("v.productValues"),
            gifts: JSON.stringify(toJsonGifts)
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state == 'SUCCESS'){
                console.log('Success');
            } else {
                console.log('Error');
            }
        });
        $A.enqueueAction(action);
    },
    
    test : function(component, event, helper) {

        var a = component.get("v.jsonGeneralValues");
        console.log('Información general:')
        console.log(JSON.parse(a));
        
        if(component.get("v.acceptSegments")==true){
            var b = component.get("v.jsonSegmentValues");
            console.log('Información de segmentos:');
            console.log(JSON.parse(b));
        }
        
        
        var productos = component.get("v.productValues");
        console.log('Información de productos:');
        console.log(JSON.parse(productos));
        var toJsonGifts = [];
        var gifts = component.get('v.giftValues');
        for(var key in gifts){
            toJsonGifts.push({
                Label: key,
                Value: gifts[key]
            });
        }
        console.log(JSON.stringify(toJsonGifts));
        
    }
})