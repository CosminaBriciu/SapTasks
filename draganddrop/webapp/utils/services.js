sap.ui.define(["sap/ui/base/Object","draganddrop/utils/constants"], function(Object, Constants){

    const NORTHWIND_API="V3/Northwind/Northwind.svc/Products/";

    let oServices =Object.extend("draganddrop.utils.services",{
        constructor:function (ownerComponent){
            this.NORTHWIND_URL=ownerComponent.getManifestEntry(Constants.NORTHWIND);
        }
    })

    oServices.prototype.getCustomers=async function(){
        let oCustomers=null;

        // let oResponse=await fetch(`${this.NORTHWIND_URL}${NORTHWIND_API}?$format=json`,{
        //     method:'GET'
        // })
        let oResponse=await fetch(`https://services.odata.org/V3/Northwind/Northwind.svc/Products/?$format=json`,{
            method:'GET'
        })

        if (oResponse.ok){
            oCustomers=await oResponse.json();
        }

        return oCustomers;
    }
    return oServices;
})