module.exports = {
    getDefaultPrompt: (context) => {
        return [
            {
                name: 'projectName',
                message: '输入项目名称',
                default: context.name
            },
            {
                name: 'projectDescription',
                message: '输入项目简介',
                default: `A project named ${context.name}`
            }
        ]
    }
}