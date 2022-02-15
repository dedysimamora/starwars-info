export const getInitialName = (name : string) => {
    let splitName : Array<string> = name.split(" ")
    if(splitName.length == 1){
        splitName = name.split("-")
    }
    return `${splitName[0].charAt(0).toUpperCase()} ${splitName[1] !== undefined ? splitName[1].charAt(0).toUpperCase() : splitName[0].charAt(1).toUpperCase()}`
}