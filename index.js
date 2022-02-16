
const fileInput = document.getElementById('file')
const form = document.getElementById('form')

const handleAction = async (e) => {
    
    e.preventDefault();
    const reader = new FileReader();
    const file = fileInput.files[0]
    
    reader.readAsDataURL(file);
    reader.onloadend = (evt) => {
        fetch('http://localhost:3000', {
            method: 'POST',
            body: evt.target.result
        }).then(() => {})
    }

}

form.addEventListener('submit', handleAction)