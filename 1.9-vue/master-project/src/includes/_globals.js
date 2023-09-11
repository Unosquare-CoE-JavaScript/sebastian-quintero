import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'

export default {
  install(app) {
    const baseComponents = import.meta.glob('../components/base/*.vue', {
      eager: true
    })

    for (const [path, module] of Object.entries(baseComponents)) {
      const componentName = upperFirst(
        camelCase(
          path
            .split('/')
            .pop()
            .replace(/\.\w+$/, '')
        )
      )

      app.component(`Base${componentName}`, module.default)
    }
  }
}
