const imageUrl = 'https://dog.ceo/api/breeds/image/random/4'
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

const createDogImage = (url) => {
  const image = document.createElement('img')
  image.src = url
  image.classList.add('dog-image')
  return image
}

const addBreedsToList = (breeds, list) => {
  breeds.forEach((breed) => {
    const item = document.createElement('li')
    item.innerText = breed
    item.addEventListener('click', (event) => {
      const { style } = item
      style.color = (style.color === 'green' ? '' : 'green')
    })
    list.append(item)
  })
  return list
}

const filterBreedList = (letter, items) => {
  items.forEach((item) => {
    if (item.innerText.charAt(0) === letter) {
      item.setAttribute('style', 'display: list-item;')
    } else {
      console.log(item)
      item.setAttribute('style', 'display: none;')
    }
  })
}

const getImages = () => {
  fetch(imageUrl)
    .then(response => response.json())
    .then((data) => {
      imageUrls = data.message
      imageUrls.forEach((url) => {
        const img = createDogImage(url)
        document.getElementById('dog-image-container').append(img)
      })
    })
    .catch((err) => {
      console.log('Fetch Error :-S', err)
    })
}

const getBreeds = () => {
  fetch(breedUrl)
    .then(response => response.json())
    .then((data) => {
      const list = document.getElementById('dog-breeds')
      const breeds = Object.keys(data.message)
      return addBreedsToList(breeds, list)
    })
    .then((list) => {
      const dropdown = document.getElementById('breed-dropdown')
      document.addEventListener('change', (event) => {
        const letter = dropdown.value
        const items = list.querySelectorAll('li')
        filterBreedList(letter, items)
      })
    })
    .catch((err) => {
      console.log('Fetch Error :-S', err)
    })
}

document.addEventListener('DOMContentLoaded', () => {
  getImages()
  getBreeds()
})
