import { queryToString } from "@/lib/post"
import Link from "next/link"
import { NextRouter } from "next/router"

type Props = {
  router: NextRouter
  totalCount: number
  pageStep: number
}

export default function Pager(props: Props) {
  const {
    router,
    totalCount,
    pageStep,
  } = props
  const pageCount = Math.ceil(totalCount / pageStep)

  // ページャを表示しない
  if (totalCount <= pageStep) return <></>

  const list = []
  for (let i = 1; i <= pageCount; i++) {
    if (i <= 1)
      list.push(pageList(router, "Prev", pageCount))

    list.push(pageList(router, i.toString(), pageCount))

    if (i >= pageCount)
      list.push(pageList(router, "Next", pageCount))
  }
  return (
    <div>
      <ul>
        {list}
      </ul>
    </div>
  )
}

function pageList(router: NextRouter, text: string, pageCount: number): JSX.Element {
  const query = router.query

  switch (text) {
    case "Prev":
    case "1":
      return (!query.page || query.page === "1")
        ? <li>{createSpan(router, text)}</li>
        : <li>{createLink(router, text)}</li>
    case "Next":
      return (query.page === pageCount.toString())
        ? <li>{createSpan(router, text)}</li>
        : <li>{createLink(router, text)}</li>
    default:
      return (query.page === text)
        ? <li>{createSpan(router, text)}</li>
        : <li>{createLink(router, text)}</li>
  }
}

// リストのスパンを作成する
function createSpan(router: NextRouter, text: string): JSX.Element {
  const query = router.query

  switch (text) {
    case 'Prev':
      return <span className="prev">{text}</span>
    case 'Next':
      return <span className="next">{text}</span>
    default:
      const className = (query.page === text || (!query.page && text === "1")) ? "current" : "";
      return <span className={className}>{text}</span>
  }
}

// リストのリンクを作成する
function createLink(router: NextRouter, text: string): JSX.Element {
  const { query } = router

  switch (text) {
    case "Prev":
      return (
        <Link
          href={getPageURL(router, Number(query.page) - 1)}
          className="prev"
        >{text}</Link>
      )
    case "Next":
      return (
        <Link
          href={getPageURL(router, Number(query.page || 1) + 1)}
          className="next"
        >{text}</Link>
      )
    default:
      return (
        <Link
          href={getPageURL(router, Number(text))}
        >{text}</Link>
      )
  }
}

// リストのリンクのURLを作成する
function getPageURL(router: NextRouter, i: number): string {
  const { query, pathname } = router

  if (!Object.keys(query).length)
  return pathname + '?' + "page=" + i;

  if (query.page)
  query.page = i.toString()

  return pathname + '?' + queryToString(query);
}
