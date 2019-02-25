import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ThreeService } from '../three.service';

@Component({
  selector: 'wr-scene',
  templateUrl: './scene.component.html',
  styleUrls: [ './scene.component.scss' ]
})
export class SceneComponent implements OnInit {
  @ViewChild('stage') stageRef: ElementRef;

  constructor(private threeService: ThreeService) {}

  ngOnInit() {
    const canvas = <HTMLCanvasElement>this.stageRef.nativeElement;
    this.threeService.createScene(canvas);
    this.threeService.animate();
  }
}
