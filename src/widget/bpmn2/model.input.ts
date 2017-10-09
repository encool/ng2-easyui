import { Model } from '../../core'

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