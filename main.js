  const Hash = {
  get: () => {
    const hash = document.location.hash.substring(1) // hash without #
    if (hash) {
      return hash.match(/.*\/(.*)$/)[1] // Enlever la racine du hash ex. categorie/outillage => outillage
    }
    return undefined
  },
  getType: () => {
    const hash = document.location.hash.substring(1) // hash without #
    if (hash) {
      return hash.match(/^(.*)\//)[1] // Ne garde que la racine du hash ex. categorie/outillage => categorie
    }
    return undefined
  },
  onChange: () => Files.import()
    .then(json => {
      Articles.display(json.body)
      Categories.display(Categories.get())
    })
}


const Tpl = {
  getElement: tplName =>
    document
      .querySelector(`template[name=${tplName}]`)
      .cloneNode(true)
      .content
      .querySelector('[data-tpl=element]')
}

const Files = {
  import: () => {
     const json = 'https://api.daktary.com/infolab-cd33/datalunch/master/'
    //const json = './fiches.json'
    return fetch(json)
      .then(response => response.json())
  }
}
