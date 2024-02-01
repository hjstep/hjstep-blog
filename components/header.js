import { applyTemplateWithCallback } from "../utils/common.js"

const TEMPLATE_NAME = 'header'
export default (element) => applyTemplateWithCallback(element, TEMPLATE_NAME)()
