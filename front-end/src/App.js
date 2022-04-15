
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
}

const darkTheme = {
    bgGradient: 'linear-gradient(to bottom right, #12062e, #070114)',
    bgCard: '#5736a3',
    shadowCard: '2px 5px 17px 4px #5736a3',
    bodyText: '#070114',
}



const changeColors = (colors) => {
    Object.keys(colors).forEach((key) =>  {
        html.style.setProperty(convertKey(key), colors[key])
    })
}

const handleAction = (e) => {
    console.log("🚀 ~ file: App.js ~ line 45 ~ handleAction ~ e", e)
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