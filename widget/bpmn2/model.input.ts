import { Model } from 'ng2-easyui.core'

export class ModelInput {
    params?: {
        key?: string,
        name?: string,
        description?: string
        type?: string
        processDefId?: string
        moduleId?: string
        processInsId?: string
    }
    bpmnModel?: Model
}