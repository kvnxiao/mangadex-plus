const page = document.getElementsByClassName("chapter-container")[0]
const rows = page.getElementsByClassName(
  "col col-md-3 row no-gutters flex-nowrap align-items-start p-2 font-weight-bold border-bottom",
)

const matchMangaTitleLink = /mangadex.org\/title\/([0-9]+)\//

function getThumbnailLink(id: string): string {
  return `https://mangadex.org/images/manga/${id}.thumb.jpg`
}

const thumbnailImage = document.createElement("img")
thumbnailImage.className = "tama-thumbnail"
page.appendChild(thumbnailImage)

for (const row of rows) {
  if (row.children.length > 0) {
    const anchor: HTMLAnchorElement = row.children[0] as HTMLAnchorElement
    const match = matchMangaTitleLink.exec(anchor.href)
    if (match !== null) {
      const mangaId = match[1]
      const thumbnail = getThumbnailLink(mangaId)

      anchor.addEventListener("mouseenter", (event: MouseEvent) => {
        thumbnailImage.src = thumbnail
        const bounds = anchor.getBoundingClientRect()
        thumbnailImage.style.top = `${document.documentElement.scrollTop + bounds.top - 50}px`
        thumbnailImage.style.left = bounds.left < 140 ? "240px" : `${bounds.left - 130}px`
      })
      anchor.addEventListener("mouseleave", (event: MouseEvent) => {
        thumbnailImage.src = ""
      })
    }
  }
}
