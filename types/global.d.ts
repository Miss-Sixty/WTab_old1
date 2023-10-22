declare global {
  /**
   * 平台的名称、版本、说明、最后构建时间的类型提示
   */
  const __APP_INFO__: {
    pkg: {
      name: string
      version: string
      description: string
    }
    lastBuildTime: string
  }
}
