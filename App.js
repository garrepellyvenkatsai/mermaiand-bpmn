import React, { useState } from 'react';
import MermaidDiagram from './MermaidDiagram';
import BpmnDiagram from './BpmnDiagram';
import './App.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function App() {
  const [code, setCode] = useState('');

  const handleButtonClick = (type) => {
    setCode(getExampleCode(type));
  };

  const getExampleCode = (type) => {
    const examples = {
      flow: `graph TD
A --> B
B --> C
A --> C`,
      sequence: `sequenceDiagram
participant Alice
participant Bob
Alice->>Bob: Hello Bob, how are you?
Bob-->>Alice: I am good thanks!`,
      class: `classDiagram
Class01 <|-- AveryLongClass : Cool
Class03 *-- Class04
Class05 o-- Class06
Class07 .. Class08
Class09 --> C2 : Inheritance`,
      state: `stateDiagram-v2
[*] --> Still
Still --> [*]
Still --> Moving
Moving --> Still
Moving --> Crash
Crash --> [*]`,
      er: `erDiagram
CUSTOMER ||--o{ ORDER : places
ORDER ||--|{ LINE-ITEM : contains
CUSTOMER }|..|{ DELIVERY-ADDRESS : uses`,
      gantt: `gantt
title A Gantt Diagram
dateFormat  YYYY-MM-DD
section Section
A task           :a1, 2023-01-01, 30d
Another task     :after a1  , 20d
section Another
Task in sec      :2023-01-12  , 12d
another task     : 24d`,
      journey: `journey
title My working day
section Go to work
  Make coffee: 5: Me
  Go upstairs: 3: Me
  Sit down: 2: Me
section Work
  Write code: 4: Me
  Review code: 3: Me
  Commit code: 2: Me`,
      git: `gitGraph
commit
commit
branch develop
checkout develop
commit
branch feature
checkout feature
commit
checkout develop
merge feature`,
      pie: `pie
title Key elements in Product X
"Calcium" : 42.96
"Potassium" : 50.05
"Magnesium" : 10.01
"Iron" :  5`,
      mindmap: `mindmap
  root
    Branch
      SubBranch
    Branch2
      SubBranch2`,
      block: `flowchart TD
    A[Start] --> B[Process]
    B --> C{Decision}
    C -->|Yes| D[End]
    C -->|No| B`,
      bpmn: `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                   xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
                   xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
                   xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
                   xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
                   xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd"
                   id="Definitions_1"
                   targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="true" name="Banking Payments Process">
    <bpmn:startEvent id="StartEvent_1" name="Start">
      <bpmn:outgoing>Flow_1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:userTask id="UserTask_1" name="Receive Payment Request">
      <bpmn:incoming>Flow_1</bpmn:incoming>
      <bpmn:outgoing>Flow_2</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:userTask id="UserTask_2" name="Validate Payment Details">
      <bpmn:incoming>Flow_2</bpmn:incoming>
      <bpmn:outgoing>Flow_3</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:exclusiveGateway id="ExclusiveGateway_1" name="Valid Details?">
      <bpmn:incoming>Flow_3</bpmn:incoming>
      <bpmn:outgoing>Flow_4</bpmn:outgoing>
      <bpmn:outgoing>Flow_5</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:userTask id="UserTask_3" name="Process Payment">
      <bpmn:incoming>Flow_4</bpmn:incoming>
      <bpmn:outgoing>Flow_6</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:endEvent id="EndEvent_1" name="End">
      <bpmn:incoming>Flow_6</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="UserTask_1"/>
    <bpmn:sequenceFlow id="Flow_2" sourceRef="UserTask_1" targetRef="UserTask_2"/>
    <bpmn:sequenceFlow id="Flow_3" sourceRef="UserTask_2" targetRef="ExclusiveGateway_1"/>
    <bpmn:sequenceFlow id="Flow_4" sourceRef="ExclusiveGateway_1" targetRef="UserTask_3"/>
    <bpmn:sequenceFlow id="Flow_5" sourceRef="ExclusiveGateway_1" targetRef="EndEvent_1"/>
    <bpmn:sequenceFlow id="Flow_6" sourceRef="UserTask_3" targetRef="EndEvent_1"/>
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="StartEvent_1_di" bpmnElement="StartEvent_1">
        <dc:Bounds x="100" y="100" width="36" height="36"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="UserTask_1_di" bpmnElement="UserTask_1">
        <dc:Bounds x="200" y="80" width="100" height="80"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="UserTask_2_di" bpmnElement="UserTask_2">
        <dc:Bounds x="350" y="80" width="100" height="80"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="ExclusiveGateway_1_di" bpmnElement="ExclusiveGateway_1">
        <dc:Bounds x="500" y="95" width="50" height="50"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="UserTask_3_di" bpmnElement="UserTask_3">
        <dc:Bounds x="620" y="80" width="100" height="80"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_1_di" bpmnElement="EndEvent_1">
        <dc:Bounds x="800" y="100" width="36" height="36"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_1_di" bpmnElement="Flow_1">
        <di:waypoint x="136" y="118"/>
        <di:waypoint x="200" y="118"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_2_di" bpmnElement="Flow_2">
        <di:waypoint x="300" y="120"/>
        <di:waypoint x="350" y="120"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_3_di" bpmnElement="Flow_3">
        <di:waypoint x="450" y="120"/>
        <di:waypoint x="500" y="120"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_4_di" bpmnElement="Flow_4">
        <di:waypoint x="550" y="120"/>
        <di:waypoint x="620" y="120"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_5_di" bpmnElement="Flow_5">
        <di:waypoint x="525" y="145"/>
        <di:waypoint x="700" y="145"/>
        <di:waypoint x="700" y="118"/>
        <di:waypoint x="800" y="118"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_6_di" bpmnElement="Flow_6">
        <di:waypoint x="720" y="120"/>
        <di:waypoint x="800" y="120"/>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`
    };
    return examples[type] || '';
  };
  const exportDiagram = (format) => {
    const diagramElement = document.querySelector('.diagramContainer');

    if (format === 'svg') {
      const svgElement = diagramElement.querySelector('svg');
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);

      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = 'diagram.svg';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } else {
      html2canvas(diagramElement).then((canvas) => {
        if (format === 'png') {
          const pngUrl = canvas.toDataURL('image/png');
          const downloadLink = document.createElement('a');
          downloadLink.href = pngUrl;
          downloadLink.download = 'diagram.png';
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        } else if (format === 'pdf') {
          const pdf = new jsPDF('landscape');
          pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, 280, 150);
          pdf.save('diagram.pdf');
        }
      });
    }
  };

  return (
    <div className="App">
      <header className="App-header">Editable Diagram Generator</header>
      <div className="controls">
        <button className="sample-btn" onClick={() => handleButtonClick('flow')}>Flow</button>
        <button className="sample-btn" onClick={() => handleButtonClick('sequence')}>Sequence</button>
        <button className="sample-btn" onClick={() => handleButtonClick('class')}>Class</button>
        <button className="sample-btn" onClick={() => handleButtonClick('state')}>State</button>
        <button className="sample-btn" onClick={() => handleButtonClick('er')}>ER</button>
        <button className="sample-btn" onClick={() => handleButtonClick('gantt')}>Gantt</button>
        <button className="sample-btn" onClick={() => handleButtonClick('journey')}>User Journey</button>
        <button className="sample-btn" onClick={() => handleButtonClick('git')}>Git</button>
        <button className="sample-btn" onClick={() => handleButtonClick('pie')}>Pie</button>
        <button className="sample-btn" onClick={() => handleButtonClick('mindmap')}>Mindmap</button>
        <button className="sample-btn" onClick={() => handleButtonClick('block')}>Block</button>
        <button className="sample-btn" onClick={() => handleButtonClick('bpmn')}>BPMN</button>
      </div>
      <div className="mainContent">
        <div className="editorContainer">
          <textarea
            id="inputText"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter your text description here..."
          />
        </div>
        {code.startsWith('<?xml') ? (
          <BpmnDiagram xml={code} />
        ) : (
          <MermaidDiagram code={code} />
        )}
      </div>
      <div className="export-buttons">
        <button className="export-btn" onClick={() => exportDiagram('svg')}>Export SVG</button>
        <button className="export-btn" onClick={() => exportDiagram('png')}>Export PNG</button>
        <button className="export-btn" onClick={() => exportDiagram('pdf')}>Export PDF</button>
      </div>
    </div>
  );
}
export default App;
