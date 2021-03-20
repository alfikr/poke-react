export const DBConfig={
    name:"poke",
    version:1,
    objectStoresMeta:[
        {
            store:'pokemon',
            storeConfig:{keyPath:'id', autoIncrement:true},
            storeSchema:[
                {
                    name:'name',
                    keypath:'name',
                    options:{unique:false}
                },{
                    name:'url',
                    keypath:'url',
                    options:{unique:false}
                }
            ]
        }
    ]
}