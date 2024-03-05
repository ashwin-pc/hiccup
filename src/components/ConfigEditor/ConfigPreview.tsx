import { useConfigContext } from 'components/ConfigContext'
import style from './ConfigPreview.module.css'
import { getBgURL } from 'modules/config'

export const ConfigPreview = () => {
  const { config } = useConfigContext()
  return (
    <div>
      {/* Featured Section */}
      <div className={style['featured-section']}>
        {config?.data?.featured?.map(({ name, background }) => (
          <div
            key={name}
            className={style['featured-item']}
            style={{
              backgroundImage: `url(${getBgURL(background)})`,
            }}
          >
            <span className={style['featured-item-name']}>
              {name.toUpperCase()}
            </span>
          </div>
        ))}
      </div>

      {/* Category Sections */}
      <div className={style['category-section']}>
        {config?.data?.categories?.map(({ title, links }) => (
          <div key={title} className={style['category-item']}>
            <span className={style['category-item-title']}>{title}</span>
            {links.map(({ name }) => (
              <span key={name} className={style['category-item-link']}>
                {name}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
