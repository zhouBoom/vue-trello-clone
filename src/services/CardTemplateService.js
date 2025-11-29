

const CardTemplateService = {
  STORAGE_KEY: 'card-templates',

  getTemplates() {
    const templates = localStorage.getItem(this.STORAGE_KEY);
    return templates ? JSON.parse(templates) : [];
  },

  getTemplateById(id) {
    const templates = this.getTemplates();
    return templates.find(template => template.id === id);
  },

  createTemplate(template) {
    const templates = this.getTemplates();
    const newTemplate = Object.assign({}, template, {
      id: Date.now().toString()
    });
    templates.push(newTemplate);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(templates));
    return newTemplate;
  },

  updateTemplate(updatedTemplate) {
    const templates = this.getTemplates();
    const index = templates.findIndex(template => template.id === updatedTemplate.id);
    if (index === -1) return undefined;
    templates[index] = updatedTemplate;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(templates));
    return updatedTemplate;
  },

  deleteTemplate(id) {
    const templates = this.getTemplates();
    const newTemplates = templates.filter(template => template.id !== id);
    if (newTemplates.length === templates.length) return false;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newTemplates));
    return true;
  },

  initDefaultTemplates() {
    const templates = this.getTemplates();
    if (templates.length === 0) {
      const defaultTemplates = [
        {
          name: '紧急任务',
          title: '紧急任务',
          description: '这是一个紧急任务，需要尽快处理',
          tags: ['紧急', '重要']
        },
        {
          name: '普通任务',
          title: '普通任务',
          description: '这是一个普通任务，按正常流程处理',
          tags: ['普通']
        },
        {
          name: '长期任务',
          title: '长期任务',
          description: '这是一个长期任务，需要分阶段处理',
          tags: ['长期', '重要']
        }
      ];
      defaultTemplates.forEach(template => this.createTemplate(template));
    }
  }
};

module.exports = CardTemplateService;
