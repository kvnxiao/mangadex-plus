const page = document.getElementsByClassName("chapter-container")[0]
const titles: HTMLCollectionOf<HTMLAnchorElement> = page.getElementsByClassName(
  "manga_title",
) as HTMLCollectionOf<HTMLAnchorElement>

const matchMangaTitleLink = /mangadex.org\/title\/([0-9]+)\//

function getThumbnailLink(id: string): string {
  return `https://mangadex.org/images/manga/${id}.thumb.jpg`
}

const thumbnailImage = document.createElement("img")
thumbnailImage.className = "tama-thumbnail"
page.appendChild(thumbnailImage)

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
