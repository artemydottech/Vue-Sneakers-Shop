interface Named {
  brand: string
  title: string
}

export const sneakerName = ({ brand, title }: Named) =>
  title.toLowerCase().includes(brand.toLowerCase()) ? title : `${brand} ${title}`
