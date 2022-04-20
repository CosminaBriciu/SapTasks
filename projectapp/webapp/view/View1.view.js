sap.ui.define(function () {
    return sap.ui.jsview("ns.projectapp.view.View1", {
        getControllerName: function () {
            return "ns.projectapp.controller.View1";
        },

        createContent: function (oController) {
            return new sap.m.Shell(this.createId("shell"), {
                app: new sap.m.App(this.createId("app"), {
                    pages: new sap.m.Page({
                        title: "Northwind Data",
                        content: [
                            new sap.f.FlexibleColumnLayout(this.createId("fcl"), {
                                initialMidColumnPage: this.byId("page3"),
                                beginColumnPages: [
                                    new sap.m.Page(this.createId("page2"), {
                                        content: [
                                            new sap.m.Table(this.createId("northwind-table"), {
                                                mode: sap.m.ListMode.SingleSelectMaster,
                                                selectionChange: oController.onRowSelected.bind(oController),
                                                headerToolbar: new sap.m.OverflowToolbar({
                                                    content: [
                                                        new sap.m.Button({
                                                            icon: "sap-icon://refresh",
                                                            tooltip: "Refresh Data",
                                                            text: "Refresh",
                                                            press: oController.onRefreshPress.bind(oController)
                                                        }),
                                                        new sap.m.Button({
                                                            icon: "sap-icon://group-2",
                                                            tooltip: "Group Data",
                                                            text: "Group",
                                                            press: oController.onGroupPress.bind(oController)
                                                        }),
                                                        new sap.m.Button({
                                                            icon: "sap-icon://sort",
                                                            tooltip: "Sort Data",
                                                            text: "Sort",
                                                            press: oController.onSortPress.bind(oController)
                                                        }),
                                                        new sap.m.Button({
                                                            icon: "sap-icon://filter",
                                                            tooltip: "Filter Data",
                                                            text: "Filter",
                                                            press: oController.onFilterPress.bind(oController)
                                                        }),
                                                        new sap.m.SearchField(this.createId("searchField"), {
                                                            placeholder: "Search Data",
                                                            width: "12rem",
                                                            icon: "sap-icon://search",
                                                            liveChange: oController.onSearchPress.bind(oController)
                                                        }),
                                                        new sap.m.Button({
                                                            text: "Add Data",
                                                            icon: "sap-icon://add",
                                                            press: oController.onAddPress.bind(oController)
                                                        }),
                                                        new sap.m.Button(this.createId("update"), {
                                                            tooltip: "Update Data",
                                                            icon: "sap-icon://edit",
                                                            text: "Edit",
                                                            visible: false,
                                                            press: oController.onUpdatePress.bind(oController)
                                                        }),
                                                        new sap.m.Button(this.createId("delete"), {
                                                            tooltip: "Delete Data",
                                                            text: "Delete",
                                                            icon: "sap-icon://delete",
                                                            visible: false,
                                                            press: oController.onDeletePress.bind(oController)
                                                        }),
                                                    ]
                                                }),

                                                columns: {
                                                    path: "/columns",
                                                    template: new sap.m.Column({
                                                        header: new sap.m.Text({
                                                            text: "{name}"
                                                        })
                                                    })
                                                },
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
                                                }
                                            }).addStyleClass("sapUiTinyMarginBeginEnd"),
                                        ]
                                    })
                                ],
                                midColumnPages: [
                                    new sap.m.Page(this.createId("page3"), {
                                        content: [
                                            new sap.uxap.ObjectPageLayout({
                                                showTitleInHeaderContent: true,
                                                alwaysShowContentHeader: false,
                                                preserveHeaderStateOnScroll: false,
                                                headerContentPinnable: true,
                                                isChildPage: true,
                                                upperCaseAnchorBar: false,
                                                headerTitle: [
                                                    new sap.uxap.ObjectPageDynamicHeaderTitle({
                                                        expandedHeading: [
                                                            new sap.m.Title(this.createId("nameDetail"))
                                                        ],
                                                        snappedHeading: [
                                                            new sap.m.FlexBox({
                                                                alignItems: sap.m.FlexAlignItems.Center,
                                                                fitContainer: true,
                                                                wrap: sap.m.FlexWrap.Wrap,
                                                                items: [
                                                                    new sap.m.FlexBox({
                                                                        alignItems: sap.m.FlexAlignItems.Center,
                                                                        fitContainer: true,
                                                                        wrap: sap.m.FlexWrap.NoWrap,
                                                                        items: [
                                                                            new sap.m.Title(this.createId("nameProductDetail"))
                                                                        ]
                                                                    })
                                                                ]

                                                            }).addStyleClass("sapUiSmallMarginEnd")
                                                        ],
                                                        actions: [
                                                            new sap.m.Button({
                                                                text: "Close",
                                                                type: "Transparent",
                                                                press: oController.onClosePress.bind(oController)
                                                            })
                                                        ]
                                                    })
                                                ],
                                                headerContent: [
                                                    new sap.m.FlexBox({
                                                        wrap: sap.m.FlexWrap.Wrap,
                                                        fitContainer: true,
                                                        alignItems: sap.m.FlexAlignItems.Stretch,
                                                        items: [
                                                            new sap.m.Avatar({
                                                                src: "sap-icon://supplier",
                                                                displaySize: sap.m.AvatarSize.L,
                                                                displayShape: sap.m.AvatarShape.Circle,

                                                            }).addStyleClass("sapUiSmallMarginEnd"),
                                                            new sap.m.VBox({
                                                                justifyContent: sap.m.FlexJustifyContent.Center,
                                                                items: [
                                                                    new sap.m.Label({
                                                                        text: "Category ID:"
                                                                    }),
                                                                    new sap.m.Text(this.createId("categoryDetail"))
                                                                ]
                                                            }).addStyleClass("sapUiSmallMarginEnd"),
                                                            new sap.m.VBox({
                                                                justifyContent: sap.m.FlexJustifyContent.Center,
                                                                items: [
                                                                    new sap.m.Label({
                                                                        text: "Price:"
                                                                    }),
                                                                    new sap.m.Text(this.createId("priceDetail"))
                                                                ]
                                                            }).addStyleClass("sapUiSmallMarginEnd"),
                                                            new sap.m.VBox({
                                                                justifyContent: sap.m.FlexJustifyContent.Center,
                                                                items: [
                                                                    new sap.m.Label({
                                                                        text: "In Stock:"
                                                                    }),
                                                                    new sap.m.Text(this.createId("stockDetail"))
                                                                ]
                                                            }).addStyleClass("sapUiSmallMarginEnd"),

                                                        ]
                                                    })

                                                ],
                                                sections: [
                                                    new sap.uxap.ObjectPageSection({
                                                        title: "General Information",
                                                        subSections: [
                                                            new sap.uxap.ObjectPageSubSection({
                                                                blocks: [
                                                                    new sap.ui.layout.form.SimpleForm({
                                                                        maxContainerCols: 2,
                                                                        layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
                                                                        editable: false,
                                                                        labelSpanM: 12,
                                                                        labelSpanL: 12,
                                                                        emptySpanL: 0,
                                                                        emptySpanM: 0,
                                                                        columnsL: 1,
                                                                        columnsM: 1,
                                                                        content: [
                                                                            new sap.m.Label({
                                                                                text: "Product ID"
                                                                            }),
                                                                            new sap.m.Text(this.createId("productIdDetail")),
                                                                            new sap.m.Label({
                                                                                text: "Product Name"
                                                                            }),
                                                                            new sap.m.Text(this.createId("productNameDetail")),
                                                                            new sap.m.Label({
                                                                                text: "Supplier ID"
                                                                            }),
                                                                            new sap.m.Text(this.createId("productSupplierDetail")),
                                                                            new sap.m.Label({
                                                                                text: "Category ID"
                                                                            }),
                                                                            new sap.m.Text(this.createId("productCategoryDetail")),
                                                                            new sap.m.Label({
                                                                                text: "Price"
                                                                            }),
                                                                            new sap.m.Text(this.createId("productPriceDetail")),
                                                                            new sap.m.Label({
                                                                                text: "Reorder Level"
                                                                            }),
                                                                            new sap.m.Text(this.createId("productLevelDetail")),
                                                                            new sap.m.Label({
                                                                                text: "Discontinued"
                                                                            }),
                                                                            new sap.m.Text(this.createId("productDiscontinuedDetail")),
                                                                            new sap.m.Label({
                                                                                text: "In Stock"
                                                                            }),
                                                                            new sap.m.Text(this.createId("productStockDetail")),
                                                                            new sap.m.Label({
                                                                                text: "Units On Order"
                                                                            }),
                                                                            new sap.m.Text(this.createId("productOrderDetail")),
                                                                        ]

                                                                    })
                                                                ]
                                                            }),

                                                        ]
                                                    }),
                                                    new sap.uxap.ObjectPageSection({
                                                        title: "Quantity",
                                                        subSections: [
                                                            new sap.uxap.ObjectPageSubSection({
                                                                blocks: [
                                                                    new sap.m.Table(this.createId("productQuantityDetail"), {
                                                                        columns: {},
                                                                        items: {
                                                                            path: "/rows",
                                                                            factory: (id, context) => {
                                                                                let oRow = context.getProperty();
                                                                                let aCells = Object.values(oRow).map(cell => {
                                                                                    return new sap.m.Text({
                                                                                        text: oRow.quantity
                                                                                    })
                                                                                })
                                                                                return new sap.m.ColumnListItem({
                                                                                    type: "Navigation",
                                                                                    cells: aCells
                                                                                })
                                                                            }
                                                                        }
                                                                    }),
                                                                ]
                                                            })
                                                        ]
                                                    })
                                                ]

                                            }),


                                        ],
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

