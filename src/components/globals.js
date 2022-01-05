const BACKEND_URL = "http:127.0.0.1:5500";


const FORM_FORMATS = {
        createPayment: {label: "PAYMENT FORM", url:"/payment", method:"POST",
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
                                {name:"firstname", type:"text", datalist:"none", label:"Firstname"},
                                {name:"lastname", type:"text", datalist:"none", label:"Lastname"},
                                {name:"phone", type:"text", datalist:"none", label:"Phone"},
                                {name:"email", type:"email", datalist:"none", label:"Email"},
                                {name:"username", type:"text", datalist:"none", label:"Create a unique username"},
                                {name:"password", type:"password", datalist:"none", label:"Password"},
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
                                {name:"firstname", type:"text", datalist:"none", label:"Firstname"},
                                {name:"lastname", type:"text", datalist:"none", label:"Lastname"},
                                {name:"phone", type:"text", datalist:"none", label:"Phone"},
                                {name:"email", type:"email", datalist:"none", label:"Email"},
                                {name:"username", type:"text", datalist:"none", label:"Create a unique username"},
                                {name:"password", type:"password", datalist:"none", label:"Password"},
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
                                {name:"firstname", type:"text", datalist:"none", label:"Firstname"},
                                {name:"lastname", type:"text", datalist:"none", label:"Lastname"},
                                {name:"phone", type:"text", datalist:"none", label:"Phone"},
                                {name:"email", type:"email", datalist:"none", label:"Email"},
                                {name:"username", type:"text", datalist:"none", label:"Create a unique username"},
                                {name:"password", type:"password", datalist:"none", label:"Password"},
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
                                {name:"firstname", type:"text", datalist:"none", label:"Firstname"},
                                {name:"lastname", type:"text", datalist:"none", label:"Lastname"},
                                {name:"phone", type:"text", datalist:"none", label:"Phone"},
                                {name:"email", type:"email", datalist:"none", label:"Email"},
                                {name:"username", type:"text", datalist:"none", label:"Create a unique username"},
                                {name:"password", type:"password", datalist:"none", label:"Password"},
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
                                {name:"firstname", type:"text", datalist:"none", label:"Firstname"},
                                {name:"lastname", type:"text", datalist:"none", label:"Lastname"},
                                {name:"phone", type:"text", datalist:"none", label:"Phone"},
                                {name:"email", type:"email", datalist:"none", label:"Email"},
                                {name:"username", type:"text", datalist:"none", label:"Create a unique username"},
                                {name:"password", type:"password", datalist:"none", label:"Password"},
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
                                {name:"firstname", type:"text", datalist:"none", label:"Firstname"},
                                {name:"lastname", type:"text", datalist:"none", label:"Lastname"},
                                {name:"phone", type:"text", datalist:"none", label:"Phone"},
                                {name:"email", type:"email", datalist:"none", label:"Email"},
                                {name:"username", type:"text", datalist:"none", label:"Create a unique username"},
                                {name:"password", type:"password", datalist:"none", label:"Password"},
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
                                {name:"firstname", type:"text", datalist:"none", label:"Firstname"},
                                {name:"lastname", type:"text", datalist:"none", label:"Lastname"},
                                {name:"phone", type:"text", datalist:"none", label:"Phone"},
                                {name:"email", type:"email", datalist:"none", label:"Email"},
                                {name:"username", type:"text", datalist:"none", label:"Create a unique username"},
                                {name:"password", type:"password", datalist:"none", label:"Password"},
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
                                {name:"status", type:"select,only,value", datalist:"pending, served", label:"Status"}
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
                                  {name:"status", type:"select,only,value", datalist:"pending, served", label:"Status"}
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
        expense:  {label: "RECORD EXPENSES", url:"/expense", method:"POST",
                   create:[{name:"expenses", type:"children", label:"Expenses list", datalist: [[
                               {name:"amount", type:"number", datalist:"none", label:"Amount"},
                               {name:"spenton", type:"text", datalist:"none", label:"Money was spent on:"},
                               {name:"description", type:"text", datalist:"none", label:"Description"}
                              ]]
                            }
                          ]
                   },
        user:  {label: "REGISTER NEW CUSTOMER", url:"/user/register", method:"POST",
                create:[{name:"firstname", type:"text", datalist:"none", label:"Firstname"},
                        {name:"lastname", type:"text", datalist:"none", label:"Lastname"},
                        {name:"phone", type:"text", datalist:"none", label:"Phone"},
                        {name:"email", type:"email", datalist:"none", label:"Email"},
                        {name:"address", type:"text", datalist:"none", label:"Address"},
                        {name:"idcardnumber", type:"text", datalist:"none", label:"ID Number"},
                        {name:"idtype", type:"text", datalist:"none", label:"ID type"},
                        {name:"nationality", type:"text", datalist:"none", label:"Nationality"},
                        {name:"username", type:"text", datalist:"none", label:"Create a unique username"},
                        {name:"password", type:"password", datalist:"none", label:"Password"},
                        {name:"accessRights", type:"number", datalist:"none", label:"Access Rights"},
                        {name:"userType", type:"select,value", datalist:"customer, guest, staff, supplier, service-provider, auditor", label:"User type"}
                      ]
                   },
        customer:  {label: "REGISTER NEW CUSTOMER", url:"/user/register", method:"POST",
                    create:[{name:"firstname", type:"text", datalist:"none", label:"Firstname"},
                            {name:"lastname", type:"text", datalist:"none", label:"Lastname"},
                            {name:"phone", type:"text", datalist:"none", label:"Phone"},
                            {name:"email", type:"email", datalist:"none", label:"Email"},
                            {name:"address", type:"text", datalist:"none", label:"Address"},
                            {name:"idcardnumber", type:"text", datalist:"none", label:"ID Number"},
                            {name:"idtype", type:"text", datalist:"none", label:"ID type"},
                            {name:"nationality", type:"text", datalist:"none", label:"Nationality"},
                            {name:"username", type:"text", datalist:"none", label:"Create a unique username"},
                            {name:"password", type:"password", datalist:"none", label:"Password"},
                            {name:"accessRights", type:"number", datalist:"8", label:"Access Rights"},
                            {name:"userType", type:"select,value", datalist:"default:customer", label:"User type (auto set)"}
                          ]
                   },
         guest:  {label: "REGISTER NEW GUEST", url:"/user/register/guest", method:"POST",
                  create:[{name:"firstname", type:"text", datalist:"none", label:"Firstname"},
                          {name:"lastname", type:"text", datalist:"none", label:"Lastname"},
                          {name:"phone", type:"text", datalist:"none", label:"Phone"},
                          {name:"email", type:"email", datalist:"none", label:"Email"},
                          {name:"address", type:"text", datalist:"none", label:"Address"},
                          {name:"idcardnumber", type:"text", datalist:"none", label:"ID Number"},
                          {name:"idtype", type:"text", datalist:"none", label:"ID type"},
                          {name:"nationality", type:"text", datalist:"none", label:"Nationality"},
                          {name:"username", type:"text", datalist:"none", label:"Create a unique username"},
                          {name:"password", type:"password", datalist:"none", label:"Password"},
                          {name:"accessRights", type:"number", datalist:"8", label:"Access Rights"},
                          {name:"userType", type:"select,value", datalist:"default:guest", label:"User type (auto set)"},
                          {name:"package", type:"child", label:"Guest package", datalist: [
                              {name:"item", type:"select,value", datalist:"default:package", label:"Ordered Item (auto set)"},
                              {name:"itemid", type:"select,id", datalist:"path:/package", label:"Select from list"},
                              {name:"status", type:"select,only,value", datalist:"pending, served", label:"Status"},
                              {name:"paid", type:"select,only,value", datalist:"Yes, No", label:"Paid ?"}
                             ]
                          }
                        ]
                   },
         order:  {label: "NEW ORDER / BOOKING", url:"/order", method:"POST",
                  create:[{name:"item", type:"select,value", datalist:"product, service, package", label:"Ordered Item"},
                          {name:"itemid", type:"select,id", datalist:"path:/orderitems", label:"Select from list"},
                          {name:"quantity", type:"number", datalist:"none", label:"Quantity"},
                          {name:"status", type:"select,only,value", datalist:"pending, served", label:"Status"},
                          {name:"paid", type:"select,only,value", datalist:"Yes, No", label:"Paid ?"}
                         ]
                 }, 
         invoice:{label: "NEW ORDER / BOOKING", url:"/invoice", method:"POST",
                  create:[{name:"amount", type:"number", datalist:"none", label:"Invoice Amount"},
                          {name:"status", type:"select,value", datalist:"pending, billed, paid, cancelled", label:"Status"},
                          {name:"orders", type:"children", label:"Invoice orders", datalist: [[
                              {name:"item", type:"select,value", datalist:"product, service, package", label:"Ordered Item"},
                              {name:"itemid", type:"select,id", datalist:"path:/orderitems", label:"Select from list"},
                              {name:"quantity", type:"number", datalist:"none", label:"Quantity"},
                              {name:"status", type:"select,only,value", datalist:"pending, served", label:"Status"},
                              {name:"paid", type:"select,only,value", datalist:"Yes, No", label:"Paid ?"}
                            ]]
                          },
                          {name:"customer", type:"child", label:"New Customer details", datalist: [
                                {name:"firstname", type:"text", datalist:"none", label:"Firstname"},
                                {name:"lastname", type:"text", datalist:"none", label:"Lastname"},
                                {name:"phone", type:"text", datalist:"none", label:"Phone"},
                                {name:"email", type:"email", datalist:"none", label:"Email"},
                                {name:"username", type:"text", datalist:"none", label:"Create a unique username"},
                                {name:"password", type:"password", datalist:"none", label:"Password"},
                                {name:"address", type:"text", datalist:"none", label:"Address"},
                                {name:"idcardnumber", type:"text", datalist:"none", label:"ID Number"},
                                {name:"idtype", type:"text", datalist:"none", label:"ID type"},
                                {name:"nationality", type:"text", datalist:"none", label:"Nationality"},
                                {name:"accessRights", type:"number", datalist:"8", label:"Access Rights"}
                              ]
                           }
                         ]
                 },
         bill:   {label: "NEW ORDER / BOOKING", url:"/bill", method:"POST",
                  create:[{name:"amount", type:"number", datalist:"none", label:"Bill Amount"},
                          {name:"status", type:"select,value", datalist:"pending, paid, cancelled", label:"Status"},
                          {name:"invoices", type:"text", datalist:"none", label:"Invoices (if any) added to this bill"},
                          {name:"orders", type:"children", label:"Bill orders", datalist: [[
                              {name:"item", type:"select,value", datalist:"product, service, package", label:"Ordered Item"},
                              {name:"itemid", type:"select,id", datalist:"path:/orderitems", label:"Select from list"},
                              {name:"quantity", type:"number", datalist:"none", label:"Quantity"},
                              {name:"status", type:"select,only,value", datalist:"pending, served", label:"Status"},
                              {name:"paid", type:"select,only,value", datalist:"Yes, No", label:"Paid ?"}
                            ]]
                          },
                          {name:"customer", type:"child", label:"New Customer details", datalist: [
                                {name:"firstname", type:"text", datalist:"none", label:"Firstname"},
                                {name:"lastname", type:"text", datalist:"none", label:"Lastname"},
                                {name:"phone", type:"text", datalist:"none", label:"Phone"},
                                {name:"email", type:"email", datalist:"none", label:"Email"},
                                {name:"username", type:"text", datalist:"none", label:"Create a unique username"},
                                {name:"password", type:"password", datalist:"none", label:"Password"},
                                {name:"address", type:"text", datalist:"none", label:"Address"},
                                {name:"idcardnumber", type:"text", datalist:"none", label:"ID Number"},
                                {name:"idtype", type:"text", datalist:"none", label:"ID type"},
                                {name:"accessRights", type:"number", datalist:"8", label:"Access Rights"},
                                {name:"nationality", type:"text", datalist:"none", label:"Nationality"}
                              ]
                           }
                         ]
                 },
         department:{label: "REGISTER NEW DEPARTMENT", url:"/department", method:"POST",
                     create:[{name:"name", type:"text", datalist:"none", label:"Product name"} ]
                    },
         product:   {label: "REGISTER NEW PRODUCT", url:"/product", method:"POST",
                     create:[{name:"name", type:"text", datalist:"none", label:"Product name"},
                             {name:"category", type:"text", datalist:"none", label:"Category"},
                             {name:"brand", type:"text", datalist:"none", label:"Brand"},
                             {name:"type", type:"text", datalist:"none", label:"Type"},
                             {name:"quantity", type:"number", datalist:"none", label:"Quantity in stock"},
                             {name:"quantityUnits", type:"text", datalist:"none", label:"Quantity units"},
                             {name:"price", type:"number", datalist:"none", label:"Price"},
                             {name:"department", type:"select,id", datalist:"path:/department", label:"Department"},
                             {name:"supplierid", type:"select,id", datalist:"path:/pdtsupplier", label:"Supplier: (Select / search)"}
                           ]
                   },
         service:  {label: "REGISTER NEW SERVICE", url:"/service", method:"POST",
                    create:[{name:"name", type:"text", datalist:"none", label:"Service name"},
                            {name:"category", type:"text", datalist:"none", label:"Category"},
                            {name:"price", type:"number", datalist:"none", label:"Price"},
                            {name:"availability", type:"select,only,value", datalist:"Yes, No", label:"Currently availabile ?"},
                            {name:"department", type:"select,id", datalist:"path:/department", label:"Department"},
                            {name:"provider", type:"select,id", datalist:"path:/svcprovider", label:"Service provider: (Select / search)"}
                          ]
                   },
         package:  {label: "REGISTER NEW PACKAGE", url:"/package", method:"POST",
                    create:[{name:"name", type:"text", datalist:"none", label:"Package name"},
                            {name:"category", type:"text", datalist:"none", label:"Category"},
                            {name:"price", type:"number", datalist:"none", label:"Price"},
                            {name:"availability", type:"select,value", datalist:"Yes, No", label:"Currently availabile ?"},
                            {name:"products", type:"children", label:"Products", datalist: [[
                               {name:"itemid", type:"select,id", datalist:"path:/product", label:"Select from list"}
                              ]]
                            },
                            {name:"services", type:"children", label:"Services", datalist: [[
                               {name:"itemid", type:"select,id", datalist:"path:/service", label:"Select from list"}
                              ]]
                            },
                          ]
                   },
         stock:    {label: "ADD ITEMS TO STOCK", url:"/stock/add", method:"POST",
                    create:[{name:"productid", type:"select,id", datalist:"path:/product", label:"Product (select)"},
                            {name:"quantity", type:"number", datalist:"none", label:"Quantity added"},
                            {name:"amount", type:"number", datalist:"none", label:"Purchase price"},
                            {name:"returned", type:"select,only,value", datalist:"No, Yes", label:"Returned ?"}
                           ]
                   }, 
         message:  {label: "SEND A MESSAGE TO A USER OF THIS SYSTEMS", url:"/message", method:"POST",
                    create:[
                            {name:"userid", type:"select,id", datalist:"path:/user", label:"Send to: (Select / search)"},
                            {name:"text", type:"message", datalist:"none", label:"Message"}
                           ]
                   },                     
    }; //end FORM_FORMATS


const IsSystemAdmin              = 1 << 2 ;      //00000000000000000000000000000010        2
const IsStaffAdmin               = 1 << 3 ;      //00000000000000000000000000000100        4
const IsStaff                    = 1 << 4 ;      //00000000000000000000000000001000        8
const IsCustomer                 = 1 << 5 ;      //00000000000000000000000000010000       16
const IsVisitor                  = 1 << 6 ;      //00000000000000000000000000100000       32
const CanRegisterUser            = 1 << 7 ;      //00000000000000000000000001000000       64
const CanRegisterCustomer        = 1 << 8 ;      //00000000000000000000000010000000      256
const CanViewRevenueBanner       = 1 << 9 ;      //00000000000000000000000100000000      512
const CanViewCustomersBanner     = 1 << 10;      //00000000000000000000001000000000     1024
const CanViewGuestsBanner        = 1 << 11;      //00000000000000000000010000000000     2048
const CanViewOrdersBanner        = 1 << 12;      //00000000000000000000100000000000     4096
const CanViewExpensesBanner      = 1 << 13;      //00000000000000000001000000000000     8192
const CanViewPaymentsBanner      = 1 << 14;      //00000000000000000010000000000000    16384
const CanGraphCustomersThisWeek  = 1 << 15;      //00000000000000000100000000000000    32768
const CanGraphRevenueThisWeek    = 1 << 16;      //00000000000000001000000000000000    65536
const CanGraphAnnualRevenue      = 1 << 17;      //00000000000000010000000000000000   131072
const CanViewStockTransactions   = 1 << 18;      //00000000000000100000000000000000   262144

const access = {
    IsSystemAdmin,
    IsStaffAdmin,
    IsStaff,
    IsCustomer,
    IsVisitor,
    CanRegisterUser,
    CanRegisterCustomer,
    CanViewRevenueBanner,
    CanViewCustomersBanner,
    CanViewGuestsBanner,
    CanViewOrdersBanner,
    CanViewExpensesBanner,
    CanViewPaymentsBanner,
    CanGraphCustomersThisWeek,
    CanGraphRevenueThisWeek,
    CanGraphAnnualRevenue,
    CanViewStockTransactions
};
    
module.exports = { BACKEND_URL, FORM_FORMATS, access};


