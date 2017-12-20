const Categories = {
  get: () =>
    Array.from(
      document.querySelectorAll('.categories li')
    ).map(li => li.innerText),
  getByFiles: files =>
    files
      .filter(file => file.meta) //if file a des meta
      .map(file => file.meta.categorie) // renvoie la categorie
      .filter((elt, pos, arr) => arr.indexOf(elt) === pos) // supprime les doublons en testant la position des éléments
      .sort(),
  display: categories => {
    const container = document.querySelector('.categories')
    container.innerHTML = ''
    categories.forEach(category => {
      const tpl = Tpl.getElement('categories')
      const tplTitle = tpl.querySelector('[data-cat=titre]')
      tplTitle.href = '#category/' + category
      tplTitle.append(category)
      if (category === Hash.get().replace('category/','')) {
        tplTitle.classList.add('selected')
      }
      container.append(tpl)
    })
  }
}

const Articles = {
  getIcon: level => {
    return {
      débutant: 'fa-thermometer-empty',
      intermédiaire: 'fa-thermometer-quarter',
      avancé: 'fa-thermometer-three-quarters',
      expert: 'fa-thermometer-full'
    }[level]
  },
  display: files => {
    const container = document.querySelector('.fiches')
    const category = Hash.get().replace('category/','')
    Articles.displayByCategory(container, files, category)
  },
  displayByCategory: (container, files, categorie) => {
    container.innerHTML = ''
    files
      .filter(file => file.meta)
      .filter(file => file.meta.categorie === categorie)
      .forEach(file => {
        const tpl = Tpl.getElement('fiches')
        const tplTitle = tpl.querySelector('[data-fiche=titre]')
        const tplDesc = tpl.querySelector('[data-fiche=description]')
        const tplLevel = tpl.querySelector('[data-fiche=niveau]')
        const tplMore = tpl.querySelector('[data-fiche=plus]')
        tplTitle.append(file.meta.title)
        tplDesc.append(file.meta.description)
        tplLevel.classList.add(Articles.getIcon(file.meta.niveau))
        tplLevel.title = file.meta.niveau
        tplMore.href = file.url
        container.append(tpl)
    })
  }
}
