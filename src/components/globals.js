const BACKEND_URL = "http:127.0.0.1:5500";

const API = {
    createPayment: {path:"/payment", method:"POST"},
    expense: {path:"/expense", method:"POST"},
};

const FORM_FORMATS = {
        createPayment: {label: "PAYMENT FORM",
                        1: [{name:"amount", type:"number", datalist:"none", label:"Amount"},
                            {name:"reason", type:"textarea", datalist:"none", label:"Reason for payment"}
                           ],
                        5: [{name:"amount", type:"number", datalist:"none", label:"Amount"},
                            {name:"item", type:"select,value", datalist:"default:order", label:"Item"}, 
                            {name:"order", type:"child", label:"Order details", datalist: [
                                {name:"item", type:"select,value", datalist:"product, service, package", label:"Item"},
                                {name:"itemid", type:"select,id", datalist:"path:/orderitems", label:"Select from list"},
                                {name:"quantity", type:"number", datalist:"none", label:"Quantity"},
                                {name:"status", type:"select,value", datalist:"pending, served", label:"Status"}
                               ]
                            }
                           ],
                        6: [{name:"amount", type:"number", datalist:"none", label:"Amount"},
                            {name:"item", type:"select,value", datalist:"default:invoice", label:"Item"}, 
                            {name:"invoice", type:"child", label:"Invoice details", datalist: [
                              {name:"orders", type:"children", label:"Invoice orders", datalist: [[
                                  {name:"item", type:"select,value", datalist:"product, service, package", label:"Item"},
                                  {name:"itemid", type:"select,id", datalist:"path:/orderitems", label:"Select from list"},
                                  {name:"quantity", type:"number", datalist:"none", label:"Quantity"},
                                  {name:"status", type:"select,value", datalist:"pending, served", label:"Status"}
                                ]]
                              }
                              ]
                            }
                           ],
                        7: [{name:"amount", type:"number", datalist:"none", label:"Amount"},
                            {name:"item", type:"select,value", datalist:"default:bill", label:"Item"}, 
                            {name:"bill", type:"child", label:"Bill details", datalist:[
                              {name:"orders", type:"children", label:"Bill orders", datalist: [[
                                  {name:"item", type:"select,value", datalist:"product, service, package", label:"Item"},
                                  {name:"itemid", type:"select,id", datalist:"path:/orderitems", label:"Select from list"},
                                  {name:"quantity", type:"number", datalist:"none", label:"Quantity"}
                                ]]
                              }
                              ]
                            }
                           ],
                        8: [{name:"amount", type:"number", datalist:"none", label:"Amount"},
                            {name:"customer", type:"child", label:"Customer details", datalist: [
                                {name:"username", type:"text", datalist:"none", label:"Username"},
                                {name:"password", type:"password", datalist:"none", label:"Password"},
                                {name:"firstname", type:"text", datalist:"none", label:"Firstname"},
                                {name:"lastname", type:"text", datalist:"none", label:"Lastname"},
                                {name:"phone", type:"text", datalist:"none", label:"Phone"},
                                {name:"email", type:"email", datalist:"none", label:"Email"},
                                {name:"address", type:"text", datalist:"none", label:"Address"},
                                {name:"idcardnumber", type:"text", datalist:"none", label:"ID Number"},
                                {name:"idtype", type:"text", datalist:"none", label:"ID type"},
                                {name:"nationality", type:"text", datalist:"none", label:"Nationality"},
                                {name:"accessRights", type:"number", datalist:"none", label:"Access Rights"}
                              ]
                            }
                           ],
                        9: [{name:"amount", type:"number", datalist:"none", label:"Amount"},
                            {name:"item", type:"select,value", datalist:"default:order", label:"Item"},
                            {name:"itemid", type:"text,datalist,id", datalist:"path:/order", label:"Select order record"},
                            {name:"customer", type:"child", label:"Customer details", datalist: [
                                {name:"username", type:"text", datalist:"none", label:"Username"},
                                {name:"password", type:"password", datalist:"none", label:"Password"},
                                {name:"firstname", type:"text", datalist:"none", label:"Firstname"},
                                {name:"lastname", type:"text", datalist:"none", label:"Lastname"},
                                {name:"phone", type:"text", datalist:"none", label:"Phone"},
                                {name:"email", type:"email", datalist:"none", label:"Email"},
                                {name:"address", type:"text", datalist:"none", label:"Address"},
                                {name:"idcardnumber", type:"text", datalist:"none", label:"ID Number"},
                                {name:"idtype", type:"text", datalist:"none", label:"ID type"},
                                {name:"nationality", type:"text", datalist:"none", label:"Nationality"},
                                {name:"accessRights", type:"number", datalist:"none", label:"Access Rights"}
                              ]
                            }
                           ], 
                        10:[{name:"amount", type:"number", datalist:"none", label:"Amount"},
                            {name:"item", type:"select,value", datalist:"default:invoice", label:"Item"},
                            {name:"itemid", type:"text,datalist,id", datalist:"path:/invoice", label:"Select order record"},
                            {name:"customer", type:"child", label:"Customer details", datalist: [
                                {name:"username", type:"text", datalist:"none", label:"Username"},
                                {name:"password", type:"password", datalist:"none", label:"Password"},
                                {name:"firstname", type:"text", datalist:"none", label:"Firstname"},
                                {name:"lastname", type:"text", datalist:"none", label:"Lastname"},
                                {name:"phone", type:"text", datalist:"none", label:"Phone"},
                                {name:"email", type:"email", datalist:"none", label:"Email"},
                                {name:"address", type:"text", datalist:"none", label:"Address"},
                                {name:"idcardnumber", type:"text", datalist:"none", label:"ID Number"},
                                {name:"idtype", type:"text", datalist:"none", label:"ID type"},
                                {name:"nationality", type:"text", datalist:"none", label:"Nationality"},
                                {name:"accessRights", type:"number", datalist:"none", label:"Access Rights"}
                              ]
                            }
                           ],   
                        11:[{name:"amount", type:"number", datalist:"none", label:"Amount"},
                            {name:"item", type:"select,value", datalist:"default:bill", label:"Item"},
                            {name:"itemid", type:"text,datalist,id", datalist:"path:/bill", label:"Select order record"},
                            {name:"customer", type:"child", label:"Customer details", datalist: [
                                {name:"username", type:"text", datalist:"none", label:"Username"},
                                {name:"password", type:"password", datalist:"none", label:"Password"},
                                {name:"firstname", type:"text", datalist:"none", label:"Firstname"},
                                {name:"lastname", type:"text", datalist:"none", label:"Lastname"},
                                {name:"phone", type:"text", datalist:"none", label:"Phone"},
                                {name:"email", type:"email", datalist:"none", label:"Email"},
                                {name:"address", type:"text", datalist:"none", label:"Address"},
                                {name:"idcardnumber", type:"text", datalist:"none", label:"ID Number"},
                                {name:"idtype", type:"text", datalist:"none", label:"ID type"},
                                {name:"nationality", type:"text", datalist:"none", label:"Nationality"},
                                {name:"accessRights", type:"number", datalist:"none", label:"Access Rights"}
                              ]
                            }
                           ],
                        13:[{name:"amount", type:"number", datalist:"none", label:"Amount"},
                            {name:"item", type:"select,value", datalist:"default:order", label:"Item"},
                            {name:"order", type:"child", label:"Order details", datalist: [
                                {name:"item", type:"select,value", datalist:"product, service, package", label:"Item"},
                                {name:"itemid", type:"select,id", datalist:"path:/orderitems", label:"Select from list"},
                                {name:"quantity", type:"number", datalist:"none", label:"Quantity"},
                                {name:"status", type:"select,value", datalist:"pending, served", label:"Status"}
                                ]
                            },
                            {name:"customer", type:"child", label:"Customer details", datalist: [
                                {name:"username", type:"text", datalist:"none", label:"Username"},
                                {name:"password", type:"password", datalist:"none", label:"Password"},
                                {name:"firstname", type:"text", datalist:"none", label:"Firstname"},
                                {name:"lastname", type:"text", datalist:"none", label:"Lastname"},
                                {name:"phone", type:"text", datalist:"none", label:"Phone"},
                                {name:"email", type:"email", datalist:"none", label:"Email"},
                                {name:"address", type:"text", datalist:"none", label:"Address"},
                                {name:"idcardnumber", type:"text", datalist:"none", label:"ID Number"},
                                {name:"idtype", type:"text", datalist:"none", label:"ID type"},
                                {name:"nationality", type:"text", datalist:"none", label:"Nationality"},
                                {name:"accessRights", type:"number", datalist:"none", label:"Access Rights"}
                              ]
                            }
                           ], 
                        14:[{name:"amount", type:"number", datalist:"none", label:"Amount"},
                            {name:"item", type:"select,value", datalist:"default:invoice", label:"Item"},
                            {name:"invoice", type:"child", label:"Invoice details", datalist: [
                              {name:"orders", type:"children", label:"Invoice orders", datalist: [[
                                  {name:"item", type:"select,value", datalist:"product, service, package", label:"Item"},
                                  {name:"itemid", type:"select,id", datalist:"path:/orderitems", label:"Select from list"},
                                  {name:"quantity", type:"number", datalist:"none", label:"Quantity"},
                                  {name:"status", type:"select,value", datalist:"pending, served", label:"Status"}
                                ]]
                              }]
                            },
                            {name:"customer", type:"child", label:"Customer details", datalist: [
                                {name:"username", type:"text", datalist:"none", label:"Username"},
                                {name:"password", type:"password", datalist:"none", label:"Password"},
                                {name:"firstname", type:"text", datalist:"none", label:"Firstname"},
                                {name:"lastname", type:"text", datalist:"none", label:"Lastname"},
                                {name:"phone", type:"text", datalist:"none", label:"Phone"},
                                {name:"email", type:"email", datalist:"none", label:"Email"},
                                {name:"address", type:"text", datalist:"none", label:"Address"},
                                {name:"idcardnumber", type:"text", datalist:"none", label:"ID Number"},
                                {name:"idtype", type:"text", datalist:"none", label:"ID type"},
                                {name:"nationality", type:"text", datalist:"none", label:"Nationality"},
                                {name:"accessRights", type:"number", datalist:"none", label:"Access Rights"}
                              ]
                            }
                           ],   
                        15:[{name:"amount", type:"number", datalist:"none", label:"Amount"},
                            {name:"item", type:"select,value", datalist:"default:bill", label:"Item"},
                            {name:"bill", type:"child", label:"Bill details", datalist:[
                              {name:"invoices", type:"text", datalist:"none", label:"Invoices (if any)"},
                              {name:"orders", type:"children", label:"Bill orders", datalist: [[
                                  {name:"item", type:"select,value", datalist:"product, service, package", label:"Item"},
                                  {name:"itemid", type:"select,id", datalist:"path:/orderitems", label:"Select from list"},
                                  {name:"quantity", type:"number", datalist:"none", label:"Quantity"}
                                ]]
                              }
                              ]
                            },
                            {name:"customer", type:"child", label:"Customer details", datalist: [
                                {name:"username", type:"text", datalist:"none", label:"Username"},
                                {name:"password", type:"password", datalist:"none", label:"Password"},
                                {name:"firstname", type:"text", datalist:"none", label:"Firstname"},
                                {name:"lastname", type:"text", datalist:"none", label:"Lastname"},
                                {name:"phone", type:"text", datalist:"none", label:"Phone"},
                                {name:"email", type:"email", datalist:"none", label:"Email"},
                                {name:"address", type:"text", datalist:"none", label:"Address"},
                                {name:"idcardnumber", type:"text", datalist:"none", label:"ID Number"},
                                {name:"idtype", type:"text", datalist:"none", label:"ID type"},
                                {name:"nationality", type:"text", datalist:"none", label:"Nationality"},
                                {name:"accessRights", type:"number", datalist:"none", label:"Access Rights"}
                              ]
                            }
                           ],   
                        17:[{name:"amount", type:"number", datalist:"none", label:"Amount"},
                            {name:"item", type:"select,value", datalist:"default:order", label:"Item"},
                            {name:"itemid", type:"text,datalist,id", datalist:"path:/order", label:"Select order record"}
                           ], 
                        18:[{name:"amount", type:"number", datalist:"none", label:"Amount"},
                            {name:"item", type:"select,value", datalist:"default:invoice", label:"Item"},
                            {name:"itemid", type:"text,datalist,id", datalist:"path:/invoice", label:"Select invoice record"}
                           ],   
                        19:[{name:"amount", type:"number", datalist:"none", label:"Amount"},
                            {name:"item", type:"select,value", datalist:"default:bill", label:"Item"},
                            {name:"itemid", type:"text,datalist,id", datalist:"path:/bill", label:"Select bill record"}
                           ],   
                        21:[{name:"amount", type:"number", datalist:"none", label:"Amount"},
                            {name:"item", type:"select,value", datalist:"default:order", label:"Item"},
                            {name:"order", type:"child", label:"Order details", datalist: [
                                {name:"item", type:"select,value", datalist:"product, service, package", label:"Item"},
                                {name:"itemid", type:"select,id", datalist:"path:/orderitems", label:"Select from list"},
                                {name:"quantity", type:"number", datalist:"none", label:"Quantity"},
                                {name:"status", type:"select,value", datalist:"pending, served", label:"Status"}
                                ]
                            }
                           ], 
                        22:[{name:"amount", type:"number", datalist:"none", label:"Amount"},
                            {name:"item", type:"select,value", datalist:"default:invoice", label:"Being payment for"},
                            {name:"invoice", type:"child", label:"Invoice details", datalist:[
                              {name:"orders", type:"children", label:"Invoice orders", datalist: [[
                                  {name:"item", type:"select,value", datalist:"product, service, package", label:"Order item"},
                                  {name:"itemid", type:"select,id", datalist:"path:/orderitems", label:"Select the existing"},
                                  {name:"quantity", type:"number", datalist:"none", label:"Quantity"},
                                  {name:"status", type:"select,value", datalist:"pending, served", label:"Status"}
                                ]]
                              }
                            ]
                            }
                           ],   
                        23:[{name:"amount", type:"number", datalist:"none", label:"Amount"},
                            {name:"item", type:"select,value", datalist:"default:bill", label:"Item"},
                            {name:"bill", type:"child", label:"Bill details", datalist: [
                              {name:"invoices", type:"text", datalist:"none", label:"Invoices (if any)"},
                              {name:"orders", type:"children", label:"Bill orders", datalist: [[
                                  {name:"item", type:"select,value", datalist:"product, service, package", label:"Item"},
                                  {name:"itemid", type:"select,id", datalist:"path:/orderitems", label:"Select from list"},
                                  {name:"quantity", type:"number", datalist:"none", label:"Quantity"}
                                ]]
                              }
                             ]
                            }
                           ]   
                   },
        expense:  {label: "RECORD EXPENSES",
                    1: [{name:"expenses", type:"children", label:"Expenses list", datalist: [[
                             {name:"amount", type:"number", datalist:"none", label:"Amount"},
                             {name:"spenton", type:"text", datalist:"none", label:"Money was spent on:"},
                             {name:"description", type:"text", datalist:"none", label:"Description"}
                           ]]
                         }
                       ]
                   }
        
    }; //end FORM_FORMATS


module.exports = { BACKEND_URL, API, FORM_FORMATS };


