
const fileInput = document.getElementById('file')
const submit = document.getElementById('submit')
const html = document.querySelector("html")
const inputTheme = document.querySelector("input[name=theme]")

const getStyle = (target, element) => window.getComputedStyle(target).getPropertyValue(element)
const convertKey = (key) => '--' + key.replace(/([A-Z])/g, '-$1').toLowerCase()

const defaultTheme = {
    bgGradient: getStyle(html, '--bg-gradient'),
    bgCard: getStyle(html, '--bg-card'),
    shadowCard: getStyle(html, '--shadow-card'),
    bodyText: getStyle(html, '--body-text'),
    bgButton: getStyle(html, '--bg-button'),
}

const darkTheme = {
    bgGradient: '#2c3445',
    bgCard: '#171a21',
    shadowCard: '2px 5px 17px 4px #171a21',
    bodyText: '#fff',
    bgButton: '#38c8de',
}



const changeColors = (colors) => {
    Object.keys(colors).forEach((key) =>  {
        html.style.setProperty(convertKey(key), colors[key])
    })
}

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

inputTheme.addEventListener('change', ({ target }) => {
    console.log(convertKey('bgGradient'))
    target.checked ? changeColors(darkTheme) : changeColors(defaultTheme)
})