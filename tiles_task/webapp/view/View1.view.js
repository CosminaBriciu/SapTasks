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
                                                        path: "/resourceTile/0/resource_description"
                                                    },
                                                    tileContent: new sap.m.TileContent({
                                                        content: [
                                                            new sap.m.VBox({
                                                                items: [
                                                                    new sap.m.HBox(this.createId("resource-status-id"), {
                                                                        justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
                                                                    }).addStyleClass("sapUiTinyMarginBottom"),
                                                                    new sap.m.VBox({
                                                                        alignItems: sap.m.FlexAlignItems.End,
                                                                        items: [
                                                                            new sap.m.Label({
                                                                                text: {
                                                                                    path: "/resourceTile/0/reason_code"
                                                                                }
                                                                            }),
                                                                            new sap.m.Label({
                                                                                text: {
                                                                                    path: "/resourceTile/0/duration_of_status"
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
                                                                                color:"darkblue"
                                                                            }),
                                                                            new sap.m.Text(this.createId("count-scheduled-order"), {
                                                                                text: "1"
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
                                                                            }),
                                                                            new sap.m.VBox(this.createId("calculated-production-id"), {
                                                                            }),
                                                                            new sap.m.VBox(this.createId("order-production-id"), {
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


