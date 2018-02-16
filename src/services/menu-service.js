import { createBalancedMenu } from '../businessLogic/menu'

export default (app, db) => {
  async (username, customTemplate) => {
    const { description: userDescription, template: userTemplate } = await getUserSettings(username)
    const template = customTemplate || userTemplate
    return createBalancedMenu(app, db, menu, template)
  }
}
