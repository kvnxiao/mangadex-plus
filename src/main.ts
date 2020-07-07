const hostName = window.location.hostname
const matchMangaTitleLink = new RegExp(`${hostName}\/title\/([0-9]+)\/`)

function getThumbnailLink(id: string): string {
  return `https://${hostName}/images/manga/${id}.thumb.jpg`
}

function getTitles(): HTMLAnchorElement[] {
  // For favourite pages, and pages that show chapter content being updated
  const container = document.getElementsByClassName("chapter-container")
  if (container.length > 0) {
    return Array.from(container[0].getElementsByClassName("manga_title")) as HTMLAnchorElement[]
  }

  // For titles, groups, and searches
  const content = document.getElementById("content")
  if (content) {
    const entries = Array.from(content.getElementsByClassName("manga-entry")).map(
      (a) => (a as HTMLElement).getElementsByClassName("manga_title")[0],
    )
    return entries as HTMLAnchorElement[]
  }

  return []
}

;(() => {
  const titles = getTitles()

  const thumbnailImage = document.createElement("img")
  thumbnailImage.className = "tama-thumbnail"
  document.body.appendChild(thumbnailImage)

  for (const title of titles) {
    const match = matchMangaTitleLink.exec(title.href)
    if (match !== null) {
      const mangaId = match[1]
      const thumbnail = getThumbnailLink(mangaId)

      title.addEventListener("mouseenter", (event: MouseEvent) => {
        thumbnailImage.src = thumbnail
        const bounds = title.getBoundingClientRect()
        thumbnailImage.style.top = `${document.documentElement.scrollTop + bounds.top - 50}px`
        thumbnailImage.style.left = bounds.left < 140 ? "240px" : `${bounds.left - 130}px`
      })
      title.addEventListener("mouseleave", (event: MouseEvent) => {
        thumbnailImage.src = ""
      })
    }
  }
})()
