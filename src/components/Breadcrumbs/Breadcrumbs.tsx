import React, {useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
// import useIsMountedRef from '../../hooks/useIsMountedRef';

interface Props {
  productName: string
}

const Breadcrumbs = ({productName}: Props) => {
  //TODO fetch product from url path product id
  const [breadcrumbs, setBreadcrumbs] = useState<String[] | null>(null)
  // const isMountedRef = useIsMountedRef();
  const location = useLocation()

  useEffect(() => {
    function handleBreadcrumbsUpdate() {
      let createBreadcrumbs: String[]
      const pathname = location.pathname
      if (pathname && pathname.includes('products')) {
        createBreadcrumbs = pathname.split('/').splice(1, 2)
        setBreadcrumbs(() => ['Golf Shop', ...createBreadcrumbs])
      } else if (pathname && pathname.includes('prod_')) {
        createBreadcrumbs = pathname.split('/').splice(1, 1)
        createBreadcrumbs.push(productName)
        setBreadcrumbs(() => ['Golf Shop', ...createBreadcrumbs])
      } else {
        setBreadcrumbs(() => [''])
      }
    }

    // if (isMountedRef.current) {
    handleBreadcrumbsUpdate()
    // }
  }, [location, productName])

  return (
    <div className="breadcrumbs-container">
      <ul className="container">
        {breadcrumbs && breadcrumbs.length === 1 && <span>golf shop</span>}
        {breadcrumbs &&
          breadcrumbs.length &&
          breadcrumbs.map((item, i) =>
            breadcrumbs.length === i + 1 ? (
              <span key={i}>{item}</span>
            ) : (
              <li key={i} className="carot">
                <Link to={`/${item}`}>{item}</Link>
              </li>
            )
          )}
      </ul>
    </div>
  )
}

export default Breadcrumbs
