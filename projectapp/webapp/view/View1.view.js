sap.ui.define(function (){
    return sap.ui.jsview("ns.projectapp.view.View1", {
        getControllerName:function(){
            return "ns.projectapp.controller.View1";
        },

        createContent: function (oController){
            return new sap.m.Shell({
                app:new sap.m.App({
                    pages:new sap.m.Page({
                        title:"Northwind Data",
                        content:[
                            new sap.m.HBox({
                                items:[
                                    new sap.m.Table(this.createId("northwind-table"),{
                                        mode: sap.m.ListMode.SingleSelectMaster,
                                        selectionChange: oController.onRowSelected.bind(oController),
                                        headerToolbar:new sap.m.OverflowToolbar({
                                            content:[
                                                new sap.m.Button({
                                                    icon:"sap-icon://refresh",
                                                    tooltip:"Refresh Data",
                                                    text:"Refresh",
                                                    press:oController.onRefreshPress.bind(oController)
                                                }),
                                                new sap.m.Button({
                                                    icon:"sap-icon://group-2",
                                                    tooltip:"Group Data",
                                                    text:"Group",
                                                    press:oController.onGroupPress.bind(oController)
                                                }),
                                                new sap.m.Button({
                                                    icon:"sap-icon://sort",
                                                    tooltip:"Sort Data",
                                                    text:"Sort",
                                                    press:oController.onSortPress.bind(oController)
                                                }),
                                                new sap.m.Button({
                                                    icon:"sap-icon://filter",
                                                    tooltip:"Filter Data",
                                                    text:"Filter",
                                                    press:oController.onFilterPress.bind(oController)
                                                }),
                                                new sap.m.SearchField(this.createId("searchField"),{
                                                    placeholder:"Search Data",
                                                    width:"12rem",
                                                    icon:"sap-icon://search",
                                                    liveChange:oController.onSearchPress.bind(oController)
                                                }),
                                                new sap.m.Button({
                                                    text:"Add Data",
                                                    icon:"sap-icon://add",
                                                    press:oController.onAddPress.bind(oController)
                                                }),
                                                new sap.m.Button(this.createId("update"),{
                                                    tooltip:"Update Data",
                                                    icon:"sap-icon://edit",
                                                    text:"Edit",
                                                    visible:false,
                                                    press:oController.onUpdatePress.bind(oController)
                                                }),
                                                new sap.m.Button(this.createId("delete"),{
                                                    tooltip:"Delete Data",
                                                    text:"Delete",
                                                    icon:"sap-icon://delete",
                                                    visible:false,
                                                    press:oController.onDeletePress.bind(oController)
                                                }),
                                            ]
                                        }),

                                        columns:{
                                            path:"/columns",
                                            template:new sap.m.Column({
                                                header:new sap.m.Text({
                                                    text:"{name}"
                                                })
                                            })
                                        },
                                        items:{
                                            path:"/rows",
                                            factory:(id, context)=>{
                                                let oRow=context.getProperty();
                                                let aCells=Object.values(oRow).map(cell=>{
                                                    return new sap.m.Text({
                                                        text:cell
                                                    })
                                                })
                                                return new sap.m.ColumnListItem({
                                                    cells:aCells
                                                })
                                            }
                                        }
                                    })
                                ]
                            }).addStyleClass("sapUiMediumMarginBeginEnd")
                            
                        ]
                    })
                })
            })
        }
    })      
})

