
var objectArray = []

const addObject = () => {
    const nameValue = document.getElementById("card-row-1-input").value;
    const resultValidation = validateInput(nameValue)
    if(resultValidation == null){
        alert('Name=value should be alphabetical and in an exact format as shown in placeholder')
        document.getElementById("card-row-1-input").value=""
        return
    }
    const resultSplit = nameValue.split("=")
    const object = {
        name:resultSplit[0],
        value:resultSplit[1]
    }
    objectArray.push(object)
    document.getElementById("card-row-1-input").value = "";
    
    displayObjectsList()
}

const displayObjectsList = () =>{
    document.getElementById("card-row-3-textArea").value = ""
    objectArray
    .map((object)=>{
        document.getElementById("card-row-3-textArea").value +=`${object.name}=${object.value}\n`
    })
}

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

const sort = (by) =>{
    switch(by){
        case "name": sortByName(); break
        case "value": sortByValue()
    }
}

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

const toXml = () =>{
    if(!objectArray || objectArray.length === 0) return
    var xmlString = `<objects>`
    objectArray
    .sort((a,b)=>{
        return compareObjects(a,b,"name")
    })
    .map((object)=>{
        xmlString += `\n   <${object.name}>${object.value}</${object.name}>`
    })
    xmlString += `\n</objects>`
    document.getElementById("card-row-3-textArea").value = xmlString
}

const deleteArray = () =>{
    objectArray = []
    displayObjectsList()
}



const validateInput = (input) =>{
    const isInputValid = input.match(/^[a-zA-Z]*=[a-zA-Z]*$/g)
    return isInputValid
}
