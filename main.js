const Hash = {
  get: () => document.location.hash.substring(1),
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
     const json = 'https://api.daktary.com/infolab-cd33/datalunch-/tree/master/fiches'
    //const json = './fiches.json'
    return fetch(json)
      .then(response => response.json())
  }
}
