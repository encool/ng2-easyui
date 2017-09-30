import { Component, Input, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild, ViewEncapsulation } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';

// import { FormConfigComponent } from '../config/form-config.component'
// import { ActivityConfigComponent } from '../config/activity-config.component'

// import { ModalAction } from '../../shared/object/modal-action'
// import { ModalService } from '../../service/modal.service'

@Component({
    selector: 'bpmn-editor',
    templateUrl: './bpmn-editor.component.html',
    styleUrls: ['bpmn.css'],
    encapsulation: ViewEncapsulation.None
})
export class BpmnEditorComponent implements OnInit {

    @Input() model: {
        params?: {
            key?: string,
            name?: string,
            description?: string
            type?: string
            processDefId?: string
            moduleId?: string
        }
        bpmnModel?: any
    } = {
        params: {}
    }

    _bpmnModeler: any
    _curElement: any    //config 当前选中的节点
    _overlays: any

    constructor(private http: Http, private vcRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver,
    ) {

    }

    ngOnInit() {
        this.model.params.type = 'add'
        if (this.model.params.processDefId != undefined
            || this.model.params.type == "add") {
            (require as any).ensure([], require => {
                // debugger
                let BpmnModeler = require('bpmn-js/lib/Modeler')
                let BpmnViewer = require('bpmn-js/lib/Viewer')
                let propertiesPanelModule = require('bpmn-js-properties-panel')
                let propertiesProviderModule = require('bpmn-js-properties-panel/lib/provider/camunda')
                this.initBpmn(BpmnModeler, BpmnViewer, propertiesPanelModule, propertiesProviderModule)
            });
            // this.initBpmn()
        }
    }

    initConfigListener() {
        // var overlayHtml = $('<div><ul class="menu">'+
        // '<li class="menu-item">'+
        //     '<button type="button" class="menu-btn">'+
        //         '<i class="fa fa-folder-open"></i>'+
        //         '<span class="menu-text">Open</span>'+
        //     '</button>'+
        // '</li>'+
        // '</ul></div>');

        // var formSetHtml = $('<li class="menu-item">' +
        //     '<button type="button" class="menu-btn">' +
        //     '<i class="fa fa-th"></i>' +
        //     '<span class="menu-text">表单设置</span>' +
        //     '</button></li>')
        // var activitySetHtml = $('<li class="menu-item">' +
        //     '<button type="button" class="menu-btn">' +
        //     '<i class="fa fa-cog"></i>' +
        //     '<span class="menu-text">节点设置</span>' +
        //     '</button></li>')

        // var overlayHtml = $('<div class="menu">' +
        //     '</div>')
        // overlayHtml.append(formSetHtml)
        // overlayHtml.append(activitySetHtml)
        // // var overlayHtml = $('<div><ul class="menu">click!</ul></div>')
        // formSetHtml.click((e) => {
        //     this._overlays.remove({ element: this._curElement });
        //     this.modalService.open(
        //         this._modalContext,
        //         {
        //             comp: FormConfigComponent,
        //             title: '表单设置',
        //             width: '900px'
        //         },
        //         {
        //             params: this.model.params,
        //             curActivity: this._curElement
        //         },
        //         data => {

        //         }
        //     );
        // });
        // activitySetHtml.click((e) => {
        //     this._overlays.remove({ element: this._curElement });
        //     this.modalService.open(
        //         this._modalContext,
        //         {
        //             comp: ActivityConfigComponent,
        //             title: '节点设置',
        //             width: '800px'
        //         },
        //         {
        //             params: this.model.params,
        //             curActivity: this._curElement
        //         },
        //         data => {
        //         }
        //     );
        // });
        // if (this._bpmnModeler != undefined) {
        //     this._overlays = this._bpmnModeler.get('overlays');
        //     this._bpmnModeler.on('element.hover', (event) => {
        //         var element = event.element,
        //             moddle = this._bpmnModeler.get('moddle'),
        //             // the underlaying BPMN 2.0 element
        //             businessObject = element.businessObject
        //         var overlays = this._bpmnModeler.get('overlays');
        //         if (businessObject.$type == "bpmn:UserTask"
        //             || businessObject.$type == "bpmn:EndEvent"
        //             || businessObject.$type == "bpmn:StartEvent") {
        //             this._curElement = element
        //             overlays.remove({ element: element });
        //             // attach an overlay to a node
        //             overlays.add(element, {
        //                 position: {
        //                     bottom: 50,
        //                     right: 0
        //                 },
        //                 html: overlayHtml
        //             });
        //         }
        //         console.log("element hover", element.id)
        //         console.log("element type", businessObject.$type)
        //     })

        //     this._bpmnModeler.on('element.click', (event) => {
        //         var element = event.element
        //         var overlays = this._bpmnModeler.get('overlays');
        //         overlays.remove({ element: this._curElement });
        //         console.log("element click", element.id)
        //     })
        // }
    }

