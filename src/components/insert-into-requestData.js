function insertDataIntoRequestBody( ancesterKeyIndex ){
    //confirm wheteher requestData is defined
    if ( !requestData ) {
        console.log("<< requestData >> is required by user input readers, but it's not defined.");
        alert("Oops! your app can't read any input data. Please contact the software engineer on +256781224508.");
        return;
    }
    
    var ancesterKey          = pathLevels[ancesterKeyIndex];
    var parentKeyIndex = pathLevels.length-1;
    var parentKey          = pathLevels[parentKeyIndex];
    var ancesterKeyIsNumber  = isNaN(ancesterKey) === false;
    
    let ancesterExists = false;
    
    if(ancesterKeyIndex <= 0){
        //we are at the root!
        ancesterExists = true;
    }else{
        //checking for existance of ancester in the requestData
        switch (ancesterKeyIndex) {
            case 1: 
                let k1 = ancesterKeyIndex;
                if(requestData[k1]){ ancesterExists = true; }
                break;
            case 2: 
                let ky1 = pathLevels[1];
                let ky2 = ancesterKeyIndex;
                if(requestData[ky1][ky2]){ ancesterExists = true; }
                break;
            case 3: 
                let key1 = pathLevels[1];
                let key2 = pathLevels[2];
                let key3 = ancesterKeyIndex;
                if(requestData[key1][key2][key3]){ ancesterExists = true; }
                break;
            case 4: 
                let keyy1 = pathLevels[1];
                let keyy2 = pathLevels[2];
                let keyy3 = pathLevels[3];
                let keyy4 = ancesterKeyIndex;
                if(requestData[keyy1][keyy2][keyy3][keyy4]){ ancesterExists = true; }
                break;
            case 5: 
                let keeyy1 = pathLevels[1];
                let keeyy2 = pathLevels[2];
                let keeyy3 = pathLevels[3];
                let keeyy4 = pathLevels[4];
                let keeyy5 = ancesterKeyIndex;
                if(requestData[keeyy1][keeyy2][keeyy3][keeyy4][keeyy5]){ ancesterExists = true; }
                break;
            default:
                console.log("The form input fields are too deeply nested. MAX=4Levels");
                alert("Oops! your app can't read any input data. Please contact your IT specialist for help.");
                return;
        }
    }
    
    if( !ancesterExists ){
        insert(ancesterKeyIndex - 1);
    }
    
    var ancesterIsParrent = ancesterKeyIndex === parentKeyIndex;
    if( ancesterIsParrent ){
        //key in the key-value pair in question (key=fieldname=props.name, value=val),
        //where  val  is the value read from the user input field
        switch (ancesterKeyIndex) {
            case 1: 
                let k1 = ancesterKeyIndex;
                requestData[k1][fieldname] = val;
                break;
            case 2: 
                let ky1 = pathLevels[1];
                let ky2 = ancesterKeyIndex;
                requestData[ky1][ky2][fieldname] = val;
                break;
            case 3: 
                let key1 = pathLevels[1];
                let key2 = pathLevels[2];
                let key3 = ancesterKeyIndex;
                requestData[key1][key2][key3][fieldname] = val;
                break;
            case 4: 
                let keyy1 = pathLevels[1];
                let keyy2 = pathLevels[2];
                let keyy3 = pathLevels[3];
                let keyy4 = ancesterKeyIndex;
                requestData[keyy1][keyy2][keyy3][keyy4][fieldname] = val;
                break;
            case 5: 
                let keeyy1 = pathLevels[1];
                let keeyy2 = pathLevels[2];
                let keeyy3 = pathLevels[3];
                let keeyy4 = pathLevels[4];
                let keeyy5 = ancesterKeyIndex;
                requestData[keeyy1][keeyy2][keeyy3][keeyy4][keeyy5][fieldname] = val;
                break;
            default:
                console.log("The form input fields are too deeply nested. MAX=4Levels" );
                alert("Oops! your app can't read any input data. Please contact your IT specialist for help.");
                return;
        }
    }else{
        ///create ancester's child either as an empty array or empty object whose key is the child's key
        let grandChildsKey = pathLevels[ancesterKeyIndex+2] ? pathLevels[ancesterKeyIndex+2] : fieldname;
        if( !isNaN(grandChildsKey) ){
            //this means the child to be created should be an array
            let childsKey = pathLevels[ancesterKeyIndex+1];
            //key in (to this ancester), the ancester's child and assign it an empty array 
            switch (ancesterKeyIndex) {
                case 1: 
                    let k1 = ancesterKeyIndex;
                    requestData[k1][childsKey] = [];
                    break;
                case 2: 
                    let ky1 = pathLevels[1];
                    let ky2 = ancesterKeyIndex;
                    requestData[ky1][ky2][childsKey] = [];
                    break;
                case 3: 
                    let key1 = pathLevels[1];
                    let key2 = pathLevels[2];
                    let key3 = ancesterKeyIndex;
                    requestData[key1][key2][key3][childsKey] = [];
                    break;
                case 4: 
                    let keyy1 = pathLevels[1];
                    let keyy2 = pathLevels[2];
                    let keyy3 = pathLevels[3];
                    let keyy4 = ancesterKeyIndex;
                    requestData[keyy1][keyy2][keyy3][keyy4][childsKey] = [];
                    break;
                default:
                    console.log("The form input fields are too deeply nested. MAX=4Levels" );
                    alert("Oops! your app can't read any input data. Please contact your IT specialist for help.");
                    return;
            }
        }else{
            //this means the child to be created should be an object
            //key in (to this ancester), the ancester's child and assign it an empty object 
            switch (ancesterKeyIndex) {
                case 1: 
                    let k1 = ancesterKeyIndex;
                    requestData[k1][childsKey] = {};
                    break;
                case 2: 
                    let ky1 = pathLevels[1];
                    let ky2 = ancesterKeyIndex;
                    requestData[ky1][ky2][childsKey] = {};
                    break;
                case 3: 
                    let key1 = pathLevels[1];
                    let key2 = pathLevels[2];
                    let key3 = ancesterKeyIndex;
                    requestData[key1][key2][key3][childsKey] = {};
                    break;
                case 4: 
                    let keyy1 = pathLevels[1];
                    let keyy2 = pathLevels[2];
                    let keyy3 = pathLevels[3];
                    let keyy4 = ancesterKeyIndex;
                    requestData[keyy1][keyy2][keyy3][keyy4][childsKey] = {};
                    break;
                default:
                    console.log("The form input fields are too deeply nested. MAX=4Levels" );
                    alert("Oops! your app can't read any input data. Please contact your IT specialist for help.");
                    return;
            }
        }
    }
}







