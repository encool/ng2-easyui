import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions, Response } from '@angular/http';

import { Model } from './model'

export abstract class EuBpmnService {

    CamundaArray = {
        activiti: ["activiti:collection", "activiti:candidateUsers", "activiti:elementVariable"],
        camunda: ["camunda:collection", "camunda:candidateUsers", "camunda:elementVariable"]
    }


    activitiToCamundaAdapt(activitiXml: string): string {
        this.CamundaArray.activiti.forEach((str, index) => {
            var reg = "/" + str + "/ig";
            activitiXml = activitiXml.replace(eval(reg), this.CamundaArray.camunda[index]);
        })
        return activitiXml
    }

    camundaToActivitiAdapt(camundaXml: string): string {
        this.CamundaArray.camunda.forEach((str, index) => {
            var reg = "/" + str + "/ig";
            camundaXml = camundaXml.replace(eval(reg), this.CamundaArray.activiti[index]);
        })
        return camundaXml
    }

    constructor(public http: Http) { }

    abstract getModelInfo(modelId: string): Promise<{ model: Model, bpmn2xml: string }>

    abstract saveModel(modelId: string, xml: string, svg?: string): Promise<any>

    abstract getProcessDefDiagramXml(modelId: string): Promise<any>

    abstract getHighLights(processInstanceId): Promise<any>
}