$.sap.require('sap.ui.thirdparty.jqueryui.jquery-ui-core'),
    $.sap.require('sap.ui.thirdparty.jqueryui.jquery-ui-widget'),
    $.sap.require('sap.ui.thirdparty.jqueryui.jquery-ui-mouse'),
    $.sap.require('sap.ui.thirdparty.jqueryui.jquery-ui-sortable'),
    $.sap.require('sap.ui.thirdparty.jqueryui.jquery-ui-droppable'),
    $.sap.require('sap.ui.thirdparty.jqueryui.jquery-ui-draggable'),
    $.sap.require('sap.m.Button'),
    sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "draganddrop/utils/services",

    ],

        /**
         * @param {typeof sap.ui.core.mvc.Controller} Controller
         */
        function (Controller, oServices) {
            "use strict";

            return Controller.extend("draganddrop.controller.View1", {
                onInit: function () {
                    this.oFirstTableData = {
                        columns: [
                            {
                                name: this.getView().getModel("i18n").getResourceBundle().getText("Product_ID"),
                                key: "id"
                            },
                            {
                                name: this.getView().getModel("i18n").getResourceBundle().getText("Product_Name"),
                                key: "name"
                            },
                            {
                                name: this.getView().getModel("i18n").getResourceBundle().getText("Supplier_ID"),
                                key: "supplier"
                            },
                        ],
                        rows: []
                    }
                    this.oSecondTableData = {
                        columns: [
                            {
                                name: this.getView().getModel("i18n").getResourceBundle().getText("Product_ID"),
                                key: "id"
                            },
                            {
                                name: this.getView().getModel("i18n").getResourceBundle().getText("Product_Name"),
                                key: "name"
                            },
                            {
                                name: this.getView().getModel("i18n").getResourceBundle().getText("Supplier_ID"),
                                key: "supplier"
                            },
                        ],
                        rows: []
                    },
                        this.products = {
                            data: [
                                {
                                    "ProductId": "HT-1000",
                                    "Name": "Notebook Basic 15",
                                    "Icon": "https://images.pexels.com/photos/40185/mac-freelancer-macintosh-macbook-40185.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                },
                                {
                                    "ProductId": "HT-1001",
                                    "Name": "Notebook Basic 17",
                                    "Icon": "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                },
                                {
                                    "ProductId": "HT-1002",
                                    "Name": "Notebook Basic 18",
                                    "Icon": "https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                },
                                {
                                    "ProductId": "HT-1003",
                                    "Name": "Notebook Basic 19",
                                    "Icon": "https://images.pexels.com/photos/1006293/pexels-photo-1006293.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                },
                                {
                                    "ProductId": "HT-1007",
                                    "Name": "ITelO Vault",
                                    "Icon": "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                },
                                {
                                    "ProductId": "HT-1010",
                                    "Name": "Notebook Professional 15",
                                    "Icon": "https://images.pexels.com/photos/927629/pexels-photo-927629.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                },
                                {
                                    "ProductId": "HT-1011",
                                    "Name": "Notebook Professional 17",
                                    "Icon": "https://images.pexels.com/photos/18104/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                },
                                {
                                    "ProductId": "HT-1020",
                                    "Name": "ITelO Vault Net",
                                    "Icon": "https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                },
                                {
                                    "ProductId": "HT-1021",
                                    "Name": "ITelO Vault SAT",
                                    "Icon": "https://images.pexels.com/photos/577210/pexels-photo-577210.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                },
                                {
                                    "ProductId": "HT-1022",
                                    "Name": "Comfort Easy",
                                    "Icon": "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                },
                                {
                                    "ProductId": "HT-1023",
                                    "Name": "Comfort Senior",
                                    "Icon": "https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                },
                                {
                                    "ProductId": "HT-1030",
                                    "Name": "Ergo Screen E-I",
                                    "Icon": "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                },
                                {
                                    "ProductId": "HT-1031",
                                    "Name": "Ergo Screen E-II",
                                    "Icon": "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                },
                            ]
                        }

                    this.byId('inputValueHelp').attachBrowserEvent("keydown", function (e) {
                        if (e.keyCode !== 115) {
                            e.preventDefault();
                        }
                    });
                    this.modelSecondTable = new sap.ui.model.json.JSONModel(this.oSecondTableData);
                    this.byId("northwind-table-selected").setModel(this.modelSecondTable);
                    this.oServices = new oServices(this.getOwnerComponent());
                    this.oServices.getCustomers().then(res => {
                        let aRows = res.value.map(oCustomers => ({
                            id: oCustomers.ProductID,
                            name: oCustomers.ProductName,
                            supplier: oCustomers.SupplierID
                        }))
                        this.oFirstTableData.rows = aRows;
                        this.modelFirstTable = new sap.ui.model.json.JSONModel(this.oFirstTableData);
                        this.byId("northwind-table").setModel(this.modelFirstTable);
                        this.setBindingItemsTable("northwind-table")
                    })
                },

                // setModelTables: function (sIdTable, oTableData, oModelTable, oDraggedItemContext, oDroppedItemContext) {
                //     var indexDraggedItem = oDraggedItemContext.sPath.split("/");
                //     var oDraggedRowTable = oModelTable.getData().rows[indexDraggedItem];
                //     if (oDroppedItemContext == undefined) {
                //         oTableData.rows.push(oDraggedRowTable);
                //     } else {
                //         var indexDroppedItem = oDroppedItemContext.sPath.split("/")[2];
                //         oTableData.rows.splice(indexDroppedItem, 0, oDraggedRowTable)
                //     }
                //     var oNewModelTable = new sap.ui.model.json.JSONModel(oTableData);
                //     this.byId(sIdTable).setModel(oNewModelTable);
                //     this.setBindingItemsTable(sIdTable)
                //     oModelTable.getData().rows.splice(indexDraggedItem, 1)
                //     oModelTable.refresh()
                // },
                setBindingItemsTable: function (sTableId) {
                    this.byId(sTableId).bindItems({
                        path: "/rows",
                        template: new sap.m.ColumnListItem({
                            cells: [
                                new sap.m.Text({ text: "{id}" }),
                                new sap.m.Input({ value: "{name}" }),
                                new sap.m.Input({ value: "{supplier}", editable: false, enabled: false })
                            ]
                        })
                    })
                },
                onDropAvailableProductsTable: function (e) {
                    var oDraggedItem = e.getParameter("draggedControl");
                    var oDraggedItemContext = oDraggedItem.getBindingContext();
                    var oDroppedItem = e.getParameter("droppedControl");
                    var oDroppedItemContext = oDroppedItem.getBindingContext();
                    // this.setModelTables("northwind-table",this.oFirstTableData, this.modelSecondTable, oDraggedItemContext, oDroppedItemContext)
                    var indexDraggedItem = oDraggedItemContext.sPath.split("/")[2];
                    var oDraggedRowTable = this.modelSecondTable.getData().rows[indexDraggedItem];
                    if (oDroppedItemContext == undefined) {
                        this.oFirstTableData.rows.push(oDraggedRowTable);
                    } else {
                        var indexDroppedItem = oDroppedItemContext.sPath.split("/")[2];
                        this.oFirstTableData.rows.splice(indexDroppedItem, 0, oDraggedRowTable)
                    }
                    this.modelFirstTable = new sap.ui.model.json.JSONModel(this.oFirstTableData);
                    this.byId("northwind-table").setModel(this.modelFirstTable);
                    this.setBindingItemsTable("northwind-table")
                    this.modelSecondTable.getData().rows.splice(indexDraggedItem, 1)
                    this.modelSecondTable.refresh()
                },
                onDropSelectedProductsTable: function (e) {
                    var oDraggedItem = e.getParameter("draggedControl");
                    var oDraggedItemContext = oDraggedItem.getBindingContext();
                    var oDroppedItem = e.getParameter("droppedControl");
                    var oDroppedItemContext = oDroppedItem.getBindingContext();

                    // this.setModelTables("northwind-table-selected",this.oSecondTableData, this.modelFirstTable, oDraggedItemContext, oDroppedItemContext)

                    var indexDraggedItem = oDraggedItemContext.sPath.split("/")[2];
                    var oDraggedRowTable = this.modelFirstTable.getData().rows[indexDraggedItem];
                    if (oDroppedItemContext == undefined) {
                        this.oSecondTableData.rows.push(oDraggedRowTable);
                    } else {
                        var indexDroppedItem = oDroppedItemContext.sPath.split("/")[2];
                        this.oSecondTableData.rows.splice(indexDroppedItem, 0, oDraggedRowTable)
                    }
                    this.modelSecondTable = new sap.ui.model.json.JSONModel(this.oSecondTableData);
                    this.byId("northwind-table-selected").setModel(this.modelSecondTable);
                    this.byId("northwind-table-selected").bindItems({
                        path: "/rows",
                        template: new sap.m.ColumnListItem({
                            cells: [
                                new sap.m.Text({ text: "{id}" }),
                                new sap.m.Text({ text: "{name}" }),
                                new sap.m.Text({ text: "{supplier}" })
                            ]
                        })
                    })
                    this.modelFirstTable.getData().rows.splice(indexDraggedItem, 1)
                    this.modelFirstTable.refresh()
                },
                onUploadFile: function (e) {
                    this.oUploadFileData = e.getParameter("files") && e.getParameter("files")[0];
                },
                onUploadPress: function () {
                    var file = this.oUploadFileData;
                    // if (file && window.FileReader) {
                    var reader = new FileReader();
                    var sTypeOfFile = file.name.split('.')[1].toLowerCase();
                    if (sTypeOfFile == 'png' || sTypeOfFile == 'jpeg') {
                        reader.onload = function (e) {
                            sap.m.MessageBox.alert(new sap.m.Image({
                                src: e.target.result
                            }))
                        }
                        reader.readAsDataURL(file)

                    } else {
                        reader.onload = function (e) {
                            sap.m.MessageBox.alert(e.target.result);
                        }
                        reader.readAsText(file)
                    }
                    // }
                },
                onSortPress: function (e) {
                    var sHeaderTable = e.getSource().getText();
                    let index = this.oFirstTableData.columns.find(o => o.name == sHeaderTable)
                    let sKeyHeader = index.key
                    var sorters = [];

                    var table = this.byId("northwind-table");
                    var items = table.getBinding("items");
                    sorters.push(new sap.ui.model.Sorter(sKeyHeader, !e.getSource().getPressed()));
                    items.sort(sorters);
                    this.modelFirstTable.refresh();
                },
                onValueHelpRequest: function (e) {
                    if (!this.contentDialog) {
                        this.contentDialog = new sap.m.SelectDialog(this.createId("listProduct"), {
                            title: this.getView().getModel("i18n").getResourceBundle().getText("Products"),
                            items: {},
                            cancel: this.onValueHelpCancel.bind(this),
                            confirm: this.onValueHelpCancel.bind(this),
                            liveChange: this.onValueHelpSearch.bind(this)
                        })
                        var oModel = new sap.ui.model.json.JSONModel(this.products);
                        var listProducts = this.byId("listProduct");
                        listProducts.setModel(oModel);
                        var template = new sap.m.StandardListItem({
                            icon: "{Icon}",
                            title: "{Name}",
                            description: "{ProductId}"
                        })
                        listProducts.bindAggregation("items", {
                            path: "/data", template: template
                        })
                        this.getView().addDependent(this.contentDialog)
                    }
                    this.contentDialog.open();
                },
                onChangeInput: function (e) {
                    // console.log(e)
                },
                onValueHelpCancel: function (e) {
                    var oSelectedItem = e.getParameter("selectedItem");
                    if (oSelectedItem) {
                        var productInput = this.byId("inputValueHelp");
                        productInput.setValue(oSelectedItem.getTitle());
                    }
                    e.getSource().getBinding("items").filter([]);
                    this.sValue = this.byId("inputValueHelp").getValue();
                },
                onValueHelpSearch: function (e) {
                    var sInput = e.getParameter("value");
                    if (sInput && sInput.length > 0) {
                        var oFilter = new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, sInput);
                        e.getSource().getBinding("items").filter([oFilter]);
                    }

                },
            });
        });
