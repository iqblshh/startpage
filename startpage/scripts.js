/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/"}
const engine = "duckduckgo"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"DL5CfiVsTUqxUYrJ","label":"reddit","bookmarks":[{"id":"OIBTiqQrz65j8D1i","label":"r/unixporn","url":"https://www.reddit.com/r/unixporn/"},{"id":"He8rKFqtFHyEf8PD","label":"reddit","url":"reddit.com"}]},{"id":"Hz0nLvNRLfWP3LD7","label":"media","bookmarks":[{"id":"pDH5MIB4KBunNNrd","label":"youtube","url":"youtube.com"},{"id":"uwy3nV6nwjklJN3p","label":"twitter","url":"twitter.com"},{"id":"eRS1BY2xXegChL47","label":"twitch","url":"twitch.tv"},{"id":"sfXvuacUpieUFsIp","label":"whatsapp","url":"https://web.whatsapp.com/"}]},{"id":"zSGzwlbn8qafe5wf","label":"worth reading","bookmarks":[{"id":"WYlhjSubXeBR3OXs","label":"Wikipedia : Unusual Articles","url":"https://en.wikipedia.org/wiki/Wikipedia:Unusual_articles"},{"id":"qYdprOueS96aPz3j","label":"Arch Wiki","url":"https://wiki.archlinux.org/"}]},{"id":"L9EXMwly7oVEdZ9J","label":"sources","bookmarks":[{"id":"kIpK0dvgIu7qioNW","label":"anime","url":"animixplay.to"},{"id":"9HTNyrq0eDwIeE5z","label":"manga","url":"mangadex.org"},{"id":"exCLaV7IQjEzXO3L","label":"GitHub","url":"https://github.com/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
