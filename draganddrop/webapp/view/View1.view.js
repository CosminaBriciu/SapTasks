sap.ui.define(function () {
    return sap.ui.jsview("draganddrop.view.View1", {
        getControllerName: function () {
            return "draganddrop.controller.View1";
        },

        createContent: function (Controller) {
            return new sap.m.Shell(this.createId("shell"), {
                app: new sap.m.App(this.createId("app"), {
                    pages: new sap.m.Page(this.createId("page-id"), {
                        title: "{i18n>Northwind_Data}",
                        content: [
                            new sap.m.HBox({
                                items:[
                                    new sap.m.Input(this.createId("inputValueHelp"),{
                                        type:"Text",
                                        placeholder:"{i18n>Select_a_product}",
                                        showValueHelp:true,
                                        valueHelpIconSrc:"sap-icon://value-help",
                                        valueHelpRequest:Controller.onValueHelpRequest.bind(Controller),
                                    }),
                                ]
                            }).addStyleClass("sapUiLargeMarginBegin", "sapUiMediumMarginTopBottom"),
                            new sap.m.HBox({
                                items: [
                                    new sap.m.Table(this.createId("northwind-table"), {
                                        inset: true,
                                        mode: sap.m.ListMode.SingleSelectMaster,
                                        growingThreshold: 10,
                                        growing: true,
                                        columns: {
                                            path: "/columns",
                                            template: new sap.m.Column({
                                                header: new sap.m.ToggleButton({
                                                    type:sap.m.ButtonType.Accept,
                                                    width:"200px",
                                                    text: "{name}",
                                                    press:Controller.onSortPress.bind(Controller)
                                                })
                                            })
                                        },
                                        dragDropConfig: [
                                            new sap.ui.core.dnd.DragInfo({
                                                groupName: 'available2selected',
                                                sourceAggregation: 'items'
                                            }),
                                            new sap.ui.core.dnd.DropInfo({
                                                groupName: 'selected2available',
                                                targetAggregation: 'items',
                                                dropPosition: "Between",
                                                drop: Controller.onDropAvailableProductsTable.bind(Controller)
                                            }),
                                        ],
                                        items: {
                                            path: "/rows",
                                            factory: (id, context) => {
                                                let oRow = context.getProperty();
                                                let aCells = Object.values(oRow).map(cell => {
                                                    return new sap.m.Text({
                                                        text: cell
                                                    })
                                                })
                                                return new sap.m.ColumnListItem({
                                                    type: "Navigation",
                                                    cells: aCells
                                                })
                                            }
                                        },
                                    }).addStyleClass("sapUiTinyMarginBeginEnd"),
                                    new sap.m.Table(this.createId("northwind-table-selected"), {
                                        inset: true,
                                        mode: sap.m.ListMode.SingleSelectMaster,
                                        growingThreshold: 10,
                                        growing: true,
                                        noDataText: '{i18n>Please_drag-and-drop_products_here}',
                                        columns: {
                                            path: "/columns",
                                            template: new sap.m.Column({
                                                header: new sap.m.Text({
                                                    text: "{name}"
                                                })
                                            })
                                        },
                                        dragDropConfig: [
                                            new sap.ui.core.dnd.DragInfo({
                                                groupName: 'selected2available',
                                                sourceAggregation: 'items'
                                            }),
                                            new sap.ui.core.dnd.DropInfo({
                                                groupName: 'available2selected',
                                                targetAggregation: 'items',
                                                dropPosition: "Between",
                                                drop: Controller.onDropSelectedProductsTable.bind(Controller)
                                            }),
                                            new sap.ui.core.dnd.DragDropInfo({
                                                sourceAggregation: "items",
                                                targetAggregation: "items",
                                                dropPosition: "Between",
                                                drop: Controller.onDropSelectedProductsTable.bind(Controller)
                                            }),
                                        ],
                                    }).addStyleClass("sapUiTinyMarginBeginEnd")
                                ]
                            }),
                            new sap.m.HBox({
                                justifyContent: sap.m.FlexJustifyContent.Center,
                                items: [
                                    new sap.ui.unified.FileUploader({
                                        text: "{i18n>Upload}",
                                        icon: "sap-icon://upload",
                                        change: Controller.onUploadFile.bind(Controller)
                                    }),
                                    new sap.m.Button({
                                        text:"{i18n>Upload_File}",
                                        press:Controller.onUploadPress.bind(Controller)
                                    })

                                ]
                            })
                            

                        ]
                    })
                })
            })
        }
    })
})

