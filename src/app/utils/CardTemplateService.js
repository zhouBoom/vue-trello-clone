const uuidv1 = require('uuid/v1')

const STORAGE_KEY = 'card_templates'

export function makeTemplate(title, description, tags = [], id = null) {
  id = id || uuidv1()
  return { id, title, description, tags: tags.slice(0, 3) }
}

export function getTemplates() {
  const templates = localStorage.getItem(STORAGE_KEY)
  return templates ? JSON.parse(templates) : []
}

export function getTemplateById(id) {
  const templates = getTemplates()
  return templates.find(template => template.id === id)
}

export function saveTemplate(template) {
  const templates = getTemplates()
  const index = templates.findIndex(t => t.id === template.id)
  if (index > -1) {
    templates[index] = template
  } else {
    templates.push(template)
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(templates))
  return template
}

export function deleteTemplate(id) {
  const templates = getTemplates().filter(template => template.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(templates))
  return templates
}
