
// Initialize global emapty array
var objectArray = []

// OnClick event methods --------------------------------------------------------------------

// Add input to array
const addObject = () => {
    const nameValue = document.getElementById("card-row-1-input").value;
    const resultValidation = validateInput(nameValue)

    // Validate input
    if(resultValidation == null){
        alert('Name=value should be alphabetical and in an exact format as shown in placeholder')
        document.getElementById("card-row-1-input").value=""
        return
    }

    // split input and store to object and push object to array
    const resultSplit = nameValue.split("=")
    const object = {
        name:resultSplit[0],
        value:resultSplit[1]
    }
    objectArray.push(object)
    document.getElementById("card-row-1-input").value = "";

    // display array in textarea
    displayObjectsList()
}

// Sort array
const sort = (by) =>{
    switch(by){
        case "name": sortByName(); break
        case "value": sortByValue()
    }
}

// Convert array to XML
const toXml = () =>{
    if(!objectArray || objectArray.length === 0) return
    var xmlString = `<objects>`

    // sort array according to name property and then manipulate string to format it to XML
    objectArray
    .sort((a,b)=>{
        return compareObjects(a,b,"name")
    })
    .map((object)=>{
        xmlString += `\n   <${object.name}>${object.value}</${object.name}>`
    })
    xmlString += `\n</objects>`

    // set formated string in textarea
    document.getElementById("card-row-3-textArea").value = xmlString
}

// Delete Array
const deleteArray = () =>{
    objectArray = []
    displayObjectsList()
}

// Helper methods ----------------------------------------------------------------------

// Method to validate input via regex
const validateInput = (input) =>{
    const isInputValid = input.match(/^[a-zA-Z]*=[a-zA-Z]*$/g)
    return isInputValid
}

// Method to display Key Value pairs in text area 
const displayObjectsList = () =>{
    document.getElementById("card-row-3-textArea").value = ""
    objectArray
    .map((object)=>{
        document.getElementById("card-row-3-textArea").value +=`${object.name}=${object.value}\n`
    })
}

// Method to sort array according to name property 
const sortByName = () =>{
    document.getElementById("card-row-3-textArea").value = ""
    objectArray
    .sort((a,b)=>{
        return compareObjects(a,b,"name")
    })
    .map((object)=>{
        document.getElementById("card-row-3-textArea").value +=`${object.name}=${object.value}\n`
    })
}

// Method to sort array according to value property 
const sortByValue = () =>{
    document.getElementById("card-row-3-textArea").value = ""
    objectArray
    .sort((a,b)=>{
        return compareObjects(a,b,"value")
    })
    .map((object)=>{
        document.getElementById("card-row-3-textArea").value +=`${object.name}=${object.value}\n`
    })
}

// Method to compare array objects according to the parameter applied
const compareObjects = (a, b, key) => {
    const obj1 = a[key].toUpperCase()
    const obj2 = b[key].toUpperCase()
  
    if (obj1 < obj2) {
      return -1
    }
    if (obj1 > obj2) {
      return 1
    }
    return 0
}