    initBpmn(BpmnModeler, BpmnViewer, propertiesPanelModule, propertiesProviderModule) {
        if ((this.model.params.processDefId == undefined && this.model.params.type != "add")) {
            console.warn('没有流程信息')
            return
        }
        // var windowl: any = window
        // var propertiesPanelModule = windowl.PropertiesPanelModule;
        // var propertiesProviderModule = windowl.PropertiesProviderModule;
        var camundaModdleDescriptor = require("./camunda")
        // var BpmnModeler = windowl.BpmnJS;
        // var BpmnViewer = windowl.BpmnViewer;
        // var canvas = $('#js-canvas');
        // var canvas = document.querySelectorAll('#js-canvas')        
        var canvas = '#js-canvas'
        if (this.model.params.type == "add") {
            if (this._bpmnModeler == undefined) {
                // create modeler
                this._bpmnModeler = new BpmnModeler({
                    container: canvas,
                    zoomScroll: { enable: false },
                    propertiesPanel: {
                        parent: '#js-properties-panel'
                    },
                    additionalModules: [
                        propertiesPanelModule,
                        propertiesProviderModule
                    ],

                    moddleExtensions: {
                        camunda: camundaModdleDescriptor.CamundaModdleDescriptor
                    }
                });
            }

            let initXml = `<?xml version="1.0" encoding="UTF-8"?>
                <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:activiti="http://activiti.org/bpmn" targetNamespace="http://www.activiti.org/processdef">
                <process isExecutable="true" id="`+ this.model.params.key + "\"" + (this.model.params.name == undefined ? "" : " name=\"" + this.model.params.name + "\"") + ` />
                <bpmndi:BPMNDiagram id="BPMNDiagram_test">
                    <bpmndi:BPMNPlane id="BPMNPlane_test" bpmnElement="test" />
                </bpmndi:BPMNDiagram>
                </definitions>
            `
            setTimeout(() => {
                this._bpmnModeler.importXML(initXml, (err) => {
                    if (err) {
                        return console.error('could not import BPMN 2.0 diagram', err);
                    }
                    var canvas = this._bpmnModeler.get('canvas');

                    // zoom to fit full viewport
                    canvas.zoom('fit-viewport');
                })
            }, 2000)
        } else if (this.model.params.type == "edit") {
            // debugger
            if (this._bpmnModeler == undefined) {
                // create modeler
                this._bpmnModeler = new BpmnModeler({
                    container: canvas,
                    zoomScroll: { enabled: false },
                    propertiesPanel: {
                        parent: '#js-properties-panel'
                    },
                    additionalModules: [
                        propertiesPanelModule,
                        propertiesProviderModule
                    ],

                    moddleExtensions: {
                        camunda: camundaModdleDescriptor.CamundaModdleDescriptor
                    }
                });
            }

            this.http.get("workflow/model/editProcessByConvert/" + this.model.params.processDefId).toPromise().then(rep => {
                let rjson = rep.json();
                this.model.bpmnModel = rjson.model;
                let xml = this.activitiToCamundaAdapt(rjson.bpmn2xml)
                console.info('diagram geted');
                console.info(xml);
                setTimeout(() => {
                    this._bpmnModeler.importXML(xml, (err) => {
                        if (err) {
                            return console.error('could not import BPMN 2.0 diagram', err);
                        }
                        var canvas = this._bpmnModeler.get('canvas');
                        // zoom to fit full viewport
                        canvas.zoom('fit-viewport');
                    });
                }, 1500)

            })
        } else if (this.model.params.type == "config") {
            if (this._bpmnModeler == undefined) {
                // create modeler
                this._bpmnModeler = new BpmnViewer({
                    container: canvas,
                });
            }

            this.getProcessDefDiagram(this.model.params.processDefId).then(
                data => {
                    setTimeout(() => {
                        this._bpmnModeler.importXML(data, (err) => {
                            if (err) {
                                return console.error('could not import BPMN 2.0 diagram', err);
                            }
                            var canvas = this._bpmnModeler.get('canvas');
                            // zoom to fit full viewport
                            canvas.zoom('fit-viewport');
                        });
                    }, 800)
                }
            )
            this.initConfigListener()
        }


    }

    private getProcessDefDiagram(processDefinitionId: string): Promise<any> {
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.set('processDefinitionId', processDefinitionId);

        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({
            headers: headers,
            search: urlSearchParams
        });
        // private _getprocessdefdiagramUrl = "/process-definition/{processDefinitionId}/diagram-layout"
        return this.http.get('workflow/service/process-definition/' + processDefinitionId + '/diagram-layout', options)
            .toPromise()
            .then((data) => {
                return data.text()
            })
    }

    private getBpmnModelerOrViewer() {

    }

    saveModel(): Promise<any> {
        // let _this = this;
        return new Promise((resolve, reject) => {
            this._bpmnModeler.saveXML({ format: true }, (err, xml: string) => {
                if (err) {
                    console.error('diagram save failed', err);
                    reject(err)
                } else {
                    this._bpmnModeler.saveSVG({ format: true }, (err, svg) => {
                        xml = this.camundaToActivitiAdapt(xml);
                        console.info('diagram saved');
                        console.info(xml);
                        let body =
                            "xml=" + xml + "&" +
                            "svg=" + svg
                        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=ISO-8859-1' });
                        let options = new RequestOptions({ headers: headers });
                        this.http.put("workflow/service/model/" + this.model.bpmnModel.id + "/save", body, options)
                            .toPromise()
                            .then(function (response) {
                                console.log("response", response.json());
                                resolve(response.json())
                            })
                    });

                }
            });
            resolve("true");
        });

    }

    onModalAction(action: any) {
        if (action.key == "close") {
            return this.saveModel();
            // return new Promise((resolve, reject) => {
            //     resolve("true");
            // });
        } else if (action.key == "dismiss") {

        }
    }

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
}