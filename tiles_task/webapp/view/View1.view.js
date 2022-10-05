sap.ui.define(function () {
    return sap.ui.jsview("tilestask.view.View1", {
        getControllerName: function () {
            return "tilestask.controller.View1";
        },

        createContent: function (Controller) {
            return new sap.m.Shell(this.createId("shell"), {
                app: new sap.m.App(this.createId("app"), {
                    pages: new sap.uxap.ObjectPageLayout({
                        visible: true,
                        sections: [
                            new sap.uxap.ObjectPageSection({
                                title: "{i18n>TILES}",
                                subSections: new sap.uxap.ObjectPageSubSection({
                                    blocks: [
                                        new sap.m.HBox({
                                            items: [
                                                new sap.m.GenericTile(this.createId("first-tile"), {
                                                    header: {
                                                        path: "/resourceTile/0/resourceDescription"
                                                    },
                                                    tileContent: new sap.m.TileContent({
                                                        content: [
                                                            new sap.m.VBox({
                                                                items:[
                                                                    new sap.m.VBox({
                                                                        items: {
                                                                            path: "/resourceTile",
                                                                            factory: (id, context) => {
                                                                                var oResourceTile = context.getProperty()
                                                                                var sValueStatus = oResourceTile.resourceStatus;
                                                                                var oResourceStatus = {
                                                                                    resourceStatus: [
                                                                                        {
                                                                                            "key": "PRODUCTIVE",
                                                                                            "text": "{i18n>PRODUCTIVE}",
                                                                                            "icon": {
                                                                                                "src": "sap-icon://cancel-maintenance",
                                                                                                "color": "Critical"
                                                                                            }
        
                                                                                        },
                                                                                        {
                                                                                            "key": "ENABLED",
                                                                                            "text": "{i18n>ENABLED}",
                                                                                            "icon": {
                                                                                                "src": "sap-icon://accept",
                                                                                                "color": "Positive"
                                                                                            }
                                                                                        },
                                                                                        {
                                                                                            "key": "SCHEDULED DOWN",
                                                                                            "text": "{i18n>SCHEDULED_DOWN}",
                                                                                            "icon": {
                                                                                                "src": "sap-icon://date-time",
                                                                                                "color": "Marker"
                                                                                            }
                                                                                        },
                                                                                        {
                                                                                            "key": "UNSCHEDULED DOWN",
                                                                                            "text": "{i18n>UNSCHEDULED_DOWN}",
                                                                                            "icon": {
                                                                                                "src": "sap-icon://check-availability",
                                                                                                "color": "Critical"
                                                                                            }
        
                                                                                        },
                                                                                        {
                                                                                            "key": "UNKNOWN",
                                                                                            "text": "{i18n>UNKNOWN}",
                                                                                            "icon": {
                                                                                                "src": "sap-icon://question-mark",
                                                                                                "color": "Neutral"
                                                                                            }
                                                                                        },
        
                                                                                    ],
                                                                                }
                                                                                var index = oResourceStatus.resourceStatus.findIndex(o => o.key == sValueStatus)
                                                                                if (index != -1) {
                                                                                    return new sap.m.HBox(this.createId("resource-status-id"), {
                                                                                        justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
                                                                                        items: [
                                                                                            new sap.ui.core.Icon({
                                                                                                size: "30px",
                                                                                                src: oResourceStatus.resourceStatus[index].icon.src,
                                                                                                color: oResourceStatus.resourceStatus[index].icon.color,
                                                                                            }).addStyleClass("sapUiSmallMarginEnd"),
                                                                                            new sap.m.Text({
                                                                                                text: oResourceStatus.resourceStatus[index].text
                                                                                            }).addStyleClass("bold-class-text")
                                                                                        ]
                                                                                    })
                                                                                }
                                                                            }
                                                                        }
        
                                                                    }).addStyleClass("sapUiTinyMarginBottom"),
                                                                    new sap.m.VBox({
                                                                        alignItems: sap.m.FlexAlignItems.End,
                                                                        items: [
                                                                            new sap.m.Label({
                                                                                text: {
                                                                                    path: "/resourceTile/0/reasonCode"
                                                                                }
                                                                            }),
                                                                            new sap.m.Label({
                                                                                text: {
                                                                                    path: "/resourceTile/0/durationOfStatus"
                                                                                }
                                                                            })
                                                                        ]
                                                                    })
                                                                ]
                                                            })
                                                            
                                                            
                                                        ]

                                                    })

                                                }).addStyleClass("sapUiTinyMarginEnd"),
                                                new sap.m.GenericTile(this.createId("second-tile"), {
                                                    header: {
                                                        path: "/scheduledOrders/0/resource"
                                                    },
                                                    tileContent: new sap.m.TileContent({
                                                        content: [
                                                            new sap.m.VBox({
                                                                items: [
                                                                    new sap.m.HBox({
                                                                        justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
                                                                        items: [
                                                                            new sap.ui.core.Icon({
                                                                                size: "30px",
                                                                                src: "sap-icon://add",
                                                                                color: "darkblue"
                                                                            }),
                                                                            new sap.m.Text(this.createId("count-scheduled-order"), {
                                                                                text: {
                                                                                    path: "/scheduledOrders/0/value"
                                                                                }
                                                                            }).addStyleClass("bold-class")
                                                                        ]
                                                                    }).addStyleClass("sapUiTinyMarginBottom"),
                                                                    new sap.m.HBox({
                                                                        justifyContent: sap.m.FlexJustifyContent.End,
                                                                        items: [
                                                                            new sap.m.Label({
                                                                                text: {
                                                                                    path: "/scheduledOrders/0/valueText"
                                                                                }
                                                                            })
                                                                        ]
                                                                    })

                                                                ]
                                                            })
                                                        ],
                                                    })
                                                }).addStyleClass("sapUiTinyMarginEnd"),
                                                new sap.m.GenericTile(this.createId("third-tile"), {
                                                    header: {
                                                        path: "/currentOrder/0/resource"
                                                    },
                                                    tileContent: new sap.m.TileContent({
                                                        content: [
                                                            new sap.m.VBox(this.createId("third-tile-content"), {
                                                                items: [
                                                                    new sap.m.Label({
                                                                        text: {
                                                                            path: "/currentOrder/0/orderNo"
                                                                        }
                                                                    }),
                                                                    new sap.m.Label({
                                                                        text: {
                                                                            path: "/currentOrder/0/materialNo"
                                                                        }
                                                                    }),
                                                                    new sap.m.Label({
                                                                        text: {
                                                                            path: "/currentOrder/0/materialDescription"
                                                                        }
                                                                    }),
                                                                    new sap.m.Label({
                                                                        text: {
                                                                            path: "/currentOrder/0/toolNo"
                                                                        }
                                                                    }),
                                                                    new sap.m.HBox({
                                                                        width: "100%",
                                                                        justifyContent: sap.m.FlexJustifyContent.End,
                                                                        items: [
                                                                            new sap.m.Label({
                                                                                text: {
                                                                                    path: `/currentOrder/0/cavity/text`,
                                                                                    formatter: function (oVal) {
                                                                                        return oVal + ":";
                                                                                    }
                                                                                }
                                                                            }),
                                                                            new sap.m.Label({
                                                                                text: {
                                                                                    path: `/currentOrder/0/cavity/value`
                                                                                }
                                                                            })
                                                                        ]
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    })
                                                }).addStyleClass("sapUiTinyMarginEnd"),
                                            ]
                                        })
                                    ]
                                })
                            }),
                            new sap.uxap.ObjectPageSection({
                                title: "{i18n>KPI}",
                                subSections: new sap.uxap.ObjectPageSubSection({
                                    blocks: [
                                        new sap.ui.layout.form.Form({
                                            layout: new sap.ui.layout.form.ResponsiveGridLayout({
                                                labelSpanXL: 3,
                                                labelSpanL: 3,
                                                labelSpanM: 3,
                                                adjustLabelSpan: false,
                                            }),
                                            editable: true,
                                            formContainers: new sap.ui.layout.form.FormContainer({
                                                formElements: [
                                                    new sap.ui.layout.form.FormElement({
                                                        fields: [
                                                            new sap.m.VBox({
                                                                items: [
                                                                    new sap.m.ProgressIndicator(this.createId("progress-indicator"), {
                                                                        state: "Warning"
                                                                    }).addStyleClass("custom-progress-indicator"),
                                                                    new sap.m.HBox({
                                                                        justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
                                                                        items: [
                                                                            new sap.m.VBox(this.createId("reported-production-id"), {
                                                                                items: {
                                                                                    path: "/reportedProduction",
                                                                                    factory: (id, context) => {
                                                                                        var oReportedProduction = context.getProperty();
                                                                                        if (oReportedProduction.name == "") {
                                                                                            return new sap.m.HBox({
                                                                                                justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
                                                                                                items: [
                                                                                                    new sap.m.Label({
                                                                                                    }).addStyleClass("sapUiTinyMarginTop"),
                                                                                                    new sap.m.Input({
                                                                                                        enabled: false,
                                                                                                        visible: false
                                                                                                    })
                                                                                                ]
                                                                                            })
                                                                                        } else {
                                                                                            return new sap.m.HBox({
                                                                                                justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
                                                                                                items: [
                                                                                                    new sap.m.Label({
                                                                                                        text: oReportedProduction.name + ": "
                                                                                                    }).addStyleClass("sapUiTinyMarginEnd", "sapUiTinyMarginTop"),
                                                                                                    new sap.m.Input(this.createId(`input0-${oReportedProduction.name.replaceAll(" ", "")}-id`), {
                                                                                                        enabled: false,
                                                                                                        value: oReportedProduction.value
                                                                                                    })
                                                                                                ]
                                                                                            })
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }),
                                                                            new sap.m.VBox(this.createId("calculated-production-id"), {
                                                                                items: {
                                                                                    path: "/productionCalculated",
                                                                                    factory: (id, context) => {
                                                                                        var oProductionCalculated = context.getProperty();
                                                                                        if (oProductionCalculated.name == "") {
                                                                                            return new sap.m.HBox({
                                                                                                justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
                                                                                                items: [
                                                                                                    new sap.m.Label({
                                                                                                    }).addStyleClass("sapUiTinyMarginTop"),
                                                                                                    new sap.m.Input({
                                                                                                        enabled: false,
                                                                                                        visible: false
                                                                                                    })
                                                                                                ]
                                                                                            })
                                                                                        } else {
                                                                                            return new sap.m.HBox({
                                                                                                justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
                                                                                                items: [
                                                                                                    new sap.m.Label({
                                                                                                        text: oProductionCalculated.name + ": "
                                                                                                    }).addStyleClass("sapUiTinyMarginEnd", "sapUiTinyMarginTop"),
                                                                                                    new sap.m.Input(this.createId(`input1-${oProductionCalculated.name.replaceAll(" ", "")}-id`), {
                                                                                                        enabled: false,
                                                                                                        value: oProductionCalculated.value
                                                                                                    })
                                                                                                ]
                                                                                            })
                                                                                        }

                                                                                    }
                                                                                }
                                                                            }),
                                                                            new sap.m.VBox(this.createId("order-production-id"), {
                                                                                items: {
                                                                                    path: "/orderProduction",
                                                                                    factory: (id, context) => {
                                                                                        var oOrderProduction = context.getProperty();
                                                                                        var sIdInput = oOrderProduction.name.replaceAll(/\[|\]/g, "")
                                                                                        if (oOrderProduction.name == "") {
                                                                                            return new sap.m.HBox({
                                                                                                justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
                                                                                                items: [
                                                                                                    new sap.m.Label({
                                                                                                    }).addStyleClass("sapUiTinyMarginTop"),
                                                                                                    new sap.m.Input({
                                                                                                        enabled: false,
                                                                                                        visible: false
                                                                                                    })
                                                                                                ]
                                                                                            })
                                                                                        } else {
                                                                                            return new sap.m.HBox({
                                                                                                justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
                                                                                                items: [
                                                                                                    new sap.m.Label({
                                                                                                        text: oOrderProduction.name + ": "
                                                                                                    }).addStyleClass("sapUiTinyMarginEnd", "sapUiTinyMarginTop"),
                                                                                                    new sap.m.Input(this.createId(`input2-${sIdInput.replaceAll(" ", "")}-id`), {
                                                                                                        enabled: false,
                                                                                                        value: oOrderProduction.value
                                                                                                    })
                                                                                                ]
                                                                                            })
                                                                                        }
                                                                                    }
                                                                                }
                                                                            })
                                                                        ]

                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    })

                                                ],

                                            }),

                                        })
                                    ]
                                })
                            })
                        ]
                    })
                })
            })
        }
    })
})


