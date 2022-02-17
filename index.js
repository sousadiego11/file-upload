
const fileInput = document.getElementById('file')
const submit = document.getElementById('submit')

const handleAction = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = fileInput.files[0]
    
    reader.readAsDataURL(file);
    reader.onloadend = async (evt) => {
        await fetch('http://localhost:3000', {
            method: 'POST',
            body: evt.target.result
        })
    }

}

submit.addEventListener('click', handleAction)