export default (app: any) => {
  const componentsContext: any = import.meta.glob('./*/index.vue', { eager: true })

  for (const path in componentsContext) {
    const component = componentsContext[path]?.default
    app.component(component.name, component)
  }
}

export const initWidgetJson = async () => {
  const widgetJsonModules: any = import.meta.glob('./*/index.json')
  const widgetJson: any = []
  for (const path in widgetJsonModules) {
    const widgetJsonModule = await widgetJsonModules[path]()
    widgetJson.push(widgetJsonModule.default)
  }
  return widgetJson
}
