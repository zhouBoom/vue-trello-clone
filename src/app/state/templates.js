import { makeTemplate, getTemplates, saveTemplate, deleteTemplate } from '../utils/CardTemplateService'

export function state () {
  return {
    templates: getTemplates(),
  }
}

const getters = {
  getAllTemplates: state => state.templates,
  getTemplateById: state => id => state.templates.find(template => template.id === id),
}

const mutations = {
  setTemplates (state, templates) {
    state.templates = templates
  },

  addTemplate (state, template) {
    state.templates.push(template)
  },

  updateTemplate (state, template) {
    const index = state.templates.findIndex(t => t.id === template.id)
    if (index > -1) {
      state.templates[index] = template
    }
  },

  removeTemplate (state, id) {
    const index = state.templates.findIndex(t => t.id === id)
    if (index > -1) {
      state.templates.splice(index, 1)
    }
  },
}

const actions = {
  loadTemplates ({ commit }) {
    const templates = getTemplates()
    commit('setTemplates', templates)
  },

  createTemplate ({ commit }, { title, description, tags }) {
    const template = makeTemplate(title, description, tags)
    saveTemplate(template)
    commit('addTemplate', template)
    return template
  },

  updateTemplate ({ commit }, template) {
    saveTemplate(template)
    commit('updateTemplate', template)
    return template
  },

  deleteTemplate ({ commit }, id) {
    deleteTemplate(id)
    commit('removeTemplate', id)
    return id
  },
}

export default {
  state,
  mutations,
  getters,
  actions,
}
