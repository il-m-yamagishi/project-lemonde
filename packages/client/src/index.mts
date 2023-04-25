/**
 * @license Apache-2.0
 */

import { EngineFactory } from "@babylonjs/core/Engines/engineFactory.js";
import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
import { CreateSphere } from "@babylonjs/core/Meshes/Builders/sphereBuilder.js";
import { Scene } from "@babylonjs/core/scene.js";
import { SkyMaterial } from "@babylonjs/materials/sky/skyMaterial.js";
import { DirectionalLight } from "@babylonjs/core/Lights/directionalLight.js";
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera.js";

function createSky(scene: Scene): void {
    const material = new SkyMaterial("skyMat", scene);
    material.azimuth = 0.25;
    material.inclination = 0.1;
    const mesh = CreateSphere("skyMesh", {}, scene);
    mesh.scaling = new Vector3(1, 1, 1);
    mesh.infiniteDistance = true;
    mesh.material = material;
}

function createCamera(scene: Scene): void {
    const camera = new FreeCamera("mainCamera", Vector3.Zero(), scene);
    camera.attachControl(true);
}

function createMainLight(scene: Scene): void {
    new DirectionalLight("mainLight", new Vector3(-1, 1, 1), scene);
}

async function main(): Promise<void> {
    const canvas = document.getElementById("app") as HTMLCanvasElement | null;
    if (!canvas) {
        throw new Error("canvas#app not found");
    }
    const engine = await EngineFactory.CreateAsync(canvas, {});
    const scene = new Scene(engine);

    createSky(scene);
    createCamera(scene);
    createMainLight(scene);

    engine.runRenderLoop(() => {
        scene.render();
    });
    window.addEventListener("resize", () => {
        engine.resize();
    });

    const ws = new WebSocket("wss://localhost:8080");
    ws.addEventListener("open", () => {
        console.log("WebSocket has connected.");
    });
    ws.addEventListener("error", console.error);
    ws.addEventListener("message", (ev) => {
        console.log(`Data received: ${ev.data}`);
    });
    setInterval(() => {
        if (ws && ws.readyState === ws.OPEN) {
            ws.send(`hello ${Date.now()}`);
        }
    }, 2000);
}

main().catch(reason => console.error("Uncaught rejection found", reason));
