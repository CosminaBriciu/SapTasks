sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ns/projectapp/utils/services"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (oController, oServices) {
        "use strict";

        return oController.extend("ns.projectapp.controller.View1", {
            onInit: function () {
                this.router = this.getOwnerComponent().getRouter();
                var i18n = new sap.ui.model.resource.ResourceModel({bundleUrl: "./i18n/i18n.properties"});
                this.i18nBundle = i18n.getResourceBundle();

                this.oTableData={
                    columns:[
                        {
                            name:"Product ID",
                            key:"ProductID"
                        },
                        {
                            name:"Product Name",
                            key:"ProductName" 
                        },
                        {
                            name:"Supplier ID",
                            key:"SupplierID" 
                        },
                        {
                            name:"Category ID",
                            key:"CategoryID" 
                        },
                        {
                            name:"Quantity",
                            key:"QuantityPerUnit" 
                        },
                        {
                            name:"Price",
                            key:"UnitPrice" 
                        },
                        {
                            name:"In Stock",
                            key:"UnitsInStock" 
                        },
                        {
                            name:"Units On Order",
                            key:"UnitsOnOrder" 
                        },
                        {
                            name:"Reorder Level",
                            key:"ReorderLevel" 
                        },
                        {
                            name:"Discontinued",
                            key:"Discontinued" 
                        },
                    ],
                    rows:[]
                }
                this.oServices= new oServices(this.getOwnerComponent());
                this.oServices.getCustomers().then(res =>{
                    let aRows=res.value.map(oCustomers=>({
                        id:oCustomers.ProductID,
                        name: oCustomers.ProductName,
                        supplier:oCustomers.SupplierID,
                        category:oCustomers.CategoryID,
                        quantity:oCustomers.QuantityPerUnit,
                        price:parseFloat(oCustomers.UnitPrice),
                        stock:oCustomers.UnitsInStock,
                        order:oCustomers.UnitsOnOrder,
                        reorderLevel:oCustomers.ReorderLevel,
                        discontinued:oCustomers.Discontinued
                    }))
                    this.oTableData.rows=aRows;
                    this.modelTable=new sap.ui.model.json.JSONModel(this.oTableData);
                    this.byId("northwind-table").setModel(this.modelTable);
                    this.byId("productQuantityDetail").setModel(this.modelTable);
                    this.byId("northwind-table").bindItems({
                        path:"/rows",
                        template: new sap.m.ColumnListItem({
                            cells:[
                                new sap.m.Text({text:"{id}"}),
                                new sap.m.Text({text:"{name}"}),
                                new sap.m.Text({text:"{supplier}"}),
                                new sap.m.Text({text:"{category}"}),
                                new sap.m.Text({text:"{quantity}"}),
                                new sap.m.Text({text:"{price}"}),
                                new sap.m.Text({text:"{stock}"}),
                                new sap.m.Text({text:"{order}"}),
                                new sap.m.Text({text:"{reorderLevel}"}),
                                new sap.ui.core.Icon({
                                    src:{
                                        path:"discontinued",
                                        formatter:function(discontinued){
                                            if (discontinued){
                                                return "sap-icon://accept";
                                            }else{
                                                return "sap-icon://decline";
                                            }
                                        }
                                    },
                                    color:{
                                        path:"discontinued",
                                        formatter:function(discontinued){
                                            if (discontinued){
                                                return "green";
                                            }else{
                                                return "red";
                                            }
                                        }
                                    }
                                })
                            ]
                        })
                    })
                })

                this.onGroupFunction={ 
                    discontinued:function(oContext){
                        var value=oContext.getProperty("discontinued");
                        return {
                            key:value,
                            text:value
                        }
                    },
                    price:function(oContext){
                        var oPrice=oContext.getProperty("price");
                        var text, key;
                        if (oPrice<=10){
                            key="LE10"
                            text="10.00 or LESS"
                        }else if (oPrice<=45){
                            key="BT10-45"
                            text="BETWEEN 10.00 and 45.00"
                        } else if (oPrice>45){
                            key="GT45";
                            text="MORE than 45.00"   
                        }
                        return {
                            key:key,
                            text:text,
                        }                             
                    },
                                       
                }
            },
            onAddPress:function(e){
                this.contentDialog=new sap.ui.layout.form.SimpleForm({
                    editable:true,
                    title:this.i18nBundle.getText("Registration Form"),
                    content:[
                        new sap.m.VBox({
                            items:[
                                new sap.m.HBox({
                                    justifyContent:sap.m.FlexJustifyContent.End,
                                    items:[
                                        new sap.m.Label({
                                            text:"Product ID:",
                                            required:true
                                        }),
                                        new sap.m.Input(this.createId("products-id"),{
                                            placeholder:"Product ID ...",
                                            type:"Number"
                                        }).addStyleClass("sapUiSmallMarginBegin")
                                    ]
                                }).addStyleClass("sapUiLargeMarginEnd"),
                                new sap.m.HBox({
                                    justifyContent:sap.m.FlexJustifyContent.End,
                                    items:[
                                        new sap.m.Label({
                                            text:"Product Name:",
                                            required:true
                                        }),
                                        new sap.m.Input(this.createId("products-name"),{
                                            placeholder:"Product Name ...",
                                        }).addStyleClass("sapUiSmallMarginBegin")
                                    ]
                                }).addStyleClass("sapUiLargeMarginEnd"),
                                new sap.m.HBox({
                                    justifyContent:sap.m.FlexJustifyContent.End,
                                    items:[
                                        new sap.m.Label({
                                            text:"Supplier ID:",
                                            required:true
                                        }),
                                        new sap.m.Input(this.createId("products-supplierID"),{
                                            placeholder:"Supplier ID ...",
                                            type:"Number"
                                        }).addStyleClass("sapUiSmallMarginBegin")
                                    ]
                                }).addStyleClass("sapUiLargeMarginEnd"),
                                new sap.m.HBox({
                                    justifyContent:sap.m.FlexJustifyContent.End,
                                    items:[
                                        new sap.m.Label({
                                            text:"Category ID:",
                                            textAlign:sap.ui.core.TextAlign.Left,
                                            required:true
                                        }),
                                        new sap.m.Input(this.createId("products-categoryID"),{
                                            placeholder:"Category ID ...",
                                            type:"Number"
                                        }).addStyleClass("sapUiSmallMarginBegin")
                                    ]
                                }).addStyleClass("sapUiLargeMarginEnd"),
                                new sap.m.HBox({
                                    justifyContent:sap.m.FlexJustifyContent.End,
                                    items:[
                                        new sap.m.Label({
                                            text:"Quantity/Unit:",
                                            required:true
                                        }),
                                        new sap.m.Input(this.createId("products-quantityPerUnit"),{
                                            placeholder:"Quantity Per Unit ..."
                                        }).addStyleClass("sapUiSmallMarginBegin")
                                    ]
                                }).addStyleClass("sapUiLargeMarginEnd"),
                                new sap.m.HBox({
                                    justifyContent:sap.m.FlexJustifyContent.End,
                                    items:[
                                        new sap.m.Label({
                                            text:"UnitPrice:",
                                            required:true
                                        }),
                                        new sap.m.Input(this.createId("products-unitPrice"),{
                                            placeholder:"UnitPrice ...",
                                            type:"Number"
                                        }).addStyleClass("sapUiSmallMarginBegin")
                                    ]
                                }).addStyleClass("sapUiLargeMarginEnd"),
                                new sap.m.HBox({
                                    justifyContent:sap.m.FlexJustifyContent.End,
                                    items:[
                                        new sap.m.Label({
                                            text:"In Stock:",
                                            required:true
                                        }),
                                        new sap.m.Input(this.createId("products-unitsInStock"),{
                                            placeholder:"In Stock ...",
                                            type:"Number"
                                        }).addStyleClass("sapUiSmallMarginBegin")
                                    ]
                                }).addStyleClass("sapUiLargeMarginEnd"),
                                new sap.m.HBox({
                                    justifyContent:sap.m.FlexJustifyContent.End,
                                    items:[
                                        new sap.m.Label({
                                            text:"Units on Order:",
                                            required:true
                                        }),
                                        new sap.m.Input(this.createId("products-unitsOnOrder"),{
                                            placeholder:"Units on Order ...",
                                            type:"Number"
                                        }).addStyleClass("sapUiSmallMarginBegin")
                                    ]
                                }).addStyleClass("sapUiLargeMarginEnd"),
                                new sap.m.HBox({
                                    justifyContent:sap.m.FlexJustifyContent.End,
                                    items:[
                                        new sap.m.Label({
                                            text:"Reorder Level:",
                                            required:true
                                        }),
                                        new sap.m.Input(this.createId("products-reorderLevel"),{
                                            placeholder:"Reorder Level ...",
                                            type:"Number"
                                        }).addStyleClass("sapUiSmallMarginBegin")
                                    ]
                                }).addStyleClass("sapUiLargeMarginEnd"),
                                new sap.m.HBox({
                                    justifyContent:sap.m.FlexJustifyContent.Center,
                                    items:[
                                        new sap.m.Label({
                                            text:"Discontinued:"
                                        }),
                                        new sap.m.RadioButtonGroup(this.createId("products-discontinued"),{
                                            buttons:[
                                                new sap.m.RadioButton({
                                                    text:"true"
                                                }),
                                                new sap.m.RadioButton({
                                                    text:"false"
                                                })
                                            ],
                                        }).addStyleClass("sapUiSmallMarginBegin")
                                    ]
                                }).addStyleClass("sapUiLargeMarginEnd"),
                                new sap.m.HBox({
                                    justifyContent:sap.m.FlexJustifyContent.End,
                                    items:[
                                        new sap.m.Button({
                                            width:"6rem",
                                            text:"Save",
                                            type:"Accept",
                                            press:this.onSavePress.bind(this)
                                        }).addStyleClass("sapUiSmallMarginEnd"),
                                        new sap.m.Button({
                                            width:"6rem",
                                            text:"Cancel",
                                            type:"Reject",
                                            press:this.onCancelPress.bind(this)
                                        }).addStyleClass("sapUiMediumMarginEnd"),
                                    ]
                                }).addStyleClass("sapUiTinyMarginTop"),
                            ]

                        }).addStyleClass("sapUiLargeMarginEnd")
                    ]
                })
                this.dialog=new sap.m.Dialog({
                    content:this.contentDialog, 
                }).open();
            },
            onSavePress:function(e){
                var idData=this.byId("products-id");
                var idVal=idData.getValue();
                
                var nameData=this.byId("products-name");
                var nameVal=nameData.getValue();
                var supplierData=this.byId("products-supplierID");
                var supplierVal=supplierData.getValue();
                var categoryData=this.byId("products-categoryID");
                var categoryVal=categoryData.getValue();
                
                var quantityPerUnitData=this.byId("products-quantityPerUnit");
                var quantityPerUnitVal= quantityPerUnitData.getValue();
                var unitPriceData=this.byId("products-unitPrice");
                var unitPriceVal=unitPriceData.getValue();
                var unitsInStockData=this.byId("products-unitsInStock");
                var unitsInStockVal=unitsInStockData.getValue();
                var unitsOnOrderData=this.byId("products-unitsOnOrder");
                var unitsOnOrderVal=unitsOnOrderData.getValue();
                var reorderLevelData=this.byId("products-reorderLevel");
                var reorderLevelVal=reorderLevelData.getValue();
                var selectButton=this.byId("products-discontinued").getSelectedIndex();
                if (selectButton===0){
                    var discontinuedVal=true;
                } else{
                    discontinuedVal=false;
                }

                var valueMap=[[idData,idVal], [nameData,nameVal],[supplierData,supplierVal],[categoryData,categoryVal],[quantityPerUnitData,quantityPerUnitVal],[unitPriceData,unitPriceVal],[unitsInStockData,unitsInStockVal],[unitsOnOrderData,unitsOnOrderVal],[reorderLevelData,reorderLevelVal]];
                var allFilled=this.onRequiredFields(valueMap);

                var newData={
                    id:idVal,
                    name: nameVal,
                    supplier:supplierVal,
                    category:categoryVal,
                    quantity:quantityPerUnitVal,
                    price:unitPriceVal,
                    stock:unitsInStockVal,
                    order:unitsOnOrderVal,
                    reorderLevel:reorderLevelVal,
                    discontinued:discontinuedVal
                }

                if (allFilled){
                    if (this.editBtn){
                        for (var i=0;i<this.oTableData.rows.length;i++){
                            if (this.dataRow["id"] === this.oTableData.rows[i]["id"]){
                                this.oTableData.rows[i]=newData;
                                break;
                            }
                        }
                    }else{
                        this.oTableData.rows.push(newData);
                    }
                    this.modelTable.refresh();
                    this.dialog.close();
                    this.dialog.destroyContent();
                    this.editBtn=false;
                    this.byId("delete").setVisible(false);
                    this.byId("update").setVisible(false);
                }
            },
            onRequiredFields:function(arr){
                var requiredPassed=true;
                
                arr.forEach(e=>{
                    var element=e[0];
                    var value=e[1];
                    if (!value){
                        requiredPassed=false;
                        element.setValueState(sap.ui.core.ValueState.Error);
                        setTimeout(()=>element.setValueState(sap.ui.core.ValueState.None), 1500);
                    }
                })
                return requiredPassed;
            },
            onCancelPress:function(e){
                this.dialog.close();
                this.dialog.destroyContent();
            },
            onDeletePress:function(e){
                this.dialogMessage=new sap.m.Dialog({
                    type: sap.m.DialogType.Message,
                    icon:"sap-icon://message-information",
                    content:new sap.m.Text({
                        text:"Are you sure you want to delete this item?"
                    }),
                    beginButton: new sap.m.Button({
                            width:"4rem",
                            text:"Ok",
                            type:"Accept",
                            press:this.onDeleteConfirm.bind(this)
                        }).addStyleClass("sapUiSmallMarginEnd"),
                    endButton: new sap.m.Button({
                            width:"4rem",
                            text:"Cancel",
                            type:"Reject",
                            press: function (e) {
                                this.dialogMessage.close();
                            }.bind(this)
                        })
                }).open()
            },
            onDeleteConfirm:function(e){
                for (var i=0;i<this.oTableData.rows.length;i++){
                    if (this.dataRow["id"] === this.oTableData.rows[i]["id"]){
                        this.oTableData.rows.splice(i,1);
                        break;
                    }
                }
                this.modelTable.refresh();
                this.byId("delete").setVisible(false);
                this.byId("update").setVisible(false);
                
                this.dialogMessage.close();
                this.dialogMessage.destroyContent();
            },
            onUpdatePress:function(e){
                this.editBtn=true;
                this.onAddPress();
                this.byId("products-id").setValue(this.dataRow["id"]);
                this.byId("products-name").setValue(this.dataRow["name"]);
                this.byId("products-supplierID").setValue(this.dataRow["supplier"]);
                this.byId("products-categoryID").setValue(this.dataRow["category"]);
                this.byId("products-quantityPerUnit").setValue(this.dataRow["quantity"]);
                this.byId("products-unitPrice").setValue(this.dataRow["price"]);
                this.byId("products-unitsInStock").setValue(this.dataRow["stock"]);
                this.byId("products-unitsOnOrder").setValue(this.dataRow["order"]);
                this.byId("products-reorderLevel").setValue(this.dataRow["reorderLevel"]);
                if (this.dataRow["discontinued"]===true){
                    var selectButtonEdit=0;
                }else{
                    selectButtonEdit=1;
                }
                this.byId("products-discontinued").setSelectedIndex(selectButtonEdit);
            },
            onRowSelected:function(e){
                this.byId("update").setVisible(true);
                this.byId("delete").setVisible(true);

                var {listItem} = e.getParameters()
                this.dataRow = listItem.getBindingContext().getObject();
                var value=this.dataRow.name;
                this.byId("nameDetail").setText(value);
                this.byId("nameProductDetail").setText(value);
                this.byId("categoryDetail").setText(this.dataRow.category);
                this.byId("priceDetail").setText("EUR "+this.dataRow.price);
                this.byId("stockDetail").setText(this.dataRow.stock);

                this.byId("productIdDetail").setText(this.dataRow.id);
                this.byId("productNameDetail").setText(this.dataRow.name);
                this.byId("productSupplierDetail").setText(this.dataRow.supplier);
                this.byId("productCategoryDetail").setText(this.dataRow.category);
                this.byId("productPriceDetail").setText(this.dataRow.price);
                this.byId("productLevelDetail").setText(this.dataRow.reorderLevel);
                this.byId("productDiscontinuedDetail").setText(this.dataRow.discontinued);
                this.byId("productStockDetail").setText(this.dataRow.stock);
                this.byId("productOrderDetail").setText(this.dataRow.order);
                this.byId("fcl").setLayout("TwoColumnsBeginExpanded");
            },
            onClosePress:function(){
                this.byId("fcl").setLayout("OneColumn");
                this.modelTable.refresh();
                this.byId("delete").setVisible(false);
                this.byId("update").setVisible(false);
            },
            onSearchPress:function(e){
                var sInput=e.getSource().getValue();
                if (sInput && sInput.length>0){
                    this.onSearchColumn(sInput);
                }
            },
            onSearchColumn:function(sInput){
                var filter1=new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains, sInput)
                var filter2=new sap.ui.model.Filter("supplier", sap.ui.model.FilterOperator.EQ, sInput)
                var filter3=new sap.ui.model.Filter("category", sap.ui.model.FilterOperator.EQ, sInput)
                var oFilter=new sap.ui.model.Filter([filter1, filter2, filter3]);
                var table=this.byId("northwind-table");
                var items=table.getBinding("items");

                items.filter(oFilter);
            },
            onSortPress:function(){
                new sap.m.ViewSettingsDialog({
                    sortItems:[
                        new sap.m.ViewSettingsItem({
                            text:this.i18nBundle.getText("Product Name"),
                            key:"name",
                            selected:true
                        }),
                        new sap.m.ViewSettingsItem({
                            text:this.i18nBundle.getText("Price"),
                            key:"price"
                        }),
                        new sap.m.ViewSettingsItem({
                            text:this.i18nBundle.getText("Discontinued"),
                            key:"discontinued"
                        }),
                    ],
                    confirm: this.onSortConfirm.bind(this)
                }).open()
            },
            onSortConfirm:function(e){
                var params = e.getParameters();
                var key = params.sortItem.getKey();
                var order = params.sortDescending;
                var sorters = [];

                var table=this.byId("northwind-table");

                var items = table.getBinding("items");
                sorters.push(new sap.ui.model.Sorter(key, order));

                items.sort(sorters);
            },
            onGroupPress:function(e){
                new sap.m.ViewSettingsDialog({
                    groupItems:[
                        new sap.m.ViewSettingsItem({
                            text:this.i18nBundle.getText("Price"),
                            key:"price",
                        }),
                        new sap.m.ViewSettingsItem({
                            text:this.i18nBundle.getText("Discontinued"),
                            key:"discontinued"
                        }),
                    ],
                    confirm:this.onGroupConfirm.bind(this),
                }).open()
            },
            onGroupConfirm:function(e){
                this.modelTable.refresh();
                var params=e.getParameters();
                var key=params.groupItem.getKey();//path-ul
                var group1=params.groupDescending;
                var groups=[];

                var table=this.byId("northwind-table");
                
                var groupFunction= this.onGroupFunction[key];
                var items=table.getBinding("items");
                groups.push(new sap.ui.model.Sorter(key, group1, groupFunction));

                items.sort(groups);  
            },
            onFilterPress:function(e){
                new sap.m.ViewSettingsDialog({
                    filterItems:[
                        new sap.m.ViewSettingsFilterItem({
                            text:this.i18nBundle.getText("Discontinued"),
                            key:"discontinued",
                            multiSelect:false,
                            items:[
                                new sap.m.ViewSettingsItem({
                                    text:this.i18nBundle.getText("yes"),
                                    key:"EQ___1"
                                }),
                                new sap.m.ViewSettingsItem({
                                    text:this.i18nBundle.getText("no"),
                                    key:"EQ___0"
                                })
                            ]
                        }),
                        new sap.m.ViewSettingsFilterItem({
                            text:this.i18nBundle.getText("Price"),
                            key:"price",
                            multiSelect:false,
                            items:[
                                new sap.m.ViewSettingsItem({
                                    text:this.i18nBundle.getText("10.00 or LESS"),
                                    key:"LE___10.00___X"
                                }),
                                new sap.m.ViewSettingsItem({
                                    text:this.i18nBundle.getText("BETWEEN 10.000 and 45.00"),
                                    key:"BT___10.00___45.00"
                                }),
                                new sap.m.ViewSettingsItem({
                                    text:this.i18nBundle.getText("MORE than 45.00"),
                                    key:"GT___45.00___X"
                                })
                            ]
                        })
                    ],
                    confirm:this.onFilterConfirm.bind(this)
                }).open()
            },
            onFilterConfirm:function(e){
                var params=e.getParameters();
                var table=this.byId("northwind-table");
                var items=table.getBinding("items");

                var filters=params.filterItems.map(e => {
                    var path = e.getParent().getKey();
                    var operator=e.getKey().split("___")[0];
                    var value1=e.getKey().split("___")[1];
                    var value2=e.getKey().split("___")[2];
                    return new sap.ui.model.Filter(path, operator,parseInt(value1) , parseInt(value2))
                })
                items.filter(filters);
            },
            onRefreshPress:function(e){
                var table=this.byId("northwind-table");
                var items=table.getBinding("items");
                items.sort([]);
                this.modelTable=new sap.ui.model.json.JSONModel(this.oTableData);
                table.setModel(this.modelTable);
            },
        });
    });
