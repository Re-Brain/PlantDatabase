function deleteImage(dataBack, dataFront)
{
    console.log(dataBack, dataFront)
    
    let frontImage = document.getElementById(dataFront)
    let frontImageParent = frontImage.parentNode
    frontImageParent.removeChild(frontImage)

    let backImage = document.getElementById(dataBack)
    let backImageParent = backImage.parentNode
    backImageParent.removeChild(backImage)
}

function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}

function addName(event, inputContainer, deleteButtonID, name)
{
    event.preventDefault();

    let container = document.getElementById(inputContainer)
    let input = document.createElement('input')
    input.type = "text"
    input.className = "form-control multipleInput"
    input.name = name

    container.appendChild(input)

    let numberOfChildren = container.children.length
    console.log(numberOfChildren)

    if (numberOfChildren > 2)
    {
        let deleteName = document.getElementById(deleteButtonID)
        deleteName.style.display = 'block'
    }  
}

function deleteName(event, inputContainer, deleteButtonID)
{
    event.preventDefault();

    let container = document.getElementById(inputContainer)

    let lastChild = container.lastChild
    container.removeChild(lastChild)

    let numberOfChildren = container.children.length
    console.log(numberOfChildren)

    if (numberOfChildren == 2)
    {
        let deleteName = document.getElementById(deleteButtonID)
        deleteName.style.display = 'none'
    }
}

function displayFileNames(containerElement, inputElement)
{
    let input = document.getElementById(inputElement)
    let fileContainer = document.getElementById(containerElement)

    fileContainer.innerHTML = '';

    for (let i = 0; i < input.files.length; i++)
    {
        let imageContainer = document.createElement("div")
        let name = document.createElement('p')
        let deleteButton = document.createElement('button')
        let icon = document.createElement('i')

        icon.className = "fa-solid fa-xmark"
        deleteButton.appendChild(icon)

        imageContainer.className = "container-file-item"

        name.className = "mt-1"
        name.textContent = input.files[i].name

        deleteButton.className = "btn btn-primary btn-sm ms-1"
        deleteButton.type = "button";

        let currentContainer = containerElement
        let currentInput = inputElement

        deleteButton.onclick = deleteHandler(i, currentContainer , currentInput)

        imageContainer.appendChild(name)
        imageContainer.appendChild(deleteButton)

        fileContainer.appendChild(imageContainer)
    }
}

function deleteHandler(index, containerElement , inputElement)
{ 
    return function()
    {
        let fileContainer = document.getElementById(inputElement)
        let fileList = Array.from(fileContainer.files)
    
        fileList.splice(index, 1)
    
        let newFileList = new DataTransfer();
    
        fileList.forEach(function(file){
            newFileList.items.add(file)
        })
    
        fileContainer.files = newFileList.files
    
        displayFileNames(containerElement , inputElement)
    }
}
