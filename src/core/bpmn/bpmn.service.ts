import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions, Response } from '@angular/http';

export abstract class EuBpmnService {

    constructor(public http: Http) { }

    abstract getModelInfo(modelId: string): Promise<{}>

    abstract saveModel(modelId: string, xml: string, svg?: string): Promise<any>

    abstract getProcessDefDiagramXml(modelId: string): Promise<any>

}