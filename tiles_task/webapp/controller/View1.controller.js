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
                var oResourceStatus = {
                    resourceStatus: [
                        {
                            "key": "PRODUCTIVE",
                            "text": this.getView().getModel("i18n").getResourceBundle().getText("PRODUCTIVE"),
                            "icon": {
                                "src":"sap-icon://cancel-maintenance",
                                "color":"Critical"
                            }
                            
                        },
                        {
                            "key": "ENABLED",
                            "text": this.getView().getModel("i18n").getResourceBundle().getText("ENABLED"),
                            "icon": {
                                "src":"sap-icon://accept",
                                "color":"Positive"
                            }
                        },
                        {
                            "key": "SCHEDULED DOWN",
                            "text": this.getView().getModel("i18n").getResourceBundle().getText("SCHEDULED_DOWN"),
                            "icon": {
                                "src":"sap-icon://date-time",
                            "color":"Marker"
                            }
                        },
                        {
                            "key": "UNSCHEDULED DOWN",
                            "text": this.getView().getModel("i18n").getResourceBundle().getText("UNSCHEDULED_DOWN"),
                            "icon": {
                                "src":"sap-icon://check-availability",
                            "color":"Critical"
                            }

                        },
                        {
                            "key": "UNKNOWN",
                            "text": this.getView().getModel("i18n").getResourceBundle().getText("UNKNOWN"),
                            "icon": {
                                "src":"sap-icon://question-mark",
                            "color":"Neutral"
                            }
                        },

                    ],
                }
                var res={
                    "plant": "LEGO",
                    "resource": "40501-2",
                    "description": "Brick Moulding machine No. 2 1K - Hall A", // oResourceTiles.resourceTile[0].resource_description
                    "process": false,
                    "status": "ENABLED", //oResourceTiles.resourceTile[0].resource_status
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
                    "assignedOrders": 1, // oResourceTiles.schedulesOrders[0].value
                    "order": {
                        "materialDescription": "Yellow headstone", //oResourceTiles.currentOrder[0]["material_description"]
                        "remaining": "-25d 5h 43min",
                        "overdue": true,
                        "material": "300124", // oResourceTiles.currentOrder[0]["material_no"]
                        "shopOrder": "IM_20220817" // oResourceTiles.currentOrder[0]["order no."]
                    },
                    toolNumber: "Lego_Equipment" //oResourceTiles.currentOrder[0]["tool no."]
                }
                var oResourcesTiles = {
                    resourceTile: [
                        {
                            "resource_description": res.description,
                            "resource_status": res.status,
                            "reason_code": "sds",
                            "duration_of_status": "48d 2h 55m"
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
                            "order no.":res.order.shopOrder,
                            "material no.": res.order.material,
                            "material description": res.order.materialDescription,
                            "tool no.": res.toolNumber,
                            "cavity": {
                                "value": res.customValues[2].value,
                                "text": "Cavity"
                            }
                        }
                    ]
                };
                var oModel = new sap.ui.model.json.JSONModel(oResourcesTiles);
                var oModelStatus=new sap.ui.model.json.JSONModel(oResourceStatus);
                for (var j = 1; j < Object.keys(oResourcesTiles.resourceTile['0']).length - 1; j++) {
                    if (Object.keys(oResourcesTiles.resourceTile['0'])[j] == "resource_status") {
                        var sValueStatus = Object.values(oResourcesTiles.resourceTile['0'])[j];
                        let index = oResourceStatus.resourceStatus.findIndex(o => o.key == sValueStatus)
                        this.byId("resource-status-id").addItem(
                            new sap.ui.core.Icon({
                                size:"30px",
                                src: {
                                    path: `/resourceStatus/${index}/icon/src`
                                },
                                color:{
                                    path: `/resourceStatus/${index}/icon/color`
                                }
                            }).addStyleClass("sapUiSmallMarginEnd")
                        )
                        this.byId("resource-status-id").addItem(
                                    new sap.m.Text({
                                        text: {
                                            path: `/resourceStatus/${index}/text`
                                        }
                                    }).addStyleClass("bold-class-text")
                        )
                    }
                }
                this.byId("first-tile").setModel(oModel);
                this.byId("resource-status-id").setModel(oModelStatus)
                this.byId("second-tile").setModel(oModel);
                var valueCountOrders=this.byId("count-scheduled-order").getText();
                if (parseInt(valueCountOrders)>0){
                    for (var i = 1; i < Object.keys(oResourcesTiles.currentOrder['0']).length - 1; i++) {
                        this.byId("third-tile-content").addItem(
                            new sap.m.Label({
                                text: {
                                    path: `/currentOrder/0/${Object.keys(oResourcesTiles.currentOrder['0'])[i]}`
                                }
                            })
                        )
                    }
                    this.byId("third-tile-content").addItem(
                        new sap.m.HBox({
                            width: "100%",
                            justifyContent: sap.m.FlexJustifyContent.End,
                            items: [
                                new sap.m.Label({
                                    text: {
                                        path: `/currentOrder/0/${Object.keys(oResourcesTiles.currentOrder['0'])[i]}/text`,
                                        formatter: function (oVal) {
                                            return oVal + ":";
                                        }
                                    }
                                }),
                                new sap.m.Label({
                                    text: {
                                        path: `/currentOrder/0/${Object.keys(oResourcesTiles.currentOrder['0'])[i]}/value`
                                    }
                                })
                            ]
                        })
                    )
                    this.byId("third-tile").setModel(oModel);

                }else{
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
                for (var i = 0; i < oDataProduction.reportedProduction.length; i++) {
                    if (oDataProduction.reportedProduction[i].name == "") {
                        this.byId("reported-production-id").addItem(
                            new sap.m.HBox({
                                justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
                                items: [
                                    new sap.m.Label(this.createId(`first-label${i}-id`), {
                                    }).addStyleClass("sapUiTinyMarginTop"),
                                    new sap.m.Input(this.createId(`first-input${i}-id`), {
                                        enabled: false,
                                        visible: false
                                    })
                                ]
                            })
                        )
                    } else {
                        this.byId("reported-production-id").addItem(
                            new sap.m.HBox({
                                justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
                                items: [
                                    new sap.m.Label(this.createId(`first-label${i}-id`), {
                                        text: {
                                            path: `/reportedProduction/${i}/name`,
                                            formatter: function (oVal) {
                                                return oVal + ":";
                                            }
                                        }
                                    }).addStyleClass("sapUiTinyMarginEnd", "sapUiTinyMarginTop"),
                                    new sap.m.Input(this.createId(`first-input${i}-id`), {
                                        enabled: false,
                                        value: {
                                            path: `/reportedProduction/${i}/value`,
                                        }
                                    })
                                ]
                            })
                        )
                    }
                    this.byId(`first-label${i}-id`).setModel(oModel);
                    this.byId(`first-input${i}-id`).setModel(oModel);
                }
                this.indexValueQuantity=oDataProduction.reportedProduction.findIndex(o => o.name == "Quantity")
                //productionCalculated
                for (var i = 0; i < oDataProduction.productionCalculated.length; i++) {
                    if (oDataProduction.productionCalculated[i].name == "") {
                        this.byId("calculated-production-id").addItem(
                            new sap.m.HBox({
                                justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
                                items: [
                                    new sap.m.Label(this.createId(`second-label${i}-id`), {
                                    }).addStyleClass("sapUiTinyMarginTop"),
                                    new sap.m.Input(this.createId(`second-input${i}-id`), {
                                        enabled: false,
                                        visible: false
                                    })
                                ]
                            })
                        )
                    } else {
                        this.byId("calculated-production-id").addItem(
                            new sap.m.HBox({
                                justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
                                items: [
                                    new sap.m.Label(this.createId(`second-label${i}-id`), {
                                        
                                        text: {
                                            path: `/productionCalculated/${i}/name`,
                                            formatter: function (oVal) {
                                                return oVal + ":";
                                            }
                                        }
                                    }).addStyleClass("sapUiTinyMarginEnd", "sapUiTinyMarginTop"),
                                    new sap.m.Input(this.createId(`second-input${i}-id`), {
                                        enabled: false,
                                        value: {
                                            path: `/productionCalculated/${i}/value`,
                                        }
                                    })
                                ]
                            })
                        )

                    }

                    this.byId(`second-label${i}-id`).setModel(oModel);
                    this.byId(`second-input${i}-id`).setModel(oModel);
                    
                }
                //Order production
                for (var i = 0; i < oDataProduction.orderProduction.length; i++) {
                    if (oDataProduction.orderProduction[i].name == "") {
                        this.byId("order-production-id").addItem(
                            new sap.m.HBox({
                                justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
                                items: [
                                    new sap.m.Label(this.createId(`third-label${i}-id`), {
                                    }).addStyleClass("sapUiTinyMarginTop"),
                                    new sap.m.Input(this.createId(`third-input${i}-id`), {
                                        enabled: false,
                                        visible: false
                                    })
                                ]
                            })
                        )
                    } else {
                        this.byId("order-production-id").addItem(
                            new sap.m.HBox({
                                justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
                                items: [
                                    new sap.m.Label(this.createId(`third-label${i}-id`), {
                                        text: {
                                            path: `/orderProduction/${i}/name`,
                                            formatter: function (oVal) {
                                                return oVal + ":";
                                            }
                                        }
                                    }).addStyleClass("sapUiTinyMarginEnd", "sapUiTinyMarginTop", "sapUiTinyMarginBottom"),
                                    new sap.m.Input(this.createId(`third-input${i}-id`), {
                                        enabled: false,
                                        value: {
                                            path: `/orderProduction/${i}/value`,
                                        }
                                    })
                                ]
                            })
                        )
                    }
                    this.byId(`third-label${i}-id`).setModel(oModel);
                    this.byId(`third-input${i}-id`).setModel(oModel);
                }
            },
            setProgressBar:function(){
               var valueQuantity= this.byId(`first-input${this.indexValueQuantity}-id`).getValue();
               var valueProgressBar=(valueQuantity*100)/10;
               this.byId("progress-indicator").setPercentValue(valueProgressBar);
               valueProgressBar+="%"
               this.byId("progress-indicator").setDisplayValue(valueProgressBar)
            },
        });
    });

