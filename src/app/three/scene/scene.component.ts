import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'wr-scene',
  templateUrl: './scene.component.html',
  styleUrls: [ './scene.component.scss' ]
})
export class SceneComponent implements OnInit, AfterViewInit {
  @ViewChild('stage') stageRef: ElementRef;
  private stage: HTMLCanvasElement;
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private mesh: THREE.Mesh;

  ngOnInit() {
    this.stage = <HTMLCanvasElement>this.stageRef.nativeElement;
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1, 1000
    );
    this.camera.position.z = 2;
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial({
      map: new THREE.TextureLoader().load('../../../assets/images/me.jpg')
    });
    this.mesh = new THREE.Mesh(geometry, material);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.position.z = 20;
    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.y = 3;
    this.scene = new THREE.Scene();
    this.scene.add(this.mesh);
    this.scene.add(ambientLight);
    this.scene.add(pointLight);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.stageRef.nativeElement,
      antialias: true
    });
    this.renderer.setClearColor(0x000000);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  ngAfterViewInit() {
    this.animate();
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }

}
