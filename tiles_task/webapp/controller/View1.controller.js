sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("tilestask.controller.View1", {
            onInit: function () {
                var i18n = new sap.ui.model.resource.ResourceModel({ bundleUrl: "./i18n/i18n.properties" });
                // this.i18nBundle = i18n.getResourceBundle();
                this.getResourceTile();
                this.getProductionData();
                this.setProgressBar();
            },
            getResourceTile: function () {
                var res = {
                    "plant": "LEGO",
                    "resource": "40501-2",
                    "description": "Brick Moulding machine No. 2 1K - Hall A", // oResourceTiles.resourceTile[0].resource_description
                    "process": false,
                    "status": "PRODUCTIVE", //oResourceTiles.resourceTile[0].resource_status
                    "setupState": "OPEN",
                    "efficiency": 100,
                    "modifiedDateTime": "2022-08-23T08:39:15.691+00:00",
                    "createdDateTime": "2022-08-11T12:17:58.109+00:00",
                    "customValues": [
                        {
                            "attribute": "IM_CYCLE_TIME_CURRENT",
                            "value": "26,7"
                        },
                        {
                            "attribute": "SYN_CAVITY_TOOL",
                            "value": "8"
                        },
                        {
                            "attribute": "SYN_CAVITY_TOOL_CURRENT",
                            "value": "8" // oResourceTiles.currentOrder[0].cavity.value
                        }
                    ],
                    "types": [
                        {
                            "modifiedDateTime": "2022-08-11T12:13:34.063+00:00",
                            "createdDateTime": "2022-08-11T12:13:34.062+00:00",
                            "plant": "LEGO",
                            "description": "Injection Molding Resource Type",
                            "type": "INJECTIONMOLDING"
                        }
                    ],
                    "bins": [],
                    "equipment": [],
                    "assignedOrders": 2, // oResourceTiles.schedulesOrders[0].value
                    "order": {
                        "materialDescription": "Yellow headstone", //oResourceTiles.currentOrder[0]["material_description"]
                        "remaining": "-25d 5h 43min",
                        "overdue": true,
                        "material": "300124", // oResourceTiles.currentOrder[0]["material_no"]
                        "shopOrder": "IM_20220817" // oResourceTiles.currentOrder[0]["order no."]
                    },
                    toolNumber: "Lego_Equipment" //oResourceTiles.currentOrder[0]["tool no."]
                }
                var index = res.customValues.findIndex(o => o.attribute == "SYN_CAVITY_TOOL_CURRENT")
                if (index !=-1){
                    var nCavityValue=res.customValues[index].value;
                }else{
                    var nCavityValue = ""
                }
                var oResourcesTiles = {
                    resourceTile: [
                        {
                            "resourceDescription": res.description,
                            "resourceStatus": res.status,
                            "reasonCode": "sds",
                            "durationOfStatus": "48d 2h 55m"
                        }
                    ],
                    scheduledOrders: [
                        {
                            "resource": "Scheduled orders",
                            "value": res.assignedOrders,
                            "valueText": "Count"
                        }
                    ],
                    currentOrder: [
                        {
                            "resource": "Current order",
                            "orderNo": res.order.shopOrder,
                            "materialNo": res.order.material,
                            "materialDescription": res.order.materialDescription,
                            "toolNo": res.toolNumber,
                            "cavity": {
                                "value": nCavityValue,
                                "text": "Cavity"
                            }
                        }
                    ]
                };
                var oModel = new sap.ui.model.json.JSONModel(oResourcesTiles);
                this.byId("first-tile").setModel(oModel);
                this.byId("second-tile").setModel(oModel);
                //third-tile is set visible or not
                var valueCountOrders = this.byId("count-scheduled-order").getText();
                if (parseInt(valueCountOrders) > 0) {
                    this.byId("third-tile").setModel(oModel);
                    this.byId("third-tile-content").setModel(oModel);
                } else {
                    this.byId("third-tile").setVisible(false)
                }
            },
            getProductionData: function () {
                var oDataProduction = {
                    reportedProduction: [
                        {
                            "name": this.getView().getModel("i18n").getResourceBundle().getText("QUANTITY"),
                            "value": "888"
                        },
                        {
                            "name": this.getView().getModel("i18n").getResourceBundle().getText("CONFIRMED_YIELD"),
                            "value": "0"
                        },
                        {
                            "name": this.getView().getModel("i18n").getResourceBundle().getText("CONFIRMED_BOX"),
                            "value": "0"
                        },
                        {
                            "name": this.getView().getModel("i18n").getResourceBundle().getText("CONFIRMED_SCRAP"),
                            "value": "0"
                        }
                    ],
                    productionCalculated: [
                        {
                            "name": this.getView().getModel("i18n").getResourceBundle().getText("REMAINING_QUANTITY"),
                            "value": "-878"
                        },
                        {
                            "name": "",
                            "value": ""
                        },
                        {
                            "name": this.getView().getModel("i18n").getResourceBundle().getText("CALCULATED_FINISH_TIME"),
                            "value": "2022-08-22 13:47:23"
                        },
                        {
                            "name": this.getView().getModel("i18n").getResourceBundle().getText("REMAINING_TIME_MATURITY"),
                            "value": "-0m"
                        }
                    ],
                    orderProduction: [
                        {
                            "name": this.getView().getModel("i18n").getResourceBundle().getText("QUANTITY"),
                            "value": "4000"
                        },
                        {
                            "name": this.getView().getModel("i18n").getResourceBundle().getText("CYCLE_TIME_TARGET"),
                            "value": "0 sek"
                        },
                        {
                            "name": this.getView().getModel("i18n").getResourceBundle().getText("MACHINE_TIME"),
                            "value": "6.0 sec"
                        },
                        {
                            "name": this.getView().getModel("i18n").getResourceBundle().getText("CYCLE_TIME_CURRENT"),
                            "value": "0 sec"
                        }
                    ]
                }
                var oModel = new sap.ui.model.json.JSONModel(oDataProduction);
                //reportedProduction
                this.byId("reported-production-id").setModel(oModel);
                this.indexValueQuantity = oDataProduction.reportedProduction.findIndex(o => o.name == "Quantity")
                //productionCalculated
                this.byId("calculated-production-id").setModel(oModel);
                //Order production
                this.byId("order-production-id").setModel(oModel);
            },
            setProgressBar: function () {
                var valueQuantity = this.byId(`input${this.indexValueQuantity}-Quantity-id`).getValue();
                var valueProgressBar = (valueQuantity * 100) / 10;
                this.byId("progress-indicator").setPercentValue(valueProgressBar);
                valueProgressBar += "%"
                this.byId("progress-indicator").setDisplayValue(valueProgressBar)
            },
        });
    });

